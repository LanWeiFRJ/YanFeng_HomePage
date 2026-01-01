import { VideoContent, VideoCategory } from '../types';
import { API_BASE_URL } from './config';

// Get all videos
export const fetchVideos = async (): Promise<VideoContent[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/videos`);
    if (!response.ok) {
        throw new Error('Failed to fetch videos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

// Add a new video
export const addVideo = async (video: Omit<VideoContent, 'id'>): Promise<VideoContent | null> => {
  try {
    // Generate a simple ID if the backend doesn't (json-server does, but let's be safe or let json-server handle it)
    // json-server automatically handles ID generation if not provided, or we can provide one.
    // Let's rely on json-server's id generation or generate one here to valid TS type.
    const newVideo = { ...video, id: Date.now().toString() }; 
    
    const response = await fetch(`${API_BASE_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVideo),
    });

    if (!response.ok) {
        throw new Error('Failed to add video');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding video:', error);
    return null;
  }
};

// Delete a video
export const deleteVideo = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
            method: 'DELETE',
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting video:', error);
        return false;
    }
}
