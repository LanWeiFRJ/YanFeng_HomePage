import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, Hash, Music, Info, Settings, Menu } from 'lucide-react';
import { AppTheme, NewsItem } from './types';
import { MOCK_NEWS, TIMELINE_DATA } from './constants';
import RetroCard from './components/RetroCard';
import EventGallery from './components/EventGallery';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.DEFAULT);
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);
  const [activeTab, setActiveTab] = useState<'home' | 'events'>('home');

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Simulate "Auto Update" of news (mocking the scraper effect)
  useEffect(() => {
    const timer = setInterval(() => {
      // In a real app, this would fetch from an API
      // Here we just shuffle or add a mock item occasionally to simulate life
      console.log('Checking for Wechat updates...');
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans pb-20 relative">
      {/* Decorative Sidebars (Checkerboard) */}
      <div className="fixed left-0 top-0 w-4 md:w-8 h-full checker-bg z-0 border-r-4 border-[var(--theme-border)] hidden md:block"></div>
      <div className="fixed right-0 top-0 w-4 md:w-8 h-full checker-bg z-0 border-l-4 border-[var(--theme-border)] hidden md:block"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-12 py-8">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-retro text-[var(--theme-primary)] drop-shadow-[3px_3px_0px_var(--theme-border)] transform -rotate-2">
              YANFENG
            </h1>
            <p className="text-[var(--theme-accent)] font-bold tracking-[0.3em] mt-2 uppercase border-t-2 border-dashed border-[var(--theme-accent)] inline-block pt-1">
              Anime Club Portal
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[var(--theme-secondary)] p-2 rounded-lg border-4 border-[var(--theme-border)] shadow-[4px_4px_0px_var(--theme-border)]">
            <span className="font-bold text-sm px-2 hidden sm:inline">THEME:</span>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value as AppTheme)}
              className="bg-white border-2 border-[var(--theme-border)] rounded px-2 py-1 font-bold text-sm focus:outline-none cursor-pointer"
            >
              <option value={AppTheme.DEFAULT}>Classic Diner</option>
              <option value={AppTheme.WINTER}>Winter Fes</option>
              <option value={AppTheme.GMA}>GMA Awards</option>
            </select>
            <button 
                onClick={() => setActiveTab('home')}
                className={`p-2 rounded ${activeTab === 'home' ? 'bg-[var(--theme-primary)] text-white' : 'hover:bg-gray-200'}`}
            >
                <Menu size={20} />
            </button>
             <button 
                onClick={() => setActiveTab('events')}
                className={`p-2 rounded ${activeTab === 'events' ? 'bg-[var(--theme-primary)] text-white' : 'hover:bg-gray-200'}`}
            >
                <Music size={20} />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main>
            {activeTab === 'home' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT COLUMN: Timeline & About (4/12) */}
                    <div className="lg:col-span-5 space-y-8">
                        <RetroCard title="TIMELINE" subtitle="History" variant="ticket">
                            <ul className="space-y-6 relative">
                                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[var(--theme-primary)] border-l-2 border-dashed border-[var(--theme-primary)] opacity-30"></div>
                                {TIMELINE_DATA.map((item, idx) => (
                                    <li key={idx} className="relative pl-8">
                                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[var(--theme-secondary)] border-4 border-[var(--theme-primary)] z-10"></div>
                                        <div className="bg-white/50 p-3 rounded border-2 border-[var(--theme-border)] hover:bg-white transition-colors">
                                            <span className="font-retro text-xl text-[var(--theme-primary)]">{item.year}</span>
                                            <h4 className="font-bold text-lg">{item.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </RetroCard>

                        <div className="bg-[var(--theme-accent)] text-white p-6 rounded-lg border-4 border-[var(--theme-border)] shadow-[6px_6px_0px_var(--theme-border)] transform rotate-1">
                            <h3 className="text-2xl font-retro mb-4 border-b-2 border-dashed border-white/30 pb-2">ABOUT STYLE</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2"><Settings size={16} /> 传统美式复古元素特征</li>
                                <li className="flex items-center gap-2"><Settings size={16} /> 檐枫独家配色方案</li>
                                <li className="flex items-center gap-2"><Settings size={16} /> 火山旅梦活动的风格参考</li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: News & Feed (8/12) */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-[var(--theme-secondary)] border-y-4 border-[var(--theme-border)] py-4 text-center">
                            <h2 className="text-3xl font-retro text-[var(--theme-border)] uppercase tracking-widest">
                                Menu & Price <span className="text-[var(--theme-primary)] text-sm ml-2 font-sans normal-case opacity-70">(News Feed)</span>
                            </h2>
                        </div>

                        <div className="grid gap-6">
                            {news.map((item) => (
                                <RetroCard key={item.id} variant="ticket" className="transform transition-transform hover:-translate-y-1">
                                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            {item.source === 'WeChat' ? <Newspaper size={18} className="text-green-600"/> : <Info size={18} className="text-blue-600"/>}
                                            <span className="font-bold text-xs px-2 py-0.5 border border-[var(--theme-border)] rounded-full uppercase bg-white">
                                                {item.tag}
                                            </span>
                                            <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                                                <Calendar size={12} /> {item.date}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-[var(--theme-darkRed)] hover:underline cursor-pointer">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-[var(--theme-brown)] leading-relaxed border-t border-dashed border-[var(--theme-border)] pt-2 mt-2">
                                        {item.summary}
                                    </p>
                                    <div className="mt-3 flex justify-end">
                                        <a href={item.link} className="text-xs font-bold uppercase tracking-widest text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white px-2 py-1 transition-colors">
                                            Read More &gt;&gt;
                                        </a>
                                    </div>
                                </RetroCard>
                            ))}
                        </div>

                        {/* Special Feature Box */}
                        <div className="p-6 bg-[var(--theme-primary)] border-4 border-[var(--theme-border)] rounded-xl text-white shadow-xl relative overflow-hidden">
                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                            <h3 className="text-2xl font-bold font-retro mb-2 relative z-10">公众号自动同步中...</h3>
                            <p className="opacity-90 text-sm relative z-10">我们的小爬虫正在努力搬运最新的活动预告和返图，请保持关注！</p>
                            <div className="mt-4 flex gap-2 relative z-10">
                                <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                                <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-100"></div>
                                <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <EventGallery currentTheme={theme} />
            )}
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t-4 border-[var(--theme-border)] pt-8 text-center text-[var(--theme-accent)]">
          <p className="font-retro text-xl">IGNOREDONE x YANFENG</p>
          <p className="text-xs mt-2 font-mono">© 2024 Yanfeng Anime Club. Designed with ❤️.</p>
          <div className="flex justify-center gap-4 mt-4 opacity-50">
             <Hash size={20} />
             <div className="w-20 border-b-2 border-dashed border-[var(--theme-accent)] h-3"></div>
             <Hash size={20} />
          </div>
        </footer>

        {/* Chat Assistant */}
        <ChatAssistant />
      </div>
    </div>
  );
};

export default App;