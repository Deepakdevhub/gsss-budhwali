// ============================================
// GSSS Budhwali - Sanity CMS Integration
// Client configuration and data fetching
// ============================================

// ========== Sanity Client Configuration ==========
const sanityConfig = {
  projectId: 'n6xlow84', // Your Sanity project ID
  dataset: 'production', // or 'development'
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for faster response
};

// Construct Sanity client URL
const sanityBaseUrl = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}`;

// ========== Image URL Builder ==========
function sanityImageUrl(imageRef, options = {}) {
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'webp',
    fit = 'max'
  } = options;

  // Extract image ID from reference - handle different formats
  let imageId = '';

  if (typeof imageRef === 'string') {
    imageId = imageRef;
  } else if (imageRef && imageRef.asset && imageRef.asset._ref) {
    // This is the format from GROQ queries that include image field
    imageId = imageRef.asset._ref;
  } else if (imageRef && imageRef._ref) {
    imageId = imageRef._ref;
  } else {
    console.error('Invalid image reference:', imageRef);
    return '';
  }

  const match = imageId.match(/image-([a-f0-9]+)-(\d+x\d+)-(\w+)/);

  if (!match) {
    console.error('Invalid image reference format:', imageId);
    return '';
  }

  const [, id, dimensions, formatExt] = match;

  // Use the original file extension in the URL path, but convert via query parameter
  return `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${id}-${dimensions}.${formatExt}?w=${width}&h=${height}&q=${quality}&fit=${fit}&fm=${format}&auto=format`;
}

// ========== GROQ Queries ==========
const queries = {
  // Fetch all government schemes
  schemes: `*[_type == "governmentScheme"] | order(publishedAt desc) {
    _id,
    title,
    description,
    eligibility,
    documentsRequired,
    deadline,
    "attachment": attachment.asset->url,
    externalLink
  }`,

  // Fetch gallery images
  gallery: `*[_type == "galleryImage"] | order(date desc) {
    _id,
    title,
    description,
    date,
    category,
    image
  }`,

  // Fetch notices
  notices: `*[_type == "notice"] | order(publishedAt desc) {
    _id,
    title,
    content,
    publishedAt,
    category,
    isUrgent,
    "attachment": attachment.asset->url,
    externalLink
  }`,

  // Fetch faculty members
  faculty: `*[_type == "facultyMember"] | order(displayOrder asc) {
    _id,
    name,
    subject,
    qualification,
    photo,
    displayOrder
  }`,

  // Fetch toppers/star performers
  toppers: `*[_type == "topper"] | order(displayOrder asc) {
    _id,
    name,
    photo,
    percentage,
    year,
    achievement,
    category,
    displayOrder
  }`
};

// ========== Fetch Data Function ==========
async function fetchSanityData(queryType) {
  const query = queries[queryType];

  if (!query) {
    console.error('Invalid query type:', queryType);
    return null;
  }

  try {
    const url = `${sanityBaseUrl}?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching Sanity data:', error);
    return null;
  }
}

// ========== Government Schemes Renderer ==========
async function renderSchemes() {
  const container = document.getElementById('schemesContainer');
  if (!container) return;

  const schemes = await fetchSanityData('schemes');

  if (!schemes || schemes.length === 0) {
    console.log('No schemes found, using static content');
    return; // Keep static content
  }

  const currentLang = window.gsssApp ? window.gsssApp.currentLang() : 'en';

  container.innerHTML = schemes.map((scheme, index) => `
    <div class="scheme-card reveal ${index % 2 === 1 ? 'reveal-delay-1' : ''}">
      <h3 class="scheme-card__title">${scheme.title[currentLang] || scheme.title.en}</h3>
      <p class="scheme-card__description">${scheme.description[currentLang] || scheme.description.en}</p>
      ${scheme.eligibility ? `
        <div class="scheme-card__meta">
          <div><strong>Eligibility:</strong> ${scheme.eligibility[currentLang] || scheme.eligibility.en}</div>
          ${scheme.deadline ? `<div><strong>Deadline:</strong> ${new Date(scheme.deadline).toLocaleDateString()}</div>` : ''}
        </div>
      ` : ''}
      <div class="scheme-card__actions">
        ${scheme.attachment ? `<a href="${scheme.attachment}" download class="btn btn--secondary btn--small">📄 Download</a>` : ''}
        ${scheme.externalLink ? `<a href="${scheme.externalLink}" target="_blank" class="btn btn--outline btn--small">Learn More</a>` : ''}
      </div>
    </div>
  `).join('');
}

