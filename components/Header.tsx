import React from 'react';
import { Menu, MoreHorizontal, RefreshCcw, Sun } from 'lucide-react';
import { SCENIC_NAME, WEATHER_INFO } from '../utils/constants';

const Header: React.FC = () => {
  return (
    <header className="px-5 pt-6 pb-2 flex justify-between items-center z-20 relative text-slate-800">
      <div className="flex flex-col gap-2">
        <button className="p-1 -ml-1">
          <Menu className="w-6 h-6 text-slate-700" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{SCENIC_NAME}</h1>
          <button className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
            <RefreshCcw className="w-3 h-3 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/50 shadow-sm">
          <MoreHorizontal className="w-5 h-5 text-slate-700" />
          <div className="w-px h-4 bg-slate-300 mx-1"></div>
          <div className="w-5 h-5 rounded-full border-2 border-slate-700 flex items-center justify-center">
            <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
          </div>
        </div>
        
        {/* Simplified Weather Display: Only Temp and Icon */}
        <div className="flex items-center gap-1.5 text-teal-800 bg-teal-50/80 px-2 py-1 rounded-lg border border-teal-100/50">
          <Sun className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-bold tracking-tight">{WEATHER_INFO.temp}</span>
          <span className="text-xs font-medium opacity-80">{WEATHER_INFO.condition}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;