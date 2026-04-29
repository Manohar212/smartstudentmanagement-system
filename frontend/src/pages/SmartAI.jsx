import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, BarChart3, FileText, ChevronRight, Send, ArrowRight, BookOpen, Loader2 } from 'lucide-react';

// Call the backend AI route — API key never touches the frontend
async function callAI(message) {
  const res = await fetch('http://localhost:5000/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'AI request failed');
  return data.reply;
}

export function SmartAI() {
  const [inputText,  setInputText]  = useState('');
  const [messages,   setMessages]   = useState([]);
  const [loading,    setLoading]    = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Core send function — used by input, cards, and example chips
  const sendMessage = async (text) => {
    const prompt = (text || inputText).trim();
    if (!prompt || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: prompt }]);
    setInputText('');
    setLoading(true);

    try {
      const reply = await callAI(prompt);
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: `⚠️ ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Card button prompts
  const cards = [
    {
      title: 'Practice Quiz',
      desc:  'Generate quizzes to test your knowledge.',
      icon:  HelpCircle,
      btn:   'Start Quiz',
      prompt: 'Generate 5 quiz questions on Data Structures with answer hints.',
    },
    {
      title: 'Study Insights',
      desc:  'Track your learning progress and stats.',
      icon:  BarChart3,
      btn:   'View Insights',
      prompt: 'Give me study insights and tips for improving academic performance in computer science subjects.',
    },
    {
      title: 'Summarize Notes',
      desc:  'Get concise summaries of your notes.',
      icon:  FileText,
      btn:   'Summarize',
      prompt: inputText.trim()
        ? `Summarize the following content concisely:\n\n${inputText}`
        : 'Give me a concise summary of Database Management System key concepts.',
    },
  ];

  const suggestions = [
    { title: 'Revise Data Structures',  desc: 'Based on your recent performance.', icon: FileText,   prompt: 'Explain key Data Structures concepts I should revise: arrays, linked lists, trees, and graphs.'  },
    { title: 'Practice More Quizzes',   desc: 'You can improve in Algorithms.',    icon: HelpCircle, prompt: 'Give me 5 algorithm practice problems with hints.'                                               },
    { title: 'Review Notes',            desc: 'Web Development notes need review.', icon: BookOpen,   prompt: 'Summarize the key concepts of Web Development: HTML, CSS, JavaScript, and REST APIs.'           },
  ];

  const EXAMPLE_PROMPTS = [
    'Explain OOP in simple terms',
    'Difference between SQL and NoSQL',
    'Time complexity of binary search',
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl flex flex-col">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-text-main mb-2">Smart AI</h1>
        <p className="text-text-muted">Your AI study assistant for smarter learning.</p>
      </div>

      <div className="pb-4 space-y-8">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="bg-surface rounded-[24px] p-6 sm:p-8 border border-border flex flex-col justify-between h-full">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-error-bg flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main mb-1">{card.title}</h3>
                    <p className="text-sm text-text-muted">{card.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => sendMessage(card.prompt)}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-fit px-6 py-2.5 rounded-xl bg-error-bg text-brand-red font-medium text-sm hover:bg-brand-red hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {card.btn} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Suggested For You */}
        <div className="bg-surface rounded-[24px] p-6 sm:p-8 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-main">Suggested for You</h2>
            <button className="text-brand-red text-sm font-medium flex items-center gap-1 hover:text-brand-red-hover transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {suggestions.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  onClick={() => sendMessage(item.prompt)}
                  className="flex items-center justify-between p-4 bg-surface rounded-2xl hover:bg-bg-beige/50 border-b border-border last:border-b-0 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-error-bg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-red" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-text-main">{item.title}</p>
                      <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat History */}
        {(messages.length > 0 || loading) && (
          <div className="bg-surface rounded-[24px] p-6 sm:p-8 border border-border space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-brand-red text-white' : 'bg-bg-beige text-text-main'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator while loading */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-bg-beige rounded-2xl p-4 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-text-muted animate-spin" />
                  <p className="text-sm text-text-muted">Smart AI is thinking...</p>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-surface rounded-[24px] p-6 sm:p-8 border border-border mt-4">
        <h2 className="text-lg font-bold text-text-main mb-4">Ask Smart AI anything...</h2>
        <div className="flex items-end gap-4 mb-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="flex-1 min-h-[60px] p-4 bg-surface border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red placeholder:text-text-muted transition-all text-text-main disabled:opacity-50"
            placeholder="Type your question here..."
            rows={1}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !inputText.trim()}
            className="w-14 h-[60px] rounded-xl bg-brand-red text-white flex items-center justify-center shrink-0 hover:bg-brand-red-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-[-2px]" />}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-sm text-text-main font-medium mr-1">Examples:</span>
          {EXAMPLE_PROMPTS.map(prompt => (
            <button
              key={prompt}
              onClick={() => setInputText(prompt)}
              className="px-4 py-1.5 rounded-full bg-error-bg border border-brand-red/20 text-brand-red text-xs sm:text-sm font-medium hover:bg-brand-red hover:text-white transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
