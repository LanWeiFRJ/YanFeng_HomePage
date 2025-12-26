import React from 'react';
import { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  // Helper to calculate position based on academic year (Sept start)
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentDay = now.getDate();
  // Academic Year: Sept(9) ... Dec(12) ... Jan(13) ... Aug(20)
  const currentEffMonth = currentMonth < 9 ? currentMonth + 12 : currentMonth;

  return (
    <div className="relative w-full py-12 md:py-24 px-4">
      {/* Desktop Horizontal Line (Dashed) */}
      <div className="absolute top-1/2 left-0 right-0 h-0 border-t-[3px] border-dashed border-[var(--theme-primary)] -translate-y-[1.5px] hidden md:block opacity-80" />
      
      {/* Arrow Head at the end of the line */}
       <div className="absolute top-1/2 -right-4 -translate-y-1/2 hidden md:block text-[var(--theme-primary)] opacity-80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
             <path d="m9 5 7 7-7 7" />
          </svg>
       </div>

       {/* Current Position Indicator */}
       {(() => {
          let progressIndex = 0;

          if (currentEffMonth < 10) progressIndex = -0.5; // Before Oct
          else if (currentEffMonth >= 17 && currentDay > 15) progressIndex = 5.5; // After May 15
          else {
              // Interpolation Logic
              if (currentEffMonth === 10) progressIndex = 0 + (currentDay / 31);
              else if (currentEffMonth === 11) progressIndex = 1 + (currentDay / 30);
              else if (currentEffMonth >= 12 && currentEffMonth < 14) {
                  let daysPassed = currentDay + (currentEffMonth === 13 ? 31 : 0);
                  progressIndex = 2 + (daysPassed / 62);
              }
              else if (currentEffMonth === 14) progressIndex = 3 + (currentDay / 28);
              else if (currentEffMonth >= 15 && currentEffMonth < 17) {
                  let daysPassed = currentDay + (currentEffMonth === 16 ? 31 : 0);
                  progressIndex = 4 + (daysPassed / 61);
              }
              else if (currentEffMonth === 17) progressIndex = 5 + (currentDay / 31);
          }

          const leftPos = Math.min(Math.max(((progressIndex + 0.5) / 6) * 100, 2), 98);

          return (
             <div className="absolute top-0 bottom-0 w-0.5 hidden md:block z-20 pointer-events-none transition-all duration-1000"
                  style={{ left: `${leftPos}%` }}>
                
                {/* Vertical Marker Line (Solid Accent) */}
                <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-[var(--theme-accent)]"></div>
                
                {/* Visual "Pin" Head on the timeline */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-[5px] w-3 h-3 rounded-full bg-[var(--theme-accent)] border-2 border-[var(--theme-secondary)] shadow-sm z-30"></div>

                {/* Retro Tag Label */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-full transform hover:scale-110 transition-transform">
                    <div className="bg-[var(--theme-accent)] text-[var(--theme-secondary)] text-xs font-retro py-1 px-2 rounded-sm border-2 border-[var(--theme-border)] shadow-[2px_2px_0px_var(--theme-border)] whitespace-nowrap relative">
                        当前位置
                        {/* Little triangle pointing down */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[var(--theme-accent)]"></div>
                    </div>
                </div>
             </div>
          );
       })()}

      <div className="flex flex-col md:flex-row justify-between items-stretch relative gap-8 md:gap-0 max-w-6xl mx-auto">
        {events.map((event, index) => {
          const isTop = index % 2 === 0;
          // Apply random rotation similar to snippet logic: (index % 2 === 0 ? 1 : -1) * (2 + index * 0.5)
          const rotationStr = `${(index % 2 === 0 ? 1 : -1) * (1 + index % 3)}deg`;
          const animationDelay = `${index * 0.2}s`;
          
          // Determine if this event is in the Future
          const eventMonthNum = parseInt(event.month); // "10月" -> 10, "3-4月" -> 3
          const eventEffMonth = eventMonthNum < 9 ? eventMonthNum + 12 : eventMonthNum;
          const isFuture = currentEffMonth < eventEffMonth;

          return (
            <div key={index} className="relative flex-1 group min-w-0 md:px-2">
               
               {/* ------------------ MOBILE VIEW ------------------ */}
               <div className="flex md:hidden gap-4">
                  <div className="relative flex flex-col items-center">
                     <div className="absolute top-0 bottom-[-32px] w-0.5 border-l-2 border-dashed border-[var(--theme-primary)] opacity-50 z-0 group-last:bottom-auto group-last:h-full"></div>
                     {/* Mobile Pin */}
                     <div className={`w-4 h-4 rounded-full border-2 border-[var(--theme-border)] shadow-[2px_2px_0px_var(--theme-border)] z-10 shrink-0 relative
                        ${isFuture ? 'bg-white' : 'bg-[var(--theme-primary)]'}
                     `}>
                        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[var(--theme-border)] rounded-full"></div>
                     </div>
                  </div>
                  <div className="flex-1 pb-6">
                      <div className="bg-[var(--theme-secondary)] p-3 rounded border-2 border-[var(--theme-border)] shadow-[3px_3px_0px_var(--theme-border)] transform -rotate-1">
                          <span className="font-bold text-xs text-[var(--theme-primary)] block mb-1">{event.month}</span>
                          <h4 className="font-bold text-base text-[var(--theme-border)]">{event.title}</h4>
                      </div>
                  </div>
               </div>

               {/* ------------------ DESKTOP VIEW ------------------ */}
               <div className="hidden md:flex flex-col items-center h-full justify-center relative">
                  
                   {/* Pin Node (Fixed on Line) */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className={`w-4 h-4 rounded-full border-2 border-[var(--theme-border)] shadow-[2px_2px_0px_var(--theme-border)] relative transform hover:scale-110 transition-transform
                            ${isFuture ? 'bg-white' : 'bg-[var(--theme-primary)]'}
                      `}>
                          {/* Pin Highlight */}
                          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                          {/* Pin Center */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[var(--theme-border)] rounded-full"></div>
                      </div>
                   </div>

                   {/* Connector Line (Vertical) */}
                   <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-[var(--theme-primary)] z-0 
                        ${isTop ? 'bottom-1/2 mb-2 h-10' : 'top-1/2 mt-2 h-10'}
                   `}></div>

                   {/* Floating Card Container */}
                   <div 
                      className={`flex w-full justify-center absolute left-0 right-0 z-30
                        ${isTop ? 'bottom-[calc(50%+40px)]' : 'top-[calc(50%+40px)]'}
                      `}
                      style={{
                        animation: `float-${index} 3s ease-in-out infinite`,
                        animationDelay: animationDelay,
                      }}
                   >
                      <div 
                          className="relative p-3 bg-[var(--theme-secondary)] border-2 border-[var(--theme-border)] shadow-[3px_3px_0px_var(--theme-border)] min-w-[100px] max-w-[160px] text-center transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_var(--theme-border)] cursor-default"
                          style={{ transform: `rotate(${rotationStr})` }}
                      >
                          {/* Triangle Pointer */}
                          {isTop ? (
                              <>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[var(--theme-secondary)] z-10" />
                                <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[var(--theme-border)] -z-0" />
                              </>
                          ) : (
                              <>
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[var(--theme-secondary)] z-10" />
                                <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[var(--theme-border)] -z-0" />
                              </>
                          )}
                          
                          {/* Content */}
                          <div className="font-bold text-base text-[var(--theme-primary)] mb-1 leading-none">
                             {event.month}
                          </div>         <h4 className="font-bold text-xs text-[var(--theme-border)] leading-tight">
                             {event.title}
                          </h4>
                          {/* Tooltip-like description on hover could go here, or just keep it simple as per snippet style */}
                      </div>
                   </div>
               </div>
               
            </div>
          );
        })}
      </div>
      
      {/* Dynamic Styles for Floating Animation */}
      <style>{`
        ${events.map((_, index) => {
          // Subtle random rotation bobbing
          const baseRotation = (index % 2 === 0 ? 1 : -1) * (1 + index % 3);
          return `
            @keyframes float-${index} {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-6px);
              }
            }
          `;
        }).join('')}
      `}</style>
    </div>
  );
};

export default Timeline;
