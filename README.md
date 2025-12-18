# GSSS Budhwali - Government Senior Secondary School Website

A modern, fast-loading, bilingual (English/Hindi) website for Government Senior Secondary School Budhwali, Rajasthan.

## 🎯 Features

### Core Pages
- **Home Page**: Complete showcase with all school information
  - Bilingual header with Satyamev Jayate emblem
  - Hero section with motivational content
  - About section and school timeline
  - Government schemes (CMS-powered)
  - Board results tables (4 tables for classes 10th & 12th)
  - Student admission chart
  - Principal's message
  - Topper wall with photos
  - Faculty section
  - Contact form with Web3Forms integration
  - Google Maps integration
  
- **Gallery Page**: Photo gallery with advanced features
  - Category filtering (Events, Infrastructure, Activities, Awards)
  - Lightbox viewer with keyboard navigation
  - Lazy loading for optimal performance
  - Smooth animations
  
- **Notice Board**: Latest announcements
  - Running ticker for urgent notices
  - Category-based filtering
  - Downloadable attachments
  - CMS integration ready

### Design & Performance
- **Design System**: Indian flag colors (Saffron, White, Green)
- **Typography**: Modern fonts with Devanagari support
- **Responsive**: Mobile-first approach
- **Smooth Animations**: Scroll reveal, parallax, micro-interactions
- **Performance Optimized**: Lazy loading, minimal JavaScript
- **Easter Eggs**: Confetti on toppers section, floating elements

### Language Support
- English/Hindi toggle
- Complete bilingual content
- Language preference saved in localStorage

## 🚀 Quick Start

### Option 1: Direct Use (No Build Required)
Simply open `index.html` in your browser. The website is built with vanilla HTML, CSS, and JavaScript - no build process needed!

```bash
# Navigate to project directory
cd gsss-budhwali

# Open in browser (or double-click index.html)
start index.html  # Windows
open index.html   # Mac
xdg-open index.html  # Linux
```

### Option 2: Local Development Server
For better development experience with live reload:

```bash
# Using Python (usually pre-installed)
python -m http.server 8000

# Or using Node.js (if installed)
npx serve

# Or using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

Then visit `http://localhost:8000` in your browser.

## 📁 Project Structure

```
gsss-budhwali/
├── index.html              # Home page
├── gallery.html            # Photo gallery
├── notice.html             # Notice board
├── css/
│   ├── main.css            # Design system & core styles
│   ├── components.css      # UI components
│   └── animations.css      # Animations & transitions
├── js/
│   ├── main.js             # Core functionality
│   ├── gallery.js          # Gallery-specific features
│   └── sanity.js           # CMS integration (to be created)
├── assets/
│   └── images/             # Static images
├── sanity-studio/          # Sanity CMS config (optional)
└── README.md               # This file
```

## ⚙️ Configuration

### Web3Forms Setup (Contact Form)
1. Go to [Web3Forms](https://web3forms.com/)
2. Create a free account and get your access key
3. Open `index.html`
4. Find the contact form section
5. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```

### Google Maps Setup
1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Open `index.html`
3. Find the Google Maps iframe section
4. Update the `src` with actual school coordinates:
   ```html
   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."></iframe>
   ```

### WhatsApp Button
The WhatsApp floating button is already configured for **+91 81122 87006**.
To change:
1. Open `index.html`
2. Find the WhatsApp float button
3. Update the `href` attribute:
   ```html
   <a href="https://wa.me/91XXXXXXXXXX" ...>
   ```

## 🎨 Customization

### Update Colors
Edit `css/main.css` and modify CSS variables:
```css
:root {
  --color-saffron: #FF9933;
  --color-green: #138808;
  /* Add your custom colors */
}
```

### Update Content
All content is in HTML files. Simply edit the text between tags:
- Home page: `index.html`
- Gallery: `gallery.html`
- Notices: `notice.html`

### Add Images
1. Place images in `assets/images/` folder
2. Reference in HTML:
   ```html
   <img src="assets/images/your-image.jpg" alt="Description">
   ```

## 🔌 Sanity CMS Integration (Optional)

To enable dynamic content management:

1. **Install Sanity CLI**:
   ```bash
   npm install -g @sanity/cli
   ```

2. **Initialize Sanity project**:
   ```bash
   cd gsss-budhwali
   sanity init
   ```

3. **Configure schemas** (see `sanity-studio/schemas/` for examples)

4. **Deploy Sanity Studio**:
   ```bash
   cd sanity-studio
   sanity deploy
   ```

5. **Update `js/sanity.js`** with your project details

See `SANITY-SETUP.md` for detailed instructions.

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🎯 Performance Targets

- ✅ Page Load Time: < 2 seconds (on 3G)
- ✅ Lighthouse Performance: > 95
- ✅ Lighthouse Accessibility: > 95
- ✅ Lighthouse Best Practices: > 95
- ✅ Lighthouse SEO: > 95

## 📝 Content Guidelines

### Adding a New Notice
1. Open `notice.html`
2. Copy an existing notice card
3. Update the content, date, and category
4. Add download links if needed

### Adding Gallery Photos
1. Open `gallery.html`
2. Copy an existing gallery card
3. Update image src, title, and date
4. Set appropriate category (`data-category="events"`)

### Updating Results Tables
1. Open `index.html`
2. Find the results section
3. Update table data with new year's results

## 🛠️ Troubleshooting

**Images not loading?**
- Check file paths are correct
- Ensure images are in `assets/images/` folder
- Try using absolute paths for testing

**Language toggle not working?**
- Check browser console for errors
- Ensure `js/main.js` is loaded
- Clear browser cache and reload

**Contact form not submitting?**
- Verify Web3Forms access key is correct
- Check browser console for errors
- Test with a different email address

## 📞 Support

For issues or questions:
- **Email**: gsssbudhwali@rajasthan.gov.in
- **Phone**: +91 81122 87006
- **WhatsApp**: +91 81122 87006

## 📄 License

This website is for Government Senior Secondary School Budhwali.
All rights reserved © 2024.

## 🙏 Credits

- **Design & Development**: Built with modern web technologies
- **Images**: Sample images from Unsplash (replace with actual school photos)
- **Icons**: System emojis
- **Fonts**: Google Fonts (Poppins, Inter, Roboto, Noto Sans Devanagari)

---

Made with ❤️ for quality education in rural Rajasthan.
