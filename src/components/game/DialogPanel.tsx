import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NPCData, ChatMessage } from './types';

interface Props {
  npc: NPCData;
  messages: ChatMessage[];
  isThinking: boolean;
  onSend: (message: string) => void;
  onClose: () => void;
}

export default function DialogPanel({ npc, messages, isThinking, onSend, onClose }: Props) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim() && !isThinking) {
      onSend(input.trim());
      setInput('');
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[480px] px-4"
    >
      <div className="bg-bubble pixel-border-strong">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b-2 border-foreground/10">
          <div className="flex items-center gap-2">
            <span className="text-lg">{npc.sprite}</span>
            <span className="font-pixel text-lg tracking-wider text-foreground">{npc.name}</span>
            <span className="font-system text-[10px] uppercase tracking-widest text-muted-foreground bg-muted px-1.5 py-0.5">
              {npc.tag}
            </span>
          </div>
          <button
            onClick={onClose}
            className="font-pixel text-muted-foreground hover:text-foreground text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="px-4 py-3 max-h-[240px] overflow-y-auto space-y-3">
          {messages.length === 0 && (
            <p className="font-pixel text-base text-muted-foreground italic leading-relaxed">
              {npc.greeting}
            </p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`font-pixel text-base leading-relaxed ${
                msg.role === 'user'
                  ? 'text-primary pl-4 border-l-2 border-primary/30'
                  : 'text-foreground'
              }`}
            >
              {msg.role === 'user' && (
                <span className="text-xs text-muted-foreground block mb-0.5">Você</span>
              )}
              {msg.content}
            </div>
          ))}
          {isThinking && (
            <div className="flex items-center gap-1">
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-muted-foreground"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t-2 border-foreground/10">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleSubmit}
            placeholder="Diga algo..."
            disabled={isThinking}
            className="w-full bg-transparent font-pixel text-base text-foreground placeholder:text-muted-foreground/50 outline-none caret-primary"
          />
        </div>
      </div>
      <p className="text-center font-system text-[10px] text-muted-foreground mt-2 tracking-wider">
        ENTER para enviar · ESC para fechar
      </p>
    </motion.div>
  );
}
