import React, { useState } from 'react';
import { Mic, ArrowUp, Ticket, MapPin, CreditCard, Camera, Utensils, Music, Bed, Grid, Bus, Map, Headphones, RefreshCw } from 'lucide-react';
import { MAIN_AVATAR, OUTSIDE_CHIPS, INSIDE_CHIPS } from '../utils/constants';
import ServicesModal from './ServicesModal';
import { useDraggableScroll } from '../hooks/useDraggableScroll';

interface BottomInteractionProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  placeholder?: string;
  minimal?: boolean; // If true, hides the avatar and chips for a cleaner chat view
}

const BottomInteraction: React.FC<BottomInteractionProps> = ({ onSendMessage, isProcessing, inputValue, onInputChange, placeholder, minimal = false }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isInsideScenic, setIsInsideScenic] = useState(false); // Default: Outside scenic area
  
  const { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove, isDragging } = useDraggableScroll();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSendMessage(inputValue);
      onInputChange("");
    }
  };

  const icons: Record<string, React.ReactNode> = {
    'ticket': <Ticket className="w-4 h-4" />,
    'map-pin': <MapPin className="w-4 h-4" />,
    'credit-card': <CreditCard className="w-4 h-4" />,
    'camera': <Camera className="w-4 h-4" />,
    'utensils': <Utensils className="w-4 h-4" />,
    'music': <Music className="w-4 h-4" />,
    'bed': <Bed className="w-4 h-4" />,
    'grid': <Grid className="w-4 h-4" />,
    'bus': <Bus className="w-4 h-4" />,
    'map': <Map className="w-4 h-4" />,
    'headphones': <Headphones className="w-4 h-4" />
  };

  const currentChips = isInsideScenic ? INSIDE_CHIPS : OUTSIDE_CHIPS;

  const getChipColor = (index: number, isLast: boolean) => {
    if (isLast) return 'bg-slate-800 text-white border-slate-800 shadow-md';
    return 'bg-white text-slate-700 border-slate-100 hover:bg-slate-50';
  };

  return (
    <>
      {/* Positioned above the BottomNavigation (which is approx 70px height) */}
      <div className={`absolute bottom-[68px] left-0 right-0 z-30 pointer-events-none transition-all duration-300 ${minimal ? 'bottom-[76px]' : ''}`}>
         {/* Container */}
        <div className="w-full relative h-full flex flex-col justify-end pb-2 px-4">
          
          {/* Main 3D Avatar (Floating Circle) with Toggle Functionality - Hidden in minimal mode */}
          {!minimal && (
              <div 
                onClick={() => setIsInsideScenic(!isInsideScenic)}
                className="absolute bottom-20 left-4 pointer-events-auto transition-transform duration-300 hover:scale-105 active:scale-95 z-20 cursor-pointer group"
              >
                   <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white ring-1 ring-slate-100 relative">
                     <img 
                      src={MAIN_AVATAR} 
                      alt="Assistant" 
                      className="w-full h-full object-cover object-top scale-125 origin-top"
                    />
                     <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <RefreshCw className="w-6 h-6 text-white" />
                     </div>
                   </div>
                   
                   <div className={`absolute -top-1 -right-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold border shadow-sm transition-colors ${
                     isInsideScenic 
                       ? 'bg-teal-500 text-white border-teal-400' 
                       : 'bg-orange-400 text-white border-orange-300'
                   }`}>
                     {isInsideScenic ? '景区内' : '景区外'}
                   </div>

                   <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
              </div>
          )}

          {/* Quick Actions Scroll (Fixed 4 Items) - Hidden in minimal mode */}
          {!minimal && (
              <div 
                ref={ref}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                className={`flex items-center gap-2 overflow-x-auto no-scrollbar mb-3 pl-24 pointer-events-auto py-2 mask-linear-fade cursor-${isDragging ? 'grabbing' : 'grab'}`}
              >
                 {currentChips.map((chip, idx) => {
                   const isLast = idx === currentChips.length - 1;
                   return (
                     <button 
                        key={idx}
                        onClick={() => {
                          if (!isDragging) {
                            isLast ? setIsServicesOpen(true) : onSendMessage(`我想${chip.label}`);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap shadow-sm transition-transform active:scale-95 select-none ${getChipColor(idx, isLast)}`}
                     >
                        {icons[chip.icon as string]}
                        {chip.label}
                     </button>
                   );
                 })}
                 <div className="w-2 shrink-0"></div>
              </div>
          )}

          {/* Input Bar */}
          <div className={`relative pointer-events-auto shadow-card rounded-full bg-white/95 backdrop-blur-xl border border-white/50 p-1.5 flex items-center gap-2 z-20 ${minimal ? 'shadow-lg border-teal-100' : ''}`}>
              <button className="w-10 h-10 rounded-full bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shadow-sm">
                  <Mic className="w-5 h-5" />
              </button>
              
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isProcessing ? "思考中..." : (placeholder || "通天河漂流怎么走～")}
                className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm font-medium h-9 px-2"
                disabled={isProcessing}
              />

              <button 
                onClick={() => inputValue.trim() && onSendMessage(inputValue)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                  inputValue.trim() ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-300'
                }`}
              >
                <ArrowUp className="w-5 h-5" />
              </button>
          </div>
        </div>
      </div>

      <ServicesModal isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} />
    </>
  );
};

export default BottomInteraction;