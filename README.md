# 3 - Framework

Lightweight Node/TypeScript framework split between framework code and app routes to keep responsibilities clean.

## 3.1 - Organization (Project Structure)

Consistency comes first: `every file lives where its purpose belongs so patterns stay repeatable`.

```plaintext
- index.ts
- core/
  - core.ts
  - router.ts
  - database.ts
  - http/
    - custom-request.ts
    - custom-response.ts
  - middleware/
  - utils/
- api/
  - courses/
    - index.ts
  - auth/
    - index.ts
```

Constraints (limits that simplify choices)

- Framework internals live in core/; app-facing routes live in api/. Do not mix concerns across these roots.
- Each route feature gets its own folder under api/ with an index.ts entry to keep patterns consistent.
- Shared helpers belong in core/utils/; avoid duplicating utilities inside api/.
- Keep naming uniform (index.ts for entry files) to preserve predictable imports and onboarding.

## 3.5 - Database

### 3.5.1 - Singleton Context

The current database connection is a singleton instance created and shared across the app. It's like a global variable. This `simplifies access but can lead to collateral issues in larger scales` (e.g., connection limits, testing, `importation order`).

```ts
import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync("./lms.sqlite");
```

```ts
import { db } from "./database.ts";

db.exec("CREATE TABLE...");
```

```ts
import { db } from "./database.ts";

db.exec("SELECT * FROM products;");
```

> At this simple case for example, it's not possible to know which one is the first to import the database. So, if the second one is imported before the first one, it will try to access the database before it is created, which will throw an error.

### 3.5.2 - Core Connection

To avoid the issues of a singleton context, `it's possible to create a connection inside the core and pass it to the routes that need it`. This way, we have more control over the connection and can avoid issues with importation order:

```ts
export class Core {
  db: Database;
  constructor() {
    // ...
    this.db = new Database("./lms.sqlite");
    // ...
  }
}
```

Then, we can pass the connection to the routes that need it:

```ts
import { DatabaseSync } from "node:sqlite";

export class Database extends DatabaseSync {
  constructor(path: string) {
    super(path);
    this.exec(`
      PRAGMA foreign_keys = 1;
      PRAGMA journal_mode = DELETE;
      PRAGMA synchronous = NORMAL;

      PRAGMA cache_size = 2000;
      PRAGMA busy_timeout = 5000;
      PRAGMA temp_store = MEMORY;
    `);
  }
}
```