// ========== Gallery Renderer ==========
async function renderGallery() {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  const images = await fetchSanityData('gallery');

  if (!images || images.length === 0) {
    console.log('No gallery images found, using static content');
    return;
  }

  const currentLang = window.gsssApp ? window.gsssApp.currentLang() : 'en';

  container.innerHTML = images.map((img, index) => `
    <div class="gallery-card reveal ${index % 3 === 1 ? 'reveal-delay-1' : index % 3 === 2 ? 'reveal-delay-2' : ''}" 
         data-category="${img.category}" 
         data-index="${index}"
         data-image-url="${sanityImageUrl(img.image, { width: 1600, fit: 'max' })}"
         data-title-en="${img.title.en || ''}"
         data-title-hi="${img.title.hi || ''}"
         data-desc-en="${img.description?.en || ''}"
         data-desc-hi="${img.description?.hi || ''}"
         data-date="${img.date}">
      <img src="${sanityImageUrl(img.image, { width: 1200, fit: 'max' })}" 
           alt="${img.title[currentLang] || img.title.en}" 
           class="gallery-card__image" 
           loading="lazy">
      <div class="gallery-card__overlay">
        <div class="gallery-card__title">${img.title[currentLang] || img.title.en}</div>
        <div class="gallery-card__date">${new Date(img.date).toLocaleDateString()}</div>
      </div>
    </div>
  `).join('');

  // Re-initialize gallery click handlers and lightbox
  if (window.galleryApp && window.galleryApp.reinitializeGallery) {
    window.galleryApp.reinitializeGallery();
  }
}

// ========== Notices Renderer ==========
async function renderNotices() {
  const container = document.getElementById('noticesContainer');
  if (!container) return;

  const notices = await fetchSanityData('notices');

  if (!notices || notices.length === 0) {
    console.log('No notices found, using static content');
    return;
  }

  const currentLang = window.gsssApp ? window.gsssApp.currentLang() : 'en';

  container.innerHTML = notices.map((notice, index) => `
    <div class="notice-card ${notice.isUrgent ? 'notice-card--urgent' : ''} reveal" 
         data-category="${notice.category}">
      <div class="notice-card__header">
        <h3 class="notice-card__title">${notice.title[currentLang] || notice.title.en}</h3>
        <span class="notice-card__date">${new Date(notice.publishedAt).toLocaleDateString()}</span>
      </div>
      <div class="notice-card__content">
        <p>${notice.content[currentLang] || notice.content.en}</p>
      </div>
      ${notice.attachment || notice.externalLink ? `
        <div class="notice-card__actions">
          ${notice.attachment ? `<a href="${notice.attachment}" download class="btn btn--secondary btn--small">📄 Download</a>` : ''}
          ${notice.externalLink ? `<a href="${notice.externalLink}" target="_blank" class="btn btn--outline btn--small">View Details</a>` : ''}
        </div>
      ` : ''}
    </div>
  `).join('');
}

// ========== Faculty Renderer with Carousel ==========
let facultyPage = 0;
let totalFaculty = [];

