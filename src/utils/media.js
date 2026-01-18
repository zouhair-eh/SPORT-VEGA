/**
 * VEGA MEDIA UTILITY 3.2
 * Curated high-performance assets for the elite sports experience.
 */

const CATEGORY_VIDEOS = {
  hero: 'https://assets.mixkit.co/videos/43490/43490-360.mp4', // Stadium
  boxing: 'https://assets.mixkit.co/videos/45881/45881-360.mp4',
  football: 'https://assets.mixkit.co/videos/43499/43499-360.mp4',
  gym: 'https://assets.mixkit.co/videos/52112/52112-360.mp4',
  basketball: 'https://assets.mixkit.co/videos/44468/44468-360.mp4',
  running: 'https://assets.mixkit.co/videos/608/608-360.mp4',
};

// Curated Unsplash IDs for maximum variety and quality
const SEEDED_IDS = {
  gym: ['1534438327759-c3d0cb0a4362', '1540497077202-7c8a3999166f', '1581009146145-b5ef03a79e7f', '1534367507873-d2d7e24c79b0', '1517836357463-d25dfeac3438'],
  football: ['1574629810360-7efbbe195018', '1508098682722-e99c43a406b2', '1431324155629-1a6deb1dec8d', '1517466787929-bc942514f338', '1518091044754-94b8f0ca075c'],
  boxing: ['1549719386-74dfcbf7dbed', '1509563268479-0fd0c63b4f9b', '1552072064-13d77991575c', '1519766304817-4f369ee23a22', '1552072870-1647f3b89b4f'],
  cardio: ['1538805060514-97d9cc17730c', '1518611012138-08627395a1c3', '1571019613454-1cb2f99b2d8b', '1594882645126-14020914d58d', '1591115444857-39d2427da993'],
  basketball: ['1546519638-68e109498ffc', '1519861531473-920026218aef', '1504450758481-7338eba7524a', '1544450377-50a3cc160534', '1472478345041-33758376518a'],
  tennis: ['1595435934249-5df7ed86e1c0', '1622279457486-62dcc4a4bd1d', '1554068865-24cecd4e34b8', '1531315630201-bb15faebac6b', '1592709823125-a191f07a2a0e'],
  running: ['1476480862126-209bfaa8edc8', '1452626038306-9aae5e071dd3', '1530143311094-34c7078996fe', '1538370945049-0c2613211f11', '1595078475328-1ab0540ae167'],
  recovery: ['1544117519-31a4b719223d', '1518310327616-2a628cc348d2', '1541534741688-2947f631244f', '1445384763658-040093f5e93c', '1566933261-26732008803a'],
  apparel: ['1551854616-bfcd561f7ebf', '1483721314737-c5a5e4906b32', '1521533845-c30963e0e7cf', '1485125633367-c39c57091af5', '1483721314737-c5a5e4906b32'],
};

export function getCategoryVideo(category) {
  return CATEGORY_VIDEOS[category] || CATEGORY_VIDEOS.hero;
}

export function getProductImage(product, index = 0) {
  // Use product-specific search query for maximum uniqueness
  const query = product.imageQuery || product.category || 'sport fitness';

  // Deterministic seed ensures same product gets same image on refresh, but different products in same category get different ones
  const photoList = SEEDED_IDS[product.category] || SEEDED_IDS.gym;
  const photoId = photoList[index % photoList.length];

  // We rotate between search-based and curated-ID based to avoid 100% repetition
  // But for "Boxing", we use the most aggressive search to get exactly what the user wants
  if (product.category === 'boxing' || product.category === 'football') {
    return `https://images.unsplash.com/featured/?${encodeURIComponent(query)}&sig=${product.id}`;
  }

  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=800&v=${product.id}`;
}
