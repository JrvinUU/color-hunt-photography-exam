/**
 * Photography Color Hunt - Distribution Engine
 * Handles balanced allocation of 7 Colors x 2 Categories across student groups.
 */

const COLOR_CONFIG = {
  Red: {
    name: 'Red',
    hex: '#FF3B30',
    lightHex: '#FF6B6B',
    darkHex: '#8B0000',
    gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)',
    glow: 'rgba(255, 59, 48, 0.45)',
    textColor: '#FFFFFF',
    tagBg: 'rgba(255, 59, 48, 0.18)',
    tagBorder: 'rgba(255, 59, 48, 0.4)',
    naturalExamples: 'Sunsets, autumn leaves, red clay, roses, berries, blood oranges, raw minerals',
    artificialExamples: 'Neon signs, sports cars, traffic lights, red telephone booths, painted walls, red fabrics'
  },
  Green: {
    name: 'Green',
    hex: '#30D158',
    lightHex: '#68D391',
    darkHex: '#0D5C2C',
    gradient: 'linear-gradient(135deg, #30D158 0%, #10B981 100%)',
    glow: 'rgba(48, 209, 88, 0.45)',
    textColor: '#FFFFFF',
    tagBg: 'rgba(48, 209, 88, 0.18)',
    tagBorder: 'rgba(48, 209, 88, 0.4)',
    naturalExamples: 'Mossy forests, emerald leaves, jade sea waters, succulents, reptile scales',
    artificialExamples: 'Laser lights, emerald glass bottles, green subway tiles, sports turf, green signage'
  },
  Blue: {
    name: 'Blue',
    hex: '#0A84FF',
    lightHex: '#60A5FA',
    darkHex: '#003B80',
    gradient: 'linear-gradient(135deg, #0A84FF 0%, #00D2FF 100%)',
    glow: 'rgba(10, 132, 255, 0.45)',
    textColor: '#FFFFFF',
    tagBg: 'rgba(10, 132, 255, 0.18)',
    tagBorder: 'rgba(10, 132, 255, 0.4)',
    naturalExamples: 'Deep ocean waves, twilight sky, blue morpho wings, glaciers, blue minerals',
    artificialExamples: 'Blue LED screens, industrial containers, swimming pool lights, blue architectural glass'
  },
  Orange: {
    name: 'Orange',
    hex: '#FF9F0A',
    lightHex: '#FDBA74',
    darkHex: '#804000',
    gradient: 'linear-gradient(135deg, #FF9F0A 0%, #FF6B00 100%)',
    glow: 'rgba(255, 159, 10, 0.45)',
    textColor: '#FFFFFF',
    tagBg: 'rgba(255, 159, 10, 0.18)',
    tagBorder: 'rgba(255, 159, 10, 0.4)',
    naturalExamples: 'Campfire embers, marigolds, canyon sandstone at golden hour, monarch butterflies',
    artificialExamples: 'Construction cones, orange street lamps, basketballs, orange neon storefronts'
  },
  Yellow: {
    name: 'Yellow',
    hex: '#FFD60A',
    lightHex: '#FDE047',
    darkHex: '#735E00',
    gradient: 'linear-gradient(135deg, #FFD60A 0%, #FF9900 100%)',
    glow: 'rgba(255, 214, 10, 0.45)',
    textColor: '#0A0A0C',
    tagBg: 'rgba(255, 214, 10, 0.22)',
    tagBorder: 'rgba(255, 214, 10, 0.5)',
    naturalExamples: 'Sunflowers, lemons, bee stripes, golden hour sunlight flare, autumn ginkgo leaves',
    artificialExamples: 'Yellow taxicabs, caution tape, road markings, retro yellow raincoats, subway handrails'
  },
  Purple: {
    name: 'Purple',
    hex: '#BF5AF2',
    lightHex: '#C084FC',
    darkHex: '#581C87',
    gradient: 'linear-gradient(135deg, #BF5AF2 0%, #7B2CBF 100%)',
    glow: 'rgba(191, 90, 242, 0.45)',
    textColor: '#FFFFFF',
    tagBg: 'rgba(191, 90, 242, 0.18)',
    tagBorder: 'rgba(191, 90, 242, 0.4)',
    naturalExamples: 'Lavender fields, purple amethysts, dusky twilight skies, pansy petals, plum skins',
    artificialExamples: 'Ultraviolet blacklights, cyberpunk synthwave neon, metallic purple cars, dyed fabrics'
  },
  Pink: {
    name: 'Pink',
    hex: '#FF375F',
    lightHex: '#F472B6',
    darkHex: '#831843',
    gradient: 'linear-gradient(135deg, #FF375F 0%, #FF6B8B 100%)',
    glow: 'rgba(255, 55, 95, 0.45)',
    textColor: '#FFFFFF',
    tagBg: 'rgba(255, 55, 95, 0.18)',
    tagBorder: 'rgba(255, 55, 95, 0.4)',
    naturalExamples: 'Cherry blossoms, flamingos, rose quartz, pink morning clouds, dragonfruit flesh',
    artificialExamples: 'Pink bubblegum neon, pastel pink facades, studio backdrop lights, retro plastic props'
  }
};

