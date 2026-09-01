/**
 * Photography Color Hunt - Cute & Colorful Interactive Animations Engine
 * Adds ambient floating particles, interactive color bursts, and playful micro-animations.
 */

window.CuteAnimations = (function () {
  const COLOR_HEX_MAP = {
    Red: '#FF3B30',
    Orange: '#FF9F0A',
    Yellow: '#FFD60A',
    Green: '#30D158',
    Blue: '#0A84FF',
    Purple: '#BF5AF2',
    Pink: '#FF375F'
  };

  const EMOJI_SPARKLES = ['✨', '✦', '✧', '★', '💖', '🌸', '📸', '🎨', '🌈', '🌿', '💡'];

  let canvas = null;
  let ctx = null;
  let ambientStars = [];
  let animFrameId = null;

  function init() {
    setupAmbientCanvas();
    bindClickBursts();
    bindFooterSwatches();
  }

  /* ---------------------------------------------------------
     1. Ambient Twinkling & Drifting Background Stars (Canvas)
     --------------------------------------------------------- */
  function setupAmbientCanvas() {
    canvas = document.createElement('canvas');
    canvas.className = 'ambient-sparkles-canvas';
    canvas.id = 'ambient-sparkles-canvas';
    document.body.prepend(canvas);

    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create 35 soft ambient twinkling stars
    const starColors = Object.values(COLOR_HEX_MAP).concat(['#FFFFFF', '#FFE4B5', '#E6E6FA']);
    ambientStars = Array.from({ length: 32 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2.5 + 1.2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      alpha: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseAngle: Math.random() * Math.PI * 2
    }));

    animateAmbientStars();
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function animateAmbientStars() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < ambientStars.length; i++) {
      const s = ambientStars[i];
      s.x += s.speedX;
      s.y += s.speedY;
      s.pulseAngle += s.pulseSpeed;

      // Wrap around edges
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;

      const currentAlpha = Math.max(0.1, s.alpha + Math.sin(s.pulseAngle) * 0.35);

      // Draw diamond / 4-point star
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.globalAlpha = currentAlpha;
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.moveTo(0, -s.size * 2.2);
      ctx.quadraticCurveTo(0, 0, s.size * 2.2, 0);
      ctx.quadraticCurveTo(0, 0, 0, s.size * 2.2);
      ctx.quadraticCurveTo(0, 0, -s.size * 2.2, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s.size * 2.2);
      ctx.fill();
      ctx.restore();
    }

    animFrameId = requestAnimationFrame(animateAmbientStars);
  }

  /* ---------------------------------------------------------
     2. Interactive Colorful Click / Tap Particle Bursts
     --------------------------------------------------------- */
  function bindClickBursts() {
    document.addEventListener('click', (e) => {
      // 1. If clicking a square card
      const card = e.target.closest('.square-color-card');
      if (card) {
        const colorName = card.dataset.color || 'Purple';
        const hex = COLOR_HEX_MAP[colorName] || '#BF5AF2';
        spawnSparkleBurst(e.clientX, e.clientY, hex, [colorName === 'Natural' ? '🌿' : '✨', '✦', '✧', '★', '📸']);
        return;
      }

      // 2. If clicking cute badges in header
      const badge = e.target.closest('.cute-floating-badge');
      if (badge) {
        const rect = badge.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const randomHex = Object.values(COLOR_HEX_MAP)[Math.floor(Math.random() * 7)];
        spawnSparkleBurst(centerX, centerY, randomHex, ['✨', '🌈', '💖', '★', '🎨']);
        return;
      }

      // 3. If clicking a button
      const btn = e.target.closest('.btn-primary, .antigravity-badge, .footer-disclaimer-badge');
      if (btn) {
        const randomHex = Object.values(COLOR_HEX_MAP)[Math.floor(Math.random() * 7)];
        spawnSparkleBurst(e.clientX, e.clientY, randomHex, ['✨', '✧', '💖', '★']);
      }
    });
  }

  function spawnSparkleBurst(x, y, primaryColor = '#BF5AF2', emojiList = ['✨', '✦', '★', '✧']) {
    const particleCount = 10;
    const colors = [primaryColor, '#FFFFFF', '#FFD60A', '#FF375F', '#30D158'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'cute-particle';

      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.8;
      const distance = Math.random() * 65 + 35;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const rotation = (Math.random() - 0.5) * 360;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
      particle.style.setProperty('--rot', `${rotation}deg`);

      // Alternate between emojis, glowing stars, and colored dots
      if (i % 3 === 0) {
        particle.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
        particle.style.fontSize = `${Math.random() * 10 + 14}px`;
      } else if (i % 3 === 1) {
        particle.textContent = '✦';
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.fontSize = `${Math.random() * 8 + 12}px`;
        particle.style.textShadow = `0 0 8px ${particle.style.color}`;
      } else {
        // Glowing dot
        particle.style.width = `${Math.random() * 7 + 6}px`;
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
      }

      document.body.appendChild(particle);

      // Clean up DOM after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 950);
    }
  }

  /* ---------------------------------------------------------
     3. Footer Swatches Click Fireworks & Wave Effect
     --------------------------------------------------------- */
  function bindFooterSwatches() {
    document.addEventListener('click', (e) => {
      const bubble = e.target.closest('.footer-color-bubble');
      if (!bubble) return;

      const colorName = bubble.dataset.color;
      const hex = COLOR_HEX_MAP[colorName] || bubble.style.getPropertyValue('--c') || '#BF5AF2';
      const rect = bubble.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      spawnSparkleBurst(x, y, hex, ['✨', '💖', '★', '🌈', '🎨']);
      
      // Fun bubble jump effect
      bubble.style.transform = 'scale(1.8) translateY(-10px)';
      setTimeout(() => {
        bubble.style.transform = '';
      }, 300);

      if (window.App && typeof window.App.showToast === 'function') {
        window.App.showToast(`✨ ${colorName.toUpperCase()} selected!`, 'info');
      }
    });
  }

  return {
    init,
    spawnSparkleBurst
  };
})();
