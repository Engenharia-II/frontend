export type ContentType = 'video' | 'book' | 'article' | 'course' | 'podcast';

export interface Content {
  id: string;
  name: string;
  description: string;
  topicId: string;
  duration: number;
  isFree: boolean;
  publicationDate: string;
  type: ContentType;
  url: string;
  tumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  isSaved?: boolean;
}

export interface SavedContent {
  userId: string;
  contentId: string;
  savedAt: string;
}
