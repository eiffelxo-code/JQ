import React, { useEffect, useRef } from 'react';
import { HERO_CARDS } from '../utils/constants';
import { useDraggableScroll } from '../hooks/useDraggableScroll';
import { ArrowRight, User, Users, MousePointerClick } from 'lucide-react';

interface HeroSectionProps {
  activeIndex: number;
  onIndexChange: (index: number) => void;
  onCardAction: (prompt: string) => void;
  onAgentEnter: (agentId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ activeIndex, onIndexChange, onCardAction, onAgentEnter }) => {
  // Use draggable scroll hook for mouse interaction
  const { ref: containerRef, onMouseDown, onMouseLeave, onMouseUp, onMouseMove, isDragging } = useDraggableScroll();
  
  // Ref to track if scrolling is initiated by code (to prevent feedback loops)
  const isProgrammaticScroll = useRef(false);
  
  // Card metrics
  const CARD_WIDTH = 300; 
  const GAP = 20; // gap-5 is 1.25rem = 20px
  
  // Handle programmatic scroll when activeIndex changes from parent
  useEffect(() => {
    // If user is actively dragging, do not interfere with scroll position
    if (isDragging) return;

    if (containerRef.current) {
      const targetScroll = activeIndex * (CARD_WIDTH + GAP);
      const currentScroll = containerRef.current.scrollLeft;
      
      // Only scroll if the difference is significant to avoid fighting with manual scroll
      if (Math.abs(currentScroll - targetScroll) > 10) {
        isProgrammaticScroll.current = true;
        containerRef.current.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
        
        // Reset flag after animation roughly finishes
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 500);
      }
    }
  }, [activeIndex, isDragging]);

  // Handle manual scroll to update parent index
  const handleScroll = () => {
    if (containerRef.current) {
      // If we are scrolling programmatically, don't emit events to avoid loops
      if (isProgrammaticScroll.current) return;

      const scrollLeft = containerRef.current.scrollLeft;
      // Calculate active index based on center of view roughly
      const index = Math.round(scrollLeft / (CARD_WIDTH + GAP));
      
      onIndexChange(index);
    }
  };

  return (
    <div className="relative z-10 py-2">
      {/* Scroll Container with Perspective */}
      <div 
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onScroll={handleScroll}
        // Reduced pb-10 to pb-2 to minimize gap with bottom list
        className={`flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-5 pb-2 pt-6 items-stretch cursor-${isDragging ? 'grabbing' : 'grab'}`}
        style={{ 
          perspective: '1200px', // Increased perspective for better 3D feel
          paddingLeft: `calc(50% - ${CARD_WIDTH/2}px)`,
          paddingRight: `calc(50% - ${CARD_WIDTH/2}px)`
        }}
      >
        {HERO_CARDS.map((card, index) => {
          // Calculate if this card is active for styling
          const isActive = index === activeIndex;
          const isEven = index % 2 === 0;

          // Fan effect
          const tiltClass = isActive 
            ? `${isEven ? '-rotate-1' : 'rotate-1'} scale-100 z-20 translate-y-0 opacity-100 shadow-2xl ring-1 ring-black/5` 
            : `scale-[0.92] opacity-70 z-10 grayscale-[0.1] ${isEven ? '-rotate-3 translate-y-6' : 'rotate-3 translate-y-6'}`;

          // Styling for Useful Info Widget
          const infoColorClass = 
            card.usefulInfo.color === 'green' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
            card.usefulInfo.color === 'yellow' ? 'bg-amber-50 text-amber-800 border-amber-100' :
            card.usefulInfo.color === 'red' ? 'bg-red-50 text-red-800 border-red-100' :
            card.usefulInfo.color === 'purple' ? 'bg-purple-50 text-purple-800 border-purple-100' :
            'bg-blue-50 text-blue-800 border-blue-100';

          return (
            <div 
              key={card.id} 
              // Changed origin-center to origin-bottom for "fan" effect
              className={`snap-center shrink-0 w-[300px] flex flex-col relative group select-none transition-all duration-500 cubic-bezier(0.25, 0.8, 0.25, 1) origin-bottom ${tiltClass}`}
            >
              {/* Main Card */}
              <div className="bg-white rounded-[2rem] p-4 relative overflow-hidden flex flex-col h-full transform transition-all border border-white/60 z-10">
                
                {/* Decorative Background Blobs */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-15 blur-2xl ${
                  card.style === 'efficient' ? 'bg-blue-400' : 
                  card.style === 'friendly' ? 'bg-purple-400' : 'bg-orange-400'
                }`}></div>
                 <div className={`absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white via-white/50 to-transparent z-0 opacity-50`}></div>
                
                {/* Header: Name and Tagline */}
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                     {/* Avatar Button Area - Clickable */}
                     <div 
                        onClick={() => isActive && onAgentEnter(card.id)}
                        className={`w-10 h-10 rounded-full bg-slate-50 p-0.5 shadow-sm overflow-hidden ring-1 ring-slate-100 transition-all ${isActive ? 'cursor-pointer hover:ring-2 hover:ring-teal-400 hover:scale-110 active:scale-95' : ''} group/avatar relative`}
                     >
                        <img src={card.avatarUrl} className="w-full h-full object-cover" alt={card.name} />
                        {isActive && (
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                            <MousePointerClick className="w-4 h-4 text-white" />
                          </div>
                        )}
                     </div>
                     <div>
                        <div className="flex items-baseline gap-1.5">
                          <h2 className="text-lg font-bold text-slate-800 tracking-tight">{card.name}</h2>
                          <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold border shadow-sm ${
                             card.style === 'efficient' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                             card.style === 'friendly' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                          }`}>
                            {card.tagline}
                          </div>
                        </div>
                     </div>
                  </div>
                  <span className="text-slate-300 text-[10px] font-mono font-medium tracking-widest opacity-50">NO.{index + 1}</span>
                </div>

                {/* Central Image Placeholder Area */}
                {/* Clicking image also enters detail view for better UX */}
                <div 
                  onClick={() => isActive && onAgentEnter(card.id)}
                  className={`w-full h-32 bg-slate-100 rounded-2xl overflow-hidden mb-3 relative transition-all z-10 ring-1 ring-black/5 ${isActive ? 'cursor-pointer group-hover:shadow-md' : ''}`}
                >
                  <img 
                    src={card.cardImageUrl} 
                    alt="Feature" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Floating Action Hint */}
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/50">
                     <div className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                     </div>
                     <span className="text-[9px] font-bold text-slate-700">点击进入</span>
                  </div>
                </div>

                {/* Useful Info Widget */}
                <div className={`flex-1 mb-3 rounded-xl p-3 flex items-center gap-3 border shadow-sm relative overflow-hidden ${infoColorClass} z-10`}>
                    {/* Background sheen */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-50"></div>
                    
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm bg-white shrink-0 relative z-10 ring-1 ring-black/5">
                       {/* Specific logic for Comfort Level Icon */}
                       {card.usefulInfo.type === 'comfort' ? (
                          card.usefulInfo.color === 'green' ? <User className="w-5 h-5 text-emerald-500" /> :
                          card.usefulInfo.color === 'yellow' ? <Users className="w-5 h-5 text-amber-500" /> :
                          <div className="flex -space-x-2 text-red-500"><User size={14} /><User size={14} /><User size={14} /></div>
                       ) : (
                          <span>{card.usefulInfo.emoji}</span>
                       )}
                    </div>
                    <div className="flex-1 min-w-0 relative z-10">
                      <div className="text-[10px] opacity-70 font-bold uppercase tracking-wider mb-0.5">{card.usefulInfo.title}</div>
                      <div className="text-xs font-extrabold truncate tracking-tight">{card.usefulInfo.subtitle}</div>
                    </div>
                </div>

                {/* Functional Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-auto z-10">
                    {card.actions.map((action, i) => (
                        <button 
                            key={i}
                            onClick={() => onCardAction(action.prompt)}
                            className={`flex items-center justify-center gap-1 py-2.5 px-1 rounded-xl text-[11px] font-bold transition-all active:scale-95 border ${
                                i === 0 
                                ? 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-200 hover:bg-slate-700' 
                                : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                            }`}
                        >
                            {action.label}
                            {i === 0 && <ArrowRight className="w-3 h-3" />}
                        </button>
                    ))}
                </div>
              </div>

              {/* Speech Bubble Tail - Only visible when active to reduce visual clutter on fanned cards */}
              <div 
                className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 flex justify-center items-center z-20 pointer-events-none transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
              >
                 <div className="w-4 h-4 bg-white rotate-45 border-r border-b border-white/60 shadow-sm rounded-sm"></div>
              </div>

            </div>
          );
        })}
      </div>
      
      {/* Pagination Indicators */}
      <div className="flex justify-center gap-1.5 mt-2">
        {HERO_CARDS.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-slate-800 w-4' : 'bg-slate-200 w-1.5'}`}></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;