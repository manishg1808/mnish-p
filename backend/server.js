import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Create uploads directories if they don't exist
const projectsUploadsDir = path.join(__dirname, 'uploads', 'projects')
const skillsUploadsDir = path.join(__dirname, 'uploads', 'skills')

try {
  if (!fs.existsSync(projectsUploadsDir)) {
    fs.mkdirSync(projectsUploadsDir, { recursive: true })
    console.log(`✅ Created uploads directory: ${projectsUploadsDir}`)
  } else {
    console.log(`✅ Uploads directory exists: ${projectsUploadsDir}`)
  }
  
  if (!fs.existsSync(skillsUploadsDir)) {
    fs.mkdirSync(skillsUploadsDir, { recursive: true })
    console.log(`✅ Created skills uploads directory: ${skillsUploadsDir}`)
  } else {
    console.log(`✅ Skills uploads directory exists: ${skillsUploadsDir}`)
  }
} catch (error) {
  console.error(`❌ Error creating uploads directory: ${error.message}`)
}

// Configure multer for project file uploads
const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, projectsUploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'project-' + uniqueSuffix + path.extname(file.originalname))
  }
})

// Configure multer for skill file uploads
const skillStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, skillsUploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'skill-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)
  
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'))
  }
}

const upload = multer({ 
  storage: projectStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
})

const uploadSkill = multer({ 
  storage: skillStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
})

// Middleware
app.use(cors())
// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
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
              sub_heading VARCHAR(500) DEFAULT NULL,
              introduction TEXT DEFAULT NULL,
              resume LONGTEXT DEFAULT NULL,
              resume_filename VARCHAR(255) DEFAULT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
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
    
    // Auto-add category and image columns to skills table if they don't exist
    try {
      const [categoryColumn] = await db.execute(
        "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'skills' AND COLUMN_NAME = 'category'",
        [process.env.DB_NAME || 'mnishdb']
      )
      
      if (categoryColumn.length === 0) {
        console.log('📦 Adding category column to skills table...')
        await db.execute(`
          ALTER TABLE skills 
          ADD COLUMN category VARCHAR(50) DEFAULT 'Other',
          ADD COLUMN image VARCHAR(500) DEFAULT ''
        `)
        console.log('✅ category and image columns added to skills table!')
        
        // Update existing skills with default category
        await db.execute("UPDATE skills SET category = 'Other' WHERE category IS NULL OR category = ''")
        console.log('✅ Updated existing skills with default category')
      } else {
        console.log('✅ skills table already has category column')
        
        // Check for any skills with NULL or empty category and fix them
        try {
          const [nullSkills] = await db.execute("SELECT id, name, category FROM skills WHERE category IS NULL OR category = ''")
          if (nullSkills.length > 0) {
            console.log(`⚠️ Found ${nullSkills.length} skills with null/empty category, fixing...`)
            await db.execute("UPDATE skills SET category = 'Other' WHERE category IS NULL OR category = ''")
            console.log('✅ Fixed skills with null/empty category')
          }
        } catch (fixError) {
          console.error('⚠️ Error fixing null categories:', fixError.message)
        }
      }
    } catch (error) {
      console.error('❌ Error setting up skills table columns:', error.message)
      // Don't fail completely, just log the error
    }
    
    // Auto-create sidebar table if it doesn't exist
    try {
      const [sidebarTables] = await db.execute(
        "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'sidebar'",
        [process.env.DB_NAME || 'mnishdb']
      )
      
      if (sidebarTables.length === 0) {
        console.log('📦 Creating sidebar table...')
        await db.execute(`
          CREATE TABLE IF NOT EXISTS sidebar (
            id INT AUTO_INCREMENT PRIMARY KEY,
            profile_image TEXT,
            name VARCHAR(200),
            email VARCHAR(200),
            phone VARCHAR(50),
            linkedin VARCHAR(500),
            github VARCHAR(500),
            instagram VARCHAR(500),
            facebook VARCHAR(500),
            whatsapp VARCHAR(500),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `)
        console.log('✅ sidebar table created successfully!')
        
        // Insert initial empty record
        try {
          await db.execute(`
            INSERT INTO sidebar (profile_image, name, email, phone, linkedin, github, instagram, facebook, whatsapp)
            VALUES ('', '', '', '', '', '', '', '', '')
          `)
          console.log('✅ Initial sidebar record created!')
        } catch (insertError) {
          // Record might already exist, that's okay
          console.log('ℹ️ Initial sidebar record already exists or error:', insertError.message)
        }
      } else {
        console.log('✅ sidebar table already exists')
      }
    } catch (error) {
      console.error('❌ Error setting up sidebar table:', error.message)
      console.error('   Please run the SQL file manually: backend/create_sidebar_table.sql')
    }
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message)
    console.error('⚠️ Make sure XAMPP MySQL is running')
  })

