const fs = require('fs');
const path = require('path');
const { query } = require('../config/database');

async function runMigrations() {
  const migrationsDir = path.join(__dirname);
  const files = fs.readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql') && file !== 'runMigrations.js')
    .sort();

  for (const file of files) {
    const fullPath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(fullPath, 'utf8');
    console.log(`Running migration: ${file}`);
    await query(sql);
  }

  console.log('All migrations completed successfully.');
}

runMigrations()
  .catch((error) => {
    console.error('Migration failed:', error.message);
    process.exit(1);
  });
