/**
 * src/components/common/AiAssistantWidget.jsx
 *
 * Floating AI Textile Sourcing Assistant Widget.
 * Styled in traditional Indian linen cream (#FAF8F5) and olive green (#7B8B30).
 */

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  ShieldCheck,
  Package,
  Layers,
  ChevronDown
} from 'lucide-react';

const QUICK_QUESTIONS = [
  '🧵 Recommended fabric for summer wear?',
  '📦 How do sample swatches work?',
  '🏭 Verified cotton mills in Surat?',
  '🛡️ Is Escrow payment protected?',
];

const KNOWLEDGE_BASE = [
  {
    keywords: ['summer', 'breathable', 'cotton', 'linen', 'hot', 'shirt'],
    answer: "For summer apparel, we recommend our Organic Combed Cotton Twill (240 GSM) or Pure Linen Weave (180 GSM). Both offer high breathability and absorbent yarn counts directly from Surat mills.",
    link: "/products",
    linkText: "Browse Summer Fabrics"
  },
  {
    keywords: ['sample', 'swatch', 'booklet', 'test', 'order sample'],
    answer: "You can request 10x10 cm sample swatch booklets directly on any fabric detail page! Swatch booklets are dispatched within 24 hours via express courier.",
    link: "/buyer-guide",
    linkText: "Read Swatch Request Guide"
  },
  {
    keywords: ['surat', 'mill', 'tirupur', 'ahmedabad', 'supplier', 'factory'],
    answer: "We partner with over 450+ verified weaving mills across Surat, Tirupur, and Ahmedabad. All mills undergo strict spec auditing and GST compliance checks.",
    link: "/suppliers",
    linkText: "Explore Verified Mills"
  },
  {
    keywords: ['escrow', 'payment', 'safe', 'security', 'guarantee', 'refund'],
    answer: "Your funds are held safely in 100% Escrow Protection until you receive and inspect your bulk fabric shipment at your warehouse.",
    link: "/returns-policy",
    linkText: "View Protection Guarantee"
  },
  {
    keywords: ['moq', 'minimum', 'quantity', 'meter', 'bulk'],
    answer: "Minimum Order Quantities (MOQs) start at just 50 meters for sample trial runs, and 500+ meters for direct mill bulk pricing discounts.",
    link: "/bulk-orders",
    linkText: "View Bulk MOQ Tiers"
  }
];

function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Namaste! 🙏 I'm Maya, your TextileHub AI Sourcing Assistant. How can I help you find wholesale fabrics, request sample swatches, or connect with verified mills today?",
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI reasoning delay
    setTimeout(() => {
      const queryLower = query.toLowerCase();
      let matchedKB = KNOWLEDGE_BASE.find(kb => 
        kb.keywords.some(kw => queryLower.includes(kw))
      );

      let botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: matchedKB 
          ? matchedKB.answer 
          : "Great question! TextileHub connects buyers directly with 450+ verified mills in Surat & Tirupur. You can search by GSM, weave, or MOQ in our directory.",
        link: matchedKB?.link || "/products",
        linkText: matchedKB?.linkText || "Search Fabric Directory",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 antialiased font-sans">
      {/* ── Toggle Floating Trigger Button ────────────────────────────────────── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#7B8B30] hover:bg-[#687627] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-[#687627]/30"
          aria-label="Open AI Textile Assistant"
        >
          <div className="relative">
            <Sparkles size={20} className="text-[#FAF8F5] animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#7B8B30]" />
          </div>
          <span className="font-semibold text-sm tracking-wide hidden sm:inline">
            Textile Assistant
          </span>
        </button>
      )}

      {/* ── Floating AI Chat Modal ────────────────────────────────────────────── */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-[#FAF8F5] border border-[#E7E2D7] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-[#1C1917] text-white p-4 flex items-center justify-between border-b border-[#292524]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#7B8B30] flex items-center justify-center text-white ring-2 ring-[#7B8B30]/40 shadow-xs">
                <Bot size={20} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm font-serif-display tracking-tight text-[#FAF8F5]">Maya AI</h3>
                  <span className="px-1.5 py-0.2 text-[10px] uppercase font-bold bg-[#7B8B30] text-white rounded-full">
                    Sourcing Bot
                  </span>
                </div>
                <p className="text-[11px] text-[#A8A29E] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online • Textiles & Swatches Specialist
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#A8A29E] hover:text-white hover:bg-[#292524] p-1.5 rounded-lg transition-colors"
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF8F5]/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#7B8B30]/10 text-[#7B8B30] flex items-center justify-center shrink-0 border border-[#7B8B30]/20 mt-1">
                    <Bot size={15} />
                  </div>
                )}

                <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#7B8B30] text-white rounded-br-none shadow-xs'
                    : 'bg-white border border-[#E7E2D7] text-[#44403C] rounded-bl-none shadow-xs'
                }`}>
                  <p>{msg.text}</p>
                  
                  {msg.link && (
                    <Link
                      to={msg.link}
                      onClick={() => setIsOpen(false)}
                      className="mt-2.5 inline-flex items-center gap-1 font-bold text-[#7B8B30] hover:underline text-[11px] bg-[#7B8B30]/5 px-2.5 py-1 rounded-md border border-[#7B8B30]/15"
                    >
                      {msg.linkText} <ArrowRight size={12} />
                    </Link>
                  )}

                  <span className={`block text-[9px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-white/75' : 'text-[#A8A29E]'
                  }`}>
                    {msg.time}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#1C1917] text-white flex items-center justify-center shrink-0 mt-1">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-[#78716C] bg-white border border-[#E7E2D7] p-2.5 rounded-2xl w-fit">
                <Bot size={14} className="text-[#7B8B30] animate-spin" />
                <span>Maya is checking mill listings...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="px-3 py-2 bg-[#F5F2EC] border-t border-[#E7E2D7] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] bg-white border border-[#E7E2D7] hover:border-[#7B8B30] text-[#44403C] hover:text-[#7B8B30] px-2.5 py-1 rounded-full transition-all shrink-0 font-medium shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#E7E2D7] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about GSM, Surat mills, swatches..."
              className="flex-1 bg-[#FAF8F5] border border-[#E7E2D7] rounded-xl px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#7B8B30]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-[#7B8B30] hover:bg-[#687627] disabled:opacity-40 text-white p-2 rounded-xl transition-colors shadow-xs"
              aria-label="Send Message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AiAssistantWidget;
