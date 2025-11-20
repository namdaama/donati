export function sanitizeXml(xmlText: string): string {
  return xmlText.replace(/&(?!(?:amp|lt|gt|quot|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
}

export function isValidRssFeed(xmlText: string): boolean {
  return xmlText.includes('<rss') || xmlText.includes('<feed');
}
