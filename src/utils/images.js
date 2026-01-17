export function safeImageUrl(product, index) {
  // If product has a real image path, use it
  if (product.image) {
    return product.image;
  }

  // Otherwise fallback to SVG placeholder
  const text = (product.name || 'Product').replace(/[<>&'"]/g, '');
  const colors = ['#5b8cff', '#0f172a', '#ef4444', '#10b981', '#f59e0b', '#6366f1'];
  const bg = colors[(index || 0) % colors.length];
  const svg = `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${bg}"/><text x="50%" y="50%" font-family="sans-serif" font-size="30" fill="white" font-weight="bold" text-anchor="middle" dy=".3em">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
