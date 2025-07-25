# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Instagram RSS announcement extraction system built with Astro. Fetches Instagram posts via RSS feeds, filters by hashtags, and generates dedicated announcement pages with automatic date/location extraction.

## Required Commands

### Development
```bash
npm run dev        # Start development server (http://localhost:4321)
npm run build      # Type check and build for production
npm run preview    # Preview production build locally
npm run validate   # Run all checks (type, lint, format)
```

### Code Quality
```bash
npm run check      # Astro type checking
npm run typecheck  # TypeScript type checking
npm run lint       # ESLint check
npm run lint:fix   # ESLint auto-fix
npm run format     # Prettier formatting
```

## Architecture Overview

### Data Flow
1. **RSS Fetching**: `instagram-rss.ts` fetches posts from configured RSS URL
2. **XML Processing**: `xml-sanitizer.ts` cleans and validates RSS/Atom feeds
3. **Image Extraction**: `image-extractor.ts` uses chain pattern to extract images from various RSS formats
4. **Content Parsing**: `announcement-parser.ts` filters by hashtag and extracts event metadata
5. **Title Generation**: `title-generator.ts` dynamically generates titles for posts without them
6. **Rendering**: Astro pages display filtered announcements with individual detail pages

### Key Components
- **Multi-source Support**: `instagram-multi-source.ts` handles multiple RSS feeds
- **Image Proxy**: API route `/api/image-proxy` handles Instagram CDN CORS issues using weserv.nl
- **Dynamic Routes**: `[...slug].astro` generates individual pages for each announcement
- **Caching**: Title generation includes caching to avoid redundant API calls

### Configuration System
- **Constants**: All configuration in `src/config/constants.ts`
- **Environment Variables**:
  - `INSTAGRAM_RSS_URL`: RSS feed URL (required)
  - `ANNOUNCEMENT_HASHTAG`: Filter hashtag (default: "#donati_event")
  - `ENABLE_HASHTAG_FILTER`: Toggle filtering (default: true)

### Type Safety
- All Instagram/announcement data types defined in `src/types/instagram.ts`
- Environment variables typed in `src/env.d.ts`
- Strict TypeScript configuration with no implicit any

## Development Patterns

### RSS Feed Handling
- Supports both RSS 2.0 and Atom formats
- Automatic XML sanitization for malformed feeds
- Fallback image extraction strategies (media:content → enclosure → description parsing)

### Content Processing
- Hashtag extraction with regex pattern `/#[^\s#]+/g`
- Date extraction patterns for Japanese formats (年月日)
- Location extraction with multiple pattern matching (場所/会場/開催地/📍)

### Error Handling
- Graceful fallbacks for missing RSS data
- Console logging for debugging without breaking the build
- Empty array returns on fetch failures

## Integration Points

### For DONATI Website Integration
1. Copy required libraries from `src/lib/`
2. Implement `InstagramAnnouncements.astro` component
3. Configure RSS URL in environment variables
4. Style with DONATI brand colors (#2c5aa0 primary, #f4a261 accent)

### API Endpoints
- `/api/image-proxy?url=...` - CORS-safe image proxying
- `/api/generate-title` - Dynamic title generation endpoint