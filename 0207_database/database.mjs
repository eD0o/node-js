import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync('./db.sqlite');

db.exec(/*sql*/`
  PRAGMA foreign_keys = 1;
  PRAGMA journal_mode = WAL;
  PRAGMA synchronous = NORMAL;

  PRAGMA cache_size = 2000;
  PRAGMA busy_timeout = 5000;
  PRAGMA temp_store = MEMORY;
`);

db.exec(/*sql*/`
  CREATE TABLE IF NOT EXISTS "products"(
  "slug" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "price" INTEGER NOT NULL
  );
`);

const insert = db.prepare(/*sql*/`
  INSERT OR IGNORE INTO "products" ("slug", "name", "category", "price")
  VALUES (?, ?, ?, ?);
`);

insert.run('notebook', 'Notebook', 'eletronics', 3000);
insert.run('monitor', 'Monitor', 'eletronics', 1500);
insert.run('notebook-case', 'Notebook Case', 'accessories', 50);
insert.run('table', 'Table', 'furniture', 800);

const products = db.prepare(`SELECT * FROM "products"`).all()
const product = db.prepare(`SELECT * FROM "products" WHERE "slug" = ?`).get('monitor')

console.log("Products: ", products);
console.log("PRODUCT: ", product);

