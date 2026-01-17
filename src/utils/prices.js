// Price management utilities using localStorage

const PRICE_STORAGE_KEY = 'vega-prices'

export function loadPrices() {
    try {
        const stored = localStorage.getItem(PRICE_STORAGE_KEY)
        return stored ? JSON.parse(stored) : {}
    } catch {
        return {}
    }
}

export function savePrices(prices) {
    try {
        localStorage.setItem(PRICE_STORAGE_KEY, JSON.stringify(prices))
    } catch (e) {
        console.error('Failed to save prices:', e)
    }
}

export function getProductPrice(productId, defaultPrice) {
    const prices = loadPrices()
    return prices[productId] ?? defaultPrice
}

export function setProductPrice(productId, newPrice) {
    const prices = loadPrices()
    prices[productId] = newPrice
    savePrices(prices)
}

export function resetAllPrices() {
    localStorage.removeItem(PRICE_STORAGE_KEY)
}
