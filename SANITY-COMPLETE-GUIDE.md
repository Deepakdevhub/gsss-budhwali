# Sanity CMS Setup Guide - Step by Step
## For GSSS Budhwali School Website

> **Note**: This guide assumes you're on Windows. Every step is explained in detail.

---

## 🎯 What You'll Achieve

After completing this guide:
- ✅ Teachers can add/edit government schemes
- ✅ Teachers can post notices
- ✅ Teachers can upload gallery photos
- ✅ Teachers can manage faculty profiles
- ✅ All without touching any code!

---

## ⚠️ Important: Static vs Dynamic Content

### Current Situation:
Your website has **static placeholder content** (hardcoded in HTML):
- 4 government scheme cards
- 8 notice cards
- 9 gallery images
- 8 faculty members

### After Sanity Setup:
- **Sanity content REPLACES static content**
- If Sanity has 0 schemes → Website shows 4 static schemes (fallback)
- If Sanity has 3 schemes → Website shows 3 Sanity schemes (replaces static)
- Static content acts as a **safety net** if Sanity is empty

### Adding vs Replacing:
- ❌ Sanity does NOT add to static content
- ✅ Sanity REPLACES static content when available
- ✅ You start from scratch in Sanity and add what you want

---

## 📋 Prerequisites

### Step 0: Install Node.js

**Check if Node.js is installed:**
```bash
# Open PowerShell (Windows key + X → Windows PowerShell)
node --version
```

**If you see version number (like v20.x.x):**
- ✅ Node.js is installed, skip to Step 1

