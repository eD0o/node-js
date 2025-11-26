import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync('./lms.sqlite');

db.exec(/*sql*/`
  PRAGMA foreign_keys = 1;
  PRAGMA journal_mode = WAL;
  PRAGMA synchronous = NORMAL;

  PRAGMA cache_size = 2000;
  PRAGMA busy_timeout = 5000;
  PRAGMA temp_store = MEMORY;

  CREATE TABLE IF NOT EXISTS "courses" (
    "id" INTEGER PRIMARY KEY,
    "slug" TEXT NOT NULL COLLATE NOCASE UNIQUE,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
  ) STRICT;

  CREATE TABLE IF NOT EXISTS "classes" (
    "id" INTEGER PRIMARY KEY,
    "course_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL COLLATE NOCASE,
    "name" TEXT NOT NULL,
    FOREIGN KEY("course_id") REFERENCES "courses" ("id"),
    UNIQUE("course_id", "slug")
  ) STRICT;
  `
)

export function createCourse({ slug, name, description }) {
  db.prepare(/*sql*/`INSERT OR IGNORE INTO "courses" ("slug", "name", "description") VALUES (?, ?, ?)`).run(slug, name, description);
}

