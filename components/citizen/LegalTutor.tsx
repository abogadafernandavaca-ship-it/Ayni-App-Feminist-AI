import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, User, Bot } from 'lucide-react';
import { Button } from '../ui/Button';
import { ChatMessage } from '../../types';
import { getLegalAdvice } from '../../services/geminiService';

export const LegalTutor: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola hermana! Soy Ayni. 🌸 ¿Tienes dudas sobre tus derechos o necesitas explicarme una situación? Estoy aquí para hacerlo simple.' }
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await getLegalAdvice(userMsg.text, messages);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-ayni-rose-50">
      {/* Header Andino */}
      <div className="bg-ayni-lilac-500 relative overflow-hidden shadow-lg">
         <div className="absolute top-0 left-0 w-full h-2 bg-andean-stripe opacity-50"></div>
         <div className="p-4 flex items-center gap-3 relative z-10">
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-md">
            <Sparkles size={24} className="text-white" />
            </div>
            <div>
            <h2 className="font-display font-bold text-xl text-white">Habla y Aprende</h2>
            <p className="text-ayni-lilac-100 text-xs">Alfabetización Legal Crítica</p>
            </div>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm relative ${
              msg.role === 'user' 
                ? 'bg-ayni-lilac-500 text-white rounded-br-none' 
                : 'bg-white text-gray-700 border border-ayni-rose-100 rounded-bl-none'
            }`}>
              <div className={`absolute -top-3 ${msg.role === 'user' ? '-right-2' : '-left-2'} w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-ayni-lilac-700' : 'bg-ayni-rose-200 text-ayni-rose-600'}`}>
                {msg.role === 'user' ? <User size={14}/> : <Bot size={16}/>}
              </div>
              <p className="leading-relaxed text-sm md:text-base mt-1">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start pl-2">
             <div className="bg-ayni-rose-100 text-ayni-rose-500 px-4 py-2 rounded-full text-sm animate-pulse flex items-center gap-2">
               <span className="w-2 h-2 bg-ayni-rose-500 rounded-full animate-bounce"></span>
               Escribiendo con cuidado...
             </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-white border-t border-ayni-rose-100">
        <div className="flex gap-2 items-center bg-gray-50 p-1 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-ayni-lilac-400 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre pensiones, denuncias..."
            className="flex-1 p-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
          <button 
            onClick={handleSend} 
            disabled={loading || !input.trim()} 
            className="p-3 bg-ayni-lilac-500 text-white rounded-xl hover:bg-ayni-lilac-600 disabled:opacity-50 transition-colors shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};