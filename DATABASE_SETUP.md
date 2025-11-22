# Database Setup Guide (XAMPP MySQL)

## Step 1: Start XAMPP
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services

## Step 2: Create Database in phpMyAdmin
1. Open browser and go to: http://localhost/phpmyadmin
2. Click on **"SQL"** tab
3. Run this command first:
```sql
CREATE DATABASE IF NOT EXISTS mnishdb;
```

## Step 3: Import Tables
1. Select **mnishdb** database from left sidebar
2. Click on **"SQL"** tab again
3. Copy and paste the SQL from **backend/setup.sql** file
4. Click **"Go"** button

OR

1. Select **mnishdb** database from left sidebar
2. Click on **"Import"** tab
3. Choose **backend/setup.sql** file
4. Click **"Go"** button

## Step 4: Verify Tables
After import, you should see 3 tables:
- ✅ **skills** - for storing skills data
- ✅ **team** - for storing team members
- ✅ **projects** - for storing projects

## Step 5: Start Backend Server
```bash
cd backend
npm start
```

Server will run on http://localhost:5000

## Troubleshooting
- If MySQL connection fails, check:
  - XAMPP MySQL is running
  - Database name is exactly "mnishdb"
  - Username: "root"
  - Password: "" (empty)

