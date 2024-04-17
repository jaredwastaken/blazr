import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const betterSqlite = new Database('blazr-dev.db');
const db = drizzle(betterSqlite);

async function run_migration() {
  try {
    migrate(db, { migrationsFolder: './migrations' });
  } catch (err) {
    console.log(err);
  }
}

run_migration();
