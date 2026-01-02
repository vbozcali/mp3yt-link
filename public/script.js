// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Auto dark mode for evening hours (18:00 - 06:00) with 3-hour preference storage
function isEveningHours() {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6; // 18:00 - 06:00
}

function getThemePreference() {
    const saved = localStorage.getItem('theme');
    const savedTime = localStorage.getItem('themeTime');
    
    if (saved && savedTime) {
        const timePassed = Date.now() - parseInt(savedTime);
        const threeHours = 3 * 60 * 60 * 1000;
        
        // If less than 3 hours have passed, use saved preference
        if (timePassed < threeHours) {
            return saved;
        }
    }
    
    // No valid saved preference, use auto-detection based on time
    return isEveningHours() ? 'dark' : 'light';
}

// Apply theme
const theme = getThemePreference();
if (theme === 'dark') {
    htmlElement.classList.add('dark-mode');
}
updateThemeIcon();

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-mode');
    
    // Save preference with timestamp
    if (htmlElement.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    localStorage.setItem('themeTime', Date.now().toString());
    
    updateThemeIcon();
});

// Update theme icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (htmlElement.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Language dropdown (static links, no dynamic text switching)
const langToggleBtn = document.getElementById('lang-toggle');
const langMenu = document.getElementById('lang-menu');

function closeLangMenu() {
    if (!langMenu) return;
    langMenu.classList.remove('open');
    if (langToggleBtn) langToggleBtn.classList.remove('open');
    if (langToggleBtn) langToggleBtn.setAttribute('aria-expanded', 'false');
}

if (langToggleBtn && langMenu) {
    langToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !langMenu.classList.contains('open');
        langMenu.classList.toggle('open');
        langToggleBtn.classList.toggle('open');
        langToggleBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    langMenu.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => {
            langMenu.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            closeLangMenu();
        });
    });

    document.addEventListener('click', (e) => {
        if (!langMenu.contains(e.target) && !langToggleBtn.contains(e.target)) {
            closeLangMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLangMenu();
        }
    });
}

// DOM Elements
const urlInput = document.getElementById('url-input');
const convertBtn = document.getElementById('convert-btn');
const statusSection = document.getElementById('status-section');
const resultSection = document.getElementById('result-section');
const errorSection = document.getElementById('error-section');
const downloadBtn = document.getElementById('download-btn');
const newBtn = document.getElementById('new-btn');
const retryBtn = document.getElementById('retry-btn');

// Store current download data
let currentDownloadData = null;

// Event Listeners
convertBtn.addEventListener('click', handleConvert);
downloadBtn.addEventListener('click', handleDownload);
newBtn.addEventListener('click', resetForm);
retryBtn.addEventListener('click', resetForm);

// Enter key support
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleConvert();
    }
});

// FAQ Section
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

/**
 * Extract YouTube ID from URL
 */
function getYouTubeID(url) {
    try {
        const parsed = new URL(url);

        if (parsed.hostname.includes('youtube.com')) {
            return parsed.searchParams.get('v');
        }

        if (parsed.hostname.includes('youtu.be')) {
            return parsed.pathname.substring(1);
        }

        return null;
    } catch (e) {
        return null;
    }
}

/**
 * Handle conversion button click
 */
function handleConvert() {
    const url = urlInput.value.trim();

    if (!url) {
        showError('Lütfen bir YouTube linki girin');
        return;
    }

    const videoID = getYouTubeID(url);
    if (!videoID) {
        showError('Lütfen geçerli bir YouTube linki girin');
        return;
    }

    // Show loading status
    showStatus();
    performConversion(videoID);
}

/**
 * Perform the actual conversion via API
 */
function performConversion(videoID) {
    fetch(`https://withered-bonus-df4f.vbozcali049.workers.dev/?id=${videoID}`)
        .then(r => r.json())
        .then(data => {
            if (data.link && data.title) {
                currentDownloadData = {
                    title: data.title,
                    link: data.link,
                    duration: data.duration || 'Bilinmiyor',
                    thumbnail: data.thumbnail || null
                };
                showResult(currentDownloadData);
            } else {
                showError(data.msg || 'Video dönüştürülemedi. Lütfen tekrar deneyin.');
            }
        })
        .catch(err => {
            console.error('Conversion error:', err);
            showError('İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        });
}

/**
 * Show status section
 */
function showStatus() {
    hideAllSections();
    statusSection.style.display = 'block';
}

/**
 * Show error section
 */
function showError(message) {
    hideAllSections();
    document.getElementById('error-text').textContent = message;
    errorSection.style.display = 'block';
}

/**
 * Show result section
 */
function showResult(data) {
    hideAllSections();
    document.getElementById('song-title').textContent = data.title + '.mp3';
    document.getElementById('song-duration').textContent = data.duration;
    
    const thumbnail = document.getElementById('thumbnail');
    if (data.thumbnail) {
        thumbnail.innerHTML = `<img src="${data.thumbnail}" alt="Video thumbnail">`;
    } else {
        thumbnail.innerHTML = '<i class="fas fa-music"></i>';
    }

    // Hide input section
    document.querySelector('.input-section').style.display = 'none';
    document.querySelector('.input-section-features').style.display = 'none';
    
    // Show result section
    resultSection.style.display = 'flex';
}

/**
 * Hide all sections
 */
function hideAllSections() {
    statusSection.style.display = 'none';
    resultSection.style.display = 'none';
    errorSection.style.display = 'none';
}

/**
 * Handle download button click
 */
function handleDownload() {
    if (!currentDownloadData || !currentDownloadData.link) {
        showError('İndirme verisi bulunamadı. Lütfen tekrar deneyin.');
        return;
    }

    // Create a temporary anchor element for download
    const link = document.createElement('a');
    link.href = currentDownloadData.link;
    link.download = currentDownloadData.title + '.mp3';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Reset form to initial state
 */
function resetForm() {
    urlInput.value = '';
    currentDownloadData = null;
    hideAllSections();
    
    // Show input section and features again
    document.querySelector('.input-section').style.display = 'block';
    document.querySelector('.input-section-features').style.display = 'block';
    
    urlInput.focus();
}

// Focus on input when page loads
document.addEventListener('DOMContentLoaded', () => {
    urlInput.focus();
});
