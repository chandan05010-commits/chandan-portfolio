# Chandan Tiwari - Personal Portfolio Website

A modern, responsive personal portfolio website built with HTML5, CSS3, and Vanilla JavaScript. Features a premium dark-purple theme inspired by modern software engineering portfolios. Designed for a B.Tech CSE student to showcase projects, skills, and contact information for internship and job applications.

## 🚀 Features

- **Premium Dark-Purple Theme** - Default dark theme with elegant purple gradients and glows
- **Dark/Light Theme Toggle** - Persists preference in localStorage, respects system preference
- **Fully Responsive** - Mobile (375px+), tablet (768px+), desktop (1024px+), large desktop (1440px+)
- **Modern Design** - Clean typography, smooth animations, subtle shadows, glassmorphism effects
- **Accessible** - Semantic HTML, keyboard navigation, ARIA labels, WCAG AA color contrast, reduced motion support
- **Vanilla JavaScript** - No frameworks, easy to understand and maintain
- **Form Validation** - Client-side validation with helpful error messages
- **Mailto Contact Form** - Opens user's default email client with pre-filled message
- **Profile Image Fallback** - Graceful fallback to SVG placeholder if photo is missing
- **Resume Download** - Works with local PDF file, helpful message if missing
- **Coding Profile Section** - LeetCode and GitHub stats display
- **Print Styles** - Clean print layout for PDF generation

## 📁 Project Structure

```
my portfolio/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # All styles (dark-purple theme)
├── js/
│   └── script.js           # All JavaScript functionality
├── assets/
│   ├── favicon.svg         # Site favicon (purple gradient CT)
│   └── profile-placeholder.svg  # Placeholder profile image (purple CT initials)
├── resume/
│   ├── README.txt          # Instructions for resume
│   └── Chandan_Tiwari_Resume.pdf  # Your resume (copied from Downloads)
└── README.md               # This file
```

## 🛠️ Setup Instructions

### 1. Open in Browser (Quick Start)

**Option A: VS Code Live Server (Recommended)**
1. Open the `my portfolio` folder in VS Code
2. Install "Live Server" extension if not installed
3. Right-click `index.html` → "Open with Live Server"
4. Site opens at `http://127.0.0.1:5500`

**Option B: Direct File Open**
- Double-click `index.html` to open in your default browser
- Note: Some features (like fetch for resume check) may not work with `file://` protocol

### 2. Add Your Profile Photo

1. Save your photo as `profile.jpg` in the `assets/` folder
2. Recommended: 400x400px or larger, square aspect ratio
3. The site will automatically use it
4. If missing, shows a professional purple "CT" initials placeholder

### 3. Resume (Already Configured)

The resume PDF has been copied from your Downloads folder to `resume/Chandan_Tiwari_Resume.pdf`. The download button works automatically.

To update your resume later:
1. Save your new resume as PDF
2. Name it exactly: `Chandan_Tiwari_Resume.pdf`
3. Replace the file in `resume/` folder

### 4. Update Project Links (When Ready)

Both project repositories are currently private. When you make them public:
1. Edit `index.html`
2. Update the GitHub links in the Projects section
3. Change "Live Demo — Coming Soon" buttons to actual deployed URLs
4. Remove the `disabled` attribute and `btn-disabled` class from Live Demo buttons

## 🎨 Customization

### Colors (CSS Variables)

Edit `css/style.css` - `:root` section (Dark theme) and `[data-theme="light"]` section:

```css
:root {
    --color-bg-primary: #0d061a;        /* Main background */
    --color-bg-secondary: #150d2d;      /* Section backgrounds */
    --color-accent: #a855f7;            /* Primary purple */
    --color-accent-hover: #c084fc;      /* Hover state */
    --font-family: 'Inter', ...;        /* Typography */
    /* ... more variables */
}
```

### Theme Colors

The site supports both dark (default) and light themes. Colors are defined in CSS custom properties and switch automatically. The dark theme is the premium default.

## 📚 Sections Included

