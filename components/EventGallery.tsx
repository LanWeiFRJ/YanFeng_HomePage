import React, { useState } from 'react';
import { Upload, Play, Film } from 'lucide-react';
import { VideoContent, AppTheme } from '../types';
import RetroCard from './RetroCard';

interface EventGalleryProps {
  currentTheme: AppTheme;
}

const EventGallery: React.FC<EventGalleryProps> = ({ currentTheme }) => {
  const [videos, setVideos] = useState<VideoContent[]>([
    { id: 'v1', title: '2023冬日祭宣传片', url: 'https://picsum.photos/seed/video1/800/450', type: 'local', thumbnail: 'https://picsum.photos/seed/video1/800/450' },
    { id: 'v2', title: 'GMA颁奖典礼集锦', url: 'https://picsum.photos/seed/video2/800/450', type: 'local', thumbnail: 'https://picsum.photos/seed/video2/800/450' },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newVideo: VideoContent = {
        id: Date.now().toString(),
        title: file.name.split('.')[0],
        url,
        type: 'local',
        thumbnail: 'https://picsum.photos/800/450?grayscale' // Placeholder thumb for uploaded video
      };
      setVideos([newVideo, ...videos]);
    }
  };

  const getThemeTitle = () => {
    switch (currentTheme) {
      case AppTheme.WINTER: return '冬日祭 Live Stage';
      case AppTheme.GMA: return 'GMA 荣耀时刻';
      case AppTheme.ANNIVERSARY: return '社庆时光机';
      default: return '活动影像馆';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-dashed border-[var(--theme-border)] pb-4">
        <div>
           <h2 className="text-4xl font-retro text-[var(--theme-primary)]">{getThemeTitle()}</h2>
           <p className="text-[var(--theme-accent)] mt-2 font-bold">SHOWCASE & MEMORIES</p>
        </div>
        
        <label className="cursor-pointer group mt-4 md:mt-0">
          <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
          <div className="bg-[var(--theme-primary)] text-white px-6 py-3 rounded-full border-4 border-[var(--theme-border)] shadow-[4px_4px_0px_var(--theme-border)] group-hover:translate-y-1 group-hover:shadow-[2px_2px_0px_var(--theme-border)] transition-all flex items-center gap-2">
            <Upload size={20} />
            <span className="font-bold">上传节目视频</span>
          </div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video) => (
          <RetroCard key={video.id} variant="paper" className="h-full">
            <div className="bg-white p-2 border-2 border-[var(--theme-border)] rounded shadow-md h-full flex flex-col">
                <div className="relative aspect-video bg-black rounded overflow-hidden group">
                    {/* Simulated Player */}
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-16 h-16 bg-[var(--theme-primary)] rounded-full flex items-center justify-center border-4 border-white text-white shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play fill="white" size={32} className="ml-1" />
                        </button>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 text-xs rounded font-mono">
                        12:30
                    </div>
                </div>
                <div className="mt-4 flex items-start gap-3">
                    <Film className="text-[var(--theme-primary)] flex-shrink-0" size={24} />
                    <div>
                        <h4 className="font-bold text-lg leading-tight text-[var(--theme-border)]">{video.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Yanfeng Archive</p>
                    </div>
                </div>
            </div>
          </RetroCard>
        ))}
      </div>
    </div>
  );
};

export default EventGallery;