async function renderFaculty() {
  let container = document.getElementById('facultyGrid');
  if (!container) return;

  const faculty = await fetchSanityData('faculty');

  if (!faculty || faculty.length === 0) {
    console.log('No faculty found');
    container.innerHTML = '<p class="text-center text-muted" style="grid-column: 1 / -1;">No faculty data available.</p>';
    return;
  }

  const currentLang = window.gsssApp ? window.gsssApp.currentLang() : 'en';
  totalFaculty = faculty;

  // On homepage: show 5 at a time with carousel
  const isHomepage = document.getElementById('facultyCarousel');

  if (isHomepage) {
    const pageSize = 5;
    const start = facultyPage * pageSize;
    const end = start + pageSize;
    const visibleFaculty = faculty.slice(start, end);

    container.innerHTML = visibleFaculty.map((member, index) => `
      <div class="faculty-card reveal">
        <img src="${sanityImageUrl(member.photo, { width: 200, fit: 'max', quality: 80 })}" 
             alt="${member.name}" 
             class="faculty-card__photo">
        <div class="faculty-card__name">${member.name}</div>
        <div class="faculty-card__subject">
          <span class="lang-en">${member.subject.en}</span>
          <span class="lang-hi hidden">${member.subject.hi}</span>
        </div>
      </div>
    `).join('');

    // Setup navigation
    setupFacultyCarousel(faculty.length, pageSize);
  } else {
    // Full faculty page: show all
    container.innerHTML = faculty.map((member, index) => `
      <div class="faculty-card reveal">
        <img src="${sanityImageUrl(member.photo, { width: 400, fit: 'max', quality: 80 })}" 
             alt="${member.name}" 
             class="faculty-card__photo">
        <div class="faculty-card__name">${member.name}</div>
        <div class="faculty-card__subject">
          <span class="lang-en">${member.subject.en}</span>
          <span class="lang-hi hidden">${member.subject.hi}</span>
        </div>
      </div>
    `).join('');
  }
}

function setupFacultyCarousel(total, pageSize) {
  const prevBtn = document.getElementById('facultyPrev');
  const nextBtn = document.getElementById('facultyNext');
  const maxPage = Math.ceil(total / pageSize) - 1;

  if (prevBtn && nextBtn) {
    prevBtn.onclick = () => {
      if (facultyPage > 0) {
        facultyPage--;
        renderFaculty();
      }
    };

    nextBtn.onclick = () => {
      if (facultyPage < maxPage) {
        facultyPage++;
        renderFaculty();
      }
    };

    // Update button states
    prevBtn.style.opacity = facultyPage === 0 ? '0.3' : '1';
    prevBtn.style.cursor = facultyPage === 0 ? 'not-allowed' : 'pointer';
    nextBtn.style.opacity = facultyPage === maxPage ? '0.3' : '1';
    nextBtn.style.cursor = facultyPage === maxPage ? 'not-allowed' : 'pointer';
  }
}

// ========== Toppers Renderer ==========
async function renderToppers() {
  const container = document.getElementById('toppersGrid');
  if (!container) return;

  const toppers = await fetchSanityData('toppers');

  if (!toppers || toppers.length === 0) {
    console.log('No toppers found');
    container.innerHTML = '<p class="text-center text-muted" style="grid-column: 1 / -1;"><span class="lang-en">No toppers data available yet.</span><span class="lang-hi hidden">अभी तक कोई टॉपर डेटा उपलब्ध नहीं है।</span></p>';
    return;
  }

  const currentLang = window.gsssApp ? window.gsssApp.currentLang() : 'en';

  container.innerHTML = toppers.map((topper, index) => `
    <div class="topper-card reveal ${index % 4 === 1 ? 'reveal-delay-1' : index % 4 === 2 ? 'reveal-delay-2' : index % 4 === 3 ? 'reveal-delay-3' : ''}">
      <img src="${sanityImageUrl(topper.photo, { width: 400, fit: 'max', quality: 80 })}" 
           alt="${topper.name[currentLang] || topper.name.en}" 
           class="topper-card__photo">
      <div class="topper-card__info">
        <div class="topper-card__name">${topper.name[currentLang] || topper.name.en}</div>
        <div class="topper-card__achievement">
          ${topper.percentage} - ${topper.year}
        </div>
      </div>
    </div>
  `).join('');
}

