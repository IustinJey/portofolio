/*
  Sleek Portfolio — Interactions & Data
  - Minimal particles
  - Scroll reveals
  - Project grid generation
  - Modal with full-width carousel (images + videos)
  - Lightbox w/ keyboard navigation (images + videos)
*/

const $ = (q, s = document) => s.querySelector(q);
const $$ = (q, s = document) => Array.from(s.querySelectorAll(q));

const state = {
  projects: [
    {
      title: 'Millenium+',
      logo: 'MilleniumPlus.png',
      short: 'Ophthalmology practice management suite tailored to a real clinic workflow.',
      overview:
        'MilleniumPlus is a custom ophthalmology platform built around the exact daily workflow. Lightning-fast prescription authoring with meticulous optical calculations, privacy-first records, and role-aware operations. I led discovery interviews, mapped processes with the team (including SEO stakeholder input for the public touchpoints), proposed the architecture, and delivered end-to-end.',
      role: 'Research · Product · Design · Full-stack',
      year: '2025',
      stack: 'KnotJS · JavaScript · Tailwind · Supabase',
      demo: '#',
      repo: '#',
      gallery: [
        { src: 'MilleniumPlus3.png', alt: 'Prescription' },
        { src: 'MilleniumPlus1.png', alt: 'Dashboard' },
        { src: 'MilleniumPlus2.png', alt: 'Appointments' }
      ]
    },
    {
      title: 'KnotJS',
      logo: 'KnotJS.png',
      short: 'First SSR/SPA framework built for speed, flexibility, and SEO dominance.',
      overview:
        'Registry-driven code generation from JSON, plugin-first extensibility (SEO, i18n, tracking, content), and automated technical SEO (sitemaps, resource hints, hreflang, structured data) that adapts from user behavior. Instant apps via CLI, designed for AI-era discovery. Local routing renders as SPA with server-side rendering for first paint.',
      role: 'Creator · Architect · Maintainer',
      year: '2025',
      stack: 'Node.js · JavaScript · SSR · SPA',
      demo: '#',
      repo: '#',
      gallery: [
        { src: 'KnotJS1.png', alt: 'Framework in editor' }
      ]
    },
    {
      title: "R'NQ Core",
      logo: "R'NQ.png",
      short: 'Lead & conversation intelligence: unified tracking, scoring, and playbooks.',
      overview:
        'Tracks every inbound/outbound touch, response latency, question types, and prospect behavior to surface live insights. Prioritization engine and deeply-nestable condition builder feed notifications and custom playbooks. Delivers continuous read on conversation health and next-best actions.',
      role: 'Product · Design · Full-stack',
      year: '2025',
      stack: 'KnotJS · Node.js · Supabase',
      demo: '#',
      repo: '#',
      gallery: [
        { src: "R'NQ1.png", alt: 'Leads stream' },
        { src: "R'NQ2.png", alt: 'Priority scoring' },
        { src: "R'NQ3.png", alt: 'Playbook rules' }
      ]
    },
    {
      title: "Hello R'NQ",
      logo: 'Hello.png',
      short: 'Psychology-driven outreach presentations that convert, Loom-style but smarter.',
      overview:
        "High-fidelity, timed presentations tuned with cognitive principles, copy cadence, motion, and information rhythm engineered for persuasion. Integrates with R'NQ Core for lead context; every viewer action is interpreted to guide follow-ups.",
      role: 'Research · Product · Design · Full-stack',
      year: '2025',
      stack: 'KnotJS · Supabase',
      demo: '#',
      repo: '#',
      gallery: [
        { src: 'Hello1.mp4', alt: 'Walkthrough video', type: 'video' }
      ]
    },
    {
      title: 'Knottrax',
      logo: 'Knottrax.png',
      short: 'High-end behavior analytics with advanced heatmaps and journey intel.',
      overview:
        'Captures every interaction and synthesizes it into session-level narratives and product-level insights. Heatmaps beyond clicks: hesitation, scroll posture, micro-hovers, attention decay, and cohort patterns, all attributed to segments.',
      role: 'Creator · Design · Full-stack',
      year: '2024',
      stack: 'JavaScript · Node.js · Data viz',
      demo: '#',
      repo: '#',
      gallery: [
        { src: 'Knottrax1.png', alt: 'Heatmap view' }
      ]
    },
    {
      title: 'Rithmo Wheel',
      logo: 'RW.png',
      short: 'Ultralight regenerative CVT drive with seamless, infinite gear ratios.',
      overview: 'Ultralight regenerative CVT drive with seamless, infinite gear ratios.',
      role: 'Branding · 3D Visualization ·',
      year: '2023',
      stack: 'Blender · Unreal Engine · Design Language',
      demo: '#',
      repo: '#',
      gallery: [

        { src: 'RW1.mp4', alt: 'Cinematic prototype demo', type: 'video' }
      ],
    }

  ],
  currentIdx: 0,
  currentProject: null,
  lightboxIndex: 0
};

