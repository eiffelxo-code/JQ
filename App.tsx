import React, { useState, useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AgentCard from './components/AgentCard';
import BottomInteraction from './components/BottomInteraction';
import BottomNavigation from './components/BottomNavigation';
import AgentDetailView from './components/AgentDetailView';
import { AGENTS, HERO_CARDS } from './utils/constants';
import { generateResponse } from './services/geminiService';
import { ChatMessage, AgentProfile } from './types';
import { useDraggableScroll } from './hooks/useDraggableScroll';

function App() {
  const [view, setView] = useState<'home' | 'agent-chat'>('home');
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showResponseOverlay, setShowResponseOverlay] = useState(false);
  const [lastResponse, setLastResponse] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  
  // Lock to prevent scroll loops: 'hero' (scrolling hero driven by agent) or 'agent' (scrolling agent driven by hero)
  const scrollLockRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Draggable hook for the agent list
  const { ref: agentListRef, onMouseDown, onMouseLeave, onMouseUp, onMouseMove, isDragging } = useDraggableScroll();

  const handleSendMessage = async (text: string) => {
    setIsProcessing(true);
    // Optimistically add user message
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);

    // If we are in home view, show the overlay. 
    // If in chat view, we don't show overlay as the message appears in the list.
    if (view === 'home') {
      setShowResponseOverlay(true);
    }

    try {
      const responseText = await generateResponse(text);
      setLastResponse(responseText);
      const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      setLastResponse("Sorry, something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAgentClick = (agent: AgentProfile, index: number) => {
    // Prevent click if dragging
    if (isDragging) return;
    
    // Clicking in the list updates the hero focus
    setActiveAgentIndex(index);
    scrollLockRef.current = 'click'; 
    
    // We also want to ensure the agent is fully in view (centered if possible)
    if (agentListRef.current) {
        const agentCardWidth = 96; 
        const scrollPos = index * agentCardWidth; 
        agentListRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }

    if (agent.defaultPrompt) {
      setInputValue(agent.defaultPrompt);
    }
  };
  
  // New handler to enter the detail view
  const handleAgentEnter = (agentId: string) => {
    const index = AGENTS.findIndex(a => a.id === agentId);
    if (index !== -1) {
        setActiveAgentIndex(index);
        setView('agent-chat');
        // Clear previous messages if you want a fresh session per agent, or keep them.
        // For this demo, we keep the session but you might want to filter messages by agentId in a real app.
    }
  };

  const handleBackToHome = () => {
    setView('home');
    setShowResponseOverlay(false); 
  };
  
  // Helper to clear scroll lock after animation
  const setScrollLock = (type: string) => {
    scrollLockRef.current = type;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      scrollLockRef.current = null;
    }, 600); 
  };

  // 1. Hero Scroll -> Drives Agent List
  const handleHeroIndexChange = (index: number) => {
    if (scrollLockRef.current === 'scrolling-hero') return;

    if (index !== activeAgentIndex && index >= 0 && index < AGENTS.length) {
      setActiveAgentIndex(index);
      
      if (agentListRef.current) {
        setScrollLock('scrolling-agent');
        const agentCardWidth = 96; 
        const scrollPos = index * agentCardWidth;
        agentListRef.current.scrollTo({
          left: scrollPos,
          behavior: 'smooth'
        });
      }
    }
  };

  // 2. Agent List Scroll -> Drives Hero Section
  const handleAgentListScroll = (e: React.UIEvent<HTMLDivElement>) => {
     if (scrollLockRef.current === 'scrolling-agent') return;

     const scrollLeft = e.currentTarget.scrollLeft;
     const agentCardWidth = 96; 
     const index = Math.round(scrollLeft / agentCardWidth);

     if (index !== activeAgentIndex && index >= 0 && index < AGENTS.length) {
       setActiveAgentIndex(index);
       setScrollLock('scrolling-hero');
     }
  };

  const currentAgent = AGENTS[activeAgentIndex];
  const currentHeroData = HERO_CARDS.find(h => h.id === currentAgent.id);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center font-sans p-4 sm:p-0">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md h-[850px] sm:h-[90vh] bg-teal-50/50 relative overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col ring-8 ring-slate-800/50">
        
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-100 via-white to-white pointer-events-none z-0"></div>
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-teal-200/40 to-transparent pointer-events-none z-0 rounded-b-[40%] blur-3xl"></div>

        {view === 'home' && (
           <>
             {/* Header */}
             <Header />

             {/* Scrollable Content */}
             <main className="flex-1 overflow-y-auto no-scrollbar pb-40 relative z-10 space-y-0 animate-fade-in">
              
              <HeroSection 
                activeIndex={activeAgentIndex} 
                onIndexChange={handleHeroIndexChange}
                onCardAction={handleSendMessage}
                onAgentEnter={handleAgentEnter}
              />

              {/* Agents List */}
              <div className="pl-4 -mt-4 flex h-[120px]">
                <div className="shrink-0 z-20 flex items-end pb-4">
                   <AgentCard isMapCard={true} />
                </div>
                
                <div 
                  ref={agentListRef}
                  onMouseDown={onMouseDown}
                  onMouseLeave={onMouseLeave}
                  onMouseUp={onMouseUp}
                  onMouseMove={onMouseMove}
                  onScroll={handleAgentListScroll}
                  className={`flex-1 flex overflow-x-auto no-scrollbar items-end h-full pb-4 pr-4 cursor-${isDragging ? 'grabbing' : 'grab'}`}
                >
                  {AGENTS.map((agent, index) => (
                    <AgentCard 
                      key={agent.id} 
                      agent={agent} 
                      isActive={index === activeAgentIndex}
                      onClick={() => handleAgentClick(agent, index)}
                      onAvatarClick={() => handleAgentEnter(agent.id)}
                    />
                  ))}
                  <div className="w-4 shrink-0"></div>
                </div>
              </div>
            </main>
           </>
        )}

        {view === 'agent-chat' && (
            <AgentDetailView 
                agent={currentAgent} 
                onBack={handleBackToHome}
                messages={messages}
                onActionClick={handleSendMessage}
            />
        )}

        {/* Bottom Interaction Area - Shared but context aware */}
        <BottomInteraction 
          onSendMessage={handleSendMessage} 
          isProcessing={isProcessing} 
          inputValue={inputValue}
          onInputChange={setInputValue}
          placeholder={view === 'agent-chat' ? `向${currentHeroData?.name}提问...` : "通天河漂流怎么走～"}
          minimal={view === 'agent-chat'} // Pass a prop to maybe simplify the bar in chat mode?
        />

        {/* Bottom Navigation Bar */}
        <BottomNavigation />

        {/* Response Overlay (Only for Home View) */}
        {showResponseOverlay && view === 'home' && (
           <div 
             className="absolute bottom-40 left-4 right-4 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl z-20 border border-white/50 transform transition-all duration-500 origin-bottom animate-bounce-in cursor-pointer"
             onClick={() => setShowResponseOverlay(false)}
           >
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shrink-0 shadow-lg text-white">
                    <span className="text-lg">🤖</span>
                 </div>
                 <div className="flex-1">
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                       {isProcessing ? (
                         <span className="flex items-center gap-1">
                           正在思考 <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
                         </span>
                       ) : (
                         lastResponse
                       )}
                    </p>
                 </div>
                 <button className="text-slate-400 hover:text-slate-600 p-1">
                    <span className="text-xl">×</span>
                 </button>
              </div>
           </div>
        )}
      </div>
      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.9) translateY(20px); opacity: 0; }
          60% { transform: scale(1.02) translateY(-5px); opacity: 1; }
          100% { transform: scale(1) translateY(0); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }
      `}</style>
    </div>
  );
}

export default App;