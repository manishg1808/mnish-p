
# Portfolio – React + Tailwind + Node.js Backend

A full-stack portfolio application with React frontend and Node.js/Express backend with MySQL database.

## Setup Instructions

### Backend Setup
1. Navigate to backend folder:
```bash
cd backend
npm install
```

2. Make sure XAMPP is running and MySQL is started

3. Create database and tables:
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create database `mnishdb` if not exists
   - Run `create_tables.sql` to create all tables
   - Run `create_about_table.sql` if needed

4. Create `.env` file in backend folder:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mnishdb
```

5. Start backend server:
```bash
npm start
```

### Frontend Setup
1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open the URL from the terminal (usually http://localhost:5173)

## Features
- React Router pages (Home, Projects, Skills, Contact, Admin)
- Tailwind CSS styling with dark/light mode
- Node.js/Express backend API
- MySQL database for data storage
- Admin panel for managing content
- Image upload functionality
- Responsive design
