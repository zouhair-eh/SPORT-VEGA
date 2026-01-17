/**
 * VEGA MEDIA UTILITY 3.0
 * Handles high-quality Unsplash images and video fallbacks.
 */

const CATEGORY_VIDEOS = {
  football: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-player-kicking-the-ball-in-the-stadium-1422-large.mp4',
  boxing: 'https://assets.mixkit.co/videos/preview/mixkit-boxer-training-in-the-gym-34204-large.mp4',
  gym: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-his-arms-at-the-gym-441-large.mp4',
  running: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-on-a-road-1563-large.mp4',
  basketball: 'https://assets.mixkit.co/videos/preview/mixkit-basketball-player-scoring-a-hoop-2804-large.mp4',
  tennis: 'https://assets.mixkit.co/videos/preview/mixkit-tennis-player-hitting-a-ball-4859-large.mp4',
}

export function getProductImage(product, index = 0) {
  if (product.image && !product.image.includes('placeholder')) {
    return product.image;
  }

  // Use Unsplash Source for high-quality dynamic images
  // Format: https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&q=80&w=800
  // Instead of simple search, we use curated IDs for the best look or keyword-based source
  const query = encodeURIComponent(`${product.category} ${product.name} sport`);
  return `https://source.unsplash.com/featured/800x600?${query}&v=${index}`;
}

export function getCategoryVideo(category) {
  return CATEGORY_VIDEOS[category] || CATEGORY_VIDEOS.gym;
}

export function safeImageUrl(product, index) {
  return getProductImage(product, index);
}
