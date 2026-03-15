import Database from 'better-sqlite3';
import path from 'path';

const dbPath = process.env.NODE_ENV === 'test' ? ':memory:' : path.join(process.cwd(), 'moldmd.sqlite');
const db = new Database(dbPath, { verbose: console.log });

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS verified_emails (
    email TEXT PRIMARY KEY UNIQUE,
    verified_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS verification_codes (
    email TEXT PRIMARY KEY UNIQUE,
    code TEXT NOT NULL,
    expires_at DATETIME NOT NULL
  );
`);

export default db;
