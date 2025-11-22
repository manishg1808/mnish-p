# Portfolio Application - Startup Guide

## Quick Start (Easiest Method)

### Option 1: Use Batch Files (Recommended)
1. **Double-click `start-all.bat`** - This will start both servers automatically
   - Backend will open in one window
   - Frontend will open in another window
   - Wait for both to finish loading

2. **Open browser** and go to: `http://localhost:5173`

### Option 2: Manual Start

#### Step 1: Start Backend Server
1. Open a terminal/command prompt
2. Navigate to backend folder:
   ```
   cd backend
   ```
3. Install dependencies (if not done):
   ```
   npm install
   ```
4. Start server:
   ```
   npm start
   ```
5. You should see: `🚀 Server running on http://localhost:5000`

#### Step 2: Start Frontend Server
1. Open a **NEW** terminal/command prompt
2. Navigate to project root:
   ```
   cd "d:\complete project\portfolio-react-tailwind"
   ```
3. Install dependencies (if not done):
   ```
   npm install
   ```
4. Start dev server:
   ```
   npm run dev
   ```
5. You should see: `Local: http://localhost:5173/`

#### Step 3: Open in Browser
- Go to: `http://localhost:5173`
- For admin panel: `http://localhost:5173/mnish`

## Important Prerequisites

### 1. Database Setup (Required for Backend)
- Make sure **XAMPP is running** and **MySQL is started**
- Open phpMyAdmin: http://localhost/phpmyadmin
- Create database named: `mnishdb`
- Import SQL files:
  - `backend/create_tables.sql`
  - `backend/create_home_banner_table.sql`

### 2. Node.js Installed
- Make sure Node.js is installed on your system
- Check by running: `node --version`

### 3. Dependencies Installed
- Frontend: Run `npm install` in project root
- Backend: Run `npm install` in backend folder

## Troubleshooting

### Error: "Cannot find module"
**Solution:** Run `npm install` in the respective folder

### Error: "Port already in use"
**Solution:** 
- Close other applications using ports 5000 or 5173
- Or change ports in configuration files

### Error: "Database connection error"
**Solution:**
- Make sure XAMPP MySQL is running
- Check database name is `mnishdb`
- Verify `.env` file in backend folder has correct credentials

### Frontend works but API calls fail
**Solution:**
- Make sure backend server is running on port 5000
- Check browser console for specific error messages

## File Structure
```
portfolio-react-tailwind/
├── start-all.bat          ← Double-click to start both servers
├── start-frontend.bat     ← Start only frontend
├── start-backend.bat      ← Start only backend
├── backend/
│   ├── .env              ← Database configuration
│   ├── server.js         ← Backend server
│   └── create_tables.sql ← Database setup
└── src/                  ← Frontend React code
```

## Need Help?
- Check terminal/command prompt for error messages
- Make sure both servers are running
- Verify database is set up correctly

