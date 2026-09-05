/**
 * Photography Color Hunt - Student Submissions Registry & Asset Resolver
 * Maps student groups to their submission files in the submissions/ folder,
 * with fallback curated photography works, camera metadata, and color palettes.
 */

window.ColorHuntSubmissions = (function () {
  // Rich curated photographic artworks tailored for all 7 colors and 2 categories
  const SAMPLE_ARTWORKS = {
    'Red-Natural': {
      title: 'Crimson Veins: Autumn Sycamore Macro',
      slideUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Exploration of organic anthocyanin pigments in late autumn foliage. Utilizing low morning backlighting to emphasize the cellular translucency of maple leaves without synthetic filters.',
      cameraMetadata: 'Fujifilm X-T5 • XF 80mm f/2.8 Macro • 1/320s • f/3.2 • ISO 160',
      palette: ['#FF3B30', '#B22222', '#8B0000', '#FF6347', '#3E1010']
    },
    'Red-Artificial': {
      title: 'Midnight Transmission: Chinatown Wet Neon',
      slideUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Rainy dusk study on tungsten red neon signage reflections across slick asphalt. The dual plane of geometry highlights man-made crimson luminescence cutting through night mist.',
      cameraMetadata: 'Sony A7R V • FE 35mm f/1.4 GM • 1/125s • f/1.8 • ISO 800',
      palette: ['#FF3B30', '#FF0844', '#6A051B', '#1A0207', '#FFA07A']
    },
    'Orange-Natural': {
      title: 'Solitary Dune: Mojave Sunset Rim',
      slideUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Capturing the golden hour transition across rippling quartz sand dunes. Low oblique raking sunlight sculpts high contrast ridges glowing in burnt amber and ochre.',
      cameraMetadata: 'Nikon Z8 • NIKKOR Z 24-70mm f/2.8 S • 1/500s • f/8 • ISO 100',
      palette: ['#FF9F0A', '#D97706', '#92400E', '#FDE68A', '#78350F']
    },
    'Orange-Artificial': {
      title: 'Industrial Forge: Molten Foundry Arc',
      slideUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'High-speed exposure documenting metal extrusion spark trails. The 1200°C molten steel radiates vivid neon orange and copper sparks against the matte shadow of the foundry.',
      cameraMetadata: 'Canon EOS R5 • RF 50mm f/1.2L • 1/2000s • f/2.8 • ISO 1600',
      palette: ['#FF9F0A', '#F97316', '#C2410C', '#431407', '#FED7AA']
    },
    'Yellow-Natural': {
      title: 'Helianthus Field: Morning Pollen Dust',
      slideUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Macro composition of blooming sunflower ray florets. Direct morning sunlight reveals saturated lemon lutein pigments with golden pollen particles floating in atmospheric dust.',
      cameraMetadata: 'Sony A7 IV • FE 90mm f/2.8 Macro G • 1/640s • f/4.0 • ISO 200',
      palette: ['#FFD60A', '#FACC15', '#CA8A04', '#713F12', '#FEF08A']
    },
    'Yellow-Artificial': {
      title: 'Sodium Vapor: Subway Transit Geometry',
      slideUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Long exposure documenting high-pressure sodium safety illumination along subway platforms and safety tactile paving tiles. The amber glow creates harsh repetitive geometric lines.',
      cameraMetadata: 'Leica Q3 • Summilux 28mm f/1.7 ASPH • 1/60s • f/2.0 • ISO 640',
      palette: ['#FFD60A', '#EAB308', '#A16207', '#3F2C06', '#FEF9C3']
    },
    'Green-Natural': {
      title: 'Emerald Fronds: Cloud Forest Fern',
      slideUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Layered botanical study in high-humidity moss gardens. Unfurling fiddlehead fronds display an optical spectrum from pale chartreuse tips to deep viridian shadows.',
      cameraMetadata: 'Fujifilm GFX 100 II • GF 110mm f/2 R • 1/160s • f/4 • ISO 250',
      palette: ['#30D158', '#10B981', '#047857', '#064E3B', '#A7F3D0']
    },
    'Green-Artificial': {
      title: 'Matrix Terminal: Cathode Green Glow',
      slideUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Monochrome phosphorus CRT display displaying terminal code matrices in a pitch-black server rack room. High aperture renders blooming green scanlines.',
      cameraMetadata: 'Panasonic Lumix S5 II • Lumix S Pro 50mm f/1.4 • 1/80s • f/1.4 • ISO 400',
      palette: ['#30D158', '#22C55E', '#15803D', '#052E16', '#86EFAC']
    },
    'Blue-Natural': {
      title: 'Glacial Cerulean: Deep Crevasse Ice',
      slideUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Compressed millennia-old glacial ice absorbing red wavelengths and transmitting pure sapphire blue light through an interior ice cave ceiling.',
      cameraMetadata: 'Hasselblad X2D 100C • XCD 38mm f/2.5 V • 1/250s • f/5.6 • ISO 64',
      palette: ['#0A84FF', '#3B82F6', '#1D4ED8', '#1E3A8A', '#BFDBFE']
    },
    'Blue-Artificial': {
      title: 'Cobalt LED: Server Matrix Corridor',
      slideUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Symmetrical perspective down an enterprise datacenter cold-aisle corridor illuminated solely by high-intensity cobalt blue cooling indicators.',
      cameraMetadata: 'Sony A7R V • FE 16-35mm f/2.8 GM II • 1/50s • f/4.0 • ISO 500',
      palette: ['#0A84FF', '#2563EB', '#1E40AF', '#172554', '#93C5FD']
    },
    'Purple-Natural': {
      title: 'Twilight Alpine: Lavender Field Mist',
      slideUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Post-sunset blue hour photograph of blooming lavender rows disappearing into rolling valley fog. Natural purple anthocyanins blend into violet twilight hues.',
      cameraMetadata: 'Canon EOS R6 Mark II • RF 70-200mm f/2.8L • 1/40s • f/2.8 • ISO 800',
      palette: ['#BF5AF2', '#A855F7', '#7E22CE', '#3B0764', '#E9D5FF']
    },
    'Purple-Artificial': {
      title: 'Synthwave Arcade: Neon Violet Corridor',
      slideUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Retro-arcade neon glow capturing dual UV and violet cathode fixtures reflecting on mirrored chrome cabinet housings. Creates deep futuristic synthwave mood.',
      cameraMetadata: 'Sony A7S III • FE 24mm f/1.4 GM • 1/125s • f/1.4 • ISO 1250',
      palette: ['#BF5AF2', '#9333EA', '#6B21A8', '#2E1065', '#D8B4FE']
    },
    'Pink-Natural': {
      title: 'Sakura Petal Drift: Spring Macro',
      slideUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Delicate close-up of cherry blossom corolla in soft overcast morning light. Translucent pink petals exhibit soft gradation into magenta central stamen filaments.',
      cameraMetadata: 'Fujifilm X-H2 • XF 56mm f/1.2 R WR • 1/800s • f/1.4 • ISO 125',
      palette: ['#FF375F', '#EC4899', '#BE185D', '#500724', '#FBCFE8']
    },
    'Pink-Artificial': {
      title: 'Flamingo Motel: Retro Neon Glow',
      slideUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&q=80',
      artistStatement: 'Hand-bent argon and neon gas tubes glowing in hot magenta pink against a dark brutalist concrete wall facade during twilight.',
      cameraMetadata: 'Nikon Z6 II • NIKKOR Z 40mm f/2 • 1/100s • f/2.0 • ISO 640',
      palette: ['#FF375F', '#F43F5E', '#BE123C', '#4C0519', '#FECDD3']
    }
  };

  /**
   * Resolves submission data for a student group.
   * Priority:
   * 1. If user put files in submissions/ (e.g. submissions/grp-01.jpg)
   * 2. Direct group submission object if present
   * 3. Curated matching artwork based on assigned Color and Category
   */
  function getSubmission(group) {
    const color = group.color || 'Red';
    const category = group.category || 'Natural';
    const comboKey = `${color}-${category}`;
    const sample = SAMPLE_ARTWORKS[comboKey] || SAMPLE_ARTWORKS['Red-Natural'];

    // Expected local file path in submissions/ folder
    const fileName = group.submissionFile || `${group.id}.jpg`;
    const localPath = `submissions/${fileName}`;

    return {
      title: group.submission?.title || `${group.groupName || 'Group'} — ${color} (${category})`,
      slideUrl: group.submission?.slideUrl || localPath,
      fallbackUrl: sample.slideUrl,
      artistStatement: group.submission?.artistStatement || sample.artistStatement,
      cameraMetadata: group.submission?.cameraMetadata || sample.cameraMetadata,
      palette: group.submission?.palette || sample.palette,
      submittedDate: group.submission?.submittedDate || '2026-08-29',
      instructorFeedback: group.submission?.instructorFeedback || null,
      localPath: localPath,
      fileName: fileName
    };
  }

  return {
    getSubmission,
    SAMPLE_ARTWORKS
  };
})();
