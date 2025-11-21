import { Artwork, GalleryCollection } from '@/types/artwork';

/**
 * Mock artwork data for The Ethereal Art Gallery
 * Note: Replace paths with actual image and audio files when available
 */
export const artworks: Artwork[] = [
  {
    id: 'art_01',
    title: 'Bình Minh Hy Vọng',
    artist: 'Trần Văn A',
    year: '2024',
    medium: 'Oil on Canvas',
    dimensions: '120 × 180 cm',
    description: 'Một tác phẩm về sự tái sinh và hy vọng trong những khoảnh khắc đầu tiên của ngày mới.',
    baseImage: '/images/artworks/binh-minh-hy-vong.svg',
    thumbnailImage: '/images/artworks/binh-minh-hy-vong-thumb.svg',
    audioAmbient: '/audio/ambient/morning-birds.mp3',
    tags: ['hopeful', 'serene', 'uplifting'],
    dominantColors: ['#FDB462', '#FFFFB3', '#B3DE69'],
    storySegments: [
      {
        id: 'seg_1',
        text: 'Khi ánh sáng đầu tiên chạm vào mặt nước, thế giới dường như thở ra sau một giấc ngủ dài. Những tia nắng vàng óng len lỏi qua từng lớp sương mù, vẽ nên bức tranh của sự khởi đầu.',
        audioLayer: '/audio/layers/piano-gentle.mp3',
        imageEffect: 'zoom_in_center',
        duration: 8,
      },
      {
        id: 'seg_2',
        text: 'Nhưng sâu thẳm bên dưới, trong lòng nước tối, là sự hỗn loạn của những giấc mơ đã qua. Nghệ sĩ không che giấu nỗi đau - thay vào đó, ông để nó chìm xuống, nhường chỗ cho ánh sáng.',
        audioLayer: '/audio/layers/cello-tension.mp3',
        imageEffect: 'pan_left_down',
        duration: 10,
      },
      {
        id: 'seg_3',
        text: 'Và rồi, từ ranh giới giữa bóng tối và ánh sáng, một sự thật hiện ra: Hy vọng không phải là sự vắng mặt của đau khổ, mà là sự lựa chọn nhìn về phía trước.',
        audioLayer: '/audio/layers/strings-hopeful.mp3',
        imageEffect: 'scale_breathe',
        duration: 12,
      },
    ],
  },
  {
    id: 'art_02',
    title: 'Mê Cung Nội Tâm',
    artist: 'Nguyễn Thị B',
    year: '2023',
    medium: 'Acrylic and Mixed Media',
    dimensions: '150 × 150 cm',
    description: 'Khám phá những ngõ ngách phức tạp của tâm trí con người, nơi ký ức và cảm xúc đan xen.',
    baseImage: '/images/artworks/me-cung-noi-tam.svg',
    thumbnailImage: '/images/artworks/me-cung-noi-tam-thumb.svg',
    audioAmbient: '/audio/ambient/wind-whispers.mp3',
    tags: ['introspective', 'complex', 'mysterious'],
    dominantColors: ['#8DD3C7', '#BEBADA', '#FB8072'],
    storySegments: [
      {
        id: 'seg_1',
        text: 'Mỗi con đường trong mê cung này đại diện cho một quyết định, một lựa chọn, một khoảnh khắc định hình con người chúng ta. Những bức tường không phải để giam cầm, mà để bảo vệ.',
        audioLayer: '/audio/layers/ambient-echo.mp3',
        imageEffect: 'pan_right',
        duration: 9,
      },
      {
        id: 'seg_2',
        text: 'Trong những góc tối nhất của mê cung, chúng ta tìm thấy những mảnh vỡ của bản thân - những điều ta tưởng đã mất. Nghệ sĩ nhắc nhở: Lạc lối không phải là thất bại.',
        audioLayer: '/audio/layers/synth-dark.mp3',
        imageEffect: 'rotate_subtle',
        duration: 11,
      },
      {
        id: 'seg_3',
        text: 'Vì có một sự thật ẩn giấu: Trung tâm của mê cung không chứa kho báu hay lối thoát. Nó chứa một tấm gương - phản chiếu con người bạn đã trở thành qua hành trình.',
        audioLayer: '/audio/layers/bell-resonance.mp3',
        imageEffect: 'zoom_in_center',
        duration: 13,
      },
    ],
  },
  {
    id: 'art_03',
    title: 'Điệu Nhảy Của Thời Gian',
    artist: 'Lê Văn C',
    year: '2024',
    medium: 'Digital Art',
    dimensions: 'Variable',
    description: 'Thời gian không đi thẳng - nó xoay, nó nhảy múa, nó quay về những nơi ta tưởng đã bỏ lại.',
    baseImage: '/images/artworks/dieu-nhay-cua-thoi-gian.svg',
    thumbnailImage: '/images/artworks/dieu-nhay-cua-thoi-gian-thumb.svg',
    audioAmbient: '/audio/ambient/clock-ticks.mp3',
    tags: ['temporal', 'dynamic', 'philosophical'],
    dominantColors: ['#80B1D3', '#FDB462', '#B3DE69'],
    storySegments: [
      {
        id: 'seg_1',
        text: 'Nhìn kỹ vào những đường xoắn ốc - mỗi vòng tròn là một chu kỳ, một mùa, một thời kỳ trong đời. Chúng không bao giờ giống nhau hoàn toàn, nhưng luôn mang âm vang của nhau.',
        audioLayer: '/audio/layers/harp-gentle.mp3',
        imageEffect: 'rotate_subtle',
        duration: 10,
      },
      {
        id: 'seg_2',
        text: 'Có những khoảnh khắc thời gian dường như dừng lại - được đánh dấu bằng những chấm sáng trong tranh. Đây là những giây phút định nghĩa, những ký ức không phai.',
        audioLayer: '/audio/layers/crystal-chimes.mp3',
        imageEffect: 'zoom_in_center',
        duration: 8,
      },
      {
        id: 'seg_3',
        text: 'Nghệ sĩ thì thầm: "Thời gian không phải kẻ thù. Nó là vũ công, mời ta cùng nhảy. Câu hỏi duy nhất là - bạn có chấp nhận lời mời không?"',
        audioLayer: '/audio/layers/violin-ethereal.mp3',
        imageEffect: 'scale_breathe',
        duration: 12,
      },
    ],
  },
  {
    id: 'art_04',
    title: 'Những Mảnh Vỡ Kết Nối',
    artist: 'Phạm Thị D',
    year: '2023',
    medium: 'Ceramic and Gold Leaf',
    dimensions: '90 × 120 cm',
    description: 'Lấy cảm hứng từ nghệ thuật Kintsugi của Nhật Bản - vẻ đẹp trong những vết nứt được hàn gắn.',
    baseImage: '/images/artworks/nhung-manh-vo-ket-noi.svg',
    thumbnailImage: '/images/artworks/nhung-manh-vo-ket-noi-thumb.svg',
    audioAmbient: '/audio/ambient/rain-gentle.mp3',
    tags: ['healing', 'resilient', 'beautiful'],
    dominantColors: ['#FFD700', '#FAFAFA', '#8B7355'],
    storySegments: [
      {
        id: 'seg_1',
        text: 'Những đường vàng không che giấu vết nứt - chúng tôn vinh nó. Mỗi mảnh vỡ là một câu chuyện, một thử thách đã vượt qua, một lần ta tưởng mình sẽ không đứng dậy được.',
        audioLayer: '/audio/layers/piano-contemplative.mp3',
        imageEffect: 'zoom_in_center',
        duration: 11,
      },
      {
        id: 'seg_2',
        text: 'Có người hỏi: "Tại sao không thay thế mảnh gốm mới?" Nghệ sĩ đáp: "Vì mảnh vỡ này mang lịch sử. Nó là bằng chứng rằng ta đã sống, đã trải nghiệm, đã tồn tại."',
        audioLayer: '/audio/layers/cello-warm.mp3',
        imageEffect: 'pan_right_up',
        duration: 10,
      },
      {
        id: 'seg_3',
        text: 'Vàng không làm mảnh gốm trở lại như cũ. Nó tạo nên điều gì đó đẹp hơn - một tác phẩm nghệ thuật được sinh ra từ sự rạn nứt. Chúng ta cũng vậy.',
        audioLayer: '/audio/layers/strings-uplifting.mp3',
        imageEffect: 'scale_breathe',
        duration: 13,
      },
    ],
  },
  {
    id: 'art_05',
    title: 'Giấc Mơ Sâu Thẳm',
    artist: 'Hoàng Văn E',
    year: '2024',
    medium: 'Oil on Canvas',
    dimensions: '200 × 130 cm',
    description: 'Hành trình xuống tầng sâu của tiềm thức, nơi hiện thực và giấc mơ hòa quyện.',
    baseImage: '/images/artworks/giac-mo-sau-tham.svg',
    thumbnailImage: '/images/artworks/giac-mo-sau-tham-thumb.svg',
    audioAmbient: '/audio/ambient/underwater-hum.mp3',
    tags: ['surreal', 'dreamlike', 'subconscious'],
    dominantColors: ['#1B4F72', '#5DADE2', '#A569BD'],
    storySegments: [
      {
        id: 'seg_1',
        text: 'Ở đáy đại dương của tâm thức, ánh sáng từ bề mặt chỉ còn là ký ức mờ nhạt. Đây là nơi những suy nghĩ không còn hình dạng, mà trở thành cảm giác thuần túy.',
        audioLayer: '/audio/layers/ambient-deep.mp3',
        imageEffect: 'pan_down',
        duration: 9,
      },
      {
        id: 'seg_2',
        text: 'Những sinh vật lạ lùng bơi qua - chúng là biểu tượng của những nỗi sợ chưa được đặt tên, những khát vọng chưa được thừa nhận. Nghệ sĩ không sợ chúng - ông vẽ chúng với sự tò mò.',
        audioLayer: '/audio/layers/synth-mysterious.mp3',
        imageEffect: 'pan_left',
        duration: 12,
      },
      {
        id: 'seg_3',
        text: 'Và trong độ sâu tuyệt đối, một phát hiện: Đại dương này không có đáy. Tiềm thức là vô hạn. Mỗi lần lặn sâu, ta khám phá thêm một phần của chính mình.',
        audioLayer: '/audio/layers/whale-song.mp3',
        imageEffect: 'zoom_in_center',
        duration: 14,
      },
    ],
  },
  {
    id: 'art_06',
    title: 'Vũ Khúc Của Gió',
    artist: 'Đỗ Thị F',
    year: '2023',
    medium: 'Watercolor and Ink',
    dimensions: '100 × 150 cm',
    description: 'Những gì vô hình thường mạnh mẽ nhất - gió là lực lượng bất diệt, luôn chuyển động, luôn tự do.',
    baseImage: '/images/artworks/vu-khuc-cua-gio.svg',
    thumbnailImage: '/images/artworks/vu-khuc-cua-gio-thumb.svg',
    audioAmbient: '/audio/ambient/wind-flowing.mp3',
    tags: ['freedom', 'movement', 'invisible-power'],
    dominantColors: ['#E8F5E9', '#81C784', '#FFECB3'],
    storySegments: [
      {
        id: 'seg_1',
        text: 'Bạn không thể nắm giữ gió, nhưng bạn có thể cảm nhận nó. Những nét cọ bay bổng trong tranh này không cố định hóa gió - chúng bắt giữ cảm giác của nó.',
        audioLayer: '/audio/layers/flute-airy.mp3',
        imageEffect: 'pan_right',
        duration: 8,
      },
      {
        id: 'seg_2',
        text: 'Gió không cưỡng lại chướng ngại vật - nó chảy qua, chảy xung quanh, chảy theo những con đường ít kháng cự nhất. Đây là triết lý sống: đừng đập vỡ tường, hãy tìm cửa.',
        audioLayer: '/audio/layers/bamboo-chimes.mp3',
        imageEffect: 'rotate_subtle',
        duration: 11,
      },
      {
        id: 'seg_3',
        text: 'Nghệ sĩ để lại khoảng trống trong tranh - không phải vì lười biếng, mà vì gió cần không gian để thở. Cuộc sống cũng vậy. Chúng ta cần khoảng trống để tồn tại.',
        audioLayer: '/audio/layers/strings-freedom.mp3',
        imageEffect: 'scale_breathe',
        duration: 13,
      },
    ],
  },
];

/**
 * Main gallery collection
 */
export const mainCollection: GalleryCollection = {
  id: 'main',
  title: 'The Ethereal Art Gallery',
  description: 'Nơi trú ẩn cho tâm hồn - một hành trình khám phá nghệ thuật qua âm thanh và chuyển động.',
  artworks,
};

/**
 * Get artwork by ID
 */
export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find((artwork) => artwork.id === id);
}

/**
 * Get artworks by tag (for mood-based filtering)
 */
export function getArtworksByTag(tag: string): Artwork[] {
  return artworks.filter((artwork) => artwork.tags?.includes(tag));
}

/**
 * Get recommended artworks based on current artwork
 * (Simple implementation - can be enhanced with ML)
 */
export function getRecommendedArtworks(currentId: string, limit: number = 3): Artwork[] {
  const current = getArtworkById(currentId);
  if (!current) return [];

  // Find artworks with similar tags
  const similarByTag = artworks
    .filter((artwork) =>
      artwork.id !== currentId &&
      artwork.tags?.some((tag) => current.tags?.includes(tag))
    )
    .slice(0, limit);

  return similarByTag;
}
