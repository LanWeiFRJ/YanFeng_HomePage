import React from 'react';
import { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative w-full py-12 md:py-24 px-4">
      {/* 
        --------------------------------------------------
        DYNAMIC STYLES & ANIMATIONS 
        --------------------------------------------------
      */}
      <style>{`
        @keyframes growLine {
          0% { width: 0; opacity: 0; }
          10% { opacity: 1; }
          100% { width: calc(100% - 4rem); opacity: 1; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0) translateY(20px); }
          60% { opacity: 1; transform: scale(1.1) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes appearArrow {
          0% { opacity: 0; transform: translate(-10px, -50%); }
          100% { opacity: 0.8; transform: translate(0, -50%); }
        }
        ${events.map((_, index) => {
          // Keep the existing floating animation
          return `
            @keyframes float-${index} {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-6px); }
            }
          `;
        }).join('')}
      `}</style>
      
      {/* Desktop Horizontal Line (Animated) */}
      <div 
        className="absolute top-1/2 left-0 h-0 border-t-[3px] border-dashed border-[var(--theme-primary)] -translate-y-[1.5px] hidden md:block z-0"
        style={{
            animation: 'growLine 2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            width: '0%', // Start invisible
            opacity: 0,
            left: '2rem', // Align start with padding
        }} 
      />
      
      {/* Arrow Head (Animated Delay) */}
       <div 
        className="absolute top-1/2 right-4 -translate-y-1/2 hidden md:block text-[var(--theme-primary)] opacity-0 z-0"
        style={{
            animation: 'appearArrow 0.5s ease-out forwards',
            animationDelay: '1.8s' // Wait for line to mostly finish
        }}
       >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
             <path d="m9 5 7 7-7 7" />
          </svg>
       </div>

      <div className="flex flex-col md:flex-row justify-between items-stretch relative gap-8 md:gap-0 max-w-6xl mx-auto z-10">
        {events.map((event, index) => {
          const isTop = index % 2 === 0;
          const rotationStr = `${(index % 2 === 0 ? 1 : -1) * (1 + index % 3)}deg`;
          
          // Calculate delay: Line takes 2s. Spread events pop-in over that time.
          // Event 0 starts quickly, Event N starts near end of line animation.
          const staggerDelay = `${0.2 + (index * 0.25)}s`;

          return (
            <div 
                key={index} 
                className="relative flex-1 group min-w-0 md:px-2 opacity-0" // Start hidden
                style={{
                    animation: `popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                    animationDelay: staggerDelay
                }}
            >
               
               {/* ------------------ MOBILE VIEW ------------------ */}
               <div className="flex md:hidden gap-4">
                  <div className="relative flex flex-col items-center">
                     <div className="absolute top-0 bottom-[-32px] w-0.5 border-l-2 border-dashed border-[var(--theme-primary)] opacity-50 z-0 group-last:bottom-auto group-last:h-full"></div>
                     {/* Mobile Pin */}
                     <div className="w-4 h-4 rounded-full border-2 border-[var(--theme-border)] shadow-[2px_2px_0px_var(--theme-border)] z-10 shrink-0 relative bg-[var(--theme-primary)]">
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
                      <div className="w-4 h-4 rounded-full border-2 border-[var(--theme-border)] shadow-[2px_2px_0px_var(--theme-border)] relative transform hover:scale-110 transition-transform bg-[var(--theme-primary)]">
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
                        animationDelay: `${2.5 + index * 0.2}s`, // Start floating AFTER entrance
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
                      </div>
                   </div>
               </div>
               
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
