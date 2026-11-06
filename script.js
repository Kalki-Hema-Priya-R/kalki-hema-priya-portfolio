const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll('main section[id]')];
const navItems = [...document.querySelectorAll('.nav-links a')];
window.addEventListener('scroll', () => {
  const y = window.scrollY + 140;
  let current = sections[0]?.id;
  sections.forEach(section => {
    if (y >= section.offsetTop) current = section.id;
  });
  navItems.forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${current}`));
});

const messageForm = document.getElementById('messageForm');
if (messageForm) {
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(messageForm);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `Portfolio message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=kalkihemapriya.r4@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const popup = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    const note = document.getElementById('formNote');
    if (popup) {
      if (note) note.textContent = 'Gmail compose opened with your message.';
    } else {
      window.location.href = `mailto:kalkihemapriya.r4@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (note) note.textContent = 'Opening your default email app...';
    }
  });
}

/* Project carousel: one project visible at a time. */
const projectTrack = document.querySelector('.project-grid');
const projectCards = [...document.querySelectorAll('.project-grid .project-card')];
const projectPrev = document.querySelector('.project-prev');
const projectNext = document.querySelector('.project-next');
const projectDots = [...document.querySelectorAll('.project-dot')];
let projectPage = 0;

function updateProjectCarousel() {
  if (!projectTrack || !projectCards.length) return;
  projectPage = (projectPage + projectCards.length) % projectCards.length;
  projectTrack.style.transform = `translateX(-${projectPage * 100}%)`;
  projectDots.forEach((dot, i) => dot.classList.toggle('active', i === projectPage));
}

projectNext?.addEventListener('click', () => {
  projectPage++;
  updateProjectCarousel();
});
projectPrev?.addEventListener('click', () => {
  projectPage--;
  updateProjectCarousel();
});
projectDots.forEach((dot, i) => dot.addEventListener('click', () => {
  projectPage = i;
  updateProjectCarousel();
}));

updateProjectCarousel();

/* Scroll progress bar + cursor glow */
const bar = document.getElementById('progress'), glow = document.getElementById('glow');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
});
window.addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

/* Typing role effect */
const typed = document.getElementById('typed');
if (typed && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const words = typed.dataset.words.split('|'); let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    typed.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();
}

/* Offline support: register service worker + connection toast */
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
const toast = document.createElement('div');
toast.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translate(-50%,120px);padding:12px 22px;border-radius:999px;background:rgba(14,16,34,.95);border:1px solid rgba(255,255,255,.15);font-size:13px;z-index:200;transition:.4s;color:#fff';
document.body.appendChild(toast);
const showToast = (t) => { toast.textContent = t; toast.style.transform = 'translate(-50%,0)'; setTimeout(() => toast.style.transform = 'translate(-50%,120px)', 3000); };
addEventListener('offline', () => showToast('📡 You are offline, showing saved content'));
addEventListener('online', () => showToast('✅ Back online'));

/* Carousel: endless loop, autoplay (pauses on hover/touch) and swipe */
const carouselEl = document.querySelector('.project-carousel');
let carouselPaused = false, touchX = 0;
setInterval(() => { if (!carouselPaused && !document.hidden) { projectPage++; updateProjectCarousel(); } }, 6000);
['mouseenter', 'focusin'].forEach(ev => carouselEl?.addEventListener(ev, () => carouselPaused = true));
['mouseleave', 'focusout'].forEach(ev => carouselEl?.addEventListener(ev, () => carouselPaused = false));
carouselEl?.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; carouselPaused = true; }, { passive: true });
carouselEl?.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) { projectPage += dx < 0 ? 1 : -1; updateProjectCarousel(); }
  setTimeout(() => carouselPaused = false, 8000);
});

/* WhatsApp button: appears after 15% scroll */
const wa = document.getElementById('waFloat');
const waCheck = () => { const h = document.documentElement; wa.classList.toggle('show', h.scrollTop / (h.scrollHeight - h.clientHeight) >= 0.15); };
addEventListener('scroll', waCheck, { passive: true }); waCheck();

/* Resume popup */
const modal = document.getElementById('resumeModal'), frame = document.getElementById('resumeFrame'), openBtn = document.getElementById('openResume');
function openResume() {
  if (!frame.getAttribute('src')) frame.src = 'resume/Kalki-Hema-Priya-Resume.pdf#view=FitH';
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('lock');
  modal.querySelector('.modal-close').focus();
}
function closeResume() {
  modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('lock'); openBtn?.focus();
}
openBtn?.addEventListener('click', e => { e.preventDefault(); openResume(); });
modal?.addEventListener('click', e => { if (e.target === modal || e.target.closest('.modal-close')) closeResume(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeResume(); });
