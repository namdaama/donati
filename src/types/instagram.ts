export interface InstagramPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  link: string;
  pubDate: Date;
  hashtags: string[];
}

export interface AnnouncementPost extends InstagramPost {
  category: 'event' | 'news' | 'workshop';
  eventDate?: Date;
  location?: string;
}
