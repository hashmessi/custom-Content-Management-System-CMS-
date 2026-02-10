# MongoDB Atlas Connection - Step-by-Step Guide

## 📍 Step 1: Sign Up & Create Cluster

### 1.1 Go to MongoDB Atlas
- Open: https://www.mongodb.com/cloud/atlas/register
- Sign up with Google or Email (FREE)

### 1.2 Create FREE Cluster
- Click **"Create"** or **"Build a Database"**
- Select **M0 FREE** tier
- Choose **Cloud Provider**: AWS
- Choose **Region**: Closest to you
- Cluster Name: `antigravity-cms`
- Click **"Create Deployment"**

---

## 📍 Step 2: Create Database User

### 2.1 Navigate to Database Access
- Left sidebar → **Security** → **Database Access**
- Click **"+ ADD NEW DATABASE USER"**

### 2.2 Fill User Details
```
Authentication Method: Password

Username: cms_admin
Password: [Click "Autogenerate Secure Password" OR create your own]
         Example: MySecurePass123!

⚠️ IMPORTANT: SAVE THIS PASSWORD - you'll need it!
```

### 2.3 Set User Privileges
- Select: **"Built-in Role"**
- Choose: **"Read and write to any database"**
- Click **"Add User"**

---

## 📍 Step 3: Whitelist IP Address

### 3.1 Navigate to Network Access
- Left sidebar → **Security** → **Network Access**
- Click **"+ ADD IP ADDRESS"**

### 3.2 Allow Access
- Click **"ALLOW ACCESS FROM ANYWHERE"**
- This adds: `0.0.0.0/0`
- Click **"Confirm"**

⚠️ **For Development Only!** In production, restrict to specific IPs.

---

## 📍 Step 4: Get Connection String

### 4.1 Navigate to Database
- Left sidebar → **Deployment** → **Database**
- Click **"Connect"** button on your cluster

### 4.2 Choose Connection Method
- Select **"Drivers"**
- Driver: **Node.js**
- Version: **5.5 or later**

### 4.3 Copy Connection String
You'll see something like this:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## 📍 Step 5: Build Your Connection String

### 5.1 Example Connection String
Let's say you created:
- **Username**: `cms_admin`
- **Password**: `MySecurePass123!`
- **Cluster**: `cluster0.abc12.mongodb.net`

### 5.2 Replace Placeholders
**Original:**
```
mongodb+srv://<username>:<password>@cluster0.abc12.mongodb.net/?retryWrites=true&w=majority
```

**Replace `<username>`:**
```
mongodb+srv://cms_admin:<password>@cluster0.abc12.mongodb.net/?retryWrites=true&w=majority
```

**Replace `<password>`:**
```
mongodb+srv://cms_admin:MySecurePass123!@cluster0.abc12.mongodb.net/?retryWrites=true&w=majority
```

**Add Database Name (after `.net/`):**
```
mongodb+srv://cms_admin:MySecurePass123!@cluster0.abc12.mongodb.net/antigravity_cms?retryWrites=true&w=majority
```

✅ **This is your final connection string!**

---

## 📍 Step 6: Update Backend .env File

### 6.1 Open File
Open: `backend/.env`

### 6.2 Find This Line
```env
MONGODB_URI=mongodb://localhost:27017/antigravity_cms
```

### 6.3 Replace With Your Connection String
**BEFORE:**
```env
MONGODB_URI=mongodb://localhost:27017/antigravity_cms
```

**AFTER:** (using the example from Step 5.2)
```env
MONGODB_URI=mongodb+srv://cms_admin:MySecurePass123!@cluster0.abc12.mongodb.net/antigravity_cms?retryWrites=true&w=majority
```

### 6.4 Save the File
- Press `Ctrl + S` to save

---

## 📍 Step 7: Restart Backend Server

The backend server will **automatically restart** (nodemon is watching for changes).

Look for this in the terminal:
```
╔═══════════════════════════════════════════════╗
║     🚀 Antigravity CMS Backend Server         ║
╠═══════════════════════════════════════════════╣
║  Mode:     development                        ║
║  Port:     5000                               ║
║  API:      http://localhost:5000/api/v1       ║
║  Health:   http://localhost:5000/api/health   ║
╚═══════════════════════════════════════════════╝

✅ MongoDB Connected Successfully!
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: Password Contains Special Characters
If your password has `@`, `#`, `%`, etc., you need to URL encode them:

**Examples:**
- `MyPass@123` → `MyPass%40123`
- `Pass#Word!` → `Pass%23Word%21`

**Tool**: Use https://www.urlencoder.org/

### Issue 2: "Authentication Failed"
- Double-check username and password
- Ensure database user was created correctly
- Password is case-sensitive!

### Issue 3: "IP Not Whitelisted"
- Go to Network Access
- Verify `0.0.0.0/0` is in the list
- Wait 2-3 minutes for changes to propagate

### Issue 4: "Database Name Missing"
Make sure you added `/antigravity_cms` after `.mongodb.net/`

---

## ✅ Complete Example

**Your Setup:**
```
Username: cms_admin
Password: SecurePass789!
Cluster: cluster0.xyz34.mongodb.net
```

**Final .env file:**
```env
# Server
NODE_ENV=development
PORT=5000

# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://cms_admin:SecurePass789!@cluster0.xyz34.mongodb.net/antigravity_cms?retryWrites=true&w=majority

# Cloudinary (Media Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

---

## 🎯 Quick Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created FREE M0 cluster
- [ ] Created database user (saved username & password)
- [ ] Whitelisted IP address (0.0.0.0/0)
- [ ] Got connection string from Atlas
- [ ] Replaced `<username>` and `<password>`
- [ ] Added `/antigravity_cms` database name
- [ ] Updated `backend/.env` file
- [ ] Saved the file
- [ ] Backend server restarted successfully
- [ ] Saw "MongoDB Connected Successfully" message

---

**Once you see the success message, you're ready to start the frontend! 🚀**
