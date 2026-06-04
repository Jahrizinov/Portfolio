
const canvas = document.getElementById('om-canvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = Array.from({ length: 120 }, () => ({
  x:     Math.random() * canvas.width,
  y:     Math.random() * canvas.height,
  r:     Math.random() * 1.5 + 0.3,
  vx:    (Math.random() - 0.5) * 0.3,
  vy:    (Math.random() - 0.5) * 0.3,
  o:     Math.random() * 0.5 + 0.1,
  pulse: Math.random() * Math.PI * 2,
}));

const purples = ['#c084fc', '#a87de8', '#7b4fd4', '#5a3a9e', '#3d1f8c'];

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const t = Date.now() * 0.001;

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0)            p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0)             p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    const flicker = p.o * (0.7 + 0.3 * Math.sin(t * 1.5 + p.pulse));
    ctx.globalAlpha = flicker;
    ctx.fillStyle   = purples[Math.floor(p.r * 2) % purples.length];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Connectielijnen
  ctx.globalAlpha = 0.04;
  ctx.strokeStyle = '#7b4fd4';
  ctx.lineWidth   = 0.5;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}

drawParticles();

// ---- TYPEWRITER ----
const titleEl   = document.getElementById('om-title');
const titleText = 'OVER MIJ';
titleEl.textContent = '';
let charIndex = 0;

function typeWriter() {
  if (charIndex < titleText.length) {
    titleEl.textContent += titleText[charIndex];
    charIndex++;
    setTimeout(typeWriter, 100);
  }
}

setTimeout(typeWriter, 300);

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');
const tlItems   = document.querySelectorAll('.tl-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (!entry.isIntersecting) return;

    setTimeout(() => {
      entry.target.classList.add('show');

      // Skill bars animeren
      entry.target.querySelectorAll('.skill-bar-fill[data-width]').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });

      // Counter animeren
      entry.target.querySelectorAll('.counter[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target);
        if (el.dataset.type === 'year') { el.textContent = target; return; }

        let current = 0;
        const step  = Math.ceil(target / 30);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current;
        }, 40);
      });
    }, idx * 80);
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// Tijdlijn items apart animeren
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('show'), idx * 150);
    }
  });
}, { threshold: 0.1 });

tlItems.forEach(el => tlObserver.observe(el));

// ---- HAMBURGER ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger?.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});