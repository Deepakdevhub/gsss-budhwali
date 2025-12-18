# 🚀 Vercel Deployment Guide - GSSS Budhwali Website

**Quick & Easy Deployment in 5 Minutes!**

---

## ✅ Pre-Deployment Checklist

Before deploying, you need:

- [ ] GitHub account (free)
- [ ] Vercel account (free) - Sign up at [vercel.com](https://vercel.com)
- [ ] Web3Forms Access Key (get from [web3forms.com](https://web3forms.com))
- [ ] Sanity Studio already deployed (running `npm run dev` locally)

---

## 📝 Step 1: Get Web3Forms Access Key

> [!IMPORTANT]
> You MUST do this before deployment or the contact form won't work!

1. Go to [web3forms.com](https://web3forms.com)
2. Click **"Create Access Key"** (free)  
3. Enter your email: `gsssbudhwali@rajasthan.gov.in`
4. Check your email and copy the access key
5. Open `index.html` in your code editor
6. Find line 800: `<input type="hidden" name="access_key"  value="YOUR_WEB3FORMS_ACCESS_KEY">`
7. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key
8. Save the file

---

## 📦 Step 2: Push Code to GitHub

### Option A: Using VS Code (Recommended)

1. Open your project folder in VS Code
2. Click **Source Control** icon (left sidebar)
3. Click **"Initialize Repository"**
4. Type commit message: "Initial commit - GSSS Budhwali website"
5 Click ✓ (checkmark) to commit
6. Click **"Publish to GitHub"**
7. Choose **"Public"** repository
8. Name it: `gsss-budhwali-website`
9. Wait for upload to complete ✅

### Option B: Using Git Command Line

```bash
# Navigate to project folder
cd C:\Users\dks89\.gemini\antigravity\scratch\gsss-budhwali

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - GSSS Budhwali website"

# Create GitHub repo and push
# (Follow GitHub's instructions to push to new repo)
```

---

## 🚀 Step 3: Deploy to Vercel

### 3.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### 3.2 Import Your Project

1. Click **"Add New Project"**
2. Find `gsss-budhwali-website` from your GitHub repos
3. Click **"Import"**

### 3.3 Configure Project

**Framework Preset:** None (or "Other")  
**Build Command:** Leave empty  
**Output Directory:** Leave empty  
**Install Command:** Leave empty  

> Sanity Studio deployment is separate - we'll handle that next!

### 3.4 Deploy!

1. Click **"Deploy"** button
2. Wait 30-60 seconds for build
3. 🎉 **Your website is live!**

You'll get a URL like: `https://gsss-budhwali-website.vercel.app`

---

## 🎨 Step 4: Deploy Sanity Studio

Sanity Studio needs to be deployed separately for teachers to access it.

### 4.1 Configure Sanity for Production

```bash
# Navigate to sanity-studio folder
cd sanity-studio

# Deploy to Sanity's hosting
npm run deploy
```

### 4.2 Answer the Prompts

```
? Studio hostname: gsss-budhwali
✅ This will create: https://gsss-budhwali.sanity.studio
```

### 4.3 Update CORS Origins

**CRITICAL:** Add your Vercel website URL to Sanity CORS!

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click your project: **"gsss-budhwali"**
3. Go to **API** → **CORS Origins**
4. Click **"Add CORS origin"**
5. Add these URLs:

```
https://gsss-budhwali-website.vercel.app
```

(Use your actual Vercel URL)

6. Check ✅ **"Allow credentials"**
7. Click **"Save"**

---

## 🌐 Step 5: Custom Domain (Optional)

### If you have a domain (e.g., gsssbudhwali.com):

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Domains"**
3. Click **"Add Domain"**
4. Enter your domain: `gsssbudhwali.com`
5. Follow DNS configuration instructions
6. **Don't forget**: Add custom domain to Sanity CORS origins too!

---

## ✅ Step 6: Verify Everything Works

### Test Your Live Website:

1. Open your Vercel URL
2. Check all sections load correctly
3. Test language toggle (English ↔ Hindi)
4. Scroll through all sections
5. **Important Tests:**
   - ✅ Faculty section shows "Raj" from Sanity
   - ✅ Gallery page loads
   - ✅ Notice page loads
   - ✅ Contact form works (submit a test)
   - ✅ Mobile responsiveness (open on phone)

### Test Sanity Studio:

1. Open `https://gsss-budhwali.sanity.studio`
2. Log in
3. Add a test notice
4. Refresh your website
5. ✅ New notice should appear!

---

## 🔄 Making Updates After Deployment

### For Website Content Updates (via Sanity):

Just use Sanity Studio - changes appear automatically! No redeployment needed.

### For Code/Design Changes:

**Method 1: Automatic (Recommended)**

1. Make changes in your local code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update XYZ"
   git push
   ```
3. Vercel automatically redeploys! ✅

**Method 2: Manual**

1. Go to Vercel Dashboard
2. Click **"Deployments"**
3. Click **"..."** on latest deployment
4. Click **"Redeploy"**

---

## 🆘 Troubleshooting

### Problem: Faculty/Content Not Showing

**Solution:**
- Check Sanity CORS origins include your Vercel URL
- Make sure content is **published** (not just saved)
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

### Problem: Contact Form Not Working

**Solution:**
- Verify Web3Forms access key is correct in `index.html`
- Check browser console for errors
- Test email address is valid

### Problem: 404 Error on Gallery/Notice Pages

**Solution:**
- Make sure `gallery.html` and `notice.html` are in the root directory
- Check file names are lowercase
- Redeploy from Vercel dashboard

### Problem: Images Not Loading

**Solution:**
- Check Unsplash URLs are accessible
- Verify Sanity CDN URLs are correct
- Check browser console for CORS errors

---

## 📊 Vercel Dashboard Features

### What You Can Do:

- **Analytics**: See visitor stats (free tier)
- **Deployments**: View deployment history
- **Domains**: Manage custom domains
- **Settings**: Configure environment variables
- **Preview Deployments**: Every GitHub branch gets a preview URL!

---

## 💰 Cost Breakdown

**Total Cost: ₹0 (FREE!)**

- ✅ **Vercel**: Free for personal/education projects
- ✅ **Sanity**: Free tier (generous limits)
- ✅ **GitHub**: Free for public repos
- ✅ **Web3Forms**: Free (unlimited forms)

**No credit card required for basic usage!**

---

## 🎓 Teacher Access to Sanity

Give teachers these details:

**Sanity Studio URL**: `https://gsss-budhwali.sanity.studio`  
**Login**: Use Google/GitHub account (invite them via Sanity dashboard)

**To Invite Teachers:**

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click project → **"Members"**
3. Click **"Invite Member"**
4. Enter teacher's email
5. Set role: **"Editor"** (can add/edit content)
6. Send invite ✅

---

## 📱 Share Your Website

Your website is live! Share it:

**QR Code**: Generate at [qr-code-generator.com](https://www.qr-code-generator.com)  
**Social Media**: Share the Vercel URL  
**Letterhead**: Print QR code on school letterheads  

---

## 🔒 Security Best Practices

- ✅ Don't share Sanity admin credentials
- ✅ Use strong passwords
- ✅ Only invite trusted teachers to Sanity
- ✅ Keep Web3Forms access key private
- ✅ Monitor Vercel analytics for suspicious activity

---

## 📞 Getting Help

**Vercel Support**: [vercel.com/support](https://vercel.com/support)  
**Sanity Support**: [sanity.io/help](https://sanity.io/help)  
**Community**: Vercel & Sanity have active Discord communities

---

## 🎉 Congratulations!

Your school website is now live and accessible to anyone in the world! 🌍

**Next Steps:**
1. ✅ Share the URL with school administration
2. ✅ Train teachers on Sanity Studio (use TEACHER-GUIDE.md)
3. ✅ Start populating real content
4. ✅ Announce the website to students and parents!

---

**Website URL**: _______________________________  
**Sanity Studio URL**: _______________________________  
**Deployment Date**: _______________________________  
**Deployed By**: _______________________________
