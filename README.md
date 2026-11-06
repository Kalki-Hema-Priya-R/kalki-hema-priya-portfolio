# Kalki Hema Priya R | Portfolio

Personal portfolio of **Kalki Hema Priya R**, Java Full Stack Developer (Spring Boot, Hibernate/JPA, REST APIs, MySQL).

🌐 **Live site:** https://kalki-hema-priya-r.github.io/kalki-hema-priya-portfolio/
💼 **LinkedIn:** https://www.linkedin.com/in/kalki-hema-priya-r/
🐙 **GitHub:** https://github.com/Kalki-Hema-Priya-R

Built with plain HTML, CSS and JavaScript. No framework and no build step, so it deploys straight to GitHub Pages.

## ✨ Features

- Modern dark design with gradient accents, glass-style cards and smooth scroll animations
- Animated hero with a typing role effect and quick stats
- Sections: Home, About, Technical Skills, Work Experience, Featured Projects, Industry Exposure, Education & Certifications, Contact
- Project slider with an endless loop, autoplay (pauses on hover or touch), arrows, dots and swipe
- **Resume preview popup**, plus Download and Open in new tab options
- **Floating WhatsApp button** that appears after 15% scroll
- Contact form that opens Gmail (or the default mail app) with the message filled in
- Scroll progress bar, active menu highlighting and a responsive mobile menu
- Custom **404 page** and **offline page** (self-contained, so they look right anywhere)
- **Offline support:** a service worker saves the site on the first visit
- Favicon (ICO, SVG and PNG), web app manifest, `robots.txt`, `sitemap.xml` and link-preview (Open Graph) tags
- Respects the "reduce motion" setting

## 📁 Project structure

```
├── index.html               Main portfolio page
├── style.css                All styles
├── script.js                Menu, animations, carousel, WhatsApp button, resume popup, service worker
├── 404.html                 Page not found (self-contained)
├── offline.html             No internet page (self-contained)
├── sw.js                    Service worker (offline caching)
├── manifest.webmanifest     Install-as-app settings
├── favicon.ico / favicon.svg
├── robots.txt / sitemap.xml SEO files
├── .nojekyll                Tells GitHub Pages to serve files as they are
├── assets/
│   ├── profile.jpg          Profile photo
│   ├── icons/               Favicon and app icons (PNG)
│   └── projects/            Project illustrations (SVG)
└── resume/
    └── Kalki-Hema-Priya-Resume.pdf
```

## 🚀 Run locally

1. Download or clone the repo and **extract it fully** (don't open files from inside a zip).
2. Open `index.html` in a browser, or use the VS Code **Live Server** extension.

The offline feature (service worker) only works on `https://` or `localhost`, not when opening the file directly.

## 🌍 Deploy on GitHub Pages

1. Push the files to the `main` branch.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, then **main** and **/ (root)**, and click **Save**.
4. After 1 to 2 minutes the site is live at the link above. Press **Ctrl+Shift+R** to see the latest version.

## 🛠️ How to customize

| What to change | Where |
|---|---|
| Text, projects, skills, education | `index.html` |
| Colors and fonts | `:root` variables at the top of `style.css` |
| Profile photo | Replace `assets/profile.jpg` (keep the same name) |
| Resume | Replace `resume/Kalki-Hema-Priya-Resume.pdf` (keep the same name) |
| WhatsApp number or message | The `wa.me` links in `index.html` (button and footer) |
| Naukri link | The Naukri icon link in the hero section of `index.html` |
| Typing role words | `data-words` on the `#typed` heading in `index.html` |
| Slider speed | The `6000` (milliseconds) in the carousel code in `script.js` |

> **Important:** after changing any file, increase the version in `sw.js` (for example `kalki-v3` → `kalki-v4`) so visitors get the new files instead of the saved copy.

If the site moves to a different address or repo name, update the URLs in `index.html` (canonical and Open Graph tags), `robots.txt`, `sitemap.xml`, `manifest.webmanifest` and the `BASE` path in `sw.js`.

## 📄 License

© Kalki Hema Priya R. All rights reserved. Please don't copy the content or photo without permission.
