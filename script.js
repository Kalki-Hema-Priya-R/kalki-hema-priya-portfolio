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
  projectPage = Math.max(0, Math.min(projectPage, projectCards.length - 1));
  projectTrack.style.transform = `translateX(-${projectPage * 100}%)`;
  projectDots.forEach((dot, i) => dot.classList.toggle('active', i === projectPage));
  if (projectPrev) projectPrev.disabled = projectPage === 0;
  if (projectNext) projectNext.disabled = projectPage === projectCards.length - 1;
}

projectNext?.addEventListener('click', () => {
  if (projectPage < projectCards.length - 1) projectPage++;
  updateProjectCarousel();
});
projectPrev?.addEventListener('click', () => {
  if (projectPage > 0) projectPage--;
  updateProjectCarousel();
});
projectDots.forEach((dot, i) => dot.addEventListener('click', () => {
  projectPage = i;
  updateProjectCarousel();
}));

updateProjectCarousel();
