import React, { useState, useRef, useEffect } from 'react';
import { Send, GitBranch, User, Bot, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageNode, Role } from '../types';

interface ChatInterfaceProps {
  activePath: MessageNode[];
  onSendMessage: (content: string) => void;
  onSuggestionClick: (content: string) => void;
  onBranch: (nodeId: string) => void;
  isTyping: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  activePath,
  onSendMessage,
  onSuggestionClick,
  onBranch,
  isTyping
}) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageCount = activePath.length;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activePath, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Conversation</h3>
        <span className="text-[10px] font-semibold text-slate-400">{messageCount} {messageCount === 1 ? 'message' : 'messages'}</span>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {activePath.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
            <Bot size={48} strokeWidth={1} />
            <p className="text-sm">Start a conversation to see the tree grow.</p>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {activePath.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex group ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-violet-100 text-violet-600'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                
                <div className="flex flex-col space-y-1">
                  <div className={`px-4 py-2 rounded-2xl text-sm relative ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none'
                  }`}>
                    {msg.content}
                    
                    {/* Branch Button */}
                    <button
                      onClick={() => onBranch(msg.id)}
                      className={`absolute -bottom-6 ${msg.role === 'user' ? 'right-0' : 'left-0'} 
                        opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 
                        text-[10px] font-bold uppercase tracking-tighter text-slate-400 hover:text-emerald-500`}
                    >
                      <GitBranch size={12} />
                      <span>Branch from here</span>
                    </button>
                  </div>

                  {/* Suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && idx === activePath.length - 1 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {msg.suggestions.map((suggestion, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => onSuggestionClick(suggestion.prompt)}
                          className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] font-medium text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                        >
                          <CornerDownRight size={12} className="text-slate-400" />
                          <span>{suggestion.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 px-1 pt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-slate-100 px-4 py-2 rounded-2xl rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-white border border-slate-200 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};
