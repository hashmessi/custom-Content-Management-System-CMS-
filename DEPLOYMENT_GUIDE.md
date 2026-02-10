# Deployment Guide - Vercel (Frontend) + Render (Backend)

This guide will walk you through deploying the Antigravity CMS to production using Vercel for the frontend and Render for the backend.

## 📋 Prerequisites

Before starting, ensure you have:
- [x] GitHub account with the repository pushed
- [x] Vercel account (sign up at https://vercel.com)
- [x] Render account (sign up at https://render.com)
- [x] MongoDB Atlas account (sign up at https://www.mongodb.com/cloud/atlas)
- [x] Cloudinary account (sign up at https://cloudinary.com)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

### 1.1 Create a Cluster

1. Go to https://cloud.mongodb.com
2. Click **"Build a Database"**
3. Choose **FREE** tier (M0 Sandbox)
4. Select a cloud provider and region (choose closest to your users)
5. Click **"Create Cluster"**

### 1.2 Create Database User

1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `admin` (or your choice)
5. Password: Generate a secure password (save it!)
6. User Privileges: **"Atlas admin"** or **"Read and write to any database"**
7. Click **"Add User"**

### 1.3 Whitelist IP Addresses

1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, restrict to specific IPs
4. Click **"Confirm"**

### 1.4 Get Connection String

1. Go to **"Database"** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `antigravity-cms`
   ```
   mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/antigravity-cms?retryWrites=true&w=majority
   ```

**Save this connection string - you'll need it later!**

---

## 📸 Step 2: Set Up Cloudinary (Image Storage)

### 2.1 Get Cloudinary Credentials

1. Go to https://cloudinary.com/console
2. Sign up or log in
3. On the dashboard, you'll see:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
4. Copy these values - you'll need them later!

---

## 🖥️ Step 3: Deploy Backend to Render

### 3.1 Create Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository: `custom-Content-Management-System-CMS-`
5. Click **"Connect"**

### 3.2 Configure Service

**Basic Settings:**
- **Name:** `antigravity-cms-backend` (or your choice)
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Choose **"Free"** (for testing) or **"Starter"** (for production)

### 3.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add the following variables:

| Key | Value | Example |
|-----|-------|---------|
| `PORT` | `5000` | `5000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://admin:pass@cluster0.xxxxx.mongodb.net/antigravity-cms` |
| `FRONTEND_URL` | Your Vercel frontend URL (add later) | `https://your-app.vercel.app` |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary dashboard | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | From Cloudinary dashboard | `123456789012345` |
| `CLOUDINARY_API_SECRET` | From Cloudinary dashboard | `abcdefghijklmnopqrstuvwxyz` |
| `NODE_ENV` | `production` | `production` |

**Note:** You'll update `FRONTEND_URL` after deploying the frontend.

### 3.4 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll see a URL like: `https://antigravity-cms-backend.onrender.com`
4. **Save this URL - you'll need it for the frontend!**

### 3.5 Verify Backend Deployment

1. Visit: `https://your-backend-url.onrender.com/api/health`
2. You should see: `{"status":"OK","timestamp":"..."}`
3. If you see this, your backend is live! ✅

---

## 🌐 Step 4: Deploy Frontend to Vercel

### 4.1 Import Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `custom-Content-Management-System-CMS-`
4. Click **"Import"**

### 4.2 Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `frontend`
- Click **"Edit"**
- Enter: `frontend`
- Click **"Continue"**

**Build Settings:**
- Build Command: `npm run build` (auto-filled)
- Output Directory: `.next` (auto-filled)
- Install Command: `npm install` (auto-filled)

### 4.3 Add Environment Variables

Click **"Environment Variables"**

Add the following:

| Name | Value | Example |
|------|-------|---------|
| `NEXT_PUBLIC_API_URL` | Your Render backend URL + `/api/v1` | `https://antigravity-cms-backend.onrender.com/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | Will be your Vercel URL (add after deployment) | `https://your-app.vercel.app` |

**Note:** You'll update `NEXT_PUBLIC_SITE_URL` after deployment.

### 4.4 Deploy

1. Click **"Deploy"**
2. Wait for build and deployment (3-5 minutes)
3. Once deployed, you'll see a URL like: `https://your-app.vercel.app`
4. **Save this URL!**

### 4.5 Update Environment Variables

Now that you have both URLs, update the environment variables:

**On Render (Backend):**
1. Go to your backend service
2. Click **"Environment"**
3. Update `FRONTEND_URL` to your Vercel URL: `https://your-app.vercel.app`
4. Click **"Save Changes"**
5. Service will auto-redeploy

**On Vercel (Frontend):**
1. Go to your project → **"Settings"** → **"Environment Variables"**
2. Update `NEXT_PUBLIC_SITE_URL` to your Vercel URL: `https://your-app.vercel.app`
3. Click **"Save"**
4. Go to **"Deployments"** → Click **"..."** on latest → **"Redeploy"**

---

## ✅ Step 5: Verify Deployment

### 5.1 Test Frontend

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. You should see the landing page with hero slider
3. Navigate to `/blog` - should show blog listing
4. Check that images load correctly

### 5.2 Test Admin Panel

1. Visit: `https://your-app.vercel.app/admin`
2. You should see the admin dashboard
3. Try creating a hero slide:
   - Go to **"Hero Slides"** → **"Create Slide"**
   - Fill in the form
   - Upload an image
   - Click **"Create Slide"**
4. Verify the slide appears on the homepage

### 5.3 Test Blog Creation

1. In admin panel, go to **"Blog Posts"** → **"Create Post"**
2. Fill in the form with test content
3. Set status to **"Published"**
4. Click **"Create Post"**
5. Visit `/blog` on the frontend
6. Your new post should appear!

---

## 🔧 Step 6: Post-Deployment Configuration

### 6.1 Custom Domain (Optional)

**For Vercel (Frontend):**
1. Go to project → **"Settings"** → **"Domains"**
2. Click **"Add"**
3. Enter your domain (e.g., `mysite.com`)
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_SITE_URL` to your custom domain

**For Render (Backend):**
1. Go to service → **"Settings"** → **"Custom Domain"**
2. Add your API subdomain (e.g., `api.mysite.com`)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_API_URL` on Vercel

### 6.2 Enable HTTPS

Both Vercel and Render automatically provide SSL certificates. No action needed! ✅

### 6.3 Set Up Monitoring

**Render:**
1. Go to your service → **"Metrics"**
2. Monitor CPU, Memory, and Response times

**Vercel:**
1. Go to project → **"Analytics"**
2. Monitor page views and performance

---

## 🚨 Troubleshooting

### Frontend Issues

**Problem:** "Failed to fetch" errors
- **Solution:** Check `NEXT_PUBLIC_API_URL` is correct and includes `/api/v1`
- **Solution:** Verify backend is running on Render

**Problem:** Images not loading
- **Solution:** Check Cloudinary credentials in backend
- **Solution:** Verify CORS settings allow your Vercel domain

**Problem:** 404 on blog posts
- **Solution:** Check MongoDB connection
- **Solution:** Verify blog posts are published (status: "published")

### Backend Issues

**Problem:** "Cannot connect to MongoDB"
- **Solution:** Check `MONGODB_URI` is correct
- **Solution:** Verify IP whitelist includes 0.0.0.0/0 on MongoDB Atlas

**Problem:** "Cloudinary upload failed"
- **Solution:** Verify Cloudinary credentials
- **Solution:** Check Cloudinary account is active

**Problem:** CORS errors
- **Solution:** Update `FRONTEND_URL` to match your Vercel domain exactly
- **Solution:** Ensure no trailing slash in URLs

### General Issues

**Problem:** Slow first request (Render Free tier)
- **Cause:** Free tier services sleep after 15 minutes of inactivity
- **Solution:** Upgrade to paid tier or accept cold starts

**Problem:** Build failures
- **Solution:** Check build logs in Vercel/Render dashboard
- **Solution:** Verify all dependencies are in package.json
- **Solution:** Ensure Node.js version compatibility

---

## 📊 Performance Optimization

### Enable Caching

**Vercel:**
- Automatic edge caching enabled
- Configure in `next.config.mjs` if needed

**Render:**
- Add Redis for API caching (optional, paid feature)

### Database Indexing

Ensure MongoDB indexes are created:
```javascript
// Already configured in models
BlogPost: { slug: unique, status + publishedAt: compound }
HeroSlide: { isActive + displayOrder: compound }
```

### Image Optimization

- Cloudinary automatically optimizes images
- Next.js Image component handles responsive images
- Consider enabling Cloudinary auto-format and auto-quality

---

## 🔐 Security Checklist

- [x] MongoDB IP whitelist configured
- [x] Environment variables set (not hardcoded)
- [x] HTTPS enabled (automatic on Vercel/Render)
- [x] CORS configured correctly
- [ ] **TODO:** Add authentication to admin panel
- [ ] **TODO:** Set up rate limiting
- [ ] **TODO:** Enable MongoDB backup

---

## 💰 Cost Estimate

**Free Tier (Testing):**
- MongoDB Atlas: Free (M0 Sandbox, 512MB)
- Cloudinary: Free (25 credits/month)
- Render: Free (750 hours/month, sleeps after inactivity)
- Vercel: Free (100GB bandwidth, unlimited deployments)
- **Total: $0/month**

**Production Tier:**
- MongoDB Atlas: $9/month (M10 Shared, 10GB)
- Cloudinary: $0-99/month (based on usage)
- Render: $7/month (Starter, always on)
- Vercel: $20/month (Pro, analytics, custom domains)
- **Total: ~$36-135/month**

---

## 📝 Deployment URLs

After deployment, save these URLs:

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `https://your-app.vercel.app` | Public website |
| Backend API | `https://your-backend.onrender.com/api/v1` | API endpoints |
| Admin Panel | `https://your-app.vercel.app/admin` | Content management |
| MongoDB | `mongodb+srv://...` | Database |

---

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:

**How it works:**
1. Push code to GitHub `main` branch
2. Vercel automatically rebuilds frontend
3. Render automatically rebuilds backend
4. Changes go live in 3-5 minutes

**To disable auto-deploy:**
- Vercel: Project Settings → Git → Disable "Production Branch"
- Render: Service Settings → Build & Deploy → Manual Deploy

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com
- **Cloudinary Docs:** https://cloudinary.com/documentation
- **Next.js Docs:** https://nextjs.org/docs

---

## ✅ Deployment Checklist

Use this checklist to ensure everything is deployed correctly:

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Cloudinary account set up
- [ ] All credentials saved securely

### Backend (Render)
- [ ] Web service created
- [ ] Root directory set to `backend`
- [ ] Environment variables configured
- [ ] Service deployed successfully
- [ ] Health check endpoint working
- [ ] Backend URL saved

### Frontend (Vercel)
- [ ] Project imported
- [ ] Root directory set to `frontend`
- [ ] Environment variables configured
- [ ] Project deployed successfully
- [ ] Frontend URL saved
- [ ] Environment variables updated with final URLs

### Verification
- [ ] Homepage loads correctly
- [ ] Hero slider displays
- [ ] Blog listing works
- [ ] Individual blog posts load
- [ ] Admin panel accessible
- [ ] Can create hero slides
- [ ] Can create blog posts
- [ ] Images upload successfully
- [ ] SEO meta tags present (check page source)
- [ ] Sitemap accessible at `/sitemap.xml`

### Post-Deployment
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS working
- [ ] Monitoring set up
- [ ] Backup strategy planned
- [ ] Team members granted access

---

## 🎉 Congratulations!

Your Antigravity CMS is now live in production! 

**Next Steps:**
1. Share your live URL with stakeholders
2. Create initial content (hero slides, blog posts)
3. Monitor performance and errors
4. Plan for authentication implementation
5. Set up regular backups

**Your Live URLs:**
- **Website:** `https://your-app.vercel.app`
- **Admin:** `https://your-app.vercel.app/admin`
- **API:** `https://your-backend.onrender.com/api/v1`

---

**Need help?** Check the troubleshooting section or refer to the official documentation links above.
