# Portfolio Backend API

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Make sure XAMPP is running and MySQL is started

3. Import the database:
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create database `mnishdb` if not exists
   - Run `create_tables.sql` file to create all tables
   - Run `create_about_table.sql` if about table is not auto-created

4. Update `.env` file with your database credentials if needed:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mnishdb
```

5. Start the server:
```bash
npm start
```

The server will run on http://localhost:5000

## API Endpoints

### Skills
- GET `/api/skills` - Get all skills
- POST `/api/skills` - Add new skill
- DELETE `/api/skills/:id` - Delete skill

### Team
- GET `/api/team` - Get all team members
- POST `/api/team` - Add new team member
- DELETE `/api/team/:id` - Delete team member

### Projects
- GET `/api/projects` - Get all projects
- POST `/api/projects` - Add new project
- DELETE `/api/projects/:id` - Delete project

