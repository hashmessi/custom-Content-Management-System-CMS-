# 🚀 Deployment Guide - Antigravity CMS

Complete guide for deploying the Antigravity CMS to production.

## 📋 Prerequisites

Before deploying, ensure you have:

1. **MongoDB Atlas Account** (Free tier available)
   - Sign up at: https://cloud.mongodb.com
   
2. **Cloudinary Account** (Free tier available)
   - Sign up at: https://cloudinary.com
   
3. **Hosting Platform Account** (Choose one):
   - Vercel (Recommended for Frontend)
   - Railway (Recommended for Backend)
   - Render
   - DigitalOcean
   - AWS/GCP/Azure

---

## 🔐 Environment Variables Setup

### Backend (.env)

```bash
# Server Configuration
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/antigravity_cms?retryWrites=true&w=majority

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
FRONTEND_URL=https://yourdomain.com
```

### Frontend (.env.local)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api/v1
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Admin Authentication
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password-here
```

**⚠️ IMPORTANT:** Change the admin password in production!

---

## 🗄️ MongoDB Atlas Setup

### 1. Create Database Cluster

1. Go to https://cloud.mongodb.com
2. Create a new project: "Antigravity CMS"
3. Build a cluster (Free M0 tier is sufficient)
4. Choose a cloud provider and region (closest to your users)
5. Wait for cluster to deploy (~5 minutes)

### 2. Configure Network Access

1. Go to "Network Access" in sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your server's specific IP for better security

### 3. Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose Authentication Method: Password
4. Username: `cms_admin` (or your choice)
5. Password: Generate secure password
6. Database User Privileges: "Read and write to any database"

### 4. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your credentials
5. Add `/antigravity_cms` before the query parameters:
   ```
   mongodb+srv://cms_admin:password@cluster0.xxxxx.mongodb.net/antigravity_cms?retryWrites=true&w=majority
   ```

---

## 📸 Cloudinary Setup

### 1. Create Account

1. Sign up at https://cloudinary.com
2. Verify your email

### 2. Get Credentials

1. Go to Dashboard
2. Find your credentials:
   - Cloud name
   - API Key
   - API Secret
3. Copy these for your `.env` file

---

## 🛠️ Deployment Options

## Option 1: Vercel (Frontend) + Railway (Backend)

### Deploy Backend to Railway

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Deploy Backend**
   ```bash
   cd backend
   railway init
   railway up
   ```

4. **Add Environment Variables**
   ```bash
   railway variables
   # Add all backend environment variables from .env.example
   ```

5. **Get Backend URL**
   - Railway will provide a URL like: `https://your-app.railway.app`
   - Note this URL for frontend configuration

### Deploy Frontend to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_API_URL`: `https://your-railway-backend.railway.app/api/v1`
     - `NEXT_PUBLIC_SITE_URL`: Your Vercel URL
     - `NEXT_PUBLIC_ADMIN_PASSWORD`: Your secure password

4. **Redeploy**
   ```bash
   vercel --prod
   ```

---

## Option 2: Render (Full Stack)

### Deploy Backend

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo or upload code
4. Configure:
   - **Name**: `antigravity-cms-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

5. Add Environment Variables (from `.env.example`)

6. Click "Create Web Service"

7. Note the backend URL (e.g., `https://antigravity-cms-backend.onrender.com`)

### Deploy Frontend

1. Click "New +" → "Static Site"
2. Connect same repo
3. Configure:
   - **Name**: `antigravity-cms-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `.next`

4. Add Environment Variables:
   - Use backend URL from previous step

---

## Option 3: Traditional VPS (DigitalOcean, AWS EC2, etc.)

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx (Reverse Proxy)
sudo apt install nginx -y
```

### 2. Deploy Backend

```bash
# Clone your repo
git clone https://github.com/yourusername/antigravity-cms.git
cd antigravity-cms/backend

# Install dependencies
npm install --production

# Create .env file with production variables
nano .env

# Start with PM2
pm2 start src/server.js --name cms-backend
pm2 save
pm2 startup
```

### 3. Deploy Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local with production variables
nano .env.local

# Build
npm run build

# Start with PM2
pm2 start npm --name cms-frontend -- start
pm2 save
```

### 4. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/antigravity-cms
```

Add configuration:

```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/antigravity-cms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. SSL with Let's Encrypt (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

---

## ✅ Post-Deployment Checklist

### Backend Verification

- [ ] Backend is accessible at production URL
- [ ] Health check endpoint works: `GET /api/health`
- [ ] MongoDB connection successful (check logs)
- [ ] Cloudinary upload working

### Frontend Verification

- [ ] Homepage loads correctly
- [ ] Blog posts display
- [ ] Hero slider working
- [ ] Images loading from Cloudinary
- [ ] SEO metadata present (view page source)
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`

### Admin Panel Verification

- [ ] Admin login page accessible: `/admin/login`
- [ ] Login with password works
- [ ] Dashboard loads
- [ ] Can create/edit/delete hero slides
- [ ] Can create/edit/delete blog posts
- [ ] Image upload working
- [ ] Logout works

### Security Checks

- [ ] Admin password changed from default
- [ ] Environment variables not exposed in client
- [ ] HTTPS enabled (SSL certificate)
- [ ] CORS configured correctly
- [ ] MongoDB network access configured

---

## 🔧 Troubleshooting

### Backend Issues

**500 Error / Server not responding**
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check server logs: `pm2 logs cms-backend` or check platform logs

**CORS errors**
- Verify `FRONTEND_URL` in backend `.env` matches your frontend domain
- Check CORS configuration in `server.js`

**Image upload fails**
- Verify Cloudinary credentials
- Check file size limits
- Ensure `CLOUDINARY_*` variables are set

### Frontend Issues

**API calls failing**
- Verify `NEXT_PUBLIC_API_URL` points to correct backend
- Check backend is running and accessible
- Check browser console for detailed errors

**Build fails**
- Run `npm run build` locally to identify errors
- Check all environment variables are set
- Verify Node.js version is 18+

**Admin login not working**
- Verify `NEXT_PUBLIC_ADMIN_PASSWORD` is set
- Clear cookies and try again
- Check browser console for errors

---

## 📊 Monitoring & Maintenance

### Logs

**PM2 (VPS deployments):**
```bash
pm2 logs cms-backend
pm2 logs cms-frontend
```

**Platform logs:**
- Vercel: Dashboard → Your Project → Deployments → View Logs
- Railway: Dashboard → Your Service → Logs
- Render: Dashboard → Your Service → Logs

### Updates

```bash
# Pull latest changes
git pull origin main

# Backend
cd backend
npm install
pm2 restart cms-backend

# Frontend
cd frontend
npm install
npm run build
pm2 restart cms-frontend
```

---

## 🆘 Support

If you encounter issues:

1. Check this guide first
2. Review platform-specific documentation
3. Check server/application logs
4. Verify all environment variables
5. Test locally with production settings

---

## 📚 Additional Resources

- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Cloudinary**: https://cloudinary.com/documentation
- **Vercel**: https://vercel.com/docs
- **Railway**: https://docs.railway.app/
- **Render**: https://render.com/docs
- **PM2**: https://pm2.keymetrics.io/docs/usage/quick-start/
- **Nginx**: https://nginx.org/en/docs/

---

**🎉 Congratulations on deploying your CMS!**
