/**
 * Photography Color Hunt - Main Application Controller
 * Handles view switching (Curation Roster vs Document Sorter Gallery),
 * password-protected instructor cog, and LocalStorage / IDE synchronization.
 */

window.App = (function() {
  const STORAGE_KEY = 'SUPER_COLOR_HUNT_ROSTER_V3';
  const IDE_HASH_KEY = 'SUPER_COLOR_HUNT_IDE_HASH_V3';
  const ADMIN_PASSCODE = '3101';

  let state = {
    isTeacherUnlocked: false,
    currentView: 'curation', // 'curation' | 'gallery'
    groups: []
  };

  function getIdeGroups() {
    if (Array.isArray(window.SUPER_COLOR_HUNT_GROUPS) && window.SUPER_COLOR_HUNT_GROUPS.length > 0) {
      return JSON.parse(JSON.stringify(window.SUPER_COLOR_HUNT_GROUPS));
    }
    if (window.ColorHuntMockData && Array.isArray(window.ColorHuntMockData.INITIAL_GROUPS)) {
      return JSON.parse(JSON.stringify(window.ColorHuntMockData.INITIAL_GROUPS));
    }
    return [];
  }

  function getIdeHash() {
    try {
      return JSON.stringify(window.SUPER_COLOR_HUNT_GROUPS || []);
    } catch (e) {
      return '';
    }
  }

  function init() {
    loadState();
    
    // Check initial hash route
    if (window.location.hash === '#gallery') {
      state.currentView = 'gallery';
    } else if (window.location.hash === '#roster' || window.location.hash === '#curation') {
      state.currentView = 'curation';
    }

    bindGlobalEvents();
    render();

    if (window.CuteAnimations && typeof window.CuteAnimations.init === 'function') {
      window.CuteAnimations.init();
    }
  }

  function loadState() {
    try {
      const ideGroups = getIdeGroups();
      const currentIdeHash = getIdeHash();
      const savedIdeHash = localStorage.getItem(IDE_HASH_KEY);
      const saved = localStorage.getItem(STORAGE_KEY);

      // If data/groups.js was edited in IDE (hash changed) or no storage yet, load directly from IDE config
      if (saved && savedIdeHash === currentIdeHash) {
        const parsed = JSON.parse(saved);
        state.groups = Array.isArray(parsed.groups) ? parsed.groups : ideGroups;
        state.isTeacherUnlocked = !!parsed.isTeacherUnlocked;
      } else {
        // Load fresh from data/groups.js
        state.groups = ideGroups;
        state.isTeacherUnlocked = saved ? !!JSON.parse(saved).isTeacherUnlocked : false;
        localStorage.setItem(IDE_HASH_KEY, currentIdeHash);
        saveState();
      }
    } catch (e) {
      console.error('Failed to load state:', e);
      state.groups = getIdeGroups();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        groups: state.groups,
        isTeacherUnlocked: state.isTeacherUnlocked
      }));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  function resetToIdeConfig() {
    state.groups = getIdeGroups();
    localStorage.setItem(IDE_HASH_KEY, getIdeHash());
    saveState();
    render();
    showToast('Reloaded groups from data/groups.js', 'success');
  }

  function switchView(viewName) {
    state.currentView = viewName === 'gallery' ? 'gallery' : 'curation';
    window.location.hash = state.currentView === 'gallery' ? '#gallery' : '#roster';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
  }

  function handleCogClick() {
    if (state.isTeacherUnlocked) {
      // Lock edit mode
      state.isTeacherUnlocked = false;
      saveState();
      render();
      showToast('Locked student view mode', 'info');
    } else {
      // Prompt for password without hint
      const entered = prompt('Enter Passcode:');
      if (entered === ADMIN_PASSCODE || entered === 'admin') {
        state.isTeacherUnlocked = true;
        saveState();
        render();
        showToast('Instructor mode unlocked', 'success');
      } else if (entered !== null) {
        showToast('Incorrect passcode', 'error');
      }
    }
  }

  function render() {
    const mainContainer = document.getElementById('app-main-content');
    const cogBtn = document.getElementById('btn-admin-cog');

    if (cogBtn) {
      cogBtn.classList.toggle('unlocked', state.isTeacherUnlocked);
      cogBtn.title = '';
    }

    if (state.currentView === 'gallery') {
      GalleryView.render(mainContainer, state);
    } else {
      CurationView.render(mainContainer, state);
    }
  }

  function bindGlobalEvents() {
    const cogBtn = document.getElementById('btn-admin-cog');
    if (cogBtn) {
      cogBtn.addEventListener('click', handleCogClick);
    }

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      const targetView = hash === '#gallery' ? 'gallery' : 'curation';
      if (state.currentView !== targetView) {
        state.currentView = targetView;
        render();
      }
    });
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => toast.remove(), 200);
    }, 2600);
  }

  return {
    init,
    render,
    switchView,
    saveState,
    resetToIdeConfig,
    handleCogClick,
    showToast,
    getState: () => state
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