// ========== Homepage Notices Renderer (Limited) ==========
async function renderHomepageNotices() {
  const container = document.getElementById('homepageNoticesGrid');
  if (!container) return;

  const notices = await fetchSanityData('notices');

  if (!notices || notices.length === 0) {
    console.log('No notices found');
    container.innerHTML = '<p class="text-center text-muted" style="grid-column: 1 / -1;"><span class="lang-en">No notices available.</span><span class="lang-hi hidden">कोई सूचना उपलब्ध नहीं है।</span></p>';
    return;
  }

  const currentLang = window.gsssApp ? window.gsssApp.currentLang() : 'en';

  // Show only first 3 notices on homepage
  const limitedNotices = notices.slice(0, 3);

  container.innerHTML = limitedNotices.map((notice, index) => `
    <div class="notice-card ${notice.isUrgent ? 'notice-card--urgent' : ''} reveal ${index === 1 ? 'reveal-delay-1' : index === 2 ? 'reveal-delay-2' : ''}" 
         data-category="${notice.category}">
      <div class="notice-card__header">
        <h3 class="notice-card__title">${notice.title[currentLang] || notice.title.en}</h3>
        <span class="notice-card__date">${new Date(notice.publishedAt).toLocaleDateString()}</span>
      </div>
      <div class="notice-card__content">
        <p>${notice.content[currentLang] || notice.content.en}</p>
      </div>
    </div>
  `).join('');
}

// ========== Notice Ticker Renderer ==========
async function renderNoticeTicker() {
  const ticker = document.querySelector('.notice-ticker__content');
  if (!ticker) return;

  const notices = await fetchSanityData('notices');

  if (!notices || notices.length === 0) {
    console.log('No notices for ticker');
    return;
  }

  const currentLang = window.gsssApp ? window.gsssApp.currentLang() : 'en';

  // Filter urgent notices only, limit to 5
  const urgentNotices = notices
    .filter(n => n.isUrgent)
    .slice(0, 5);

  if (urgentNotices.length > 0) {
    ticker.innerHTML = urgentNotices.map(notice => `
      <span class="notice-ticker__item">
        ⚠️ ${notice.title[currentLang] || notice.title.en}
      </span>
    `).join('');
  }
}

// ========== Initialize CMS Content ==========
function initializeSanityCMS() {
  // Homepage-specific sections
  if (document.getElementById('toppersGrid')) {
    renderToppers();
  }

  if (document.getElementById('homepageNoticesGrid')) {
    renderHomepageNotices();
  }

  // Notice ticker (on homepage)
  if (document.querySelector('.notice-ticker__content')) {
    renderNoticeTicker();
  }

  if (document.getElementById('facultyGrid')) {
    renderFaculty(); // Homepage faculty
  }

  // Page-specific sections
  if (document.getElementById('schemesContainer')) {
    renderSchemes();
  }

  // Check if we're on gallery page (full gallery)
  if (document.getElementById('galleryGrid')) {
    renderGallery();
  }

  // Check if we're on notice page (full notices)
  if (document.getElementById('noticesContainer')) {
    renderNotices();
  }
}

// ========== Auto-initialize on DOM ready ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSanityCMS);
} else {
  initializeSanityCMS();
}

// ========== Export for external use ==========
window.sanityCMS = {
  fetchData: fetchSanityData,
  imageUrl: sanityImageUrl,
  renderSchemes,
  renderGallery,
  renderNotices,
  renderFaculty,
  renderToppers,
  renderHomepageNotices,
  renderNoticeTicker,
  refresh: initializeSanityCMS
};

