import React from 'react';

interface TimelineNode {
  month: string;
  title: string;
  isCurrent?: boolean;
}

const Timeline: React.FC = () => {
  const nodes: TimelineNode[] = [
    { month: '10月', title: '社团游园会&社团大会' },
    { month: '11月', title: '秋季学期活动' },
    { month: '12月', title: '冬日庆典' },
    { month: '2月', title: 'GMA&新年祭' },
    { month: '3-4月', title: '春季学期活动' },
    { month: '5月', title: '社庆' },
  ];

  // 当前位置在冬日庆典(12月)和GMA&新年祭(2月)之间，即1月
  const currentPosition = 3.5; // 在节点3和4之间

  return (
    <div className="w-full py-4 relative">
      {/* 时间线背景容器 */}
      <div className="relative bg-[var(--theme-secondary)] rounded-lg p-4 md:p-6">
        {/* 时间线主体 */}
        <div className="relative min-h-[120px] md:min-h-[140px]">
          {/* 时间线轴线 - 红色虚线 */}
          <div className="absolute left-4 md:left-8 right-12 md:right-16 top-1/2 border-t-[3px] border-dashed border-[var(--theme-primary)] transform -translate-y-1/2"></div>
          
          {/* 虚线右端箭头 */}
          <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transform translate-y-[-1.5px]">
              <path 
                d="M 0 0 L 20 0 L 15 -5 M 20 0 L 15 5" 
                stroke="var(--theme-primary)" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          {/* 当前位置指示器 */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 z-20"
            style={{ left: `calc(4rem + ${((currentPosition - 0.5) / nodes.length) * (100 - 8)}%)` }}
          >
            <div className="relative">
              {/* 当前位置的垂直标记线 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-12 md:h-16 bg-[var(--theme-accent)] border border-[var(--theme-border)] -top-6 md:-top-8"></div>
              {/* 当前位置的圆点 */}
              <div className="w-5 h-5 md:w-6 md:h-6 bg-[var(--theme-accent)] border-[3px] md:border-4 border-[var(--theme-border)] rounded-full shadow-[2px_2px_0px_var(--theme-border)] relative z-10 animate-pulse">
                <div className="absolute inset-0 bg-[var(--theme-accent)] rounded-full animate-ping opacity-75"></div>
              </div>
              {/* 当前位置标签 */}
              <div className="absolute top-6 md:top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-[var(--theme-accent)] text-[var(--theme-secondary)] text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded border-2 border-[var(--theme-border)] shadow-sm">
                当前位置
              </div>
            </div>
          </div>

          {/* 时间线节点 */}
          <div className="relative h-full">
            {nodes.map((node, index) => {
              const position = ((index + 0.5) / nodes.length) * (100 - 8) + 4;
              const isPast = index + 1 < currentPosition;
              const isFuture = index + 1 > currentPosition;
              // 为每个标签添加不同的飘动延迟，创造错落有致的效果
              const animationDelay = index * 0.2;
              // 随机倾斜角度，让标签更生动
              const rotation = (index % 2 === 0 ? 1 : -1) * (2 + index * 0.5);
              // 决定标签在虚线上方还是下方：偶数索引在上方，奇数索引在下方
              const isAbove = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className="absolute z-10"
                  style={{ 
                    left: `${position}%`, 
                    top: '50%', 
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* 图钉 - 固定在虚线上（容器中心就是虚线位置） */}
                  <div
                    className={`absolute left-0 top-0 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-[var(--theme-border)] shadow-[2px_2px_0px_var(--theme-border),0_0_8px_rgba(0,0,0,0.2)] transition-all z-20 ${
                      isPast
                        ? 'bg-[var(--theme-primary)]'
                        : isFuture
                        ? 'bg-[var(--theme-secondary)]'
                        : 'bg-[var(--theme-primary)]'
                    }`}
                    style={{ transform: 'translate(-50%, -50%)' }}
                  >
                    {/* 图钉头部高光 */}
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 md:w-1.5 md:h-1.5 bg-white/40 rounded-full"></div>
                    {/* 图钉头部中心点 */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 md:w-1 md:h-1 bg-[var(--theme-border)] rounded-full"></div>
                  </div>
                  
                  {/* 连接线 - 从图钉延伸到标签 */}
                  <div 
                    className="absolute left-0 w-0.5 bg-[var(--theme-primary)]"
                    style={{ 
                      height: isAbove ? '35px' : '35px',
                      top: isAbove ? '-35px' : '0',
                      transform: 'translateX(-50%)'
                    }}
                  ></div>
                  
                  {/* 飘动标签 */}
                  <div 
                    className="absolute left-0"
                    style={{
                      animation: `float-${index} 3s ease-in-out infinite`,
                      animationDelay: `${animationDelay}s`,
                      top: isAbove ? '-70px' : '40px',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    {/* 标签主体 */}
                    <div className="relative bg-[var(--theme-secondary)] border-2 border-[var(--theme-border)] px-2 md:px-3 py-1 md:py-1.5 shadow-[3px_3px_0px_var(--theme-border)] transform hover:shadow-[4px_4px_0px_var(--theme-border)] transition-all hover:-translate-y-0.5">
                      {/* 标签三角形指向虚线 */}
                      {isAbove ? (
                        // 上方标签：三角形向下指向虚线
                        <>
                          <div 
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[var(--theme-secondary)]"
                            style={{ filter: 'drop-shadow(0 2px 0 var(--theme-border))' }}
                          ></div>
                          <div 
                            className="absolute -bottom-[10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[var(--theme-border)] -z-10"
                          ></div>
                        </>
                      ) : (
                        // 下方标签：三角形向上指向虚线
                        <>
                          <div 
                            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[var(--theme-secondary)]"
                            style={{ filter: 'drop-shadow(0 -2px 0 var(--theme-border))' }}
                          ></div>
                          <div 
                            className="absolute -top-[10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[var(--theme-border)] -z-10"
                          ></div>
                        </>
                      )}
                      
                      {/* 标签内容 */}
                      <div className="text-center relative z-10">
                        <div className="text-[10px] md:text-xs font-bold text-[var(--theme-primary)] mb-0.5 md:mb-1">{node.month}</div>
                        <div className="text-[9px] md:text-[10px] lg:text-xs font-bold text-[var(--theme-border)] leading-tight whitespace-nowrap">{node.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* 飘动动画定义 - 为每个节点创建独特的动画 */}
          <style>{`
            ${nodes.map((_, index) => {
              const rotation = (index % 2 === 0 ? 1 : -1) * (2 + index * 0.5);
              return `
                @keyframes float-${index} {
                  0%, 100% {
                    transform: translateY(0px) rotate(${rotation}deg);
                  }
                  25% {
                    transform: translateY(-4px) rotate(${rotation + 1}deg);
                  }
                  50% {
                    transform: translateY(-6px) rotate(${rotation}deg);
                  }
                  75% {
                    transform: translateY(-4px) rotate(${rotation - 1}deg);
                  }
                }
              `;
            }).join('')}
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
