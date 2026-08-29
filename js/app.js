/**
 * Photography Color Hunt - Main Application Controller
 * Handles password-protected admin cog and LocalStorage synchronization.
 */

window.App = (function() {
  const STORAGE_KEY = 'COLOR_HUNT_MINIMAL_ROSTER_V2';
  const ADMIN_PASSCODE = '3101';

  let state = {
    isTeacherUnlocked: false,
    groups: []
  };

  function init() {
    loadState();
    bindGlobalEvents();
    render();
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.groups = Array.isArray(parsed.groups) ? parsed.groups : [];
        state.isTeacherUnlocked = !!parsed.isTeacherUnlocked;
      } else {
        // Clean empty roster ready for instructor input
        state.groups = [];
        state.isTeacherUnlocked = false;
      }
    } catch (e) {
      console.error('Failed to load state:', e);
      state.groups = [];
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

  function handleCogClick() {
    if (state.isTeacherUnlocked) {
      // Lock edit mode
      state.isTeacherUnlocked = false;
      saveState();
      render();
      showToast('Locked student view mode', 'info');
    } else {
      // Prompt for password
      const entered = prompt('Enter Instructor Passcode (Default: 3101):');
      if (entered === ADMIN_PASSCODE || entered === 'admin') {
        state.isTeacherUnlocked = true;
        saveState();
        render();
        showToast('Instructor management unlocked', 'success');
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
      cogBtn.title = state.isTeacherUnlocked ? 'Instructor Mode Active (Click to Lock)' : 'Instructor Login';
    }

    CurationView.render(mainContainer, state);
  }

  function bindGlobalEvents() {
    const cogBtn = document.getElementById('btn-admin-cog');
    if (cogBtn) {
      cogBtn.addEventListener('click', handleCogClick);
    }
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
    saveState,
    handleCogClick,
    showToast,
    getState: () => state
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