// Skills API Routes
// Upload skill image endpoint
app.post('/api/skills/upload', (req, res, next) => {
  console.log('📥 Skill upload request received')
  console.log('Content-Type:', req.headers['content-type'])
  uploadSkill.single('image')(req, res, (err) => {
    if (err) {
      console.error('❌ Multer error:', err)
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' })
        }
        return res.status(400).json({ error: 'File upload error', details: err.message })
      }
      return res.status(400).json({ error: err.message || 'File upload failed' })
    }
    
    try {
      if (!req.file) {
        console.error('❌ No file received in upload request')
        console.log('Request body:', req.body)
        console.log('Request files:', req.files)
        return res.status(400).json({ error: 'No file uploaded. Please select an image file.' })
      }
      
      // Return the URL that will be stored in database
      const imageUrl = `/uploads/skills/${req.file.filename}`
      console.log(`✅ Skill file uploaded successfully: ${req.file.filename}`)
      console.log(`📁 File saved to: ${req.file.path}`)
      res.json({ 
        success: true, 
        filename: req.file.filename,
        url: imageUrl,
        path: req.file.path
      })
    } catch (error) {
      console.error('❌ Error processing upload:', error)
      res.status(500).json({ error: 'Failed to upload file', details: error.message })
    }
  })
})

app.get('/api/skills', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, name, level, category, image FROM skills ORDER BY level DESC')
    
    // Ensure category and image fields are always present
    const skillsWithDefaults = rows.map(skill => {
      // Check if category exists and is not null/undefined/empty
      let categoryValue = skill.category
      
      // Handle null, undefined, or empty string
      if (!categoryValue || categoryValue === null || categoryValue === undefined || String(categoryValue).trim() === '') {
        categoryValue = 'Other'
      } else {
        categoryValue = String(categoryValue).trim()
      }
      
      return {
        id: skill.id,
        name: skill.name,
        level: skill.level,
        category: categoryValue,
        image: skill.image || ''
      }
    })
    
    console.log('📊 Fetched skills:', skillsWithDefaults.map(s => ({ name: s.name, category: s.category })))
    res.json(skillsWithDefaults)
  } catch (error) {
    console.error('Error fetching skills:', error)
    res.status(500).json({ error: 'Failed to fetch skills' })
  }
})

