// ============================================
// Voice Assistant Screen - OBSIDIAN Neon-Noir Design
// Deep black background with AI orb visualization
// ============================================

import { useState, useRef, useEffect } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Mic, Volume2, Send, Loader2, Zap } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';

// TypeScript declarations for Speech Recognition API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

interface VoiceAssistantScreenProps {
  navigateTo: (screen: Screen, data?: Record<string, unknown>) => void;
}

interface Message {
  id: number;
  type: 'user' | 'ai';
  text: string;
}

export function VoiceAssistantScreen({ navigateTo }: VoiceAssistantScreenProps) {
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'ai', text: 'Welcome back! How may I help you today?' },
    { id: 2, type: 'ai', text: 'You can type or say things like "How much did I earn this month?" or "Transfer RM50 to Alia"' }
  ]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as { webkitSpeechRecognition?: { new(): SpeechRecognition } }).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (interimTranscript) {
        setTranscript(interimTranscript);
        setInputText(interimTranscript);
      }

      if (finalTranscript) {
        setTranscript(finalTranscript.trim());
        setInputText(finalTranscript.trim());
        handleSendMessage(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      let errorMessage = 'Speech recognition error. ';
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          break;
        case 'audio-capture':
          errorMessage = 'Microphone not found. Please check your microphone settings.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone permission denied. Please allow microphone access.';
          break;
        case 'network':
          errorMessage = 'Network error. Please check your connection.';
          break;
        default:
          errorMessage = `Error: ${event.error}`;
      }
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        text: errorMessage
      }]);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript('');
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickActions = [
    'Check my balance',
    'How much did I earn?',
    'Show my RyScore',
    'Is my cashflow healthy?'
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    setInputText('');
    setIsLoading(true);

    const newUserMessage: Message = { id: Date.now(), type: 'user', text: userMessage };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' as const : 'ai' as const,
        text: msg.text,
      }));

      const response = await chatWithGemini(userMessage, conversationHistory);

      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: response.message }]);

      if (response.action) {
        if (response.action.type === 'transfer' && response.action.data) {
          if (response.action.data.amount) {
            const transferAmount = parseFloat(response.action.data.amount || '0');
            const currentBalance = 3847.50;
            
            if (transferAmount > currentBalance) {
              setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'ai',
                text: `Your balance is insufficient. Your current balance is RM ${currentBalance.toFixed(2)}, but you're trying to transfer RM ${transferAmount.toFixed(2)}. Please top up your account to complete this transaction.`
              }]);
              return;
            }
          }
          
          setTimeout(() => {
            navigateTo('transaction', {
              amount: response.action?.data?.amount || '',
              recipient: response.action?.data?.recipient || '',
            });
          }, 1500);
        } else if (response.action.type === 'apply_loan') {
          setTimeout(() => {
            navigateTo('loan', response.action?.data || {});
          }, 1500);
        } else {
          let actionResponse = '';
          switch (response.action.type) {
            case 'check_balance':
              actionResponse = '\n\nYour current balance is RM 3,847.50. You have RM 2,500 in savings.';
              break;
            case 'check_earnings':
              actionResponse = '\n\nThis month you earned RM 5,240 from Grab and RM 1,830 from Foodpanda. Total: RM 7,070.';
              break;
            case 'check_ryscore':
              actionResponse = '\n\nYour RyScore is 720 (Gold Tier). Complete 15 more deliveries to reach Platinum!';
              break;
            case 'check_cashflow':
              actionResponse = '\n\nYour cashflow is healthy! You earned 22% more this week. However, I predict you may be short RM 150 next Tuesday for bills.';
              break;
          }
          if (actionResponse) {
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              return [
                ...prev.slice(0, -1),
                { ...lastMessage, text: lastMessage.text + actionResponse }
              ];
            });
          }
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        text: 'I apologize, but I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        text: 'Speech recognition is not supported in your browser. Please use Chrome or Edge for voice features.'
      }]);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: 'ai',
          text: 'Unable to start voice recognition. Please check your microphone permissions.'
        }]);
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-obsidian-100">
      {/* Header */}
      <div className="bg-obsidian-200 px-6 py-4 border-b" style={{ borderColor: 'var(--white-divider)' }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-obsidian-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white-high" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white-high">Ryse AI</h2>
            <p className="text-white-low text-sm">Your Voice Banking Assistant</p>
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center glow-neon-md"
            style={{ backgroundColor: 'var(--neon-primary)' }}
          >
            <Zap className="w-5 h-5 text-obsidian-100" />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-obsidian">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'ai' && (
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0 glow-neon-sm"
                style={{ backgroundColor: 'var(--neon-primary)' }}
              >
                <Zap className="w-4 h-4 text-obsidian-100" />
              </div>
            )}
            <div
              className={`max-w-[75%] p-4 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-neon text-obsidian-100 rounded-br-sm'
                  : 'bg-obsidian-200 border text-white-high rounded-bl-sm'
              }`}
              style={{ 
                borderColor: message.type === 'ai' ? 'var(--white-divider)' : undefined,
                boxShadow: message.type === 'user' ? 'var(--shadow-neon-sm)' : undefined
              }}
            >
              <p 
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }}
              />
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 bg-obsidian-300 rounded-full flex items-center justify-center ml-2 flex-shrink-0 border" style={{ borderColor: 'var(--white-divider)' }}>
                <span className="text-white-low text-xs font-medium">You</span>
              </div>
            )}
          </div>
        ))}

        {isListening && (
          <div className="flex justify-center">
            <div className="bg-obsidian-200 border rounded-full px-6 py-3 flex items-center gap-3" style={{ borderColor: 'var(--neon-primary)' }}>
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-neon rounded-full animate-pulse"></div>
                <div className="w-1 h-6 bg-neon rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-4 bg-neon rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-white-high text-sm">
                {transcript ? `"${transcript}"` : 'Listening...'}
              </span>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0 glow-neon-sm"
              style={{ backgroundColor: 'var(--neon-primary)' }}
            >
              <Zap className="w-4 h-4 text-obsidian-100" />
            </div>
            <div className="bg-obsidian-200 border rounded-2xl rounded-bl-sm p-4 flex items-center gap-2" style={{ borderColor: 'var(--white-divider)' }}>
              <Loader2 className="w-4 h-4 text-neon animate-spin" />
              <span className="text-white-low text-sm">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              className="px-4 py-2 bg-obsidian-200 border rounded-full text-sm text-white-med whitespace-nowrap hover:bg-obsidian-300 hover:border-neon transition-colors"
              style={{ borderColor: 'var(--white-divider)' }}
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4 pb-4 space-y-3">
        {/* Text Input */}
        <div className="bg-obsidian-200 rounded-full border flex items-center gap-2 p-1" style={{ borderColor: 'var(--white-divider)' }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(inputText);
              }
            }}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-white-high placeholder-white-muted"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all glow-neon-sm"
            style={{ backgroundColor: 'var(--neon-primary)' }}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-obsidian-100 animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-obsidian-100" />
            )}
          </button>
        </div>

        {/* Voice Input Button */}
        <button
          onClick={toggleListening}
          disabled={isLoading}
          className={`w-full h-14 rounded-full flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isListening
              ? 'alert-pattern animate-flicker'
              : 'bg-neon glow-neon-md'
          }`}
        >
          <Mic className={`w-5 h-5 ${isListening ? 'text-obsidian-100' : 'text-obsidian-100'}`} />
          <span className={`font-medium ${isListening ? 'text-obsidian-100' : 'text-obsidian-100'}`}>
            {isListening ? 'Tap to stop' : 'Tap to speak'}
          </span>
        </button>
        
        <div className="flex items-center justify-center gap-2 text-white-muted text-xs">
          <Volume2 className="w-3 h-3" />
          <span>Voice commands are secured with Ryse Shield</span>
        </div>
      </div>
    </div>
  );
}
