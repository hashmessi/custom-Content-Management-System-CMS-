# Step-by-Step Production Deployment Guide

## 🗄️ Step 1: MongoDB Atlas Setup (15 minutes)

### Create Account & Cluster

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com

2. **Sign up or Log in**

3. **Create New Project**:
   - Click "New Project"
   - Name: `Antigravity CMS Production`
   - Click "Create Project"

4. **Build Database**:
   - Click "Build a Database"
   - Choose **FREE** tier (M0 Sandbox)
   - Cloud Provider: **AWS** (or your preference)
   - Region: Choose closest to your users
   - Cluster Name: `antigravity-cms-prod`
   - Click "Create"

### Configure Security

5. **Network Access**:
   - Left sidebar → "Network Access"
   - Click "Add IP Address"
   - Option 1: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Option 2: Add specific IPs (Railway/Vercel IPs)
   - Click "Confirm"

6. **Database Access**:
   - Left sidebar → "Database Access"
   - Click "Add New Database User"
   - Authentication: **Password**
   - Username: `cms_admin`
   - Password: Click "Autogenerate Secure Password" → **SAVE THIS PASSWORD**
   - Database User Privileges: **Read and write to any database**
   - Click "Add User"

### Get Connection String

7. **Connect to Cluster**:
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: **Node.js**
   - Version: **5.5 or later**
   - Copy the connection string:
   ```
   mongodb+srv://cms_admin:<password>@antigravity-cms-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

8. **Update Connection String**:
   - Replace `<password>` with your actual password
   - Add `/antigravity_cms` before the `?`:
   ```
   mongodb+srv://cms_admin:YOUR_PASSWORD@antigravity-cms-prod.xxxxx.mongodb.net/antigravity_cms?retryWrites=true&w=majority
   ```
   - **SAVE THIS** - you'll need it for backend deployment

---

## 📸 Step 2: Cloudinary Setup (5 minutes)

1. **Go to Cloudinary**: https://cloudinary.com

2. **Sign up or Log in**

3. **Get Your Credentials**:
   - Dashboard → Account Details
   - Copy:
     - **Cloud Name**: `dxxxxx`
     - **API Key**: `123456789012345`
     - **API Secret**: Click "Reveal" → Copy

4. **Save these credentials** - needed for backend deployment

---

## 🚂 Step 3: Deploy Backend to Railway (20 minutes)

### Setup Railway

1. **Go to Railway**: https://railway.app

2. **Sign up with GitHub** (recommended for easy deployments)

3. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

4. **Login via CLI**:
   ```bash
   railway login
   ```
   - Browser opens → Authorize

### Deploy Backend

5. **Navigate to backend**:
   ```bash
   cd e:\CMS full stack\antigravity-cms\backend
   ```

6. **Initialize Railway project**:
   ```bash
   railway init
   ```
   - Name: `antigravity-cms-backend`
   - Confirm

7. **Add Environment Variables**:
   ```bash
   railway variables set NODE_ENV=production
   railway variables set PORT=5000
   railway variables set MONGODB_URI="your-mongodb-connection-string"
   railway variables set CLOUDINARY_CLOUD_NAME="your-cloud-name"
   railway variables set CLOUDINARY_API_KEY="your-api-key"
   railway variables set CLOUDINARY_API_SECRET="your-api-secret"
   railway variables set FRONTEND_URL="https://your-domain.com"
   ```

   Replace with your actual values from Steps 1 & 2.

8. **Deploy**:
   ```bash
   railway up
   ```

9. **Get your backend URL**:
   ```bash
   railway domain
   ```
   - Creates a domain like: `https://antigravity-cms-backend.up.railway.app`
   - **SAVE THIS URL** - needed for frontend

10. **Test Backend**:
    - Open: `https://your-backend.railway.app/api/health`
    - Should see: `{"status":"OK","message":"Server is running"}`

---

## ▲ Step 4: Deploy Frontend to Vercel (15 minutes)

### Setup Vercel

1. **Go to Vercel**: https://vercel.com

2. **Sign up with GitHub**

3. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

4. **Login**:
   ```bash
   vercel login
   ```
   - Enter your email
   - Check email → Click verify link

### Deploy Frontend

5. **Navigate to frontend**:
   ```bash
   cd e:\CMS full stack\antigravity-cms\frontend
   ```

6. **Deploy (first time)**:
   ```bash
   vercel
   ```
   - Set up and deploy: **Y**
   - Scope: Choose your account
   - Link to existing project: **N**
   - Project name: `antigravity-cms-frontend`
   - Directory: `./` (current directory)
   - Override settings: **N**

