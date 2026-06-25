const bcrypt = require('bcryptjs');
const { query } = require('../config/database');

async function seedCfo() {
  const email = 'cfo@org.com';
  const passwordHash = await bcrypt.hash('Cfo@1234', 10);

  await query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO NOTHING`,
    ['CFO', email, passwordHash, 'CFO']
  );
}

if (require.main === module) {
  seedCfo()
    .then(() => console.log('CFO seeded successfully.'))
    .catch((error) => {
      console.error('Failed to seed CFO:', error.message);
      process.exit(1);
    });
}

module.exports = { seedCfo };