const CATEGORIES = ['Natural', 'Artificial'];
const COLORS = Object.keys(COLOR_CONFIG);

// 14 Total Unique Combinations
const COLOR_CATEGORY_PAIRS = [];
COLORS.forEach(color => {
  CATEGORIES.forEach(category => {
    COLOR_CATEGORY_PAIRS.push({ color, category });
  });
});

/**
 * Fisher-Yates array shuffler
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Distribute the 14 combinations across N groups perfectly equally.
 * If N=24, all 14 get 1, 10 get 2, max diff is <= 1.
 * @param {Array} groups - List of group objects
 * @param {boolean} preserveLocked - If true, locked group assignments won't be modified
 * @returns {Array} Updated groups with balanced color & category
 */
function distributeColorsBalanced(groups, preserveLocked = true) {
  if (!groups || groups.length === 0) return [];

  // Identify which groups are unlocked
  const unlockedGroups = groups.filter(g => !(preserveLocked && g.locked && g.color && g.category));
  const lockedGroups = groups.filter(g => preserveLocked && g.locked && g.color && g.category);

  // Count current occurrences from locked groups
  const counts = {};
  COLOR_CATEGORY_PAIRS.forEach(p => {
    counts[`${p.color}-${p.category}`] = 0;
  });

  lockedGroups.forEach(g => {
    const key = `${g.color}-${g.category}`;
    if (counts[key] !== undefined) {
      counts[key]++;
    }
  });

  // Calculate needed pool of pairs for unlocked groups
  const pool = [];
  const neededCount = unlockedGroups.length;

  // We want to fill pool such that (locked + pool) is as balanced as possible
  while (pool.length < neededCount) {
    // Pick the combination that currently has the lowest total count
    let minCount = Infinity;
    let candidates = [];

    COLOR_CATEGORY_PAIRS.forEach(p => {
      const key = `${p.color}-${p.category}`;
      const currentTotal = counts[key];
      if (currentTotal < minCount) {
        minCount = currentTotal;
        candidates = [p];
      } else if (currentTotal === minCount) {
        candidates.push(p);
      }
    });

    // Shuffle candidates to randomize selection among ties
    const chosen = shuffleArray(candidates)[0];
    pool.push(chosen);
    counts[`${chosen.color}-${chosen.category}`]++;
  }

  // Shuffle the allocated pool so assignments are random among groups
  const shuffledPool = shuffleArray(pool);

  // Assign back to unlocked groups
  let poolIdx = 0;
  return groups.map(g => {
    if (preserveLocked && g.locked && g.color && g.category) {
      return { ...g };
    }
    const assignment = shuffledPool[poolIdx++];
    return {
      ...g,
      color: assignment.color,
      category: assignment.category
    };
  });
}

/**
 * Generate distribution statistics for audit and inspection
 */
function getDistributionStats(groups) {
  const stats = {};
  COLOR_CATEGORY_PAIRS.forEach(p => {
    const key = `${p.color}-${p.category}`;
    stats[key] = {
      color: p.color,
      category: p.category,
      count: 0,
      groups: []
    };
  });

  let assignedCount = 0;
  let unassignedCount = 0;

  groups.forEach(g => {
    if (g.color && g.category) {
      const key = `${g.color}-${g.category}`;
      if (stats[key]) {
        stats[key].count++;
        stats[key].groups.push(g.groupNumber || g.id);
        assignedCount++;
      }
    } else {
      unassignedCount++;
    }
  });

  const counts = Object.values(stats).map(s => s.count);
  const min = Math.min(...counts);
  const max = Math.max(...counts);
  const isEquallyBalanced = (max - min) <= 1;

  return {
    breakdown: stats,
    totalGroups: groups.length,
    assignedCount,
    unassignedCount,
    minCountPerPair: min,
    maxCountPerPair: max,
    isEquallyBalanced
  };
}

// Export to window
window.ColorHuntDistribution = {
  COLOR_CONFIG,
  CATEGORIES,
  COLORS,
  COLOR_CATEGORY_PAIRS,
  distributeColorsBalanced,
  getDistributionStats,
  shuffleArray
};
