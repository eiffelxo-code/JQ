import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Sparkles, MessageSquare, Star } from 'lucide-react';
import { AgentProfile, ChatMessage } from '../types';
import { HERO_CARDS } from '../utils/constants';

interface AgentDetailViewProps {
  agent: AgentProfile;
  onBack: () => void;
  messages: ChatMessage[];
  onActionClick: (prompt: string) => void;
}

const AgentDetailView: React.FC<AgentDetailViewProps> = ({ agent, onBack, messages, onActionClick }) => {
  // Find corresponding Hero Data for richer info
  const heroData = HERO_CARDS.find(h => h.id === agent.id);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages]);

  if (!heroData) return null;

  // Helper for dynamic colors
  const getColorClasses = (color: string) => {
      const map: Record<string, { bg: string, text: string, border: string, lightBg: string }> = {
          green: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', lightBg: 'bg-emerald-50' },
          yellow: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', lightBg: 'bg-amber-50' },
          red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', lightBg: 'bg-red-50' },
          purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', lightBg: 'bg-purple-50' },
          blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', lightBg: 'bg-blue-50' },
      };
      return map[color] || map['blue'];
  };

  const theme = getColorClasses(heroData.usefulInfo.color);

  return (
    <div className="flex-1 flex flex-col relative h-full bg-slate-50/50 animate-fade-in">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 z-20 bg-white/80 backdrop-blur-md sticky top-0 border-b border-slate-100">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors text-slate-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200">
                <img src={agent.avatarUrl} className="w-full h-full object-cover object-top" alt="avatar" />
            </div>
            <div>
                <h2 className="text-base font-bold text-slate-800 leading-tight">{heroData.name}</h2>
                <div className="flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                   <p className="text-[10px] text-slate-500 font-medium">{heroData.tagline}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 p-4" ref={scrollRef}>
        
        {/* Agent Profile Card - Only show if no messages yet or at top */}
        {messages.length === 0 && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
              {/* Background Decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 pointer-events-none ${theme.bg}`}></div>
              
              <div className="flex gap-4 relative z-10">
                  <div className="w-20 h-20 rounded-2xl shadow-md overflow-hidden shrink-0 ring-2 ring-white">
                      <img src={heroData.cardImageUrl} className="w-full h-full object-cover" alt="portrait" />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${theme.lightBg} ${theme.text} ${theme.border}`}>
                              {agent.role}
                          </span>
                          <div className="flex text-amber-400">
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                          </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-medium">
                          {heroData.description}
                      </p>
                  </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
                  {heroData.tags.map((tag, i) => (
                      <div key={i} className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] text-slate-500 font-bold">{tag.label}</span>
                          <div className="h-1 w-8 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-teal-500" style={{ width: `${tag.score}%` }}></div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        )}

        {/* Welcome / Context Bubble */}
        <div className="flex gap-3 mb-6">
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 mt-1 shadow-sm ring-1 ring-slate-100">
                <img src={agent.avatarUrl} className="w-full h-full object-cover object-top" alt="avatar" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[85%]">
                <p className="text-sm text-slate-700 leading-relaxed">
                   你好呀！我是{heroData.name}。{agent.description}。您可以直接点击下方的快捷问题，或者在底部输入框向我提问哦！
                </p>
            </div>
        </div>

        {/* Quick Actions / Prompts Grid (Visible if no history or few messages) */}
        {messages.length < 2 && (
            <div className="grid grid-cols-1 gap-2 mb-6 px-1">
                <div className="text-xs font-bold text-slate-400 mb-1 ml-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 猜你想问
                </div>
                {heroData.actions.map((action, i) => (
                    <button 
                        key={i}
                        onClick={() => onActionClick(action.prompt)}
                        className="text-left bg-white hover:bg-teal-50 border border-slate-100 hover:border-teal-100 p-3 rounded-xl transition-all shadow-sm active:scale-98 group"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-700 group-hover:text-teal-700">{action.prompt}</span>
                            <MessageSquare className="w-4 h-4 text-slate-300 group-hover:text-teal-500" />
                        </div>
                    </button>
                ))}
            </div>
        )}

        {/* Chat History */}
        {messages.filter(m => parseInt(m.id) > 0).map((msg) => (
             <div key={msg.id} className={`flex gap-3 mb-4 animate-slide-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-full overflow-hidden shrink-0 mt-1 shadow-sm ring-1 ring-slate-100 ${msg.role === 'user' ? 'bg-slate-200' : ''}`}>
                    {msg.role === 'model' ? (
                        <img src={agent.avatarUrl} className="w-full h-full object-cover object-top" alt="avatar" />
                    ) : (
                         <div className="w-full h-full bg-slate-300 flex items-center justify-center text-xs text-slate-500 font-bold">ME</div>
                    )}
                </div>
                <div className={`p-3 rounded-2xl shadow-sm max-w-[85%] text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-teal-500 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                    {msg.text}
                </div>
             </div>
        ))}
        
        {/* Loading Indicator */}
        {messages.length > 0 && messages[messages.length-1].role === 'user' && (
           <div className="flex gap-3 mb-4">
               <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 mt-1 shadow-sm ring-1 ring-slate-100">
                    <img src={agent.avatarUrl} className="w-full h-full object-cover object-top" alt="avatar" />
               </div>
               <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
               </div>
           </div>
        )}

        {/* Space for bottom fixed input */}
        <div className="h-10"></div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AgentDetailView;