import React from 'react';
import { ArrowRight, Map } from 'lucide-react';
import { AgentProfile } from '../types';

interface AgentCardProps {
  agent?: AgentProfile;
  isMapCard?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  onAvatarClick?: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isMapCard, isActive, onClick, onAvatarClick }) => {
  // Dimensions
  // Map card is standard reference height
  // Agent card body is shorter so avatar sticks out
  
  // Reduced sizes:
  // Map: h-[98px]
  // Agent: h-[82px]
  // Width: min-w-[88px]
  const cardHeight = isMapCard ? "h-[98px]" : "h-[82px]"; 
  const cardWidth = "min-w-[88px]";
  const avatarSize = "w-14 h-14"; // Reduced from 16 to 14

  if (isMapCard) {
    return (
      <div className={`${cardWidth} ${cardHeight} bg-emerald-50 rounded-2xl p-2 flex flex-col justify-between relative shadow-sm overflow-hidden shrink-0 mx-1 select-none border border-emerald-100`}>
        {/* Scenic Map Background - Clean Google Maps style (Green/White) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624969862242-f58d099bf9f1?q=80&w=500&auto=format&fit=crop')] bg-cover bg-center opacity-80 pointer-events-none mix-blend-multiply"></div>
        
        {/* Subtle overlay to unify and ensure text readability without hiding the map details */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/90 pointer-events-none"></div>
        
        <div className="relative z-10 flex justify-between items-start">
            <span className="bg-emerald-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm backdrop-blur-md flex items-center gap-0.5">
                <Map className="w-2.5 h-2.5" /> 智能导览
            </span>
        </div>
        
        <div className="relative z-10">
             <div className="flex -space-x-1.5 mb-1 opacity-90">
                {[1,2].map(i => (
                  <img key={i} src={`https://picsum.photos/30?random=${i+10}`} className="w-5 h-5 rounded-full border border-white" alt="user" />
                ))}
             </div>
             <button className="bg-slate-800 text-white px-2 py-0.5 rounded-full text-[10px] font-bold w-fit shadow-md flex items-center hover:bg-slate-700 transition-colors">
                全景游 <ArrowRight className="w-2 h-2 ml-0.5" />
             </button>
        </div>
      </div>
    );
  }

  if (!agent) return null;

  // Custom styling for the different card backgrounds
  const bgStyle = agent.id.includes('guide') ? 'bg-gradient-to-b from-teal-50 to-white' 
                : agent.id.includes('story') ? 'bg-gradient-to-b from-amber-50 to-white'
                : agent.id.includes('event') ? 'bg-gradient-to-b from-rose-50 to-white'
                : agent.id.includes('service') ? 'bg-gradient-to-b from-blue-50 to-white'
                : agent.id.includes('photo') ? 'bg-gradient-to-b from-purple-50 to-white'
                : 'bg-gradient-to-b from-green-50 to-white'; // Local

  return (
    <div 
      onClick={onClick}
      className={`${cardWidth} ${cardHeight} ${bgStyle} rounded-2xl relative shadow-sm shrink-0 mx-1 flex flex-col items-center justify-end overflow-visible active:scale-95 transition-all cursor-pointer select-none border-2 ${isActive ? 'border-teal-500 -translate-y-2' : 'border-transparent'}`}
    >
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute -bottom-2 w-8 h-1 bg-teal-500 rounded-full shadow-sm"></div>
      )}

      {/* 3D Avatar Image - Positioning it to pop out */}
      <div className="absolute -top-4 w-full flex justify-center z-10 pointer-events-none">
        {/* Clickable Avatar Area */}
        <div 
          onClick={(e) => {
            if (onAvatarClick) {
              e.stopPropagation();
              onAvatarClick();
            }
          }}
          className={`${avatarSize} rounded-full bg-white p-0.5 shadow-md ${isActive ? 'ring-2 ring-teal-400 ring-offset-1' : ''} cursor-pointer hover:scale-105 transition-transform pointer-events-auto`}
        >
          <img 
            src={agent.avatarUrl} 
            alt={agent.name} 
            className="w-full h-full object-cover object-top rounded-full"
          />
        </div>
      </div>

      <div className="w-full pb-3 px-1 text-center flex flex-col items-center z-0 h-full justify-end pointer-events-none">
        {/* Name at bottom, no arrow */}
        <h3 className={`text-slate-700 font-bold text-[11px] leading-none mb-1 ${isActive ? 'text-teal-700' : ''}`}>{agent.name}</h3>
      </div>
    </div>
  );
};

export default AgentCard;