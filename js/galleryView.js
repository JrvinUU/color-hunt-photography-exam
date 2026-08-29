/**
 * Photography Color Hunt - Finished Exhibition Gallery View Controller
 * 16:9 Widescreen exhibition cards, 7 Color filters, Full-Screen Lightbox & Critique Presentation mode.
 */

window.GalleryView = (function() {
  let activeColor = 'ALL';
  let activeCategory = 'ALL';
  let activeSection = 'ALL';
  let searchQuery = '';
  let currentLightboxIndex = 0;
  let filteredSubmissions = [];

  function render(container, state) {
    // Only approved groups with slide submission
    const availableGroups = state.groups.filter(g => g.status === 'approved' && g.submission?.slideUrl);

    // Calculate color counts
    const colorCounts = { ALL: availableGroups.length };
    ColorHuntDistribution.COLORS.forEach(c => {
      colorCounts[c] = availableGroups.filter(g => g.color === c).length;
    });

    container.innerHTML = `
      <div class="gallery-view">
        <!-- Reference Slide Hero Frame (Aesthetic matches PT + Practical Exam slide) -->
        <div class="slide-hero-frame">
          <div class="slide-hero-top-meta">
            <span>8/29/2026</span>
            <span>PRACTICAL EXAM EXHIBITION • 1</span>
          </div>

          <div class="slide-hero-center-row">
            <h1 class="slide-headline">PT + Practical Exam</h1>
            <div class="slide-course-info">
              <div class="slide-course-title">Digital Photography</div>
              <div class="slide-sections-code">MA 3101 &nbsp;MA 3102</div>
            </div>
          </div>

          <div class="slide-hero-bottom-bar">
            <div class="exhibition-subtitle-pill">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BF5AF2" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>Photography Color Hunt &bull; Final Exhibition (${availableGroups.length} Submissions)</span>
            </div>
            <button id="btn-start-slideshow" class="slide-presentation-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Start Fullscreen Presentation
            </button>
          </div>
        </div>

        <!-- Sticky Color & Category Filter Navigation Bar -->
        <div class="gallery-filter-panel">
          <!-- 7 Colors Horizontal Pills -->
          <div class="color-pills-scroll-track">
            <button class="color-nav-pill ${activeColor === 'ALL' ? 'active' : ''}" data-color="ALL">
              <span>All Colors</span>
              <span style="opacity: 0.8; font-size: 0.75rem;">(${colorCounts.ALL})</span>
            </button>

            ${ColorHuntDistribution.COLORS.map(c => {
              const conf = ColorHuntDistribution.COLOR_CONFIG[c];
              return `
                <button class="color-nav-pill ${activeColor === c ? 'active' : ''}" data-color="${c}" style="--pill-color: ${conf.hex};">
                  <span class="color-dot" style="background: ${conf.hex}; box-shadow: 0 0 6px ${conf.hex};"></span>
                  <span>${c}</span>
                  <span style="opacity: 0.8; font-size: 0.75rem;">(${colorCounts[c] || 0})</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Secondary Filters Row (Category, Section, Search) -->
          <div class="secondary-filter-row">
            <!-- Category Tabs -->
            <div class="category-filter-tabs">
              <button class="category-tab-btn ${activeCategory === 'ALL' ? 'active' : ''}" data-category="ALL">All Categories</button>
              <button class="category-tab-btn ${activeCategory === 'Natural' ? 'active' : ''}" data-category="Natural">🌿 Natural</button>
              <button class="category-tab-btn ${activeCategory === 'Artificial' ? 'active' : ''}" data-category="Artificial">💡 Artificial</button>
            </div>

            <!-- Section Tabs -->
            <div class="category-filter-tabs">
              <button class="category-tab-btn ${activeSection === 'ALL' ? 'active' : ''}" data-section="ALL">All Sections</button>
              <button class="category-tab-btn ${activeSection === 'MA 3101' ? 'active' : ''}" data-section="MA 3101">MA 3101</button>
              <button class="category-tab-btn ${activeSection === 'MA 3102' ? 'active' : ''}" data-section="MA 3102">MA 3102</button>
            </div>

            <!-- Search Box -->
            <div class="gallery-search-box">
              <svg class="gallery-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" id="gallery-search" class="gallery-search-input" placeholder="Search by student, title, or gear..." value="${searchQuery}">
            </div>
          </div>
        </div>

        <!-- 16:9 Exhibition Cards Grid -->
        <div id="exhibition-grid" class="exhibition-grid">
          ${renderExhibitionGrid(availableGroups)}
        </div>
      </div>

      <!-- Lightbox & Presentation Modal -->
      <div id="gallery-lightbox" class="lightbox-modal"></div>
    `;

    bindEvents(container, state, availableGroups);
  }

  function renderExhibitionGrid(availableGroups) {
    let filtered = availableGroups;

    if (activeColor !== 'ALL') {
      filtered = filtered.filter(g => g.color === activeColor);
    }
    if (activeCategory !== 'ALL') {
      filtered = filtered.filter(g => g.category === activeCategory);
    }
    if (activeSection !== 'ALL') {
      filtered = filtered.filter(g => g.section === activeSection);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(g => {
        const titleMatch = (g.submission?.title || '').toLowerCase().includes(q);
        const memberMatch = (g.members || []).some(m => m.toLowerCase().includes(q));
        const gearMatch = (g.submission?.cameraMetadata || '').toLowerCase().includes(q);
        const groupMatch = `group ${g.groupNumber}`.toLowerCase().includes(q);
        return titleMatch || memberMatch || gearMatch || groupMatch;
      });
    }

    filteredSubmissions = filtered;

    if (filtered.length === 0) {
      return `
        <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: var(--text-muted); background: var(--bg-glass-card); border-radius: var(--radius-xl); border: 1px dashed var(--border-medium);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px; color: var(--text-dim);"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          <h3 style="color: #FFFFFF; font-size: 1.2rem;">No exhibition works match the selected filters</h3>
          <p style="margin-top: 6px;">Try switching color tabs or searching a different term.</p>
        </div>
      `;
    }

    return filtered.map((g, idx) => {
      const conf = ColorHuntDistribution.COLOR_CONFIG[g.color] || {
        hex: '#BF5AF2',
        glow: 'rgba(191,90,242,0.4)',
        tagBg: 'rgba(191,90,242,0.2)'
      };

      return `
        <div class="slide-card" data-index="${idx}" style="--card-accent-color: ${conf.hex}; --card-accent-glow: ${conf.glow};">
          <!-- 16:9 Media Frame -->
          <div class="slide-card-media">
            <img src="${g.submission.slideUrl}" alt="${g.submission.title}" loading="lazy">
            <div class="slide-card-badges-top">
              <span class="badge-color-tag" style="background: ${conf.hex};">
                <span class="color-dot" style="background: #FFFFFF;"></span>
                <span>${g.color}</span>
              </span>
              <span class="badge-category-tag">
                ${g.category === 'Natural' ? '🌿 Natural' : '💡 Artificial'}
              </span>
            </div>
          </div>

          <!-- Content Body -->
          <div class="slide-card-body">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
                ${g.section} &bull; Group ${g.groupNumber}
              </span>
              <span style="font-size: 0.72rem; color: var(--text-muted);">${g.submission.type === 'pdf' ? '📄 PDF Slide' : '🖼️ Photo Slide'}</span>
            </div>

            <h3 class="slide-card-title">${g.submission.title || 'Untitled Work'}</h3>

            <div class="slide-card-members">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <span>${(g.members || []).join(', ')}</span>
            </div>

            <div class="slide-card-footer">
              <span class="slide-metadata-chip">${g.submission.cameraMetadata || 'Digital Camera'}</span>
              <span style="color: ${conf.hex}; font-weight: 700;">View Slide &rarr;</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function bindEvents(container, state, availableGroups) {
    // Color Pills Filter
    container.querySelectorAll('.color-nav-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeColor = e.currentTarget.dataset.color;
        render(container, state);
      });
    });

    // Category Tabs Filter
    container.querySelectorAll('.category-tab-btn[data-category]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeCategory = e.currentTarget.dataset.category;
        render(container, state);
      });
    });

    // Section Tabs Filter
    container.querySelectorAll('.category-tab-btn[data-section]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeSection = e.currentTarget.dataset.section;
        render(container, state);
      });
    });

    // Search input
    const searchInput = container.querySelector('#gallery-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const grid = container.querySelector('#exhibition-grid');
        if (grid) {
          grid.innerHTML = renderExhibitionGrid(availableGroups);
          bindCardClicks(container);
        }
      });
    }

    // Start Fullscreen Slideshow button
    const slideshowBtn = container.querySelector('#btn-start-slideshow');
    if (slideshowBtn) {
      slideshowBtn.addEventListener('click', () => {
        if (filteredSubmissions.length > 0) {
          openLightbox(0);
        }
      });
    }

    bindCardClicks(container);
  }

  function bindCardClicks(container) {
    container.querySelectorAll('.slide-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index);
        openLightbox(idx);
      });
    });
  }

  function openLightbox(index) {
    if (!filteredSubmissions || filteredSubmissions.length === 0) return;
    currentLightboxIndex = (index + filteredSubmissions.length) % filteredSubmissions.length;
    const item = filteredSubmissions[currentLightboxIndex];
    const conf = ColorHuntDistribution.COLOR_CONFIG[item.color] || {
      hex: '#BF5AF2',
      glow: 'rgba(191,90,242,0.4)',
      gradient: 'linear-gradient(135deg, #BF5AF2 0%, #FF375F 100%)'
    };

    const lightboxModal = document.getElementById('gallery-lightbox');
    if (!lightboxModal) return;

    lightboxModal.innerHTML = `
      <!-- Top Bar -->
      <div class="lightbox-topbar">
        <div class="lightbox-title-group">
          <span class="badge-color-tag" style="background: ${conf.hex};">
            ${item.color} — ${item.category}
          </span>
          <div>
            <h2 style="font-size: 1.15rem; font-weight: 700; color: #FFFFFF; line-height: 1.2;">
              ${item.submission.title || 'Untitled'}
            </h2>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">
              ${item.section} &bull; Group ${item.groupNumber} &bull; ${(item.members || []).join(' &bull; ')}
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 0.82rem; font-family: var(--font-mono); color: var(--text-muted);">
            ${currentLightboxIndex + 1} / ${filteredSubmissions.length}
          </span>
          <button id="lightbox-fullscreen-btn" class="btn btn-sm btn-secondary" title="Toggle True Fullscreen">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            Fullscreen
          </button>
          <button id="lightbox-close-btn" class="modal-close-btn" style="padding: 8px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <!-- Main Stage -->
      <div class="lightbox-main-stage">
        <button id="lightbox-prev-btn" class="lightbox-nav-btn lightbox-nav-prev" title="Previous Slide (Left Arrow)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <div class="lightbox-slide-wrapper" style="--card-accent-glow: ${conf.glow}; border-color: ${conf.hex}60;">
          <img src="${item.submission.slideUrl}" alt="${item.submission.title}">
        </div>

        <button id="lightbox-next-btn" class="lightbox-nav-btn lightbox-nav-next" title="Next Slide (Right Arrow)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <!-- Bottom Details Drawer -->
      <div class="lightbox-bottom-drawer">
        <div class="drawer-grid">
          <!-- Artist Statement -->
          <div>
            <div class="drawer-statement-title">Student Artist Statement & Technique</div>
            <p class="drawer-statement-text">
              ${item.submission.artistStatement || 'No artist statement provided.'}
            </p>
            ${item.submission.instructorFeedback ? `
              <div style="margin-top: 10px; padding: 10px 14px; background: rgba(48, 209, 88, 0.1); border-left: 3px solid #30D158; border-radius: var(--radius-sm); font-size: 0.82rem; color: #E0E0E0;">
                <strong style="color: #30D158;">Instructor Critique:</strong> ${item.submission.instructorFeedback}
              </div>
            ` : ''}
          </div>

          <!-- Camera & Exposure Specs -->
          <div>
            <div class="drawer-statement-title">Camera & Exposure Metadata</div>
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #FFFFFF; background: rgba(0,0,0,0.4); padding: 10px 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); line-height: 1.5;">
              ${item.submission.cameraMetadata || 'Digital Camera Settings: N/A'}
            </div>
            <div style="margin-top: 10px; font-size: 0.78rem; color: var(--text-muted);">
              Submitted: ${item.submission.submittedDate || '2026-08-29'}
            </div>
          </div>

          <!-- Palette Chips -->
          <div>
            <div class="drawer-statement-title">Color Palette</div>
            <div class="palette-chips-row">
              ${(item.submission.palette || [conf.hex]).map(hex => `
                <div class="color-swatch-chip" style="background: ${hex};" title="Click to copy ${hex}" onclick="navigator.clipboard.writeText('${hex}'); App.showToast('Copied ${hex}', 'info');"></div>
              `).join('')}
            </div>
            <div style="margin-top: 8px; font-size: 0.72rem; color: var(--text-muted);">Click swatch to copy HEX</div>
          </div>
        </div>
      </div>
    `;

    lightboxModal.classList.add('active');

    // Navigation events
    lightboxModal.querySelector('#lightbox-close-btn').addEventListener('click', closeLightbox);
    lightboxModal.querySelector('#lightbox-prev-btn').addEventListener('click', () => openLightbox(currentLightboxIndex - 1));
    lightboxModal.querySelector('#lightbox-next-btn').addEventListener('click', () => openLightbox(currentLightboxIndex + 1));

    // Fullscreen toggle
    lightboxModal.querySelector('#lightbox-fullscreen-btn').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        lightboxModal.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen();
      }
    });

    // Keyboard navigation
    window.addEventListener('keydown', handleKeyNav);
  }

  function handleKeyNav(e) {
    const lightboxModal = document.getElementById('gallery-lightbox');
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      openLightbox(currentLightboxIndex - 1);
    } else if (e.key === 'ArrowRight') {
      openLightbox(currentLightboxIndex + 1);
    }
  }

  function closeLightbox() {
    const lightboxModal = document.getElementById('gallery-lightbox');
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
    }
    window.removeEventListener('keydown', handleKeyNav);
  }

  return {
    render
  };
})();
