// Test script to check banner upload functionality
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

async function testBannerUpload() {
  try {
    console.log('🔍 Testing banner upload functionality...\n')
    
    // Test connection
    const testConnection = await db.getConnection()
    console.log('✅ Database connection successful')
    testConnection.release()
    
    // Check database exists
    const dbName = process.env.DB_NAME || 'mnishdb'
    const connection = await db.getConnection()
    
    try {
      await connection.query(`USE \`${dbName}\``)
      console.log(`✅ Database '${dbName}' exists and accessible`)
    } catch (error) {
      console.log(`📦 Database '${dbName}' not found! Creating...`)
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``)
      await connection.query(`USE \`${dbName}\``)
      console.log(`✅ Database '${dbName}' created`)
    }
    
    // Check table exists
    const [tables] = await connection.query(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'home_banner'",
      [dbName]
    )
    
    if (tables.length === 0) {
      console.log('📦 Creating home_banner table...')
      await connection.query(`
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
      console.log('✅ home_banner table created!')
    } else {
      console.log('✅ home_banner table exists')
    }
    
    // Test insert
    console.log('\n🧪 Testing insert operation...')
    const testMedia = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    const [result] = await connection.query(
      'INSERT INTO home_banner (title, subtitle, media, media_type) VALUES (?, ?, ?, ?)',
      ['Test', 'Test Subtitle', testMedia, 'image']
    )
    console.log(`✅ Test insert successful! ID: ${result.insertId}`)
    
    // Clean up test data
    await connection.query('DELETE FROM home_banner WHERE id = ?', [result.insertId])
    console.log('✅ Test data cleaned up')
    
    connection.release()
    
    console.log('\n✅ All tests passed! Banner upload should work now.')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Test failed!')
    console.error('Error:', error.message)
    console.error('Code:', error.code)
    console.error('\nPlease check:')
    console.error('1. XAMPP MySQL is running')
    console.error('2. Database credentials in .env file')
    console.error('3. Database name is correct')
    process.exit(1)
  }
}

testBannerUpload()