/* Year in footer */
$('#year').textContent = new Date().getFullYear();

/* Particle background — subtle */
(function particles() {
  const c = $('#particles');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h, dpr;
  const dots = [];
  const COUNT = 80;

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = (c.width = innerWidth * dpr);
    h = (c.height = innerHeight * dpr);
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  for (let i = 0; i < COUNT; i++) {
    dots.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.5 + Math.random() * 1.4,
      vx: (-0.15 + Math.random() * 0.3) * dpr,
      vy: (-0.15 + Math.random() * 0.3) * dpr,
      a: 0.15 + Math.random() * 0.25
    });
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    dots.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      g.addColorStop(0, 'rgba(255,0,72,' + p.a + ')');
      g.addColorStop(1, 'rgba(255,0,72,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

/* Reveal on scroll */
const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 }
);

/* Build projects grid */
const grid = $('#projectsGrid');
state.projects.forEach((p, idx) => {
  const article = document.createElement('article');
  article.className = 'card reveal';
  article.setAttribute('role', 'listitem');

  article.innerHTML = `
    <div class="card-head">
      <div class="card-logo" aria-hidden="true">
        <img src="${p.logo}" alt="${p.title} logo"/>
      </div>
      <div>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-sub">${p.short}</p>
      </div>
    </div>
    <div class="card-body">${p.overview}</div>
    <div class="card-actions">
      <a href="#" class="btn ghost" data-open="${idx}">See details</a>
    </div>
  `;

  grid.appendChild(article);
  io.observe(article);
});

/* Modal logic */
const modal = $('#projectModal');
const carTrack = $('#carTrack');
let slideIdx = 0; // for carousel

