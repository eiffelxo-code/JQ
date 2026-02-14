import React from 'react';
import { ALL_SERVICES } from '../utils/constants';
import { Ticket, MapPin, CreditCard, Camera, Utensils, Music, Bed, Grid, Bus, Info, Map, Headphones, Car, Phone, ShoppingBag, Coffee, MessageSquare, Image, Star } from 'lucide-react';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicesModal: React.FC<ServicesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const iconMap: Record<string, React.ReactNode> = {
    ticket: <Ticket className="w-5 h-5" />,
    'map-pin': <MapPin className="w-5 h-5" />,
    'credit-card': <CreditCard className="w-5 h-5" />,
    camera: <Camera className="w-5 h-5" />,
    utensils: <Utensils className="w-5 h-5" />,
    music: <Music className="w-5 h-5" />,
    bed: <Bed className="w-5 h-5" />,
    grid: <Grid className="w-5 h-5" />,
    bus: <Bus className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    map: <Map className="w-5 h-5" />,
    headphones: <Headphones className="w-5 h-5" />,
    car: <Car className="w-5 h-5" />,
    phone: <Phone className="w-5 h-5" />,
    'shopping-bag': <ShoppingBag className="w-5 h-5" />,
    coffee: <Coffee className="w-5 h-5" />,
    'message-square': <MessageSquare className="w-5 h-5" />,
    image: <Image className="w-5 h-5" />,
    star: <Star className="w-5 h-5" />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-t-[2.5rem] w-full max-w-md max-h-[85vh] overflow-y-auto relative z-10 animate-slide-up shadow-2xl">
        <div className="sticky top-0 bg-white z-20 px-6 pt-6 pb-2 border-b border-slate-50">
           <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4"></div>
           <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">全部服务</h2>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <span className="text-xl leading-none block -mt-0.5">×</span>
              </button>
           </div>
        </div>

        <div className="p-6 space-y-8 pb-10">
          {ALL_SERVICES.map((category, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-6 w-1 bg-teal-500 rounded-full"></div>
                 <h3 className="text-lg font-bold text-slate-800">{category.title}</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                {category.items.map((item, itemIdx) => (
                  <button key={itemIdx} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-600 group-hover:border-teal-100 transition-all shadow-sm">
                      {iconMap[item.icon] || <Grid className="w-5 h-5" />}
                    </div>
                    <span className="text-xs text-slate-600 font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default ServicesModal;