app.post('/api/skills', async (req, res) => {
  try {
    const { name, level, category, image } = req.body
    
    // Explicitly check and preserve the category value
    // Valid categories
    const validCategories = ['Frontend', 'Backend', 'Database', 'Deploy', 'Other']
    
    let skillCategory = 'Other'
    if (category !== null && category !== undefined && category !== '') {
      skillCategory = String(category).trim()
      // Only use 'Other' if the trimmed value is empty
      if (skillCategory === '') {
        skillCategory = 'Other'
      }
      // Validate category is one of the allowed values
      if (!validCategories.includes(skillCategory)) {
        console.warn(`⚠️ Invalid category "${skillCategory}", defaulting to "Other"`)
        skillCategory = 'Other'
      }
    }
    
    console.log('📝 Adding skill:', { name, level, category: skillCategory, image })
    console.log('📝 Raw request body:', req.body)
    console.log('📝 Category received:', category, 'Type:', typeof category, 'Processed:', skillCategory)
    
    // First verify the category column exists
    try {
      const [columns] = await db.execute(
        "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'skills' AND COLUMN_NAME = 'category'",
        [process.env.DB_NAME || 'mnishdb']
      )
      
      if (columns.length === 0) {
        console.log('⚠️ Category column does not exist! Adding it now...')
        await db.execute(`
          ALTER TABLE skills 
          ADD COLUMN category VARCHAR(50) DEFAULT 'Other',
          ADD COLUMN image VARCHAR(500) DEFAULT ''
        `)
        console.log('✅ Category column added!')
      }
    } catch (colError) {
      console.error('⚠️ Error checking category column:', colError.message)
    }
    
    console.log('💾 Attempting to insert:', { name, level, category: skillCategory, image: image || '' })
    
    const [result] = await db.execute(
      'INSERT INTO skills (name, level, category, image) VALUES (?, ?, ?, ?)',
      [name, level, skillCategory, image || '']
    )
    
    console.log('✅ Insert successful, ID:', result.insertId)
    
    // Verify what was actually saved - use fresh query
    const [saved] = await db.execute('SELECT id, name, level, category, image FROM skills WHERE id = ?', [result.insertId])
    const savedRow = saved[0]
    
    // Get the actual category from database
    let actualCategory = skillCategory
    if (savedRow.category) {
      actualCategory = String(savedRow.category).trim()
    } else if (!savedRow.category || savedRow.category === null || savedRow.category === '') {
      actualCategory = 'Other'
    }
    
    console.log('💾 Actually saved in DB:', {
      id: savedRow.id,
      name: savedRow.name,
      level: savedRow.level,
      category: savedRow.category,
      categoryType: typeof savedRow.category,
      categoryIsNull: savedRow.category === null,
      actualCategory: actualCategory,
      image: savedRow.image
    })
    
    // Return the skill with verified category from database
    const savedSkill = { 
      id: result.insertId, 
      name, 
      level, 
      category: actualCategory,
      image: image || '' 
    }
    console.log('✅ Skill saved and returning:', savedSkill)
    res.json(savedSkill)
  } catch (error) {
    console.error('❌ Error adding skill:', error)
    console.error('❌ Error code:', error.code)
    console.error('❌ Error message:', error.message)
    // If column doesn't exist, try without category and image
    if (error.code === 'ER_BAD_FIELD_ERROR') {
      console.log('⚠️ Category column not found, trying without category...')
      try {
        const { name, level } = req.body
        const [result] = await db.execute(
          'INSERT INTO skills (name, level) VALUES (?, ?)',
          [name, level]
        )
        res.json({ id: result.insertId, name, level, category: 'Other', image: '' })
      } catch (err) {
        res.status(500).json({ error: 'Failed to add skill' })
      }
    } else {
      res.status(500).json({ error: 'Failed to add skill', details: error.message })
    }
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

// Test endpoint to check database directly
app.get('/api/skills/debug', async (req, res) => {
  try {
    // Check if category column exists
    const [columns] = await db.execute(
      "SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'skills'",
      [process.env.DB_NAME || 'mnishdb']
    )
    
    // Get all skills with raw data
    const [rows] = await db.execute('SELECT id, name, level, category, image FROM skills ORDER BY id')
    
    res.json({
      columns: columns,
      skills: rows.map(r => ({
        id: r.id,
        name: r.name,
        level: r.level,
        category: r.category,
        categoryType: typeof r.category,
        categoryIsNull: r.category === null,
        categoryLength: r.category ? r.category.length : 0,
        image: r.image
      }))
    })
  } catch (error) {
    console.error('Error in debug endpoint:', error)
    res.status(500).json({ error: 'Failed to debug', details: error.message })
  }
})

// Update skill category endpoint
app.put('/api/skills/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, level, category, image } = req.body
    
    // Explicitly check and preserve the category value
    // Valid categories
    const validCategories = ['Frontend', 'Backend', 'Database', 'Deploy', 'Other']
    
    let skillCategory = 'Other'
    if (category !== null && category !== undefined && category !== '') {
      skillCategory = String(category).trim()
      // Only use 'Other' if the trimmed value is empty
      if (skillCategory === '') {
        skillCategory = 'Other'
      }
      // Validate category is one of the allowed values
      if (!validCategories.includes(skillCategory)) {
        console.warn(`⚠️ Invalid category "${skillCategory}", defaulting to "Other"`)
        skillCategory = 'Other'
      }
    }
    
    console.log(`📝 Updating skill ${id}:`, { name, level, category: skillCategory, image })
    console.log(`📝 Category received:`, category, 'Type:', typeof category, 'Processed:', skillCategory)
    
    await db.execute(
      'UPDATE skills SET name = ?, level = ?, category = ?, image = ? WHERE id = ?',
      [name, level, skillCategory, image || '', id]
    )
    
    // Verify what was actually saved
    const [updated] = await db.execute('SELECT * FROM skills WHERE id = ?', [id])
    console.log('💾 Actually updated in DB:', updated[0])
    console.log('💾 Category in DB:', updated[0].category)
    
    res.json({ id: parseInt(id), name, level, category: skillCategory, image: image || '' })
  } catch (error) {
    console.error('Error updating skill:', error)
    res.status(500).json({ error: 'Failed to update skill', details: error.message })
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
// Test endpoint to verify server is running
app.get('/api/projects/test', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    uploadsDir: projectsUploadsDir,
    uploadsDirExists: fs.existsSync(projectsUploadsDir)
  })
})

// Upload project image endpoint
app.post('/api/projects/upload', (req, res, next) => {
  console.log('📥 Upload request received')
  console.log('Content-Type:', req.headers['content-type'])
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('❌ Multer error:', err)
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' })
        }
        return res.status(400).json({ error: 'File upload error', details: err.message })
      }
      return res.status(400).json({ error: err.message || 'File upload failed' })
    }
    
    try {
      if (!req.file) {
        console.error('❌ No file received in upload request')
        console.log('Request body:', req.body)
        console.log('Request files:', req.files)
        return res.status(400).json({ error: 'No file uploaded. Please select an image file.' })
      }
      
      // Return the filename that will be stored in database
      const imageUrl = `/uploads/projects/${req.file.filename}`
      console.log(`✅ File uploaded successfully: ${req.file.filename}`)
      console.log(`📁 File saved to: ${req.file.path}`)
      res.json({ 
        success: true, 
        filename: req.file.filename,
        url: imageUrl,
        path: req.file.path
      })
    } catch (error) {
      console.error('❌ Error processing upload:', error)
      res.status(500).json({ error: 'Failed to upload file', details: error.message })
    }
  })
})


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
    const { title, description, tech, image, link, category } = req.body
    const techJson = Array.isArray(tech) ? JSON.stringify(tech) : tech
    const projectCategory = category || 'Personal Projects'
    const [result] = await db.execute(
      'INSERT INTO projects (title, description, tech, image, link, category) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, techJson, image, link, projectCategory]
    )
    res.json({ id: result.insertId, title, description, tech: Array.isArray(tech) ? tech : [], image, link, category: projectCategory })
  } catch (error) {
    console.error('Error adding project:', error)
    res.status(500).json({ error: 'Failed to add project' })
  }
})

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, tech, image, link, category } = req.body
    const techJson = Array.isArray(tech) ? JSON.stringify(tech) : tech
    const projectCategory = category || 'Personal Projects'
    
    await db.execute(
      'UPDATE projects SET title = ?, description = ?, tech = ?, image = ?, link = ?, category = ? WHERE id = ?',
      [title, description, techJson, image, link, projectCategory, id]
    )
    
    res.json({ id: parseInt(id), title, description, tech: Array.isArray(tech) ? tech : [], image, link, category: projectCategory })
  } catch (error) {
    console.error('Error updating project:', error)
    res.status(500).json({ error: 'Failed to update project' })
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

// Sidebar API Routes
app.get('/api/sidebar', async (req, res) => {
  let connection = null
  try {
    console.log('📤 GET /api/sidebar - Fetching sidebar data...')
    connection = await db.getConnection()
    
    // Get the first (and only) sidebar record
    const [rows] = await connection.execute(
      'SELECT * FROM sidebar ORDER BY id DESC LIMIT 1'
    )
    
    connection.release()
    console.log('📊 Found', rows.length, 'sidebar record(s)')
    
    if (rows.length === 0) {
      // Return empty data if no record exists
      console.log('⚠️ No sidebar record found, returning empty data')
      res.json({
        profile_image: '',
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        instagram: '',
        facebook: '',
        whatsapp: ''
      })
    } else {
      const sidebarData = rows[0]
      console.log('✅ Returning sidebar data:', {
        name: sidebarData.name,
        email: sidebarData.email,
        phone: sidebarData.phone
      })
      res.json({
        profile_image: sidebarData.profile_image || '',
        name: sidebarData.name || '',
        email: sidebarData.email || '',
        phone: sidebarData.phone || '',
        linkedin: sidebarData.linkedin || '',
        github: sidebarData.github || '',
        instagram: sidebarData.instagram || '',
        facebook: sidebarData.facebook || '',
        whatsapp: sidebarData.whatsapp || ''
      })
    }
  } catch (error) {
    if (connection) connection.release()
    console.error('❌ Error fetching sidebar:', error)
    if (error.code === 'ER_NO_SUCH_TABLE') {
      // Return empty data if table doesn't exist yet
      res.json({
        profile_image: '',
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        instagram: '',
        facebook: '',
        whatsapp: ''
      })
    } else {
      res.status(500).json({ error: 'Failed to fetch sidebar', details: error.message })
    }
  }
})

app.put('/api/sidebar', async (req, res) => {
  let connection = null
  try {
    console.log('📥 PUT /api/sidebar - Received data:', req.body)
    const { profile_image, name, email, phone, linkedin, github, instagram, facebook, whatsapp } = req.body
    
    connection = await db.getConnection()
    console.log('✅ Database connection acquired')
    
    // Check if sidebar record exists
    const [existing] = await connection.execute(
      'SELECT id FROM sidebar ORDER BY id DESC LIMIT 1'
    )
    console.log('📊 Existing records:', existing.length)
    
    if (existing.length === 0) {
      // Insert new record
      console.log('➕ Inserting new sidebar record...')
      const [result] = await connection.execute(
        'INSERT INTO sidebar (profile_image, name, email, phone, linkedin, github, instagram, facebook, whatsapp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          profile_image || '',
          name || '',
          email || '',
          phone || '',
          linkedin || '',
          github || '',
          instagram || '',
          facebook || '',
          whatsapp || ''
        ]
      )
      connection.release()
      console.log('✅ Sidebar record created with ID:', result.insertId)
      res.json({ success: true, message: 'Sidebar created successfully', id: result.insertId })
    } else {
      // Update existing record
      console.log('🔄 Updating existing sidebar record (ID:', existing[0].id, ')...')
      await connection.execute(
        'UPDATE sidebar SET profile_image = ?, name = ?, email = ?, phone = ?, linkedin = ?, github = ?, instagram = ?, facebook = ?, whatsapp = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [
          profile_image || '',
          name || '',
          email || '',
          phone || '',
          linkedin || '',
          github || '',
          instagram || '',
          facebook || '',
          whatsapp || '',
          existing[0].id
        ]
      )
      connection.release()
      console.log('✅ Sidebar record updated successfully')
      res.json({ success: true, message: 'Sidebar updated successfully', id: existing[0].id })
    }
  } catch (error) {
    if (connection) connection.release()
    console.error('❌ Error updating sidebar:', error)
    console.error('   Error code:', error.code)
    console.error('   Error message:', error.message)
    if (error.code === 'ER_NO_SUCH_TABLE') {
      res.status(500).json({ error: 'Database table not found. Please run create_sidebar_table.sql', details: error.message })
    } else {
      res.status(500).json({ error: 'Failed to update sidebar', details: error.message })
    }
  }
})

