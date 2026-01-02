# MP3YT - YouTube to MP3 Converter

A modern, fast, and secure YouTube to MP3 converter built with Astro. Convert any YouTube video to MP3 instantly with a clean, user-friendly interface.

## 🚀 Features

- **Fast Conversion**: Convert YouTube videos to MP3 in seconds
- **Secure**: Your data is never stored; all processing is encrypted
- **Mobile-Friendly**: Works on all devices (desktop, tablet, mobile)
- **Bilingual**: Support for Turkish (TR) and English (EN)
- **Dark Mode**: Beautiful dark theme support
- **No Signup**: No registration required
- **Free**: Completely free to use

## 🛠️ Technology Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: CSS3 with CSS Variables
- **Runtime**: JavaScript (ES6+)
- **Icons**: Font Awesome 6.4.0

## 📁 Project Structure

```text
mp3yt.link/
├── public/                 # Static assets
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro   # Main layout with styles
│   ├── pages/
│   │   ├── index.astro        # Turkish home page
│   │   ├── en/
│   │   │   └── index.astro    # English home page
│   │   ├── dmca/
│   │   │   └── index.astro    # DMCA policy page
│   │   ├── privacy/
│   │   │   └── index.astro    # Privacy policy page
│   │   └── terms/
│   │       └── index.astro    # Terms of use page
├── astro.config.mjs        # Astro configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
```bash
cd mp3yt.link
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The server will start at `http://localhost:4321/`

### Build

Build for production:
```bash
npm run build
```

This generates static HTML files in the `dist/` directory.

### Preview

Preview the production build locally:
```bash
npm run preview
```

## 📝 Pages

- `/` - Turkish home page with converter interface
- `/en/` - English home page with converter interface
- `/dmca/` - DMCA policy page
- `/privacy/` - Privacy policy page
- `/terms/` - Terms of use page

## 🎨 Customization

### Colors
Edit the CSS variables in `src/layouts/BaseLayout.astro`:
```css
:root {
    --primary-red: #dc2626;
    --primary-red-dark: #b91c1c;
    --primary-red-light: #ef4444;
    --background: #f9fafb;
    --surface: #ffffff;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --border: #e5e7eb;
    --success: #10b981;
    --error: #ef4444;
}
```

### Dark Mode
Dark mode is automatically applied based on system preferences or user preference. Theme preference is saved in localStorage.

### API Endpoint
The conversion API endpoint can be changed in the page scripts:
```javascript
fetch(`https://your-api.com/?id=${videoID}`)
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔒 Security Features

- No data storage: Videos are not stored after processing
- HTTPS only: All connections are encrypted
- No tracking: No cookies for user tracking
- GDPR compliant: Minimal data collection

## 📄 Legal

- [DMCA Policy](/dmca/)
- [Privacy Policy](/privacy/)
- [Terms of Use](/terms/)

## 📞 Support

For support or questions, contact us at: contact@mp3yt.link

## 📝 License

This project is provided as-is. Use responsibly and in compliance with local laws and copyright regulations.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Dark mode inspiration from modern web apps

---

**Note**: This tool is designed for personal use. Users are responsible for ensuring they have proper rights to download and convert content.

