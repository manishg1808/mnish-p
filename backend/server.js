import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
// Increased limit for base64 images - support very large images (up to 200MB base64)
app.use(express.json({ limit: '200mb' }))
app.use(express.urlencoded({ extended: true, limit: '200mb' }))

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mnishdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Helper function to set max_allowed_packet for a connection
async function setMaxPacketSize(connection) {
  try {
    // Try to set to 200MB first (209715200 bytes) - use query() not execute() for SET commands
    await connection.query("SET SESSION max_allowed_packet = 209715200")
    console.log('✅ max_allowed_packet set to 200MB')
    return true
  } catch (err) {
    console.warn('⚠️ Could not set max_allowed_packet to 200MB:', err.message)
    // Try with 100MB
    try {
      await connection.query("SET SESSION max_allowed_packet = 104857600")
      console.log('✅ max_allowed_packet set to 100MB')
      return true
    } catch (err2) {
      console.warn('⚠️ Could not set max_allowed_packet to 100MB:', err2.message)
      // Try with 64MB
      try {
        await connection.query("SET SESSION max_allowed_packet = 67108864")
        console.log('✅ max_allowed_packet set to 64MB (fallback)')
        return true
      } catch (err3) {
        console.warn('⚠️ Could not set max_allowed_packet even with 64MB:', err3.message)
        // Last try - 32MB
        try {
          await connection.query("SET SESSION max_allowed_packet = 33554432")
          console.log('✅ max_allowed_packet set to 32MB (minimum)')
          return true
        } catch (err4) {
          console.error('❌ Could not set max_allowed_packet at all:', err4.message)
          return false
        }
      }
    }
  }
}

// Test database connection and setup tables
db.getConnection()
  .then(async () => {
    console.log('✅ Database connected successfully')
    // Auto-create home_banner table if it doesn't exist
    try {
      const [tables] = await db.execute(
        "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'home_banner'",
        [process.env.DB_NAME || 'mnishdb']
      )
      if (tables.length === 0) {
        console.log('📦 Creating home_banner table...')
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
    
    // Auto-create about table if it doesn't exist
    try {
      // Check if table exists
      const [aboutTables] = await db.execute(
        "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'about'",
        [process.env.DB_NAME || 'mnishdb']
      )
      
      if (aboutTables.length === 0) {
        console.log('📦 Creating about table...')
        try {
          await db.execute(`
            CREATE TABLE IF NOT EXISTS about (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(200),
              title VARCHAR(200),
              sub_heading VARCHAR(500),
              introduction TEXT,
              bio TEXT,
              birthday VARCHAR(50),
              website VARCHAR(500),
              phone VARCHAR(50),
              city VARCHAR(100),
              age VARCHAR(10),
              degree VARCHAR(200),
              email VARCHAR(200),
              freelance VARCHAR(100),
              resume LONGTEXT,
              resume_filename VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
          `)
          console.log('✅ about table created successfully!')
        } catch (createError) {
          console.error('❌ Error creating about table:', createError.message)
          console.error('   SQL Error Code:', createError.code)
          console.error('   Please run the SQL file manually: backend/create_about_table.sql')
        }
      } else {
        console.log('✅ about table already exists')
      }
    } catch (error) {
      console.error('❌ Error setting up about table:', error.message)
      console.error('   Error Code:', error.code)
      console.error('   Please make sure:')
      console.error('   1. XAMPP MySQL is running')
      console.error('   2. Database "mnishdb" exists')
      console.error('   3. Run SQL manually: backend/create_about_table.sql')
    }
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message)
    console.error('⚠️ Make sure XAMPP MySQL is running')
  })

// Skills API Routes
app.get('/api/skills', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM skills ORDER BY level DESC')
    res.json(rows)
  } catch (error) {
    console.error('Error fetching skills:', error)
    res.status(500).json({ error: 'Failed to fetch skills' })
  }
})

app.post('/api/skills', async (req, res) => {
  try {
    const { name, level } = req.body
    const [result] = await db.execute(
      'INSERT INTO skills (name, level) VALUES (?, ?)',
      [name, level]
    )
    res.json({ id: result.insertId, name, level })
  } catch (error) {
    console.error('Error adding skill:', error)
    res.status(500).json({ error: 'Failed to add skill' })
  }
})

