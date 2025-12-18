# GSSS Budhwali Website - Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Test the Website Locally
```bash
# Navigate to the project folder
cd C:\Users\dks89\.gemini\antigravity\scratch\gsss-budhwali

# Open index.html in your browser
start index.html
```

The website should open and work immediately! ✅

---

## 📝 Remaining Configuration Steps

### ✅ Step 2: Configure Web3Forms (Contact Form)

1. **Get Free Access Key**:
   - Go to [https://web3forms.com](https://web3forms.com)
   - Enter your email (e.g., gsssbudhwali@rajasthan.gov.in)
   - Click "Create Access Key"
   - Copy the access key you receive

2. **Update index.html**:
   - Open `index.html` in a text editor
   - Find line with `YOUR_WEB3FORMS_ACCESS_KEY` (around line 528)
   - Replace with your actual key:
   ```html
   <input type="hidden" name="access_key" value="paste-your-key-here">
   ```

3. **Test**: Submit the contact form and check your email!

---

### ✅ Step 3: Update Google Maps

1. **Get School Coordinates**:
   - Go to [Google Maps](https://www.google.com/maps)
   - Search for "Budhwali, Bikaner, Rajasthan"
   - Right-click on the school location → "What's here?"
   - Note the coordinates (e.g., 27.8500, 73.4500)

2. **Generate Embed Code**:
   - Click "Share" → "Embed a map"
   - Copy the iframe code

3. **Update index.html**:
   - Find the Google Maps iframe (around line 553)
   - Replace with your embed code

---

### ✅ Step 4: Add Actual School Content

#### Replace Placeholder Images:
1. Take photos of:
   - School building (for hero section)
   - Principal photo
   - Faculty photos (8 teachers)
   - Topper photos (4-5 students)
   - Gallery photos (events, sports day, etc.)

2. Save images in `assets/images/` folder:
   ```
   assets/images/
   ├── hero-school.jpg
   ├── principal.jpg
   ├── faculty/
   │   ├── teacher1.jpg
   │   ├── teacher2.jpg
   │   └── ...
   ├── toppers/
   │   ├── topper1.jpg
   │   └── ...
   └── gallery/
       ├── event1.jpg
       └── ...
   ```

3. Update HTML to use local images:
   ```html
   <!-- Instead of Unsplash URLs, use: -->
   <img src="assets/images/hero-school.jpg" alt="School Building">
   ```

#### Update Text Content:
- **Timeline years**: Update actual years when school was established/upgraded
- **Results tables**: Add real board exam results
- **Faculty names**: Replace with actual teacher names and subjects
- **Principal's message**: Update with actual principal's name and message
- **Contact details**: Verify phone numbers and email

---

## 🎨 Language Toggle - How It Works

### Current Implementation:

```html
<!-- Every text has both versions -->
<span class="lang-en">Admission</span>
<span class="lang-hi hidden">प्रवेश</span>
```

```javascript
// main.js handles toggling
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'hi' : 'en';
  
  // Hide all elements
  document.querySelectorAll('.lang-en, .lang-hi').forEach(el => {
    el.classList.add('hidden');
  });
  
  // Show current language
  const activeClass = currentLang === 'en' ? '.lang-en' : '.lang-hi';
  document.querySelectorAll(activeClass).forEach(el => {
    el.classList.remove('hidden');
  });
  
  // Save to localStorage
  localStorage.setItem('preferredLang', currentLang);
}
```

### Why This Method is Best for Your Use Case:

✅ **Pros**:
- No server required
- Works offline
- SEO-friendly (both languages in HTML)
- No API calls needed
- Simple to maintain
- Fast switching (no page reload)

❌ **Cons**:
- Page size is larger (both languages loaded)
- Must update both versions when changing text

### Alternative Methods:

**Method 2: JSON Translation Files** (Better for very large sites)
```javascript
// translations.json
{
  "en": { "admission": "Admission" },
  "hi": { "admission": "प्रवेश" }
}
```
- Smaller page size
- Easier to manage translations
- Requires more JavaScript

**Method 3: Separate Pages** (Simplest but worst UX)
```
index-en.html
index-hi.html
```
- Easiest to code
- Requires page reload
- Harder to maintain (duplicate HTML)

**Recommendation**: Keep the current method! It's perfect for a school website.

---

## 🔧 Sanity CMS Setup (Optional - For Dynamic Content)

Sanity allows teachers to update content without coding. Here's how to set it up:

### Step 1: Install Sanity CLI

```bash
# Install Node.js first (if not installed)
# Download from: https://nodejs.org/

# Install Sanity CLI globally
npm install -g @sanity/cli
```

### Step 2: Initialize Sanity Project

```bash
cd gsss-budhwali

# Create sanity-studio directory
sanity init

# Answer prompts:
# - Project name: gsss-budhwali
# - Use default dataset: Y
# - Output path: ./sanity-studio
# - Select project template: Clean project
```

### Step 3: Define Content Schemas

Create `sanity-studio/schemas/governmentScheme.js`:

```javascript
export default {
  name: 'governmentScheme',
  title: 'Government Scheme',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'hi', title: 'Hindi', type: 'string' }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'hi', title: 'Hindi', type: 'text' }
      ]
    },
    {
      name: 'eligibility',
      title: 'Eligibility',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'hi', title: 'Hindi', type: 'text' }
      ]
    },
    {
      name: 'deadline',
      title: 'Deadline',
      type: 'date'
    },
    {
      name: 'attachment',
      title: 'Attachment (PDF)',
      type: 'file'
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    }
  ]
}
```

Create similar schemas for:
- `galleryImage.js`
- `notice.js`
- `facultyMember.js`

### Step 4: Update Schema Index

Edit `sanity-studio/schemas/schema.js`:

```javascript
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import governmentScheme from './governmentScheme'
import galleryImage from './galleryImage'
import notice from './notice'
import facultyMember from './facultyMember'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    governmentScheme,
    galleryImage,
    notice,
    facultyMember
  ])
})
```

### Step 5: Start Sanity Studio

```bash
cd sanity-studio
sanity start
```

Opens at: `http://localhost:3333`

### Step 6: Deploy Sanity Studio

```bash
sanity deploy
```

You'll get a URL like: `https://gsss-budhwali.sanity.studio`

### Step 7: Update Website with Sanity Project ID

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Find your project ID
3. Update `js/sanity.js`:
   ```javascript
   const sanityConfig = {
     projectId: 'your-project-id-here', // Replace this
     dataset: 'production',
     apiVersion: '2024-01-01',
     useCdn: true,
   };
   ```

### Step 8: Add sanity.js to HTML

Add to `index.html`, `gallery.html`, and `notice.html` before closing `</body>`:

```html
<script src="js/sanity.js"></script>
```

### How Teachers Will Use It:

1. Go to `https://gsss-budhwali.sanity.studio`
2. Login with credentials you provide
3. Click "Government Scheme" → "Create"
4. Fill in English and Hindi content
5. Upload attachments
6. Publish!
7. Website updates automatically! ✨

---

## 🎯 Recommended Setup Priority

### Must Do (Essential):
1. ✅ Test website locally
2. ✅ Configure Web3Forms for contact form
3. ✅ Update Google Maps with actual location
4. ✅ Replace placeholder images with real school photos
5. ✅ Update text content (names, dates, results)

### Nice to Have (Optional):
6. ⭐ Set up Sanity CMS for easy content updates
7. ⭐ Optimize images (compress, convert to WebP)
8. ⭐ Set up hosting (GitHub Pages, Netlify, or school server)

### Advanced (Future):
9. 🚀 Add PWA features (service worker, offline support)
10. 🚀 Set up analytics (Google Analytics)
11. 🚀 Add more sections (alumni, achievements, downloads)

---

## 🌐 Hosting Options

### Option 1: GitHub Pages (FREE)
1. Create GitHub account
2. Create repository `gsss-budhwali-website`
3. Push code to GitHub
4. Enable GitHub Pages in settings
5. Your site: `https://username.github.io/gsss-budhwali-website`

### Option 2: Netlify (FREE)
1. Create Netlify account
2. Drag & drop the `gsss-budhwali` folder
3. Get URL: `https://gsss-budhwali.netlify.app`
4. Can add custom domain

### Option 3: School Server
Upload all files to school's web server via FTP

---

## 🆘 Troubleshooting

### Language Toggle Not Working?
1. Check browser console (F12) for errors
2. Verify `js/main.js` is loaded
3. Clear browser cache (Ctrl+F5)

### Contact Form Not Submitting?
1. Verify Web3Forms access key is correct
2. Check browser console for errors
3. Test email address is valid

### Images Not Loading?
1. Check file paths are correct
2. Verify images exist in `assets/images/` folder
3. Use forward slashes: `assets/images/photo.jpg`

### Chart Not Showing?
1. Verify Chart.js CDN is loading
2. Check browser console for errors
3. Ensure `admissionChart` canvas element exists

---

## 📞 Need Help?

If you need assistance:
1. Check browser console (F12) for errors
2. Review `README.md` for documentation
3. Contact the developer who built this

---

## 🎉 You're Ready!

Once you complete Steps 1-5 above, your website will be fully functional and ready to launch!

**Estimated Time**: 2-3 hours for complete setup

Good luck! 🚀
