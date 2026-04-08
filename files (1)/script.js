/* ════════════════════════════════════════
   OMAR ATTAR PORTFOLIO — script.js
   ════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── INJECT EMBEDDED IMAGES ──────────────
  // Profile photo (base64 from data.js)
  const profileImg = document.getElementById('profileImg');
  const galleryProfileImg = document.getElementById('galleryProfileImg');
  const photoModalImg = document.getElementById('photoModalImg');
  if (profileImg && typeof PROFILE_IMG !== 'undefined') {
    profileImg.src = 'data:image/jpeg;base64,' + PROFILE_IMG;
  }
  if (galleryProfileImg && typeof PROFILE_IMG !== 'undefined') {
    galleryProfileImg.src = 'data:image/jpeg;base64,' + PROFILE_IMG;
  }
  if (photoModalImg && typeof PROFILE_IMG !== 'undefined') {
    photoModalImg.src = 'data:image/jpeg;base64,' + PROFILE_IMG;
  }

  // ── THEME TOGGLE ────────────────────────
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const toggleIcon = document.getElementById('toggleIcon');
  const saved = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);
  toggleIcon.textContent = saved === 'dark' ? '○ Light' : '◑ Dark';

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggleIcon.textContent = next === 'dark' ? '○ Light' : '◑ Dark';
  });

  // ── NAV SCROLL ──────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  });

  // ── HAMBURGER ───────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    const [s1, s2] = hamburger.querySelectorAll('span');
    if (open) {
      s1.style.transform = 'translateY(7px) rotate(45deg)';
      s2.style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      s1.style.transform = '';
      s2.style.transform = '';
    }
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => s.style.transform = '');
    });
  });

  // ── ACTIVE NAV ──────────────────────────
  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    document.querySelectorAll('.section').forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sec.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ── REVEAL ON SCROLL ────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── GALLERY FILTER ──────────────────────
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
      });
    });
  });

  // ── SMOOTH SCROLL ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
      }
    });
  });

});

// ── PDF MODAL ────────────────────────────
function openPDF(dataUri, title) {
  document.getElementById('modalTitle').textContent = title || 'Certificate';
  document.getElementById('modalFrame').src = dataUri;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('modalFrame').src = '';
  document.body.style.overflow = '';
}

// ── PHOTO MODAL ──────────────────────────
function openPhotoModal() {
  document.getElementById('photoModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePhotoModal() {
  document.getElementById('photoModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modals on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closePhotoModal(); }
});
