interface ImageExtractor {
  extract(item: any): string;
}

class MediaContentExtractor implements ImageExtractor {
  extract(item: any): string {
    return item.mediaContent?.[0]?.$.url || '';
  }
}

class EnclosureExtractor implements ImageExtractor {
  extract(item: any): string {
    return item.enclosure?.url || '';
  }
}

class HtmlContentExtractor implements ImageExtractor {
  extract(item: any): string {
    const imgMatch = (item.content || '').match(/<img[^>]+src="([^"]+)"/);
    return imgMatch?.[1] || '';
  }
}

export class ImageExtractorChain {
  private extractors: ImageExtractor[] = [
    new MediaContentExtractor(),
    new EnclosureExtractor(),
    new HtmlContentExtractor(),
  ];

  extract(item: any): string {
    for (const extractor of this.extractors) {
      const url = extractor.extract(item);
      if (url) return url;
    }
    return '';
  }
}