7. **Add Environment Variables** (via Vercel Dashboard):
   - Go to https://vercel.com/dashboard
   - Click your project → Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_API_URL` = `https://your-railway-backend.railway.app/api/v1`
     - `NEXT_PUBLIC_SITE_URL` = `https://your-frontend.vercel.app`
     - `NEXT_PUBLIC_ADMIN_PASSWORD` = `your-secure-password` (change from default!)

8. **Redeploy with environment variables**:
   ```bash
   vercel --prod
   ```

9. **Get your frontend URL**:
   - Shown after deployment
   - Example: `https://antigravity-cms-frontend.vercel.app`

10. **Update Backend CORS**:
    - Go back to Railway dashboard
    - Update `FRONTEND_URL` variable to your Vercel URL
    - Redeploy backend:
    ```bash
    cd ../backend
    railway up
    ```

### Test Deployment

11. **Test Public Pages**:
    - Homepage: `https://your-frontend.vercel.app`
    - Blog: `https://your-frontend.vercel.app/blog`
    - Services: `https://your-frontend.vercel.app/services`

12. **Test Admin**:
    - Login: `https://your-frontend.vercel.app/admin/login`
    - Enter your admin password
    - Should redirect to dashboard

---

## 🌐 Step 5: Custom Domain & SSL (30 minutes)

### Option A: Using Existing Domain

1. **Add Domain to Vercel**:
   - Vercel Dashboard → Your Project → Settings → Domains
   - Enter your domain: `yourdomain.com`
   - Click "Add"

2. **Configure DNS** (at your domain registrar):
   
   **For Root Domain** (yourdomain.com):
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (Vercel IP)

   **For WWW**:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

3. **Wait for DNS propagation** (5-48 hours, usually ~1 hour)

4. **SSL Certificate**:
   - Vercel automatically provisions SSL via Let's Encrypt
   - No action needed!

### Option B: Using Vercel Free Domain

- Your app is already on HTTPS: `https://your-frontend.vercel.app`
- SSL already configured by Vercel
- Skip custom domain setup

---

##  CDN Configuration (Automatic)

### Cloudinary CDN
- ✅ Already configured
- Images automatically served via Cloudinary CDN
- No action needed

### Vercel Edge Network
- ✅ Automatically enabled
- Global CDN for your frontend
- ~100+ locations worldwide
- No configuration needed

---

## 🧪 Step 7: Final Production Testing

### Test All Features

1. **Public Pages**:
   - [ ] Homepage loads with hero slider
   - [ ] Blog index loads posts
   - [ ] Individual blog posts load
   - [ ] Services, Industries, About, Contact pages work
   - [ ] Images load from Cloudinary

2. **Admin Panel**:
   - [ ] Navigate to `/admin` redirects to `/admin/login`
   - [ ] Login with admin password works
   - [ ] Dashboard displays
   - [ ] **Heroes**:
     - [ ] View heroes list
     - [ ] Create new hero slide
     - [ ] Upload image (tests Cloudinary)
     - [ ] Edit hero slide
     - [ ] Toggle active/inactive
     - [ ] Delete hero slide
   - [ ] **Blogs**:
     - [ ] View blogs list
     - [ ] Create new blog post
     - [ ] Upload featured image
     - [ ] Edit blog post
     - [ ] Publish/Draft status
     - [ ] Delete blog post
   - [ ] Logout works

3. **SEO & Performance**:
   - [ ] View page source - meta tags present
   - [ ] Sitemap: `https://yourdomain.com/sitemap.xml`
   - [ ] Robots.txt: `https://yourdomain.com/robots.txt`
   - [ ] Run Lighthouse audit (90+ score expected)
   - [ ] Test on mobile devices

4. **Security**:
   - [ ] HTTPS working (green padlock)
   - [ ] Admin routes protected
   - [ ] Can't access `/admin` routes without login

---

## 📋 Post-Deployment Checklist

- [ ] Change admin password from default
- [ ] Verify all environment variables are correct
- [ ] Test image uploads
- [ ] Create first production blog post
- [ ] Test email notifications (if implemented)
- [ ] Set up monitoring (optional: UptimeRobot, Better Uptime)
- [ ] Set up backups (MongoDB Atlas automatic backups)
- [ ] Document production URLs in README
- [ ] Share with stakeholders

---

## 🎉 You're Live!

Your CMS is now deployed and running in production!

**URLs to save**:
- Frontend: `https://your-domain.com`
- Admin: `https://your-domain.com/admin`
- Backend API: `https://your-backend.railway.app/api/v1`

**Next Steps**:
- Create content in admin panel
- Share with team
- Monitor performance
- Gather user feedback
