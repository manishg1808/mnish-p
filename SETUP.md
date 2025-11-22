# Portfolio Setup Guide

## Backend Setup (Node.js + MySQL)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup Database in XAMPP
1. Start XAMPP and make sure MySQL is running
2. Open phpMyAdmin: http://localhost/phpmyadmin
3. Create database named `mnishdb` (or it should already exist)
4. Import `backend/database.sql` or run the SQL commands manually in phpMyAdmin

### Step 3: Start Backend Server
```bash
cd backend
npm start
```

Backend server will run on http://localhost:5000

## Frontend Setup (React + Vite)

### Step 1: Install Frontend Dependencies (if not already done)
```bash
npm install
```

### Step 2: Start Frontend Development Server
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Access Points

- **Portfolio Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/mnish
- **Backend API**: http://localhost:5000

## Admin Panel Features

Visit `/mnish` to access the admin panel with black & yellow theme:
- **Skills Tab**: Add/Delete skills
- **Team Tab**: Add/Delete team members
- **Projects Tab**: Add/Delete projects

All changes will reflect immediately on the main website!

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MySQL
- **Database**: MySQL (via XAMPP)