app.delete('/api/skills/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.execute('DELETE FROM skills WHERE id = ?', [id])
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting skill:', error)
    res.status(500).json({ error: 'Failed to delete skill' })
  }
})

// Team API Routes
app.get('/api/team', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM team ORDER BY id DESC')
    res.json(Array.isArray(rows) ? rows : [])
  } catch (error) {
    console.error('Error fetching team:', error)
    // Return empty array instead of error to prevent frontend crashes
    res.json([])
  }
})

app.post('/api/team', async (req, res) => {
  try {
    const { name, role, bio, email } = req.body
    const [result] = await db.execute(
      'INSERT INTO team (name, role, bio, email) VALUES (?, ?, ?, ?)',
      [name, role, bio, email || null]
    )
    res.json({ id: result.insertId, name, role, bio, email })
  } catch (error) {
    console.error('Error adding team member:', error)
    res.status(500).json({ error: 'Failed to add team member' })
  }
})

app.delete('/api/team/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.execute('DELETE FROM team WHERE id = ?', [id])
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting team member:', error)
    res.status(500).json({ error: 'Failed to delete team member' })
  }
})

// Projects API Routes
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM projects ORDER BY id DESC')
    // Parse tech array from JSON string
    const projects = Array.isArray(rows) ? rows.map(project => {
      try {
        return {
          ...project,
          tech: project.tech ? (typeof project.tech === 'string' ? JSON.parse(project.tech) : project.tech) : []
        }
      } catch (e) {
        return {
          ...project,
          tech: []
        }
      }
    }) : []
    res.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Return empty array instead of error to prevent frontend crashes
    res.json([])
  }
})

app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, tech, image, link } = req.body
    const techJson = Array.isArray(tech) ? JSON.stringify(tech) : tech
    const [result] = await db.execute(
      'INSERT INTO projects (title, description, tech, image, link) VALUES (?, ?, ?, ?, ?)',
      [title, description, techJson, image, link]
    )
    res.json({ id: result.insertId, title, description, tech: Array.isArray(tech) ? tech : [], image, link })
  } catch (error) {
    console.error('Error adding project:', error)
    res.status(500).json({ error: 'Failed to add project' })
  }
})

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.execute('DELETE FROM projects WHERE id = ?', [id])
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

// Home Banner API Routes
app.get('/api/home-banner', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM home_banner WHERE (media IS NOT NULL AND media != "") ORDER BY id DESC')
    res.json(rows.length === 0 ? [] : rows)
  } catch (error) {
    console.error('Error fetching home banner:', error.message)
    if (error.code === 'ER_NO_SUCH_TABLE') {
      res.json([])
    } else {
      res.status(500).json({ error: 'Failed to fetch home banner', details: error.message })
    }
  }
})

// Get single banner (for admin panel)
app.get('/api/home-banner/latest', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM home_banner ORDER BY id DESC LIMIT 1')
    res.json(rows.length === 0 ? { title: '', subtitle: '', media: '', media_type: 'image' } : rows[0])
  } catch (error) {
    console.error('Error fetching home banner:', error.message)
    if (error.code === 'ER_NO_SUCH_TABLE') {
      res.json({ title: '', subtitle: '', media: '', media_type: 'image' })
    } else {
      res.status(500).json({ error: 'Failed to fetch home banner', details: error.message })
    }
  }
})

