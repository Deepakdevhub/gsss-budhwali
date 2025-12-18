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
         data-index="${index}">
      <img src="${sanityImageUrl(img.image, { width: 600, height: 450 })}" 
           alt="${img.title[currentLang] || img.title.en}" 
           class="gallery-card__image" 
           loading="lazy">
      <div class="gallery-card__overlay">
        <div class="gallery-card__title">${img.title[currentLang] || img.title.en}</div>
        <div class="gallery-card__date">${new Date(img.date).toLocaleDateString()}</div>
      </div>
    </div>
  `).join('');

  // Re-initialize gallery click handlers if gallery.js is loaded
  if (window.galleryApp) {
    // Reinitialize
    initializeLightbox();
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

// ========== Faculty Renderer ==========
async function renderFaculty() {
  const container = document.querySelector('#faculty .grid'); // Target the grid inside faculty section
  if (!container) return;

  const faculty = await fetchSanityData('faculty');

  if (!faculty || faculty.length === 0) {
    console.log('No faculty found, using static content');
    return;
  }

  const currentLang = window.gsssApp ? window.gsssApp.currentLang() : 'en';

  container.innerHTML = faculty.map((member, index) => `
    <div class="faculty-card reveal ${index % 4 === 1 ? 'reveal-delay-1' : index % 4 === 2 ? 'reveal-delay-2' : index % 4 === 3 ? 'reveal-delay-3' : ''}">
      <img src="${sanityImageUrl(member.photo, { width: 300, height: 300 })}" 
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

// ========== Initialize CMS Content ==========
function initializeSanityCMS() {
  // Check if we're on homepage
  if (document.getElementById('schemesContainer')) {
    renderSchemes();
  }

  // Check if we're on gallery page
  if (document.getElementById('galleryGrid')) {
    renderGallery();
  }

  // Check if we're on notice page
  if (document.getElementById('noticesContainer')) {
    renderNotices();
  }

  // Check if we're on a page with faculty section
  if (document.querySelector('#faculty .grid')) {
    renderFaculty();
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
  refresh: initializeSanityCMS
};

