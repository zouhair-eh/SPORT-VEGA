/**
 * VEGA MEDIA UTILITY 3.1 - RELIABLE & HIGH-PERFORMANCE
 * Uses curated Unsplash IDs for maximum reliability and speed.
 */

// Curated high-quality sport IDs for categories
const CATEGORY_IMAGES = {
  football: '1508098598007-01d00e86b19d',
  gym: '1534438327276-14e5300c3a48',
  cardio: '1518611012118-29a8a6345c2c',
  boxing: '1552072092-2f9b111e64fb',
  basketball: '1546519638-68e109498ffc',
  tennis: '1622279457482-135474c970bf',
  running: '1533560904424-a0c61dc306fc',
  recovery: '1544367567-0f2fcb009e0b',
  apparel: '1556906781-9a078d8a395c',
  teamkits: '1517841905240-472986230f28'
}

const CATEGORY_VIDEOS = {
  football: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-player-kicking-the-ball-in-the-stadium-1422-large.mp4',
  boxing: 'https://assets.mixkit.co/videos/preview/mixkit-boxer-training-in-the-gym-34204-large.mp4',
  gym: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-his-arms-at-the-gym-441-large.mp4',
  running: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-on-a-road-1563-large.mp4',
  basketball: 'https://assets.mixkit.co/videos/preview/mixkit-basketball-player-scoring-a-hoop-2804-large.mp4',
  tennis: 'https://assets.mixkit.co/videos/preview/mixkit-tennis-player-hitting-a-ball-4859-large.mp4',
}

export function getProductImage(product, index = 0) {
  // If product has a hardcoded real image, use it
  if (product.image && !product.image.includes('placeholder') && !product.image.includes('source.unsplash')) {
    return product.image;
  }

  // Use the curated category image if possible
  const id = CATEGORY_IMAGES[product.category] || CATEGORY_IMAGES.gym;

  // Return direct Unsplash URL with optimizations
  // We add the index to the width or a seed to get slightly different images if needed
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=800&v=${index}`;
}

export function getCategoryVideo(category) {
  return CATEGORY_VIDEOS[category] || CATEGORY_VIDEOS.gym;
}

export function safeImageUrl(product, index) {
  return getProductImage(product, index);
}
