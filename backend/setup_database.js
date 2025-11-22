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

async function createHomeBannerTable() {
  try {
    const connection = await db.getConnection()
    console.log('✅ Database connected successfully')
    
    // Create home_banner table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS home_banner (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200),
        subtitle VARCHAR(500),
        media LONGTEXT,
        media_type VARCHAR(20) DEFAULT 'image',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `
    
    await connection.query(createTableSQL)
    console.log('✅ home_banner table created successfully!')
    
    connection.release()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating table:', error)
    process.exit(1)
  }
}

createHomeBannerTable()

