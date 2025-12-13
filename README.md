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

## 3.2 - Dynamic Router

## 3.3 - Middleware