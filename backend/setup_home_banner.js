// Auto-setup script for home_banner table
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mnishdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

async function setupHomeBannerTable() {
  try {
    // Check if table exists
    const [tables] = await db.execute(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'home_banner'",
      [process.env.DB_NAME || 'mnishdb']
    )

    if (tables.length === 0) {
      console.log('Creating home_banner table...')
      await db.execute(`
        CREATE TABLE IF NOT EXISTS home_banner (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(200),
          subtitle VARCHAR(500),
          media LONGTEXT,
          media_type VARCHAR(20) DEFAULT 'image',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `)
      console.log('✅ home_banner table created successfully!')
    } else {
      console.log('✅ home_banner table already exists')
    }
  } catch (error) {
    console.error('❌ Error setting up home_banner table:', error.message)
  }
}

setupHomeBannerTable().then(() => {
  process.exit(0)
}).catch(err => {
  console.error(err)
  process.exit(1)
})

