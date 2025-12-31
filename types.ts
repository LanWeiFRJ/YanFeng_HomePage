export enum AppTheme {
  DEFAULT = 'default',
  WINTER = 'winter',
  GMA = 'gma',
  ANNIVERSARY = 'anniversary'
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  tag: string;
  source: 'WeChat' | 'System';
  link?: string;
  coverUrl?: string;
}

export interface TimelineEvent {
  month: string;
  title: string;
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
}

export type VideoCategory = 'winter' | 'anniversary' | 'gma' | 'daily';

export interface VideoContent {
  id: string;
  title: string;
  url: string; // URL.createObjectURL or external link
  type: 'bilibili';
  thumbnail?: string;
  category: VideoCategory;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}