1. **Navigation** - Fixed header with logo, links, theme toggle, mobile hamburger
2. **Hero** - Name, title, description, CTAs, social links, profile image
3. **About Me** - Introduction, stats (graduation year, projects, LeetCode)
4. **Technical Skills** - Current skills (11) + Currently learning (3) visually separated
5. **Education** - Timeline with B.Tech, Class 12, Class 10 details
6. **Projects** - Two professional cards with status badges, tech stacks, links
7. **Certifications** - JavaScript (Infosys), Java Language (LearnQuest/Coursera)
8. **Coding Profile** - LeetCode (100+ solved) + GitHub cards
9. **Resume** - Preview + download button linked to actual PDF
10. **Contact** - Info cards + mailto-based contact form with validation
11. **Footer** - Name, tagline, navigation, social links, copyright

## ✅ Testing Checklist

### Functionality Tests
- [x] Theme toggle switches between light/dark
- [x] Theme preference persists after reload (localStorage)
- [x] Default theme is dark (premium purple)
- [x] Mobile hamburger menu opens/closes
- [x] Navigation links scroll smoothly to sections
- [x] Active nav link highlights on scroll
- [x] Profile image loads (or shows placeholder if missing)
- [x] Resume download works (PDF exists)
- [x] Contact form validates required fields
- [x] Contact form shows error messages
- [x] Contact form opens mailto with pre-filled data
- [x] Current year updates automatically
- [x] Counter animations trigger on scroll
- [x] Scroll animations work on sections
- [x] All external links open in new tabs with rel="noopener noreferrer"
- [x] Footer navigation links work
- [x] Project status badges display correctly
- [x] Coding profile stats animate

### Responsive Tests
- [x] Mobile (< 480px): Stacked layout, hamburger menu, full-width buttons
- [x] Mobile (375px, 430px): No horizontal scrolling, readable text
- [x] Tablet (480-768px): Adjusted spacing, grid columns
- [x] Desktop (768-1024px): Two-column layouts where appropriate
- [x] Large Desktop (> 1024px): Full layout with max-width container
- [x] 1440px: Optimal reading width

### Browser Tests
- [x] Chrome/Edge (latest)
- [x] Firefox (latest)
- [x] Safari (latest)

### Accessibility Tests
- [x] Keyboard navigation works (Tab, Enter, Escape)
- [x] Focus indicators visible on all interactive elements
- [x] ARIA labels on interactive elements
- [x] Color contrast meets WCAG AA
- [x] Semantic HTML structure
- [x] Alt text on images
- [x] Reduced motion respected
- [x] Form labels properly associated

## 🐛 Known Limitations

1. **Contact Form** - Uses mailto: protocol. Opens user's default email client. Does not send email directly. Some users without configured mail clients may need to copy email manually.
2. **Resume Check** - Uses fetch HEAD request; may not work on `file://` protocol (works on Live Server).
3. **Profile Image** - Checks existence on load; caches result.
4. **Private Repositories** - Project GitHub links point to private repos. Buttons show "(Private)" label.
5. **Live Demos** - Currently "Coming Soon" - update when deployed.
6. **No Build Step** - Direct browser execution, no bundling needed.
7. **LeetCode Stats** - Static "100+" count, not live-synced.

## 📝 Updating Your Information

### Personal Details
Edit `index.html` to update:
- Name, title, description in Hero section
- About me text
- Education details
- Contact information
- Social media URLs

### Skills
Edit the Skills section in `index.html`:
- Current skills list
- Currently learning list

### Projects
Edit the Projects section in `index.html`:
- Project titles, descriptions
- Technology tags
- GitHub repository URLs
- Live demo URLs (when available)

### Certifications
Edit the Certifications section in `index.html`:
- Certification names
- Issuing organizations
- Descriptions

## 📄 License

This project is for personal/educational use. Feel free to customize for your own portfolio.

## 👨‍💻 Author

**Chandan Tiwari**
- B.Tech CSE, GL Bajaj Institute of Technology and Management
- Expected Graduation: 2029
- Current Year: 2nd Year
- Location: Gonda, Uttar Pradesh
- Email: chandan05010@gmail.com
- Phone: +91 89575 63628
- GitHub: https://github.com/chandan05010-commits
- LinkedIn: https://www.linkedin.com/in/chandan-tiwari-9b3115380/
- LeetCode: https://leetcode.com/Chandan3628

---

*Built with HTML5, CSS3, and Vanilla JavaScript following modern web standards and accessibility guidelines.*