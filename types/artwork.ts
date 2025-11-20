/**
 * Image effect types for GSAP animations
 */
export type ImageEffect =
  | 'zoom_in_center'
  | 'zoom_out'
  | 'pan_left'
  | 'pan_right'
  | 'pan_up'
  | 'pan_down'
  | 'pan_left_down'
  | 'pan_right_up'
  | 'rotate_subtle'
  | 'scale_breathe';

/**
 * Story segment within an artwork's narrative
 */
export interface StorySegment {
  id: string;
  text: string;
  audioLayer?: string; // Path to audio layer file
  imageEffect?: ImageEffect; // GSAP animation effect
  duration?: number; // Duration in seconds (for timing)
}

/**
 * Comment on an artwork
 */
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
  likes: number;
  likedBy: string[]; // Array of user IDs who liked this comment
}

/**
 * Reaction on an artwork
 */
export type ReactionType = 'love' | 'inspiring' | 'thoughtful' | 'beautiful';

export interface Reaction {
  type: ReactionType;
  count: number;
  users: string[]; // Array of user IDs who reacted
}

/**
 * Complete artwork data structure
 */
export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year?: string;
  medium?: string;
  dimensions?: string;
  description: string;
  baseImage: string; // Path to high-res image
  thumbnailImage: string; // Path to thumbnail for gallery view
  audioAmbient?: string; // Path to ambient loop
  storySegments: StorySegment[];
  tags?: string[]; // For mood-based filtering (e.g., 'hopeful', 'melancholic')
  dominantColors?: string[]; // For color-based recommendations
  views?: number; // View counter
  createdAt?: string; // Creation date
  updatedAt?: string; // Last update date
  comments?: Comment[]; // Comments on artwork
  reactions?: Reaction[]; // Reactions on artwork
}

/**
 * Gallery collection
 */
export interface GalleryCollection {
  id: string;
  title: string;
  description: string;
  artworks: Artwork[];
}

/**
 * Audio layer state for adaptive audio system
 */
export interface AudioLayer {
  id: string;
  howl: any; // Howler.Howl instance
  volume: number;
  isPlaying: boolean;
  fadeIn: (duration?: number) => void;
  fadeOut: (duration?: number) => void;
}

/**
 * Scroll trigger configuration
 */
export interface ScrollTriggerConfig {
  segmentId: string;
  start: string;
  end: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}
