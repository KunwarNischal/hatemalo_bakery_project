# HateMalo Bakery - Vercel Deployment Guide

This guide will help you deploy the HateMalo Bakery full-stack application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free at vercel.com)
- MongoDB Atlas account (for database)
- Node.js installed locally

---

## Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new cluster

2. **Create Database Credentials**
   - Go to "Database Access" → Create new user
   - Remember the username and password
   - Go to "Network Access" → Add current IP (or 0.0.0.0 for all IPs)

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (URI)
   - Replace `<password>` with your database user password
   - The URI should look like: `mongodb+srv://username:password@cluster.mongodb.net/hatemalo_bakery?retryWrites=true&w=majority`

---

## Step 2: Prepare GitHub Repository

### Option A: If you have Git set up locally

```bash
# Navigate to project root
cd hatemalo_bakery - final

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: HateMalo Bakery full-stack application"

# Create repository on GitHub
# Then add remote and push
git remote add origin https://github.com/YOUR_USERNAME/hatemalo_bakery.git
git branch -M main
git push -u origin main
```

### Option B: Using GitHub Desktop
1. Create new repository on GitHub (hatemalo_bakery)
2. Clone it to your computer
3. Copy all project files into the cloned folder
4. Commit and push

---

## Step 3: Deploy Backend (Server) to Vercel

1. **Go to [vercel.com](https://vercel.com) and sign in**

2. **Import Project**
   - Click "Import Project" or "Add New"
   - Select "Import Git Repository"
   - Paste your GitHub repository URL
   - Click Import

3. **Select Server as Root Directory**
   - In "Root Directory", select `server`
   - This tells Vercel to deploy the backend from the server folder

4. **Set Environment Variables**
   - Scroll to "Environment Variables"
   - Add these variables:
     - `MONGODB_URI` = `mongodb+srv://username:password@cluster0.mongodb.net/hatemalo_bakery?retryWrites=true&w=majority`
     - `JWT_SECRET` = Generate a random string (or use: `your_bakery_secret_key_2024`)
     - `NODE_ENV` = `production`

5. **Review and Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (should take 1-2 minutes)
   - Once done, you'll get a URL like: `https://your-project-name.vercel.app`
   - **Copy this URL** - you'll need it for the frontend!

---

## Step 4: Deploy Frontend (Client) to Vercel

1. **Create New Project**
   - In Vercel dashboard, click "Add New Project"
   - Select "Import Git Repository"
   - Select the same GitHub repository

2. **Select Client as Root Directory**
   - In "Root Directory", select `client`

3. **Set Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - (These should be set automatically)

4. **Set Environment Variables**
   - Add environment variable:
     - `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
     - Replace `your-backend-url` with the actual Vercel backend URL from Step 3

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - You'll get your frontend URL: `https://your-frontend-url.vercel.app`

---

## Step 5: Verify Deployment

1. **Test the Frontend**
   - Visit your frontend URL
   - Check that the site loads correctly
   - Try logging in with test credentials

2. **Test API Connection**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Try any action (login, browse products)
   - Verify API requests are going to your backend URL
   - Check for any CORS errors

3. **Test Features**
   - Browse products (Menu)
   - Try to add to cart
   - Try login/register
   - Check admin dashboard

---

## Troubleshooting

### Issue: "Cannot GET /" on Backend URL
- The backend doesn't serve HTML - it only provides APIs
- This is Normal! Backend works if you visit `/api` endpoints

### Issue: CORS Errors
- Make sure `MONGODB_URI` is correctly set in backend environment variables
- Check that frontend `VITE_API_URL` points to correct backend URL

### Issue: Database Connection Fails
- Verify MongoDB Atlas IP whitelist includes Vercel IPs (or use 0.0.0.0)
- Check username/password in connection string
- Ensure MongoDB cluster is running

### Issue: 404 on Frontend Routes
- Vercel automatically configures for single-page apps
- Make sure client build was successful

### Issue: Image Upload Not Working
- Backend uploads to `/public/uploads`
- On Vercel, files are ephemeral (deleted after restart)
- For production, use cloud storage (AWS S3, Cloudinary, etc.)

---

## Updating After Deployment

Whenever you make changes:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

2. **Vercel Auto-Deploys**
   - Vercel automatically redeploys when you push to main branch
   - Check deployment status in Vercel dashboard
   - Takes 1-2 minutes to rebuild and deploy

---

## Optional: Custom Domain

1. In Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Usually takes 24-48 hours to fully propagate

---

## Important Notes

- **Database Backups**: MongoDB Atlas provides daily backups on free tier
- **Uptime**: Vercel provides 99.95% uptime SLA
- **File Storage**: Uploaded files are temporary on Vercel. For permanent storage, use cloud services
- **Environment Variables**: Never commit `.env` files to GitHub - use Vercel's Environment Variables section

---

## Quick Reference

| Component | URL |
|-----------|-----|
| Frontend | https://your-frontend-name.vercel.app |
| Backend API | https://your-backend-name.vercel.app/api |
| MongoDB | Your Atlas cluster |
| GitHub | https://github.com/YOUR_USERNAME/hatemalo_bakery |

---

## Getting Help

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Check Vercel Logs**: In project settings, view deployment logs for errors

---

Good luck with your deployment! 🎉🥖
