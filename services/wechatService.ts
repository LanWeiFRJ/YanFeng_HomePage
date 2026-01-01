import { NewsItem } from '../types';

import { API_BASE_URL } from './config';

export const fetchWeChatArticles = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch WeChat articles:', error);
    // Return empty array or throw, depending on error handling strategy
    return [];
  }
};
