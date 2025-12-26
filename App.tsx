import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, Hash, Video, Info, Settings, Menu, Star } from 'lucide-react';
import { AppTheme, NewsItem } from './types';
import { MOCK_NEWS, TIMELINE_DATA, HISTORY_DATA } from './constants';
import RetroCard from './components/RetroCard';
import EventGallery from './components/EventGallery';
import ChatAssistant from './components/ChatAssistant';
import Timeline from './components/Timeline';
import logo from './assets/logo.svg';

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
        <header className="mb-12 flex flex-col gap-12">
          {/* Top Row: Logo & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full">
          
          {/* Logo / Brand Section - Redesigned */}
          <div className="group cursor-default flex items-center gap-5 transform -rotate-2 hover:rotate-0 transition-transform duration-300 origin-left">
            {/* Badge Icon */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
               <div className="absolute inset-0 bg-[var(--theme-primary)] rounded-full border-[3px] border-[var(--theme-border)] shadow-[4px_4px_0px_var(--theme-border)] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 border-2 border-dashed border-white/50 rounded-full m-1"></div>
                  <div 
                      className="w-16 h-16 md:w-20 md:h-20 bg-[var(--theme-secondary)]"
                      style={{
                        maskImage: `url(${logo})`,
                        WebkitMaskImage: `url(${logo})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                      }}
                  />
               </div>
               {/* Decorative Star */}
               <div className="absolute -top-2 -right-2 text-[var(--theme-primary)] bg-[var(--theme-secondary)] rounded-full p-1 border-2 border-[var(--theme-border)]">
                  <Star size={12} fill="currentColor" />
               </div>
               {/* Year Tag */}
               <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[var(--theme-accent)] text-[var(--theme-secondary)] text-[10px] font-bold px-2 py-0.5 rounded border-2 border-[var(--theme-border)] whitespace-nowrap shadow-sm z-10">
                 EST. 2004
               </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-start">
               {/* Top Label */}
               <div className="flex items-center gap-2 mb-1">
                 <span className="bg-[var(--theme-border)] text-[var(--theme-secondary)] text-[10px] md:text-xs font-black px-1.5 py-0.5 rounded-sm transform -skew-x-12 uppercase tracking-tighter">
                   YANFENG ACGN Fan CLUB
                 </span>
                 <div className="flex gap-0.5">
                   <div className="w-1 h-1 rounded-full bg-[var(--theme-border)]"></div>
                   <div className="w-1 h-1 rounded-full bg-[var(--theme-border)] opacity-50"></div>
                   <div className="w-1 h-1 rounded-full bg-[var(--theme-border)] opacity-25"></div>
                 </div>
               </div>
               
               {/* Main Title */}
               <h1 className="text-5xl md:text-6xl font-retro text-[var(--theme-primary)] leading-[0.85] tracking-wide" 
                   style={{ 
                     textShadow: '2px 2px 0px var(--theme-secondary), 4px 4px 0px var(--theme-border)',
                     WebkitTextStroke: '1.5px var(--theme-border)'
                   }}>
                 檐枫
               </h1>

               {/* Subtitle with lines */}
               <div className="flex items-center gap-2 mt-2 w-full">
                  <div className="h-0.5 bg-[var(--theme-border)] flex-grow rounded-full opacity-30"></div>
                  <p className="text-[var(--theme-primary)] font-bold text-xs md:text-sm tracking-[0.3em] uppercase">
                    动漫社门户
                  </p>
                  <div className="h-0.5 bg-[var(--theme-border)] flex-grow rounded-full opacity-30"></div>
               </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 bg-[var(--theme-secondary)] p-2 rounded-lg border-4 border-[var(--theme-border)] shadow-[4px_4px_0px_var(--theme-border)] transform transition-transform hover:-translate-y-1">
            <span className="font-bold text-sm px-2 hidden sm:inline text-[var(--theme-border)]">主题风格：</span>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value as AppTheme)}
              className="bg-white border-2 border-[var(--theme-border)] rounded px-2 py-1 font-bold text-sm focus:outline-none cursor-pointer text-[var(--theme-border)] hover:bg-gray-50 transition-colors"
            >
              <option value={AppTheme.DEFAULT}>常规</option>
              <option value={AppTheme.WINTER}>冬日祭</option>
              <option value={AppTheme.GMA}>GMA金枫叶奖</option>
            </select>
            <div className="w-0.5 h-6 bg-[var(--theme-border)] opacity-20 mx-1"></div>
            <button 
                onClick={() => setActiveTab('home')}
                className={`p-2 rounded border-2 transition-all ${activeTab === 'home' ? 'bg-[var(--theme-primary)] border-[var(--theme-border)] text-white shadow-[2px_2px_0px_var(--theme-border)]' : 'border-transparent hover:bg-gray-100 text-gray-500'}`}
                title="首页"
            >
                <Menu size={20} />
            </button>
             <button 
                onClick={() => setActiveTab('events')}
                className={`p-2 rounded border-2 transition-all ${activeTab === 'events' ? 'bg-[var(--theme-primary)] border-[var(--theme-border)] text-white shadow-[2px_2px_0px_var(--theme-border)]' : 'border-transparent hover:bg-gray-100 text-gray-500'}`}
                title="活动相册"
            >
                <Video size={20} />
            </button>
          </div>
          </div>
          <Timeline events={TIMELINE_DATA} />
        </header>

        {/* Main Content Area */}
        <main>
            {activeTab === 'home' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT COLUMN: Timeline & About (4/12) */}
                    <div className="lg:col-span-5 space-y-8">
                        <RetroCard title="大事记" subtitle="历史" variant="ticket">
                            <ul className="space-y-6 relative">
                                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[var(--theme-primary)] border-l-2 border-dashed border-[var(--theme-primary)] opacity-30"></div>
                                {HISTORY_DATA.map((item, idx) => (
                                    <li key={idx} className="relative pl-8 group">
                                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[var(--theme-secondary)] border-4 border-[var(--theme-primary)] z-10 group-hover:scale-110 transition-transform"></div>
                                        <div className="bg-[var(--theme-secondary)]/50 p-3 rounded border-2 border-[var(--theme-border)] hover:bg-[var(--theme-secondary)] transition-all hover:shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5">
                                            <span className="font-retro text-xl text-[var(--theme-primary)]">{item.year}</span>
                                            <h4 className="font-bold text-lg">{item.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </RetroCard>

                        <div className="bg-[var(--theme-accent)] text-[var(--theme-secondary)] p-6 rounded-lg border-4 border-[var(--theme-border)] shadow-[6px_6px_0px_var(--theme-border)] transform rotate-1 hover:rotate-0 transition-transform duration-300">
                            <h3 className="text-2xl font-retro mb-4 border-b-2 border-dashed border-white/30 pb-2 flex items-center gap-2">
                                <Settings size={24} className="animate-spin-slow" />
                                关于风格
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2 opacity-90 hover:opacity-100"><div className="w-1.5 h-1.5 bg-white rounded-full"></div> 传统美式复古元素特征</li>
                                <li className="flex items-center gap-2 opacity-90 hover:opacity-100"><div className="w-1.5 h-1.5 bg-white rounded-full"></div> 檐枫独家配色方案</li>
                                <li className="flex items-center gap-2 opacity-90 hover:opacity-100"><div className="w-1.5 h-1.5 bg-white rounded-full"></div> 火山旅梦活动的风格参考</li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: News & Feed (8/12) */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-[var(--theme-secondary)] border-y-4 border-[var(--theme-border)] py-4 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-checker-pattern opacity-10"></div>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-checker-pattern opacity-10"></div>
                            <h2 className="text-3xl font-retro text-[var(--theme-border)] uppercase tracking-widest flex items-center justify-center gap-4">
                                <span className="text-[var(--theme-primary)] hidden md:inline">★</span> 
                                资讯菜单 
                                <span className="text-[var(--theme-primary)] hidden md:inline">★</span>
                            </h2>
                            <p className="text-[var(--theme-primary)] text-xs font-bold mt-1 tracking-[0.5em] uppercase opacity-70">Latest News & Updates</p>
                        </div>

                        <div className="grid gap-6">
                            {news.map((item) => (
                                <RetroCard key={item.id} variant="ticket" className="transform transition-all hover:-translate-y-1 hover:shadow-lg">
                                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            {item.source === 'WeChat' ? <Newspaper size={18} className="text-green-600"/> : <Info size={18} className="text-blue-600"/>}
                                            <span className="font-bold text-xs px-2 py-0.5 border border-[var(--theme-border)] rounded-full uppercase bg-[var(--theme-secondary)]">
                                                {item.tag}
                                            </span>
                                            <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                                                <Calendar size={12} /> {item.date}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-[var(--theme-darkRed)] hover:text-[var(--theme-primary)] transition-colors cursor-pointer leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-[var(--theme-brown)] leading-relaxed border-t border-dashed border-[var(--theme-border)] pt-2 mt-2">
                                        {item.summary}
                                    </p>
                                    <div className="mt-3 flex justify-end">
                                        <a href={item.link} className="text-xs font-bold uppercase tracking-widest text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white px-3 py-1 border border-transparent hover:border-[var(--theme-border)] rounded transition-all">
                                            阅读更多 &gt;&gt;
                                        </a>
                                    </div>
                                </RetroCard>
                            ))}
                        </div>

                        {/* Special Feature Box */}
                        <div className="p-6 bg-[var(--theme-primary)] border-4 border-[var(--theme-border)] rounded-xl text-white shadow-[8px_8px_0px_rgba(0,0,0,0.2)] relative overflow-hidden group">
                            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                            <h3 className="text-2xl font-bold font-retro mb-2 relative z-10 flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
                                公众号自动同步中...
                            </h3>
                            <p className="opacity-90 text-sm relative z-10 leading-relaxed max-w-lg">我们的小爬虫正在努力搬运最新的活动预告和返图，数据来源：WeChat Official Account。</p>
                        </div>
                    </div>
                </div>
            ) : (
                <EventGallery currentTheme={theme} />
            )}
        </main>

        {/* Footer */}
        <footer className="mt-20 border-t-4 border-[var(--theme-border)] pt-8 pb-8 text-center text-[var(--theme-accent)] bg-white/50 backdrop-blur-sm">
          <div className="flex justify-center items-center gap-4 mb-4 opacity-50">
             <Hash size={16} />
             <div className="w-12 border-b-2 border-dashed border-[var(--theme-accent)] h-0"></div>
             <Star size={16} />
             <div className="w-12 border-b-2 border-dashed border-[var(--theme-accent)] h-0"></div>
             <Hash size={16} />
          </div>
          <p className="font-retro text-2xl tracking-widest text-[var(--theme-primary)] drop-shadow-[1px_1px_0px_var(--theme-border)]">IGNOREDONE <span className="text-xs align-middle mx-1">X</span> 檐枫</p>
          <p className="text-xs mt-3 font-mono font-bold uppercase">© 2024 YANFENG Anime Club. All rights reserved.</p>
        </footer>

        {/* Chat Assistant */}
        <ChatAssistant />
      </div>
    </div>
  );
};

export default App;