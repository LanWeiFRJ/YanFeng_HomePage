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
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface VideoContent {
  id: string;
  title: string;
  url: string; // URL.createObjectURL or external link
  type: 'bilibili';
  thumbnail?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}