// About API Routes
app.get('/api/about', async (req, res) => {
  let connection = null
  try {
    // Get a connection from the pool
    connection = await db.getConnection()
    
    // Try to get specific columns
    const [rows] = await connection.execute(
      'SELECT id, sub_heading, introduction, resume, resume_filename, created_at, updated_at FROM about ORDER BY id DESC LIMIT 1'
    )
    
    // Release connection
    connection.release()
    
    if (rows.length === 0) {
      return res.json({
        sub_heading: '',
        introduction: '',
        resume: '',
        resume_filename: ''
      })
    }
    
    return res.json(rows[0])
  } catch (error) {
    // Release connection if we got one
    if (connection) {
      connection.release()
    }
    
    console.error('❌ Error fetching about:', error)
    console.error('   Error code:', error.code)
    console.error('   Error message:', error.message)
    
    // Always return 200 with empty data, never 500
    return res.json({
      sub_heading: '',
      introduction: '',
      resume: '',
      resume_filename: ''
    })
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
      const [existing] = await connection.execute('SELECT id FROM about ORDER BY id DESC LIMIT 1')
      
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
            sub_heading VARCHAR(500) DEFAULT NULL,
            introduction TEXT DEFAULT NULL,
            resume LONGTEXT DEFAULT NULL,
            resume_filename VARCHAR(255) DEFAULT NULL,
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

// Error handler for multer and other errors (must be after all routes)
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' })
    }
    return res.status(400).json({ error: 'File upload error', details: error.message })
  }
  if (error) {
    console.error('❌ Upload error:', error)
    return res.status(400).json({ error: error.message || 'File upload failed' })
  }
  next()
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📤 Upload endpoint: http://localhost:${PORT}/api/projects/upload`)
})

