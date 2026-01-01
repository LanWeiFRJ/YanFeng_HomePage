import React, { useState } from 'react';
import { Play, Film, Link as LinkIcon, Image as ImageIcon, Plus, Trash2, Search, Filter } from 'lucide-react';
import { VideoContent, AppTheme, VideoCategory } from '../types';
import RetroCard from './RetroCard';

interface EventGalleryProps {
  currentTheme: AppTheme;
}

const EventGallery: React.FC<EventGalleryProps> = ({ currentTheme }) => {
  const [videos, setVideos] = useState<VideoContent[]>([
    { id: 'v1', title: '2025冬日祭全程录像', url: 'https://player.bilibili.com/player.html?bvid=BV1GJ411x7h7', type: 'bilibili', thumbnail: 'https://picsum.photos/seed/video1/800/450', category: 'winter' },
  ]);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Filter State
  const [activeCategory, setActiveCategory] = useState<VideoCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [bilibiliLink, setBilibiliLink] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<VideoCategory>('daily'); // Default upload category
  
  // Image Upload State
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState('');
  
  const [showForm, setShowForm] = useState(false);

  // Fetch videos from backend on mount
  React.useEffect(() => {
    // ... same as before
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个视频吗？')) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      // Create local preview URL
      const previewUrl = URL.createObjectURL(file);
      setCoverPreviewUrl(previewUrl);
    }
  };

  const handleBilibiliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bilibiliLink && coverImageFile && videoTitle) {
      
      // Extract URL from iframe code if necessary
      let cleanUrl = bilibiliLink;
      const srcMatch = bilibiliLink.match(/src="([^"]+)"/);
      if (srcMatch) {
        cleanUrl = srcMatch[1];
      }
      // Fix protocol-relative URLs
      if (cleanUrl.startsWith('//')) {
        cleanUrl = 'https:' + cleanUrl;
      }

      // In real scenario, here we would upload the file first or convert to Base64
      const newVideo: VideoContent = {
        id: Date.now().toString(),
        title: videoTitle,
        url: cleanUrl,
        type: 'bilibili',
        thumbnail: coverPreviewUrl, // Using blob URL for now, backend should return a real URL
        category: uploadCategory
      };

      // Temporary local update for demonstration
      setVideos([newVideo, ...videos]);
      
      // Reset form
      setBilibiliLink('');
      setVideoTitle('');
      setCoverImageFile(null);
      setCoverPreviewUrl('');
      setShowForm(false);
      
      // Optionally switch to the category of the uploaded video so user can see it
      setActiveCategory(uploadCategory); 
    }
  };

  // Filter the videos
  const filteredVideos = videos.filter(video => {
    const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const CATEGORIES: { id: VideoCategory | 'all', label: string, icon?: string }[] = [
    { id: 'all', label: '全部', icon: '🔴' },
    { id: 'winter', label: '冬日祭', icon: '❄️' },
    { id: 'anniversary', label: '社庆', icon: '🎉' },
    { id: 'gma', label: 'GMA', icon: '🏆' },
    { id: 'daily', label: '日常', icon: '📹' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      
      {/* Header Area */}
      <div className="flex flex-col gap-6 border-b-4 border-dashed border-[var(--theme-border)] pb-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
           <div>
              <h2 className="text-4xl font-retro text-[var(--theme-primary)]">活动录像</h2>
              <p className={`${currentTheme === AppTheme.GMA ? 'text-black' : 'text-[var(--theme-accent)]'} mt-2 font-bold`}>SHOWCASE & MEMORIES</p>
           </div>
           
           <button 
             onClick={() => setShowForm(!showForm)}
             className="bg-[var(--theme-primary)] text-white px-6 py-3 rounded-full border-4 border-[var(--theme-border)] shadow-[4px_4px_0px_var(--theme-border)] hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--theme-border)] transition-all flex items-center gap-2 font-bold"
           >
             {showForm ? '取消添加' : <><Plus size={20} /> 添加 Bilibili 视频</>}
           </button>
        </div>

        {/* Navigation & Search Bar Container */}
        <div className="mt-4 bg-[var(--theme-secondary)] border-4 border-[var(--theme-border)] rounded-xl p-2 shadow-[6px_6px_0px_var(--theme-border)] flex flex-col md:flex-row gap-4 items-center">
             
             {/* Category Tabs (Pills) */}
             <div className="flex flex-wrap gap-2 flex-1 justify-center md:justify-start">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      px-4 py-2 rounded-lg font-bold text-sm transition-all border-2
                      ${activeCategory === cat.id 
                        ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-border)] shadow-[2px_2px_0px_var(--theme-border)] -translate-y-0.5' 
                        : 'bg-white text-[var(--theme-border)] border-transparent hover:bg-gray-100'}
                    `}
                  >
                     <span className="mr-2">{cat.icon}</span>
                     {cat.label}
                  </button>
                ))}
             </div>

             {/* Search Input */}
             <div className="relative w-full md:w-64">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                   <Search size={18} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索视频..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-[var(--theme-border)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]/20 bg-white text-black"
                />
             </div>
        </div>
      </div>

      {/* Add Video Form */}
      {showForm && (
        <RetroCard variant="ticket" className="mb-8">
          <form onSubmit={handleBilibiliSubmit} className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--theme-primary)] mb-4">添加 Bilibili 外链视频</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[var(--theme-border)]">视频标题</label>
                <div className="flex items-center border-2 border-[var(--theme-border)] rounded bg-white p-2">
                  <Film size={18} className="text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="输入视频标题..."
                    className="w-full outline-none bg-transparent text-black"
                    required
                  />
                </div>
              </div>

               <div className="space-y-2">
                <label className="block text-sm font-bold text-[var(--theme-border)]">所属分类</label>
                <div className="flex items-center border-2 border-[var(--theme-border)] rounded bg-white p-2 relative">
                  <Filter size={18} className="text-gray-400 mr-2" />
                  <select 
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as VideoCategory)}
                    className="w-full outline-none bg-transparent appearance-none cursor-pointer text-black"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[var(--theme-border)]">Bilibili 链接 (Embed URL)</label>
                <div className="flex items-center border-2 border-[var(--theme-border)] rounded bg-white p-2">
                  <LinkIcon size={18} className="text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    value={bilibiliLink}
                    onChange={(e) => setBilibiliLink(e.target.value)}
                    placeholder='例如：<iframe src="//player.bilibili.com/..." ...></iframe>'
                    className="w-full outline-none bg-transparent text-black"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">提示：直接粘贴 B站分享中的"嵌入代码"即可，系统会自动提取链接</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[var(--theme-border)]">上传封面图</label>
                <div className="flex items-center border-2 border-[var(--theme-border)] rounded bg-white p-2">
                  <ImageIcon size={18} className="text-gray-400 mr-2" />
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full outline-none bg-transparent text-black"
                    required
                  />
                </div>
                {coverPreviewUrl && (
                  <div className="mt-2 text-xs text-gray-500">
                    <p className="mb-1">预览：</p>
                    <img src={coverPreviewUrl} alt="Cover Preview" className="h-24 rounded border border-gray-200" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                className="bg-[var(--theme-accent)] text-white px-6 py-2 rounded font-bold hover:bg-opacity-90 transition-colors"
              >
                确认添加
              </button>
            </div>
          </form>
        </RetroCard>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <RetroCard key={video.id} variant="paper" className="h-full">
              <div className="bg-white p-2 border-2 border-[var(--theme-border)] rounded shadow-md h-full flex flex-col">
                  {/* ... same video card content ... */}
                  <div className="relative aspect-video bg-black rounded overflow-hidden group">
                      {playingVideoId === video.id ? (
                            <iframe 
                              src={`${video.url}&autoplay=1`} 
                              className="w-full h-full" 
                              scrolling="no" 
                              frameBorder="0" 
                              allowFullScreen 
                              allow="autoplay; fullscreen"
                            ></iframe>
                      ) : (
                          <>
                              {/* Thumbnail Overlay */}
                              <img 
                                src={video.thumbnail || '/default_cover.png'} 
                                alt={video.title} 
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = '/default_cover.png';
                                }}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                              />
                              
                              {/* Play Button */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                  <button 
                                      onClick={() => setPlayingVideoId(video.id)}
                                      className="w-16 h-16 bg-[var(--theme-primary)] rounded-full flex items-center justify-center border-4 border-white text-white shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer"
                                  >
                                      <Play fill="white" size={32} className="ml-1" />
                                  </button>
                              </div>
                              
                              {/* Badges */}
                              <div className="absolute bottom-2 left-2 flex gap-2">
                                  <div className="bg-[#fb7299] text-white px-2 py-1 text-xs rounded font-bold border border-white">
                                    bilibili
                                  </div>
                                <div className="bg-black/70 text-white px-2 py-1 text-xs rounded font-mono">
                                  {CATEGORIES.find(c => c.id === video.category)?.label || 'Video'}
                                </div>
                              </div>
                          </>
                      )}
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <Film className="text-[var(--theme-primary)] flex-shrink-0" size={24} />
                        <div>
                            <h4 className="font-bold text-lg leading-tight text-[var(--theme-border)]">{video.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Yanfeng Archive</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleDelete(video.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="删除视频"
                      >
                        <Trash2 size={20} />
                      </button>
                  </div>
              </div>
            </RetroCard>
          ))
        ) : (
          <div className="col-span-full py-20 text-center opacity-50">
             <div className="inline-block p-6 rounded-full bg-[var(--theme-secondary)] border-4 border-[var(--theme-border)] mb-4">
               <Film size={48} className="text-[var(--theme-primary)]" />
             </div>
             <p className="font-bold text-xl text-[var(--theme-border)]">
               {searchQuery ? `未找到与 "${searchQuery}" 相关的视频` : '该分类下暂无视频'}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventGallery;