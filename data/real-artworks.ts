import { Artwork, GalleryCollection } from '@/types/artwork';

/**
 * Real famous artworks from art history - All Public Domain
 * Downloaded from Wikimedia Commons
 * See /public/CREDITS.md for attribution
 */
export const realArtworks: Artwork[] = [
  {
    id: 'art_real_01',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    year: '1889',
    medium: 'Oil on canvas',
    dimensions: '73.7 × 92.1 cm',
    description: 'Painted from the asylum in Saint-Rémy-de-Provence, this masterpiece captures the night sky with swirling clouds, stars, and a crescent moon. The village below sleeps peacefully while the cosmos dances above.',
    baseImage: '/images/artworks/starry-night.jpg',
    thumbnailImage: '/images/artworks/starry-night.jpg',
    audioAmbient: '/audio/ambient/night-peaceful.mp3', // You'll need to add this
    tags: ['post-impressionism', 'night', 'peaceful', 'swirling', 'iconic'],
    dominantColors: ['#1e3a8a', '#fbbf24', '#1f2937', '#6366f1'],
    views: 125420,
    reactions: [
      { type: 'love', count: 8234 },
      { type: 'inspiring', count: 5612 },
      { type: 'thoughtful', count: 3421 },
    ],
    storySegments: [
      {
        id: 'seg_real_01_1',
        text: 'Van Gogh painted this view from his asylum room window at Saint-Rémy-de-Provence, just thirteen months before his death. The swirling night sky reflects his turbulent emotions.',
        audioLayer: '/audio/layers/strings-gentle.mp3',
        imageEffect: 'zoom_in_center',
        duration: 10,
      },
      {
        id: 'seg_real_01_2',
        text: 'The cypress tree in the foreground reaches upward like a dark flame, connecting earth to heaven. Van Gogh saw in nature a spiritual dimension that transcended the visible.',
        audioLayer: '/audio/layers/piano-contemplative.mp3',
        imageEffect: 'pan_left',
        duration: 12,
      },
      {
        id: 'seg_real_01_3',
        text: 'Though created during deep personal suffering, the painting radiates with life and movement. The stars shine with an intensity that suggests hope beyond the darkness.',
        audioLayer: '/audio/layers/strings-hopeful.mp3',
        imageEffect: 'scale_breathe',
        duration: 11,
      },
    ],
    createdAt: '1889-06-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art_real_02',
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    year: '1831',
    medium: 'Woodblock print',
    dimensions: '25.7 × 37.8 cm',
    description: 'Part of the series "Thirty-Six Views of Mount Fuji," this iconic print depicts an enormous wave threatening boats off the coast of Kanagawa. Mount Fuji rises in the distance.',
    baseImage: '/images/artworks/great-wave.jpg',
    thumbnailImage: '/images/artworks/great-wave.jpg',
    audioAmbient: '/audio/ambient/ocean-calm.mp3',
    tags: ['ukiyo-e', 'japanese', 'wave', 'nature', 'powerful', 'iconic'],
    dominantColors: ['#1e40af', '#f0f9ff', '#fef3c7'],
    views: 98765,
    reactions: [
      { type: 'love', count: 6543 },
      { type: 'inspiring', count: 4321 },
      { type: 'beautiful', count: 5678 },
    ],
    storySegments: [
      {
        id: 'seg_real_02_1',
        text: 'At 72 years old, Hokusai created this masterpiece that would become one of the most recognizable images in world art. The wave towers above tiny fishing boats, its claw-like foam reaching toward the sky.',
        audioLayer: '/audio/layers/strings-dramatic.mp3',
        imageEffect: 'pan_right',
        duration: 10,
      },
      {
        id: 'seg_real_02_2',
        text: 'In the background, Mount Fuji stands serene and unmoved—a symbol of permanence against the temporary fury of the sea. The contrast speaks to the Buddhist philosophy of impermanence.',
        audioLayer: '/audio/layers/flute-japanese.mp3',
        imageEffect: 'zoom_in_center',
        duration: 11,
      },
      {
        id: 'seg_real_02_3',
        text: 'The Prussian blue pigment, newly arrived in Japan, gave Hokusai unprecedented tonal range. This synthesis of Japanese tradition and Western innovation created something entirely new.',
        audioLayer: '/audio/layers/ambient-peaceful.mp3',
        imageEffect: 'scale_breathe',
        duration: 9,
      },
    ],
    createdAt: '1831-01-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art_real_03',
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    year: '1665',
    medium: 'Oil on canvas',
    dimensions: '44.5 × 39 cm',
    description: 'Often called the "Mona Lisa of the North," this captivating portrait shows a girl in exotic dress wearing a large pearl earring, gazing over her shoulder at the viewer.',
    baseImage: '/images/artworks/girl-pearl-earring.jpg',
    thumbnailImage: '/images/artworks/girl-pearl-earring.jpg',
    audioAmbient: '/audio/ambient/chamber-music.mp3',
    tags: ['baroque', 'portrait', 'mysterious', 'intimate', 'dutch-golden-age'],
    dominantColors: ['#1f2937', '#fef3c7', '#0f172a'],
    views: 87654,
    reactions: [
      { type: 'love', count: 7890 },
      { type: 'thoughtful', count: 4567 },
      { type: 'beautiful', count: 6789 },
    ],
    storySegments: [
      {
        id: 'seg_real_03_1',
        text: 'Vermeer captures a fleeting moment—the girl turns to look at us, her lips slightly parted as if about to speak. Who is she? A daughter? A servant? A muse? The mystery endures.',
        audioLayer: '/audio/layers/harpsichord-baroque.mp3',
        imageEffect: 'zoom_in_center',
        duration: 11,
      },
      {
        id: 'seg_real_03_2',
        text: 'The luminous pearl earring catches the light, drawing our eye to her face. Vermeer was a master of chiaroscuro, using light and shadow to create stunning three-dimensional effect.',
        audioLayer: '/audio/layers/strings-intimate.mp3',
        imageEffect: 'pan_left',
        duration: 10,
      },
      {
        id: 'seg_real_03_3',
        text: 'Her exotic turban and costume suggest the Dutch fascination with the Orient. Yet her direct gaze creates an intimacy that transcends time and culture, connecting viewer to subject across centuries.',
        audioLayer: '/audio/layers/cello-gentle.mp3',
        imageEffect: 'scale_breathe',
        duration: 12,
      },
    ],
    createdAt: '1665-01-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art_real_04',
    title: 'Water Lilies',
    artist: 'Claude Monet',
    year: '1906',
    medium: 'Oil on canvas',
    dimensions: '87.6 × 92.7 cm',
    description: 'From Monet\'s extensive Water Lilies series, this painting depicts his flower garden at Giverny. The water\'s surface becomes a canvas for reflections of sky, clouds, and vegetation.',
    baseImage: '/images/artworks/water-lilies.jpg',
    thumbnailImage: '/images/artworks/water-lilies.jpg',
    audioAmbient: '/audio/ambient/garden-peaceful.mp3',
    tags: ['impressionism', 'nature', 'peaceful', 'water', 'garden'],
    dominantColors: ['#6366f1', '#a5f3fc', '#10b981', '#86efac'],
    views: 76543,
    reactions: [
      { type: 'love', count: 5432 },
      { type: 'inspiring', count: 3210 },
      { type: 'beautiful', count: 6543 },
    ],
    storySegments: [
      {
        id: 'seg_real_04_1',
        text: 'In his later years, Monet became obsessed with his water garden at Giverny. He painted the lily pond over 250 times, each canvas capturing a different moment of light and atmosphere.',
        audioLayer: '/audio/layers/piano-gentle.mp3',
        imageEffect: 'pan_right',
        duration: 11,
      },
      {
        id: 'seg_real_04_2',
        text: 'The water\'s surface dissolves into abstract patterns of color and light. Monet eliminates the horizon line, creating an ambiguous space where water, sky, and vegetation merge.',
        audioLayer: '/audio/layers/strings-floating.mp3',
        imageEffect: 'zoom_in_center',
        duration: 10,
      },
      {
        id: 'seg_real_04_3',
        text: 'Painted as his eyesight was failing from cataracts, these late works show an artist transcending representation to touch pure visual sensation. They point forward to abstract expressionism.',
        audioLayer: '/audio/layers/ambient-water.mp3',
        imageEffect: 'scale_breathe',
        duration: 12,
      },
    ],
    createdAt: '1906-01-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art_real_05',
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    year: '1908',
    medium: 'Oil and gold leaf on canvas',
    dimensions: '180 × 180 cm',
    description: 'Klimt\'s most famous work depicts a couple embracing, their bodies entwined and wrapped in elaborate robes decorated with geometric patterns. Gold leaf creates a radiant, decorative surface.',
    baseImage: '/images/artworks/the-kiss.jpg',
    thumbnailImage: '/images/artworks/the-kiss.jpg',
    audioAmbient: '/audio/ambient/romantic-strings.mp3',
    tags: ['art-nouveau', 'love', 'golden', 'symbolic', 'decorative'],
    dominantColors: ['#fbbf24', '#a855f7', '#10b981'],
    views: 92341,
    reactions: [
      { type: 'love', count: 9876 },
      { type: 'inspiring', count: 5432 },
      { type: 'beautiful', count: 7654 },
    ],
    storySegments: [
      {
        id: 'seg_real_05_1',
        text: 'Created at the height of Klimt\'s "Golden Period," this painting uses actual gold leaf applied to the canvas. The lovers exist in a timeless, spiritual realm, disconnected from earthly concerns.',
        audioLayer: '/audio/layers/strings-romantic.mp3',
        imageEffect: 'zoom_in_center',
        duration: 11,
      },
      {
        id: 'seg_real_05_2',
        text: 'Notice the geometric patterns on their robes—rectangles for him, circles for her, symbolizing masculine and feminine principles. At the edge where they meet, the patterns merge and transform.',
        audioLayer: '/audio/layers/piano-tender.mp3',
        imageEffect: 'pan_left',
        duration: 10,
      },
      {
        id: 'seg_real_05_3',
        text: 'The woman\'s face shows complete surrender and rapture, while we cannot see the man\'s face at all. Klimt captures love not as mutual gaze but as shared dissolution of self.',
        audioLayer: '/audio/layers/cello-warm.mp3',
        imageEffect: 'scale_breathe',
        duration: 12,
      },
    ],
    createdAt: '1908-01-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art_real_06',
    title: 'The Scream',
    artist: 'Edvard Munch',
    year: '1893',
    medium: 'Oil, tempera, pastel and crayon on cardboard',
    dimensions: '91 × 73.5 cm',
    description: 'An icon of expressionism, this painting shows an agonized figure against a tumultuous orange sky. The androgynous figure clutches its face as it releases a primal scream of existential anxiety.',
    baseImage: '/images/artworks/the-scream.jpg',
    thumbnailImage: '/images/artworks/the-scream.jpg',
    audioAmbient: '/audio/ambient/tension-ambient.mp3',
    tags: ['expressionism', 'anxiety', 'emotional', 'iconic', 'psychological'],
    dominantColors: ['#ef4444', '#fb923c', '#0f172a'],
    views: 103456,
    reactions: [
      { type: 'thoughtful', count: 6789 },
      { type: 'inspiring', count: 4321 },
      { type: 'love', count: 5678 },
    ],
    storySegments: [
      {
        id: 'seg_real_06_1',
        text: 'Munch wrote of the inspiration: "I was walking along the road with two friends when the sun set; suddenly, the sky turned as red as blood. I stopped and leaned against the fence, feeling unspeakably tired."',
        audioLayer: '/audio/layers/strings-tense.mp3',
        imageEffect: 'zoom_in_center',
        duration: 12,
      },
      {
        id: 'seg_real_06_2',
        text: 'The figure\'s scream seems to ripple through the entire landscape—the sky, the fjord, even the wooden fence all vibrate with anxiety. Nature itself becomes a projection of human emotion.',
        audioLayer: '/audio/layers/synth-dark.mp3',
        imageEffect: 'rotate_subtle',
        duration: 10,
      },
      {
        id: 'seg_real_06_3',
        text: 'Munch created this during a period of great personal turmoil, grappling with the death of family members and his own mental health. The painting became an icon of modern anxiety and alienation.',
        audioLayer: '/audio/layers/ambient-echo.mp3',
        imageEffect: 'pan_right',
        duration: 11,
      },
    ],
    createdAt: '1893-01-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art_real_07',
    title: 'Wanderer above the Sea of Fog',
    artist: 'Caspar David Friedrich',
    year: '1818',
    medium: 'Oil on canvas',
    dimensions: '94.8 × 74.8 cm',
    description: 'A man stands on a rocky precipice, his back to the viewer, gazing out over a sea of fog-covered mountains. The painting epitomizes the Romantic sublime—humans confronting the vastness of nature.',
    baseImage: '/images/artworks/wanderer-sea-fog.jpg',
    thumbnailImage: '/images/artworks/wanderer-sea-fog.jpg',
    audioAmbient: '/audio/ambient/mountain-wind.mp3',
    tags: ['romanticism', 'nature', 'sublime', 'contemplative', 'landscape'],
    dominantColors: ['#64748b', '#94a3b8', '#cbd5e1'],
    views: 67890,
    reactions: [
      { type: 'thoughtful', count: 5678 },
      { type: 'inspiring', count: 6789 },
      { type: 'beautiful', count: 4567 },
    ],
    storySegments: [
      {
        id: 'seg_real_07_1',
        text: 'The wanderer stands at a threshold between known and unknown. His elevated position suggests both mastery and isolation. Friedrich invites us to share his viewpoint, to see ourselves in his solitary figure.',
        audioLayer: '/audio/layers/strings-epic.mp3',
        imageEffect: 'zoom_in_center',
        duration: 11,
      },
      {
        id: 'seg_real_07_2',
        text: 'The sea of fog conceals the valleys while revealing mountain peaks—a perfect metaphor for Romantic philosophy. Some truths remain hidden while others stand revealed in stark clarity.',
        audioLayer: '/audio/layers/piano-contemplative.mp3',
        imageEffect: 'pan_right',
        duration: 12,
      },
      {
        id: 'seg_real_07_3',
        text: 'Friedrich painted during Germany\'s political fragmentation. The painting can be read as nationalistic—the wanderer surveying German lands—or as universal meditation on human place in the cosmos.',
        audioLayer: '/audio/layers/ambient-wind.mp3',
        imageEffect: 'scale_breathe',
        duration: 10,
      },
    ],
    createdAt: '1818-01-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art_real_08',
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    year: '1485',
    medium: 'Tempera on canvas',
    dimensions: '172.5 × 278.9 cm',
    description: 'One of the most famous paintings of the Renaissance, depicting Venus emerging from the sea as a fully grown woman, arriving at the shore on a giant scallop shell. She is greeted by the nymphs.',
    baseImage: '/images/artworks/birth-venus.jpg',
    thumbnailImage: '/images/artworks/birth-venus.jpg',
    audioAmbient: '/audio/ambient/renaissance-pastoral.mp3',
    tags: ['renaissance', 'mythology', 'classical', 'beauty', 'iconic'],
    dominantColors: ['#fef3c7', '#fbcfe8', '#bae6fd'],
    views: 85432,
    reactions: [
      { type: 'beautiful', count: 8765 },
      { type: 'love', count: 6543 },
      { type: 'inspiring', count: 5432 },
    ],
    storySegments: [
      {
        id: 'seg_real_08_1',
        text: 'Botticelli reimagines the classical myth of Venus\'s birth from sea foam after the castration of Uranus. She arrives at Cyprus, blown by the winds, standing in a pose derived from ancient "Venus Pudica" sculptures.',
        audioLayer: '/audio/layers/lute-renaissance.mp3',
        imageEffect: 'zoom_in_center',
        duration: 12,
      },
      {
        id: 'seg_real_08_2',
        text: 'The painting was commissioned by the Medici family for their villa. It represents a synthesis of Christian and pagan thought characteristic of Renaissance humanism—divine love manifested in physical beauty.',
        audioLayer: '/audio/layers/strings-flowing.mp3',
        imageEffect: 'pan_left',
        duration: 11,
      },
      {
        id: 'seg_real_08_3',
        text: 'Notice Venus\'s melancholy expression despite her idealized beauty. Botticelli imbues her with a wistful, introspective quality that makes her more than a symbol—she becomes a feeling, thinking being.',
        audioLayer: '/audio/layers/flute-gentle.mp3',
        imageEffect: 'scale_breathe',
        duration: 10,
      },
    ],
    createdAt: '1485-01-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art_real_09',
    title: 'Nighthawks',
    artist: 'Edward Hopper',
    year: '1942',
    medium: 'Oil on canvas',
    dimensions: '84.1 × 152.4 cm',
    description: 'Hopper\'s most famous painting depicts people in a downtown diner late at night, seen through the establishment\'s large glass windows. The painting has become an icon of urban isolation.',
    baseImage: '/images/artworks/nighthawks.jpg',
    thumbnailImage: '/images/artworks/nighthawks.jpg',
    audioAmbient: '/audio/ambient/city-night.mp3',
    tags: ['realism', 'urban', 'loneliness', 'american', 'noir'],
    dominantColors: ['#fbbf24', '#0f172a', '#dc2626'],
    views: 79876,
    reactions: [
      { type: 'thoughtful', count: 6789 },
      { type: 'love', count: 5432 },
      { type: 'inspiring', count: 4321 },
    ],
    storySegments: [
      {
        id: 'seg_real_09_1',
        text: 'Painted shortly after Pearl Harbor, "Nighthawks" captures a mood of wartime anxiety. The isolated figures sit together yet apart, unable to connect despite their physical proximity.',
        audioLayer: '/audio/layers/jazz-ambient.mp3',
        imageEffect: 'pan_right',
        duration: 11,
      },
      {
        id: 'seg_real_09_2',
        text: 'Hopper eliminates the street-level door—there\'s no visible way to enter or exit the diner. The people are trapped in their fluorescent-lit fishbowl while darkness presses in from outside.',
        audioLayer: '/audio/layers/piano-noir.mp3',
        imageEffect: 'zoom_in_center',
        duration: 10,
      },
      {
        id: 'seg_real_09_3',
        text: 'The painting influenced countless films and artworks. Film noir directors cited Hopper\'s use of light and shadow. It has become an emblem of alienation in modern urban life.',
        audioLayer: '/audio/layers/strings-melancholy.mp3',
        imageEffect: 'scale_breathe',
        duration: 12,
      },
    ],
    createdAt: '1942-01-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art_real_10',
    title: 'The Son of Man',
    artist: 'René Magritte',
    year: '1964',
    medium: 'Oil on canvas',
    dimensions: '116 × 89 cm',
    description: 'Magritte\'s iconic surrealist self-portrait shows a man in a bowler hat and overcoat standing before a low wall, beyond which is the sea and cloudy sky. A green apple obscures his face.',
    baseImage: '/images/artworks/son-of-man.jpg',
    thumbnailImage: '/images/artworks/son-of-man.jpg',
    audioAmbient: '/audio/ambient/surreal-ambient.mp3',
    tags: ['surrealism', 'identity', 'mysterious', 'modern', 'symbolic'],
    dominantColors: ['#6366f1', '#10b981', '#1f2937'],
    views: 71234,
    reactions: [
      { type: 'thoughtful', count: 5678 },
      { type: 'inspiring', count: 4567 },
      { type: 'love', count: 3456 },
    ],
    storySegments: [
      {
        id: 'seg_real_10_1',
        text: 'Magritte wrote: "Everything we see hides another thing, we always want to see what is hidden by what we see." The visible conceals rather than reveals truth.',
        audioLayer: '/audio/layers/ambient-mysterious.mp3',
        imageEffect: 'zoom_in_center',
        duration: 10,
      },
      {
        id: 'seg_real_10_2',
        text: 'The bowler-hatted man recurs throughout Magritte\'s work as a kind of everyman figure—anonymous, middle-class, conformist. The apple suggests both temptation and the impossibility of knowledge.',
        audioLayer: '/audio/layers/piano-quirky.mp3',
        imageEffect: 'pan_left',
        duration: 11,
      },
      {
        id: 'seg_real_10_3',
        text: 'Behind the apple, you can glimpse the man\'s eyes. This partial concealment is more disturbing than total hiding. We sense a human presence but cannot fully connect with it.',
        audioLayer: '/audio/layers/strings-eerie.mp3',
        imageEffect: 'scale_breathe',
        duration: 12,
      },
    ],
    createdAt: '1964-01-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
];

// Featured collection
export const featuredCollection: GalleryCollection = {
  id: 'featured_real',
  name: 'Masterpieces of Art History',
  description: 'A curated selection of the most famous paintings in Western art history, from Renaissance to Modern art.',
  artworks: realArtworks.slice(0, 5),
  mood: 'inspiring',
};

// Collections by period
export const renaissanceCollection: GalleryCollection = {
  id: 'renaissance',
  name: 'Renaissance & Baroque',
  description: 'Classical beauty and technical mastery from the golden ages of European art.',
  artworks: realArtworks.filter(a =>
    a.tags?.includes('renaissance') || a.tags?.includes('baroque')
  ),
  mood: 'classical',
};

export const impressionismCollection: GalleryCollection = {
  id: 'impressionism',
  name: 'Impressionism & Post-Impressionism',
  description: 'Light, color, and fleeting moments captured by the revolutionary artists of late 19th century.',
  artworks: realArtworks.filter(a =>
    a.tags?.includes('impressionism') || a.tags?.includes('post-impressionism')
  ),
  mood: 'peaceful',
};

export const modernCollection: GalleryCollection = {
  id: 'modern',
  name: 'Modern & Surrealist',
  description: 'Breaking boundaries and exploring new perspectives in 20th century art.',
  artworks: realArtworks.filter(a =>
    a.tags?.includes('expressionism') ||
    a.tags?.includes('surrealism') ||
    a.tags?.includes('realism')
  ),
  mood: 'mysterious',
};

// Utility functions
export function getAllRealArtworks(): Artwork[] {
  return realArtworks;
}

export function getRealArtworkById(id: string): Artwork | undefined {
  return realArtworks.find(artwork => artwork.id === id);
}

export function getRecommendedRealArtworks(currentId: string, limit: number = 3): Artwork[] {
  return realArtworks
    .filter(artwork => artwork.id !== currentId)
    .slice(0, limit);
}
