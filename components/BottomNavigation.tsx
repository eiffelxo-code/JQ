import React from 'react';
import { Home, ShoppingBag, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[72px] bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-around z-40 pb-2">
      {/* Home - Active */}
      <button className="flex flex-col items-center gap-1 group">
        <div className="relative p-1">
             <Home className="w-6 h-6 text-teal-600 fill-teal-100" />
        </div>
        <span className="text-[10px] font-bold text-teal-700">首页</span>
      </button>

      {/* Order */}
      <button className="flex flex-col items-center gap-1 group text-slate-400 hover:text-slate-600 transition-colors">
        <div className="relative p-1">
            <ShoppingBag className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-medium group-hover:text-slate-600">订购</span>
      </button>

      {/* Mine */}
      <button className="flex flex-col items-center gap-1 group text-slate-400 hover:text-slate-600 transition-colors">
        <div className="relative p-1">
            <User className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-medium group-hover:text-slate-600">我的</span>
      </button>
    </div>
  );
};

export default BottomNavigation;