function isVideoItem(g) {
  if (!g || !g.src) return false;
  if (g.type && g.type.toLowerCase() === 'video') return true;
  return /\.(mp4|webm|ogg)(\?|#|$)/i.test(g.src);
}

function openModal(idx) {
  const p = state.projects[idx];
  state.currentProject = p;
  state.currentIdx = idx;
  slideIdx = 0;

  $('#modalTitle').textContent = p.title.toUpperCase();
  $('#modalDesc').textContent = p.short; // subheadline small description
  $('#modalOverview').textContent = p.overview;
  $('#modalRole').textContent = p.role;
  $('#modalYear').textContent = p.year;
  $('#modalStack').textContent = p.stack;

  const demoBtn = $('#modalDemo');
  const repoBtn = $('#modalRepo');
  if (p.demo && p.demo !== '#') {
    demoBtn.href = p.demo;
    demoBtn.style.display = 'inline-flex';
  } else demoBtn.style.display = 'none';
  if (p.repo && p.repo !== '#') {
    repoBtn.href = p.repo;
    repoBtn.style.display = 'inline-flex';
  } else repoBtn.style.display = 'none';

  // Build slides full-width (images or videos)
  carTrack.innerHTML = '';
  p.gallery.forEach((g, i) => {
    const slide = document.createElement('div');
    slide.className = 'car-slide';

    if (isVideoItem(g)) {
      const v = document.createElement('video');
      v.setAttribute('preload', 'metadata');
      v.setAttribute('playsinline', '');
      v.setAttribute('muted', '');       // quiet in carousel
      v.setAttribute('loop', '');        // gentle motion if user plays
      v.src = g.src;
      v.title = g.alt || (p.title + ' video');
      // We open the lightbox on click of the SLIDE to avoid fighting controls
      slide.addEventListener('click', () => openLightbox(i));
      slide.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = g.src;
      img.alt = g.alt || (p.title + ' screenshot');
      img.loading = 'lazy';
      img.decoding = 'async';
      img.addEventListener('click', () => openLightbox(i));
      slide.appendChild(img);
    }

    carTrack.appendChild(slide);
  });
  updateCarousel();

  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateCarousel() {
  const width = $('.carousel').clientWidth;
  carTrack.style.transform = `translateX(-${width * slideIdx}px)`;
}

$('[data-prev]').addEventListener('click', () => {
  slideIdx = Math.max(0, slideIdx - 1);
  updateCarousel();
});
$('[data-next]').addEventListener('click', () => {
  const max = state.currentProject ? state.currentProject.gallery.length - 1 : 0;
  slideIdx = Math.min(max, slideIdx + 1);
  updateCarousel();
});

window.addEventListener('resize', () => {
  if (modal.getAttribute('aria-hidden') === 'false') updateCarousel();
});

$$('[data-close]').forEach(b => b.addEventListener('click', closeModal));

// delegate open
grid.addEventListener('click', e => {
  const btn = e.target.closest('[data-open]');
  if (!btn) return;
  e.preventDefault();
  openModal(parseInt(btn.getAttribute('data-open'), 10));
});

// keyboard for modal
window.addEventListener('keydown', e => {
  if (modal.getAttribute('aria-hidden') === 'true') return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') $('[data-prev]').click();
  if (e.key === 'ArrowRight') $('[data-next]').click();
});

/* Lightbox */
const lightbox = $('#lightbox');
const lightboxImg = $('#lightboxImg');
const lightboxVideo = $('#lightboxVideo');
const lightboxCaption = $('#lightboxCaption');

function showLightboxImage(src, alt) {
  // hide video, pause + clear
  lightboxVideo.pause();
  lightboxVideo.removeAttribute('src');
  lightboxVideo.style.display = 'none';

  // show image
  lightboxImg.src = src;
  lightboxImg.alt = alt || 'Screenshot';
  lightboxImg.style.display = '';
}

function showLightboxVideo(src, alt) {
  // hide image
  lightboxImg.removeAttribute('src');
  lightboxImg.style.display = 'none';

  // show video
  lightboxVideo.src = src;
  lightboxVideo.setAttribute('playsinline', '');
  lightboxVideo.controls = true;
  lightboxVideo.style.display = '';
  // Do NOT autoplay by default — user can press play.
}

function openLightbox(i) {
  state.lightboxIndex = i;
  const g = state.currentProject.gallery[i];
  lightboxCaption.textContent = g.alt || '';

  if (isVideoItem(g)) {
    showLightboxVideo(g.src, g.alt);
  } else {
    showLightboxImage(g.src, g.alt);
  }
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.setAttribute('aria-hidden', 'true');
  // Pause & clear video when closing
  lightboxVideo.pause();
  // keep src so browser can cache; optional to clear:
  // lightboxVideo.removeAttribute('src');
}

$$('[data-lightbox-close]').forEach(el => el.addEventListener('click', closeLightbox));
$('[data-lightbox-prev]').addEventListener('click', () => {
  shiftLightbox(-1);
});
$('[data-lightbox-next]').addEventListener('click', () => {
  shiftLightbox(1);
});

function shiftLightbox(delta) {
  const len = state.currentProject.gallery.length;
  state.lightboxIndex = (state.lightboxIndex + delta + len) % len;
  const g = state.currentProject.gallery[state.lightboxIndex];
  lightboxCaption.textContent = g.alt || '';

  if (isVideoItem(g)) {
    showLightboxVideo(g.src, g.alt);
  } else {
    // make sure any previously playing video is paused
    lightboxVideo.pause();
    showLightboxImage(g.src, g.alt);
  }
}

window.addEventListener('keydown', e => {
  if (lightbox.getAttribute('aria-hidden') === 'true') return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') shiftLightbox(-1);
  if (e.key === 'ArrowRight') shiftLightbox(1);
});

/* Accessibility: clicking backdrops close */
$('.modal-backdrop').addEventListener('click', closeModal);
$('.lightbox-backdrop').addEventListener('click', closeLightbox);

/* Progressive enhancement: add reveal class to hero & section headers */
$$('.hero, .section-head').forEach(el => {
  el.classList.add('reveal');
  io.observe(el);
});