// Add new banner (POST)
app.post('/api/home-banner', async (req, res) => {
  try {
    console.log('📥 Received banner upload request')
    const { title, subtitle, media, media_type } = req.body
    
    // Validate required fields
    if (!media || (typeof media === 'string' && media.trim() === '')) {
      console.warn('⚠️ Media is missing or empty')
      return res.status(400).json({ error: 'Media is required. Please upload an image or provide a URL.' })
    }
    
    // Check media size (base64 is ~33% larger than original)
    // LONGTEXT can store up to 4GB, but we'll allow up to 100MB base64 for safety
    const mediaSize = Buffer.byteLength(String(media), 'utf8')
    const maxSize = 100 * 1024 * 1024 // 100MB limit (LONGTEXT supports much more, but this is safe)
    const mediaSizeMB = (mediaSize / 1024 / 1024).toFixed(2)
    
    console.log(`📊 Media size: ${mediaSizeMB}MB, Type: ${media_type || 'image'}`)
    
    // Warn but don't reject for large images - LONGTEXT can handle it
    if (mediaSize > maxSize) {
      console.warn(`⚠️ Large media detected: ${mediaSizeMB}MB (will try to save anyway)`)
      // Don't reject, just warn - LONGTEXT can handle very large data
    }
    
    // Get connection and set max_allowed_packet
    const connection = await db.getConnection()
    try {
      // Set max_allowed_packet for this connection FIRST
      const packetSet = await setMaxPacketSize(connection)
      if (!packetSet) {
        console.warn('⚠️ Could not set max_allowed_packet - may fail for large images')
      }
      
      // Ensure table exists - create if not
      try {
        const [tables] = await connection.execute(
          "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'home_banner'",
          [process.env.DB_NAME || 'mnishdb']
        )
        if (tables.length === 0) {
          console.log('📦 Creating home_banner table...')
          await connection.execute(`
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
        }
      } catch (tableError) {
        console.error('❌ Table setup error:', tableError.message)
        // Continue anyway - table might already exist
      }
      
      console.log(`💾 Inserting banner: title="${title || 'Untitled'}", size=${mediaSizeMB}MB`)
      
      // Normalize media_type - accept any format
      const normalizedMediaType = media_type && media_type.toLowerCase() === 'video' ? 'video' : 'image'
      
      // Insert banner - use execute() for prepared statements
      const [result] = await connection.execute(
        'INSERT INTO home_banner (title, subtitle, media, media_type) VALUES (?, ?, ?, ?)',
        [title || '', subtitle || '', String(media), normalizedMediaType]
      )
      
      connection.release()
      
      console.log(`✅ Banner added successfully! ID: ${result.insertId}`)
      
      res.json({ 
        id: result.insertId, 
        title: title || '', 
        subtitle: subtitle || '', 
        media: String(media), 
        media_type: normalizedMediaType 
      })
    } catch (queryError) {
      connection.release()
      throw queryError // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error('❌ Error adding home banner:')
    console.error('   Code:', error.code)
    console.error('   Message:', error.message)
    console.error('   SQL State:', error.sqlState)
    console.error('   Stack:', error.stack)
    
    // Try to create table one more time if it doesn't exist
    if (error.code === 'ER_NO_SUCH_TABLE') {
      try {
        console.log('🔄 Table not found, creating now...')
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
        console.log('✅ Table created! Retrying insert...')
        // Retry the insert
        const [result] = await db.execute(
          'INSERT INTO home_banner (title, subtitle, media, media_type) VALUES (?, ?, ?, ?)',
          [title || '', subtitle || '', String(media), media_type || 'image']
        )
        console.log(`✅ Banner added successfully! ID: ${result.insertId}`)
        return res.json({ id: result.insertId, title, subtitle, media, media_type })
      } catch (retryError) {
        console.error('❌ Retry failed:', retryError.message)
        return res.status(500).json({ 
          error: 'Database table not found. Please restart backend server.', 
          details: retryError.message,
          code: retryError.code
        })
      }
    } else if (error.code === 'ER_NET_PACKET_TOO_LARGE') {
      // Handle packet size error
      res.status(413).json({ 
        error: 'Image too large for MySQL server!',
        details: error.message,
        suggestion: 'Please use the URL option for large images, or increase MySQL max_allowed_packet setting.',
        code: error.code
      })
    } else if (error.code === 'ER_DATA_TOO_LONG') {
      // LONGTEXT shouldn't hit this, but just in case
      res.status(400).json({ 
        error: 'Image too large for database! Please use URL option instead of file upload.',
        details: error.message,
        suggestion: 'For very large images, use the URL input field instead of file upload.'
      })
    } else if (error.code === 'ECONNREFUSED' || error.code === 'PROTOCOL_CONNECTION_LOST') {
      res.status(500).json({ 
        error: 'Database connection lost. Please check if MySQL/XAMPP is running.',
        details: error.message 
      })
    } else {
      res.status(500).json({ 
        error: 'Failed to add home banner', 
        details: error.message,
        code: error.code,
        sqlState: error.sqlState
      })
    }
  }
})

// Update latest banner (PUT - for admin panel compatibility)
app.put('/api/home-banner', async (req, res) => {
  try {
    const { title, subtitle, media, media_type } = req.body
    
    const [existing] = await db.execute('SELECT * FROM home_banner ORDER BY id DESC LIMIT 1')
    
    if (existing.length === 0) {
      const [result] = await db.execute(
        'INSERT INTO home_banner (title, subtitle, media, media_type) VALUES (?, ?, ?, ?)',
        [title || '', subtitle || '', media || '', media_type || 'image']
      )
      res.json({ id: result.insertId, title, subtitle, media, media_type })
    } else {
      await db.execute(
        'UPDATE home_banner SET title = ?, subtitle = ?, media = ?, media_type = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [title || '', subtitle || '', media || '', media_type || 'image', existing[0].id]
      )
      res.json({ id: existing[0].id, title, subtitle, media, media_type })
    }
  } catch (error) {
    console.error('Error updating home banner:', error)
    if (error.code === 'ER_NO_SUCH_TABLE') {
      res.status(500).json({ error: 'Database table not found. Please run create_home_banner_table.sql', details: error.message })
    } else {
      res.status(500).json({ error: 'Failed to update home banner', details: error.message })
    }
  }
})

// Delete banner
app.delete('/api/home-banner/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.execute('DELETE FROM home_banner WHERE id = ?', [id])
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting home banner:', error)
    if (error.code === 'ER_NO_SUCH_TABLE') {
      res.status(500).json({ error: 'Database table not found. Please run create_home_banner_table.sql', details: error.message })
    } else {
      res.status(500).json({ error: 'Failed to delete home banner', details: error.message })
    }
  }
})

// Sidebar API Routes (placeholder - returns empty data)
app.get('/api/sidebar', async (req, res) => {
  try {
    // Return empty sidebar data if table doesn't exist
    res.json({
      profile_image: '',
      name: '',
      email: '',
      phone: '',
      social_links: [],
      navigation_items: []
    })
  } catch (error) {
    console.error('Error fetching sidebar:', error)
    res.json({
      profile_image: '',
      name: '',
      email: '',
      phone: '',
      social_links: [],
      navigation_items: []
    })
  }
})

app.put('/api/sidebar', async (req, res) => {
  try {
    // Placeholder - just return success
    res.json({ success: true, message: 'Sidebar updated (not implemented)' })
  } catch (error) {
    console.error('Error updating sidebar:', error)
    res.status(500).json({ error: 'Failed to update sidebar' })
  }
})

// About API Routes
app.get('/api/about', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM about ORDER BY id DESC LIMIT 1')
    if (rows.length === 0) {
      res.json({
        name: '',
        title: '',
        sub_heading: '',
        introduction: '',
        birthday: '',
        website: '',
        phone: '',
        city: '',
        age: '',
        degree: '',
        email: '',
        freelance: '',
        resume: '',
        resume_filename: ''
      })
    } else {
      res.json(rows[0])
    }
  } catch (error) {
    console.error('Error fetching about:', error)
    if (error.code === 'ER_NO_SUCH_TABLE') {
      res.json({
        name: '',
        title: '',
        sub_heading: '',
        introduction: '',
        birthday: '',
        website: '',
        phone: '',
        city: '',
        age: '',
        degree: '',
        email: '',
        freelance: '',
        resume: '',
        resume_filename: ''
      })
    } else {
      res.status(500).json({ error: 'Failed to fetch about data', details: error.message })
    }
  }
})

app.put('/api/about', async (req, res) => {
  try {
    const connection = await db.getConnection()
    try {
      const packetSet = await setMaxPacketSize(connection)
      if (!packetSet) {
        console.warn('⚠️ Could not set max_allowed_packet - may fail for large resume files')
      }
      
      const {
        sub_heading, introduction, resume, resume_filename
      } = req.body
      
      // Check if about record exists
      const [existing] = await connection.execute('SELECT * FROM about ORDER BY id DESC LIMIT 1')
      
      if (existing.length === 0) {
        // Create new record - only set the fields we're using
        const [result] = await connection.execute(
          `INSERT INTO about (
            sub_heading, introduction, resume, resume_filename
          ) VALUES (?, ?, ?, ?)`,
          [
            sub_heading || '', introduction || '',
            resume || '', resume_filename || ''
          ]
        )
        connection.release()
        res.json({ id: result.insertId, message: 'About data created successfully' })
      } else {
        // Update existing record - only update the fields we're using
        await connection.execute(
          `UPDATE about SET
            sub_heading = ?, introduction = ?,
            resume = ?, resume_filename = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`,
          [
            sub_heading || '', introduction || '',
            resume || '', resume_filename || '',
            existing[0].id
          ]
        )
        connection.release()
        res.json({ id: existing[0].id, message: 'About data updated successfully' })
      }
    } catch (queryError) {
      connection.release()
      throw queryError
    }
  } catch (error) {
    console.error('Error updating about:', error)
    if (error.code === 'ER_NO_SUCH_TABLE') {
      // Try to create table
      try {
        await db.execute(`
          CREATE TABLE IF NOT EXISTS about (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(200),
            title VARCHAR(200),
            sub_heading VARCHAR(500),
            introduction TEXT,
            birthday VARCHAR(50),
            website VARCHAR(500),
            phone VARCHAR(50),
            city VARCHAR(100),
            age VARCHAR(10),
            degree VARCHAR(200),
            email VARCHAR(200),
            freelance VARCHAR(100),
            resume LONGTEXT,
            resume_filename VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `)
        // Retry the insert
        const [result] = await db.execute(
          `INSERT INTO about (
            sub_heading, introduction, resume, resume_filename
          ) VALUES (?, ?, ?, ?)`,
          [
            req.body.sub_heading || '', req.body.introduction || '',
            req.body.resume || '', req.body.resume_filename || ''
          ]
        )
        return res.json({ id: result.insertId, message: 'About data created successfully' })
      } catch (retryError) {
        return res.status(500).json({ error: 'Failed to create about table', details: retryError.message })
      }
    } else {
      res.status(500).json({ error: 'Failed to update about data', details: error.message })
    }
  }
})

// CV Download endpoint - fetches CV from external URL and serves it
app.get('/api/download-cv', async (req, res) => {
  try {
    const cvUrl = 'https://mnish-cv.vercel.app/'
    
    // Fetch the CV page
    const response = await fetch(cvUrl)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CV: ${response.statusText}`)
    }
    
    const htmlContent = await response.text()
    
    // Set headers for download
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Content-Disposition', 'attachment; filename="Manish_Kumar_CV.html"')
    
    // Send the HTML content
    res.send(htmlContent)
  } catch (error) {
    console.error('Error fetching CV:', error)
    res.status(500).json({ error: 'Failed to fetch CV', details: error.message })
  }
})

// Download resume from about section
app.get('/api/about/resume', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT resume, resume_filename FROM about ORDER BY id DESC LIMIT 1')
    if (rows.length === 0 || !rows[0].resume) {
      return res.status(404).json({ error: 'Resume not found' })
    }
    
    const resumeData = rows[0].resume
    const filename = rows[0].resume_filename || 'resume.pdf'
    
    // If resume is base64, decode it
    if (resumeData.startsWith('data:')) {
      const base64Data = resumeData.split(',')[1]
      const buffer = Buffer.from(base64Data, 'base64')
      
      // Determine content type from filename or default to PDF
      const contentType = filename.endsWith('.pdf') ? 'application/pdf' :
                         filename.endsWith('.doc') ? 'application/msword' :
                         filename.endsWith('.docx') ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                         'application/octet-stream'
      
      res.setHeader('Content-Type', contentType)
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
      res.send(buffer)
    } else {
      // If it's a URL, redirect or fetch
      res.redirect(resumeData)
    }
  } catch (error) {
    console.error('Error downloading resume:', error)
    res.status(500).json({ error: 'Failed to download resume', details: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

