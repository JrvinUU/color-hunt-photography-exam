/**
 * Photography Color Hunt - Mock Dataset
 * 24 Student Groups (~72 Students) for sections MA 3101 & MA 3102
 * Covering all 14 combinations of 7 Colors x 2 Categories with curated slide artworks.
 */

const INITIAL_GROUPS = [
  {
    id: 'grp-01',
    groupNumber: 1,
    section: 'MA 3101',
    members: ['Marcus Vance', 'Elena Rostova', 'Chloe Tanaka'],
    color: 'Red',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Crimson Veins: Autumn Sycamore Macro',
      artistStatement: 'Our group explored the organic vibrancy of late autumn foliage in the campus arboretum. By utilizing backlighting at low sun angle, we highlighted the translucent cellular structure and natural red pigments without artificial enhancement.',
      cameraMetadata: 'Fujifilm X-T5 • XF 80mm f/2.8 Macro • 1/320s • f/3.2 • ISO 160',
      slideUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
      palette: ['#B22222', '#8B0000', '#FF6347', '#3E1010', '#DCAE96'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'Superb micro-contrast and exposure control. The natural chlorophyll decay is rendered with deep emotional warmth.'
    }
  },
  {
    id: 'grp-02',
    groupNumber: 2,
    section: 'MA 3101',
    members: ['Derek Zhang', 'Amara Okafor', 'Julian Reed'],
    color: 'Red',
    category: 'Artificial',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Midnight Transmission: Chinatown Neon',
      artistStatement: 'Shot during a rainy dusk, we captured the bleed of tungsten red neon across wet asphalt. The reflection creates a dual plane of geometry where man-made illumination cuts through atmospheric mist.',
      cameraMetadata: 'Sony A7R V • FE 35mm f/1.4 GM • 1/125s • f/1.8 • ISO 800',
      slideUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80',
      palette: ['#FF0844', '#FF4E50', '#6A051B', '#1A0207', '#FFA07A'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'Great handling of high dynamic range in wet pavement reflections. The framing leads the eye right into the vanishing point.'
    }
  },
  {
    id: 'grp-03',
    groupNumber: 3,
    section: 'MA 3101',
    members: ['Sophia Lindqvist', 'Liam Gallagher', 'Maya Patel'],
    color: 'Green',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Emerald Canopy: Montane Fern Fronds',
      artistStatement: 'We documented native high-altitude fern unfurling in morning dew. The layered overlapping fronds produce an optical gradient from lime chartreuse to deep viridian moss tones.',
      cameraMetadata: 'Canon EOS R5 • RF 100mm f/2.8L Macro • 1/250s • f/4.0 • ISO 200',
      slideUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
      palette: ['#1B4D3E', '#2E8B57', '#3CB371', '#0B291A', '#98FB98'],
      submittedDate: '2026-08-27',
      instructorFeedback: 'Exceptional tonal gradation in the foliage shadows. Zero blown highlights in the morning moisture droplets.'
    }
  },
  {
    id: 'grp-04',
    groupNumber: 4,
    section: 'MA 3101',
    members: ['Carlos Morales', 'Hannah Schmidt', 'Tariq Al-Mansoor'],
    color: 'Green',
    category: 'Artificial',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Terminal Velocity: Server Rack Luminescence',
      artistStatement: 'Investigating the visual pulse of modern data infrastructure, this composition isolates cascading green fiber LEDs against matte industrial steel server racks in the university mainframe.',
      cameraMetadata: 'Nikon Z8 • NIKKOR Z 50mm f/1.2 S • 1/160s • f/2.0 • ISO 640',
      slideUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
      palette: ['#00FF66', '#009933', '#003311', '#0A1A10', '#66FF99'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'Bold graphic geometry and crisp focus on the optical terminal arrays. Very fitting for artificial color exploration.'
    }
  },
  {
    id: 'grp-05',
    groupNumber: 5,
    section: 'MA 3101',
    members: ['Aria Montgomery', 'Noah Kim', 'Zoe Kravitz-Lee'],
    color: 'Blue',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Abyssal Crest: Pacific Swell at Twilight',
      artistStatement: 'Shot at the coastal cliffs during civil twilight. Using a 0.5s slow exposure handheld with IBIS, we captured the churning turquoise foam against midnight ultramarine ocean depths.',
      cameraMetadata: 'Sony A7 IV • FE 24-70mm f/2.8 GM II • 1/2s • f/8.0 • ISO 100',
      slideUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      palette: ['#004E92', '#000428', '#26D0CE', '#1A2980', '#A1FFCE'],
      submittedDate: '2026-08-27',
      instructorFeedback: 'The exposure time was chosen with mastery. You preserved water texture while rendering fluid chromatic velocity.'
    }
  },
  {
    id: 'grp-06',
    groupNumber: 6,
    section: 'MA 3101',
    members: ['Lucas Moreau', 'Priya Sharma', 'Finn O\'Connor'],
    color: 'Blue',
    category: 'Artificial',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Cyan Monolith: Skyscraper Curtain Wall',
      artistStatement: 'An architectural study of modern treated reflective glass. The low-emissivity coating transforms afternoon solar radiation into a severe, crystalline geometric blue grid.',
      cameraMetadata: 'Canon EOS R6 II • RF 15-35mm f/2.8L • 1/400s • f/7.1 • ISO 100',
      slideUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      palette: ['#0072FF', '#00C6FF', '#002244', '#1E3C72', '#D0EFFF'],
      submittedDate: '2026-08-29',
      instructorFeedback: 'Flawless vertical alignment and minimal perspective distortion. The blue tint separation across facets is stellar.'
    }
  },
  {
    id: 'grp-07',
    groupNumber: 7,
    section: 'MA 3101',
    members: ['Isabella Rossi', 'Kofi Mensah', 'Ethan Brooks'],
    color: 'Orange',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Solar Furnace: Canyon Sandstone Golden Hour',
      artistStatement: 'We traveled to Red Rock Canyon to catch the 12-minute window where horizontal sunlight directly ignites the iron oxide within the sedimentary canyon strata into incandescent orange.',
      cameraMetadata: 'Fujifilm GFX 100S • GF 32-64mm f/4 • 1/80s • f/11 • ISO 100',
      slideUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
      palette: ['#FF6B08', '#FF8E53', '#8B2500', '#D35400', '#F9D423'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'Medium format clarity really shines here. The micro-textures of sandstone and rich warm hues demonstrate patient planning.'
    }
  },
  {
    id: 'grp-08',
    groupNumber: 8,
    section: 'MA 3101',
    members: ['Oliver Bennett', 'Ananya Gupta', 'Mateo Fernandez'],
    color: 'Orange',
    category: 'Artificial',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Hazard Vector: Highway Cones in Rain',
      artistStatement: 'Examining industrial safety aesthetics. High-visibility fluorescent orange polyethylene cones wet with rain create an intense, rhythmic cadence across an urban bridge.',
      cameraMetadata: 'Leica Q2 • Summilux 28mm f/1.7 ASPH • 1/200s • f/2.0 • ISO 400',
      slideUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1600&q=80',
      palette: ['#FF5500', '#FF8800', '#3A1500', '#1C0B00', '#FFAA33'],
      submittedDate: '2026-08-29',
      instructorFeedback: 'Great repetition and depth layering. The fluorescent orange jumps out dramatically against the cold gray pavement.'
    }
  },
  {
    id: 'grp-09',
    groupNumber: 9,
    section: 'MA 3101',
    members: ['Jessica Huang', 'Gabriel Santos', 'Naomi Campbell-Wong'],
    color: 'Yellow',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Solar Vortex: Helianthus Macro Center',
      artistStatement: 'A botanical examination of sunflower florets. The Fibonacci phyllotaxis spirals out from pollen-rich saffron stamens into blazing cadmium yellow ray petals.',
      cameraMetadata: 'Sony A7 IV • FE 90mm f/2.8 Macro G • 1/500s • f/5.6 • ISO 100',
      slideUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1600&q=80',
      palette: ['#FFCC00', '#FFA500', '#664400', '#FFEE55', '#221500'],
      submittedDate: '2026-08-26',
      instructorFeedback: 'The radial composition draws the viewer straight into the spiral. Color fidelity is spotless without clipping.'
    }
  },
  {
    id: 'grp-10',
    groupNumber: 10,
    section: 'MA 3101',
    members: ['Dmitri Volkov', 'Jasmine Torres', 'Leo Sterling'],
    color: 'Yellow',
    category: 'Artificial',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Metropolitan Fleet: Manhattan Taxi Blur',
      artistStatement: 'Panning technique capturing a speeding iconic yellow medallion cab at 1/15s shutter speed. The streaks of vivid synthetic yellow create a sensation of relentless urban momentum.',
      cameraMetadata: 'Nikon Z6 II • NIKKOR Z 24-70mm f/2.8 S • 1/15s • f/8.0 • ISO 200',
      slideUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
      palette: ['#FDB813', '#FFD700', '#1F1F1F', '#4A3B00', '#FFF099'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'Panning motion was tracked with steady hands. The hood badge remains sharp while yellow streaks create kinetic drama.'
    }
  },
  {
    id: 'grp-11',
    groupNumber: 11,
    section: 'MA 3101',
    members: ['Seraphina Laurent', 'Brenden Hall', 'Kavita Iyer'],
    color: 'Purple',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Lavender Horizon: Dusk in Provence Mist',
      artistStatement: 'Capturing agricultural purple geometry. Parallel rows of flowering Lavandula angustifolia stretch toward the horizon under twilight violet atmospheric haze.',
      cameraMetadata: 'Canon EOS R5 • RF 70-200mm f/2.8L IS • 1/60s • f/6.3 • ISO 200',
      slideUrl: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1600&q=80',
      palette: ['#6B3074', '#9B59B6', '#3D1C45', '#C39BD3', '#2C0D30'],
      submittedDate: '2026-08-27',
      instructorFeedback: 'Atmospheric perspective is rendered with sublime delicacy. The purple mist feels tactile and ethereal.'
    }
  },
  {
    id: 'grp-12',
    groupNumber: 12,
    section: 'MA 3101',
    members: ['Alex Mercer', 'Yuki Takahashi', 'Gemma Watson'],
    color: 'Purple',
    category: 'Artificial',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Synthwave Corridor: UV Alleyway Reflections',
      artistStatement: 'We rigged twin battery-powered ultraviolet tube lights in an industrial loading dock to isolate cold concrete and steel under extreme violet-magenta spectrum saturation.',
      cameraMetadata: 'Sony FX3 • FE 24mm f/1.4 GM • 1/100s • f/1.8 • ISO 640',
      slideUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
      palette: ['#8A2387', '#E94057', '#33083B', '#BA55D3', '#F27121'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'Controlled studio lighting in a gritty location. The contrast between purple neon and dark steel is razor sharp.'
    }
  },
  {
    id: 'grp-13',
    groupNumber: 13,
    section: 'MA 3102',
    members: ['Camila Silva', 'Toby Henderson', 'Rei Ayanami-Chen'],
    color: 'Pink',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Sakura Cascade: Spring Yoshino Blossoms',
      artistStatement: 'A study of ephemeral organic pigment. Soft morning backlight through translucent petals reveals delicate vein networks and soft blush gradient transitions against early sky.',
      cameraMetadata: 'Fujifilm X-T4 • XF 56mm f/1.2 R • 1/800s • f/1.4 • ISO 160',
      slideUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1600&q=80',
      palette: ['#FFB7C5', '#FF69B4', '#8B2252', '#FFF0F5', '#4A1525'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'Dreamy, creamy bokeh rendering from the f/1.2 aperture. The delicate pink tonal separation is exquisite.'
    }
  },
  {
    id: 'grp-14',
    groupNumber: 14,
    section: 'MA 3102',
    members: ['Elijah Sterling', 'Mei-Ling Zhou', 'Owen Davies'],
    color: 'Pink',
    category: 'Artificial',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Electric Bubblegum: Palm Springs Motel Sign',
      artistStatement: 'Photographing mid-century acrylic and gas neon tube signage. The double exposure layers the burning pink glass filament over saturated geometric motel architecture.',
      cameraMetadata: 'Nikon Z7 II • NIKKOR Z 85mm f/1.8 S • 1/250s • f/2.8 • ISO 250',
      slideUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1600&q=80',
      palette: ['#FF1493', '#FF69B4', '#4A0033', '#FFB6C1', '#2A001E'],
      submittedDate: '2026-08-29',
      instructorFeedback: 'Vibrant pop-art aesthetic with impeccable control of saturated highlights without blooming out of control.'
    }
  },
  {
    id: 'grp-15',
    groupNumber: 15,
    section: 'MA 3102',
    members: ['Zackary Vance', 'Fatima Zahra', 'Lucas Lind'],
    color: 'Red',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Crimson Tide: Coral Reef Polyps',
      artistStatement: 'Using an underwater housing and natural surface refraction at 3 meters depth, we captured vibrant red tubastrea coral polyps opening at dawn.',
      cameraMetadata: 'Olympus OM-D E-M1 III • 60mm f/2.8 Macro • 1/200s • f/5.6 • ISO 200',
      slideUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1600&q=80',
      palette: ['#E63946', '#D62828', '#45090C', '#FF758F', '#1D3557'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'Undersea photography is notoriously hard with red wavelengths absorbing rapidly. You conquered the lighting perfectly.'
    }
  },
  {
    id: 'grp-16',
    groupNumber: 16,
    section: 'MA 3102',
    members: ['Nadia Petrova', 'Kyle Washington', 'Min-Jun Park'],
    color: 'Green',
    category: 'Artificial',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Subway Phosphor: Ceramic Metro Passage',
      artistStatement: 'Long exposure of illuminated emerald subway wall tiling in an underground metro corridor, contrasting synthetic industrial glazing with tungsten walkway lights.',
      cameraMetadata: 'Panasonic Lumix S5 II • 24-105mm f/4 • 1/4s • f/5.6 • ISO 400',
      slideUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      palette: ['#00A86B', '#2E8B57', '#064E3B', '#A7F3D0', '#111827'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'The rhythm of glazed subway ceramic creates an immersive leading line that pulls you right through.'
    }
  },
  {
    id: 'grp-17',
    groupNumber: 17,
    section: 'MA 3102',
    members: ['Harper Evans', 'Dominic Cruz', 'Sara Al-Hashemi'],
    color: 'Blue',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Glacial Cerulean: Crevasse Ice Chamber',
      artistStatement: 'Documenting centuries-old compressed glacial ice. Due to high crystal density, only high-frequency cyan and sapphire light penetrates through the translucent cave roof.',
      cameraMetadata: 'Sony A1 • FE 16-35mm f/2.8 GM • 1/125s • f/4.5 • ISO 320',
      slideUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
      palette: ['#00B4D8', '#0077B6', '#03045E', '#90E0EF', '#CAF0F8'],
      submittedDate: '2026-08-27',
      instructorFeedback: 'Magnificent physics demonstrated through light and color. The crystal blue clarity is breathtaking.'
    }
  },
  {
    id: 'grp-18',
    groupNumber: 18,
    section: 'MA 3102',
    members: ['Gabriel Dubois', 'Tiffany Ngo', 'Marcus Shaw'],
    color: 'Orange',
    category: 'Artificial',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Molten Foundry: Steel Casting Furnace',
      artistStatement: 'Shot during an industrial steel fabrication tour. Radiant thermal emissions cast a superheated amber and orange halo across protective heat shields and soot walls.',
      cameraMetadata: 'Canon EOS R3 • RF 50mm f/1.2L • 1/1000s • f/2.8 • ISO 1600',
      slideUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
      palette: ['#FF4500', '#FF8C00', '#3B1200', '#FFD700', '#1A0800'],
      submittedDate: '2026-08-29',
      instructorFeedback: 'High shutter speed froze the molten sparks while holding highlights in the core heat glow. Masterful.'
    }
  },
  {
    id: 'grp-19',
    groupNumber: 19,
    section: 'MA 3102',
    members: ['Siddharth Rao', 'Chloe Bennett', 'Antoine Mercier'],
    color: 'Yellow',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Ginkgo Blizzard: Autumn Canopy Gold',
      artistStatement: 'A vertical perspective looking directly up into a 100-year-old ancient Ginkgo Biloba tree at the peak of its golden autumn transition, illuminated by midday sunlight.',
      cameraMetadata: 'Fujifilm GFX 50R • GF 23mm f/4 • 1/350s • f/8.0 • ISO 125',
      slideUrl: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=1600&q=80',
      palette: ['#F9A602', '#FFD700', '#7C5200', '#FFF5B8', '#382500'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'The radial branch structure creates great balance. The natural gold pigment feels rich and organic.'
    }
  },
  {
    id: 'grp-20',
    groupNumber: 20,
    section: 'MA 3102',
    members: ['Penelope Hayes', 'Ravi Kapoor', 'Valeria Ramos'],
    color: 'Purple',
    category: 'Artificial',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Ultraviolet Resonance: Laser Optics Lab',
      artistStatement: 'In the university laser physics laboratory, we documented a 405nm semiconductor violet laser diffracting through a quartz prism across dark optical breadboards.',
      cameraMetadata: 'Nikon Z8 • NIKKOR Z MC 105mm f/2.8 VR S • 1/60s • f/4.0 • ISO 500',
      slideUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
      palette: ['#7B1FA2', '#BA68C8', '#4A148C', '#E1BEE7', '#1A002C'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'Sharp control of prism beam refraction. The violet spectrum saturation is pure and laser-precise.'
    }
  },
  {
    id: 'grp-21',
    groupNumber: 21,
    section: 'MA 3102',
    members: ['Gavin O\'Reilly', 'Hannah Liu', 'Sebastian Cruz'],
    color: 'Pink',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Alpenglow Peaks: Dawn on Dolomite Limestone',
      artistStatement: 'We hiked pre-dawn to capture the alpenglow phenomenon, where direct morning solar rays reflect off high-altitude limestone crags in a rich rose and magenta wash.',
      cameraMetadata: 'Sony A7R IV • FE 70-200mm f/4 G OSS • 1/160s • f/8.0 • ISO 100',
      slideUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
      palette: ['#E07A5F', '#F4A261', '#5B2C3B', '#F7CAD0', '#2B121C'],
      submittedDate: '2026-08-29',
      instructorFeedback: 'Subtle geological hues captured with crisp alpine fidelity. Great contrast between sky and illuminated rock.'
    }
  },
  {
    id: 'grp-22',
    groupNumber: 22,
    section: 'MA 3102',
    members: ['Liam Henderson', 'Zara Siddiqui', 'Miles Morales-Tan'],
    color: 'Blue',
    category: 'Artificial',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Indigo Grid: LED Matrix Tunnel',
      artistStatement: 'A pedestrian underpass retrofitted with programmed cobalt blue LED fixtures. Long exposure accentuates the futuristic infinity mirror effect created by wet ceramic flooring.',
      cameraMetadata: 'Canon EOS R6 • RF 24-105mm f/4L • 1.5s • f/11 • ISO 100',
      slideUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1600&q=80',
      palette: ['#1E90FF', '#0000FF', '#00008B', '#87CEFA', '#0A0A23'],
      submittedDate: '2026-08-28',
      instructorFeedback: 'The geometric symmetry is pinpoint accurate. The rich cobalt blue tones never collapse into noise.'
    }
  },
  {
    id: 'grp-23',
    groupNumber: 23,
    section: 'MA 3102',
    members: ['Avery Clark', 'Devon Bailey', 'Keiko Matsui'],
    color: 'Orange',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Monarch Migration: Forest Cluster',
      artistStatement: 'Macro study of overwintering monarch butterflies clustered on pine needles. The natural chitin pigments in their wings present an intricate tapestry of amber, ochre, and black.',
      cameraMetadata: 'Fujifilm X-T5 • XF 80mm f/2.8 Macro • 1/400s • f/4.0 • ISO 250',
      slideUrl: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1600&q=80',
      palette: ['#E65C00', '#F9D423', '#4A1C00', '#FFA040', '#1C0B00'],
      submittedDate: '2026-08-29',
      instructorFeedback: 'Incredible sharpness on the wing scales and delicate antennae. Outstanding natural orange example.'
    }
  },
  {
    id: 'grp-24',
    groupNumber: 24,
    section: 'MA 3102',
    members: ['Theo Wainwright', 'Anika Patel', 'Julian Castaneda'],
    color: 'Purple',
    category: 'Natural',
    locked: true,
    status: 'approved',
    submission: {
      type: 'image',
      title: 'Geode Core: Amethyst Crystal Cluster',
      artistStatement: 'Focus-stacked macro capture of natural Uruguayan raw amethyst. Iron impurities in quartz irradiated over millions of years produce a deep, royal violet gradient within tetrahedral crystal terminations.',
      cameraMetadata: 'Sony A7R V • FE 90mm Macro • Focus Stack (18 frames) • f/8 • ISO 100',
      slideUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
      palette: ['#663399', '#9370DB', '#2B1143', '#DDA0DD', '#140822'],
      submittedDate: '2026-08-29',
      instructorFeedback: 'The 18-frame focus stack rendered every facet with diamond clarity. Rich, deep natural violet hues.'
    }
  }
];

// Export to window
window.ColorHuntMockData = {
  INITIAL_GROUPS
};