**If you see "command not found":**
1. Go to [https://nodejs.org](https://nodejs.org)
2. Click "Download LTS" (Long Term Support)
3. Run the installer
4. Keep clicking "Next" (default settings are fine)
5. After installation, **close and reopen PowerShell**
6. Run `node --version` again to verify

---

## 🚀 Part 1: Create Sanity Account (5 minutes)

### Step 1.1: Sign Up for Sanity

1. Go to [https://www.sanity.io](https://www.sanity.io)
2. Click **"Get Started for Free"**
3. Sign up with:
   - **Google** (recommended - easiest)
   - OR GitHub
   - OR Email

4. Choose plan:
   - Select **"Free"** plan (perfect for schools)
   - Free plan includes:
     - Unlimited documents
     - 3 team members
     - 100,000 API requests/month
     - 5GB storage

5. ✅ You now have a Sanity account!

---

## 🛠️ Part 2: Install Sanity CLI (3 minutes)

### Step 2.1: Open PowerShell

1. Press **Windows key + X**
2. Select **"Windows PowerShell (Admin)"** or **"Terminal (Admin)"**
3. Click "Yes" if asked for admin permission

### Step 2.2: Install Sanity CLI Globally

**Copy and paste this command:**
```bash
npm install -g @sanity/cli
```

**What happens:**
- Downloads Sanity command-line tools
- Takes 1-2 minutes
- You'll see download progress

**Verify installation:**
```bash
sanity --version
```

**Expected output:** Something like `3.x.x`

✅ **Checkpoint**: You can now use `sanity` commands!

---

## 📦 Part 3: Initialize Sanity Project (10 minutes)

### Step 3.1: Navigate to Your Project

```bash
# Change to your project directory
cd C:\Users\dks89\.gemini\antigravity\scratch\gsss-budhwali
```

### Step 3.2: Login to Sanity

```bash
sanity login
```

**What happens:**
- Opens browser
- Shows "Login successful" message
- Close browser, return to PowerShell

### Step 3.3: Initialize Sanity Project

**Run this command:**
```bash
sanity init
```

**You'll be asked several questions. Answer like this:**

---

**Question 1:** `Select project to use`
- **Answer**: Press **DOWN arrow** → Select **"Create new project"**
- Press **ENTER**

---

**Question 2:** `Your project name:`
- **Answer**: Type: `gsss-budhwali`
- Press **ENTER**

---

**Question 3:** `Use the default dataset configuration?`
- **Answer**: Type: `Y` (Yes)
- Press **ENTER**
- This creates a dataset called "production"

---

**Question 4:** `Project output path:`
- **Answer**: Type: `./sanity-studio`
- Press **ENTER**
- This creates a folder called `sanity-studio`

---

**Question 5:** `Select project template`
- **Answer**: Use arrow keys → Select **"Clean project with no predefined schemas"**
- Press **ENTER**

---

**Question 6:** `Do you want to install dependencies?`
- **Answer**: Type: `Y` (Yes)
- Press **ENTER**
- This installs all required packages (takes 2-3 minutes)

---

**✅ Success! You'll see:**
```
✔ Success! Now what?
```

### Step 3.4: Save Your Project ID

**The terminal shows something like:**
```
Project ID: abc123xyz
```

**IMPORTANT: Copy this Project ID!**
- You'll need it later
- Paste it in a notepad for now

---

## 📝 Part 4: Configure Sanity Schemas (15 minutes)

Schemas define what content teachers can add (like forms).

### Step 4.1: Navigate to Sanity Studio

```bash
cd sanity-studio
```

### Step 4.2: Create Schema Files

**The schema files are already created for you!**

Your project already has:
- ✅ `sanity-studio/schemas/governmentScheme.js`
- ✅ `sanity-studio/schemas/notice.js`

**But we need to create 2 more:**

#### Create Gallery Image Schema

**Create file:** `sanity-studio/schemas/galleryImage.js`

**Copy this content:**
```javascript
export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  icon: () => '📷',
  fields: [
    {
      name: 'title',
      title: 'Image Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required() },
        { name: 'hi', title: 'Hindi', type: 'string', validation: Rule => Rule.required() }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'hi', title: 'Hindi', type: 'text', rows: 3 }
      ]
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Events', value: 'events' },
          { title: 'Infrastructure', value: 'infrastructure' },
          { title: 'Activities', value: 'activities' },
          { title: 'Awards', value: 'awards' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'image',
      category: 'category',
      date: 'date'
    },
    prepare(selection) {
      const { title, media, category, date } = selection
      return {
        title: title,
        subtitle: `${category} - ${date}`,
        media: media
      }
    }
  }
}
```

#### Create Faculty Member Schema

**Create file:** `sanity-studio/schemas/facultyMember.js`

**Copy this content:**
```javascript
export default {
  name: 'facultyMember',
  title: 'Faculty Member',
  type: 'document',
  icon: () => '👨‍🏫',
  fields: [
    {
      name: 'name',
      title: 'Teacher Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required() },
        { name: 'hi', title: 'Hindi', type: 'string', validation: Rule => Rule.required() }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'qualification',
      title: 'Qualification',
      type: 'string'
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: Rule => Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subject.en',
      media: 'photo'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }]
    }
  ]
}
```

### Step 4.3: Register All Schemas

**Edit file:** `sanity-studio/schemas/index.js`

**If the file doesn't exist, create it with this content:**
```javascript
import governmentScheme from './governmentScheme'
import notice from './notice'
import galleryImage from './galleryImage'
import facultyMember from './facultyMember'

export const schemaTypes = [
  governmentScheme,
  notice,
  galleryImage,
  facultyMember
]
```

**If the file exists, just add the imports and exports.**

### Step 4.4: Update Sanity Configuration

**Edit file:** `sanity-studio/sanity.config.js` (or `sanity.config.ts`)

**Replace entire content with:**
```javascript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'GSSS Budhwali CMS',

  projectId: 'YOUR_PROJECT_ID_HERE', // Replace with your Project ID from Step 3.4
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```

**⚠️ IMPORTANT:** Replace `YOUR_PROJECT_ID_HERE` with your actual Project ID from Step 3.4!

---

## 🎨 Part 5: Start Sanity Studio Locally (2 minutes)

### Step 5.1: Start the Studio

**Make sure you're in sanity-studio folder:**
```bash
# If not already there:
cd C:\Users\dks89\.gemini\antigravity\scratch\gsss-budhwali\sanity-studio

# Start the studio
npm run dev
```

**What happens:**
- Sanity Studio starts on your computer
- You'll see: `Local:  http://localhost:3333`

### Step 5.2: Open in Browser

1. Open your browser
2. Go to: `http://localhost:3333`
3. You'll see the Sanity Studio interface!

**✅ Success! You should see:**
- Government Scheme
- Notice
- Gallery Image
- Faculty Member

---

## 📝 Part 6: Add Your First Content (5 minutes)

### Test 1: Add a Government Scheme

1. Click **"Government Scheme"**
2. Click **"+ Create"** button
3. Fill in the form:
   - **Title (English)**: Mid-Day Meal Program
   - **Title (Hindi)**: मध्याह्न भोजन कार्यक्रम
   - **Description (English)**: Free nutritious lunch for all students
   - **Description (Hindi)**: सभी छात्रों के लिए मुफ्त पौष्टिक दोपहर का भोजन
   - **Eligibility (English)**: All students (Class 1-12)
   - **Eligibility (Hindi)**: सभी छात्र (कक्षा 1-12)
   - **Is Active**: Check the box ✓
4. Click **"Publish"** (top right)

**✅ Your first scheme is added!**

### Test 2: Add a Notice

1. Click **"Notice"** in left sidebar
2. Click **"+ Create"**
3. Fill in:
   - **Title (English)**: Welcome to New Session 2024-25
   - **Title (Hindi)**: नए सत्र 2024-25 में आपका स्वागत है
   - **Content (English)**: School reopens on January 5, 2025
   - **Content (Hindi)**: विद्यालय 5 जनवरी, 2025 को फिर से खुलेगा
   - **Category**: Select "Events"
   - **Mark as Urgent**: Check ✓ (if urgent)
   - **Show on Website**: Check ✓
4. Click **"Publish"**

**✅ Your first notice is added!**

### Test 3: Add a Gallery Image

1. Click **"Gallery Image"**
2. Click **"+ Create"**
3. Fill in:
   - **Title (English)**: Annual Day 2024
   - **Title (Hindi)**: वार्षिक दिवस 2024
   - **Description (English)**: Students performing on Annual Day
   - **Description (Hindi)**: वार्षिक दिवस पर प्रदर्शन करते छात्र
   - **Image**: Click "Upload" → Select a photo from your computer
   - **Category**: Select "events"
   - **Date**: Select the date
4. Click **"Publish"**

**✅ Your first gallery image is added!**

---

## 🌐 Part 7: Deploy Sanity Studio (5 minutes)

Currently, Sanity Studio only works on your computer. Let's make it accessible online!

### Step 7.1: Deploy to Sanity Cloud

**In PowerShell (from sanity-studio folder):**
```bash
sanity deploy
```

**You'll be asked:**

**Question:** `Studio hostname (<value>.sanity.studio):`
- **Answer**: Type: `gsss-budhwali`
- Press **ENTER**

**What happens:**
- Uploads your studio to Sanity's servers
- Takes 1-2 minutes
- Shows: `Success! Studio deployed to https://gsss-budhwali.sanity.studio`

**✅ Copy this URL!** This is where teachers will login.

---

## 🔗 Part 8: Connect Website to Sanity (5 minutes)

### Step 8.1: Update Sanity Configuration in Website

**Open file:** `C:\Users\dks89\.gemini\antigravity\scratch\gsss-budhwali\js\sanity.js`

**Find these lines (around line 7-11):**
```javascript
const sanityConfig = {
  projectId: 'YOUR_PROJECT_ID', // Replace with your Sanity project ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
};
```

**Replace `YOUR_PROJECT_ID` with your actual Project ID from Step 3.4**

**Example:**
```javascript
const sanityConfig = {
  projectId: 'abc123xyz', // Your actual ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
};
```

**Save the file!**

### Step 8.2: Enable Sanity Scripts in HTML

**Open:** `index.html`

**Find the bottom of the file (before `</body>` tag)**

**Add this line:**
```html
<script src="js/sanity.js"></script>
</body>
</html>
```

**Do the same for:**
- `gallery.html` (add before `</body>`)
- `notice.html` (add before `</body>`)

**✅ Website is now connected to Sanity!**

---

## ✅ Part 9: Test Everything (5 minutes)

### Step 9.1: Open Your Website

```bash
# Navigate to project root
cd C:\Users\dks89\.gemini\antigravity\scratch\gsss-budhwali

# Open in browser
start index.html
```

### Step 9.2: Check if Sanity Content Shows

**Scroll to "Government Schemes" section:**
- You should see the scheme you added in Sanity!
- If you added 1 scheme in Sanity, you'll see ONLY that 1 scheme
- Static content is now hidden

**If you see static content:**
1. Check browser console (F12 → Console tab)
2. Look for errors
3. Verify Project ID is correct in `js/sanity.js`

**Go to Notice Page:**
- `notice.html` should show your notice from Sanity

**Go to Gallery Page:**
- `gallery.html` should show your image from Sanity

---

## 👥 Part 10: Give Access to Teachers (3 minutes)

### Step 10.1: Invite Team Members

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Click on your project: **"gsss-budhwali"**
3. Click **"Team"** tab
4. Click **"Invite member"**
5. Enter teacher's email
6. Select role: **"Editor"** (can create/edit content)
7. Click **"Send invite"**

**Teacher receives email:**
- Clicks link in email
- Creates Sanity account (or logs in)
- Can now access the studio!

### Step 10.2: Share Studio URL with Teachers

**Give teachers this URL:**
```
https://gsss-budhwali.sanity.studio
```

**Instructions for them:**
1. Go to the URL
2. Click "Login"
3. Use their Sanity account
4. Start adding content!

---

## 📚 Part 11: How to Use Sanity (Training Guide for Teachers)

### Adding a New Government Scheme:

1. Go to `https://gsss-budhwali.sanity.studio`
2. Login
3. Click **"Government Scheme"** → **"+ Create"**
4. Fill all required fields (marked with *)
5. Upload PDF form if available
6. Add external link if available
7. Click **"Publish"**
8. Check website → Scheme appears automatically!

### Adding a Notice:

1. Click **"Notice"** → **"+ Create"**
2. Fill title and content in both languages
3. Select category
4. Check "urgent" if needed
5. Upload files if needed
6. Click **"Publish"**

### Adding Gallery Images:

1. Click **"Gallery Image"** → **"+ Create"**
2. Upload photo
3. Add title and description
4. Select category and date
5. Click **"Publish"**

### Editing Existing Content:

1. Click on the content type
2. Click on the item you want to edit
3. Make changes
4. Click **"Publish"** again

### Deleting Content:

1. Click on the item
2. Click **three dots (•••)** menu
3. Click **"Delete"**
4. Confirm

---

## ⚠️ Troubleshooting

### "Command not found: sanity"
**Solution:** Install Sanity CLI again:
```bash
npm install -g @sanity/cli
```

### "Project ID is required"
**Solution:** Make sure you updated `projectId` in `js/sanity.js`

### "No content showing on website"
**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Make sure `js/sanity.js` is loaded
4. Verify Project ID is correct

### "Cannot publish content"
**Solution:** Check internet connection, try refreshing browser

### Images not uploading
**Solution:** 
- Check file size (max 5MB on free plan)
- Use JPG or PNG format

---

## 🎉 Success Checklist

✅ Node.js installed  
✅ Sanity CLI installed  
✅ Sanity account created  
✅ Project initialized  
✅ Schemas configured  
✅ Studio deployed online  
✅ Website connected to Sanity  
✅ Test content added  
✅ Teachers invited  

**🎊 Congratulations! Your CMS is fully set up!**

---

## 📞 Quick Reference

**Sanity Studio (Local):**
```bash
cd sanity-studio
npm run dev
# Opens at: http://localhost:3333
```

**Sanity Studio (Online):**
```
https://gsss-budhwali.sanity.studio
```

**Project Dashboard:**
```
https://www.sanity.io/manage
```

**Add Team Members:**
```
https://www.sanity.io/manage → Your Project → Team
```

---

## 💡 Tips for Teachers

1. **Always fill both English AND Hindi fields**
2. **Use "Is Active" checkbox to hide/show content**
3. **Use categories to organize content**
4. **Keep descriptions short and clear**
5. **Compress images before uploading** (use tinypng.com)
6. **Publish after every change** (Draft not visible on website)

---

## 🆘 Need Help?

If you get stuck:
1. Check this guide again
2. Look for errors in browser console (F12)
3. Contact Sanity support: support@sanity.io
4. Read docs: docs.sanity.io

---

**Made with ❤️ for GSSS Budhwali**
