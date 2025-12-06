import { useState, useRef, useEffect } from 'react';
import { Screen } from '../App';
import { ArrowLeft, Mic, Volume2, Sparkles, Send, Loader2 } from 'lucide-react';
import { RyseLogo } from './RyseLogo';
import { BottomNav } from './BottomNav';
import { chatWithGemini } from '../services/geminiService';

// TypeScript declarations for Speech Recognition API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
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
  navigateTo: (screen: Screen, data?: any) => void;
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
    // Check if browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // You can change to 'zh-CN' for Chinese

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
        // Auto-send when final transcript is received
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

  // Auto scroll to bottom when new messages arrive
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

    // Add user message
    const newUserMessage: Message = { id: Date.now(), type: 'user', text: userMessage };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Build conversation history for Gemini
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' as const : 'ai' as const,
        text: msg.text,
      }));

      // Call Gemini AI
      const response = await chatWithGemini(userMessage, conversationHistory);

      // Add AI response
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: response.message }]);

      // Handle actions
      if (response.action) {
        if (response.action.type === 'transfer' && response.action.data) {
          // If amount is provided, check if it exceeds balance
          if (response.action.data.amount) {
            const transferAmount = parseFloat(response.action.data.amount || '0');
            const currentBalance = 3847.50; // Current balance from dashboard
            
            if (transferAmount > currentBalance) {
              // Show error message in English
              setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'ai',
                text: `Your balance is insufficient. Your current balance is RM ${currentBalance.toFixed(2)}, but you're trying to transfer RM ${transferAmount.toFixed(2)}. Please top up your account to complete this transaction.`
              }]);
              return;
            }
          }
          
          // Navigate directly to transaction screen with pre-filled data (if any)
          setTimeout(() => {
            navigateTo('transaction', {
              amount: response.action.data?.amount || '',
              recipient: response.action.data?.recipient || '',
            });
          }, 1500);
        } else if (response.action.type === 'apply_loan') {
          // Navigate to loan application screen with loan amount if provided
          // The LoanApplicationScreen will handle showing error if amount exceeds limit
          setTimeout(() => {
            navigateTo('loan', response.action.data || {});
          }, 1500);
        } else {
          // Handle other actions (balance, earnings, etc.)
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
      // Stop listening
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Start listening
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
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white">Ryse AI</h2>
            <p className="text-purple-200 text-sm">Your Voice Banking Assistant</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'ai' && (
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            )}
            <div
              className={`max-w-[70%] p-4 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-tr-sm'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
              }`}
            >
              <p 
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }}
              />
            </div>
            {message.type === 'user' && (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                <span className="text-white">AR</span>
              </div>
            )}
          </div>
        ))}

        {isListening && (
          <div className="flex justify-center">
            <div className="bg-purple-100 border border-purple-200 rounded-2xl px-6 py-3 flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-purple-700 text-sm">
                {transcript ? `Listening: "${transcript}"` : 'Listening...'}
              </span>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
              <span className="text-gray-600 text-sm">Ryse AI is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-4">
        <p className="text-gray-600 text-sm mb-3">Quick actions:</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 whitespace-nowrap hover:bg-gray-50"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Text Input */}
      <div className="px-6 pb-4">
        <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-lg flex items-center gap-2">
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
            className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Voice Input Button */}
      <div className="px-6 pb-24">
        <button
          onClick={toggleListening}
          disabled={isLoading}
          className={`w-full h-16 rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isListening
              ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
              : 'bg-gradient-to-r from-purple-500 to-blue-500'
          } shadow-xl`}
        >
          <Mic className="w-6 h-6 text-white" />
          <span className="text-white">
            {isListening ? 'Listening...' : 'Tap to speak'}
          </span>
        </button>
        
        <div className="mt-3 flex items-center justify-center gap-2 text-gray-500 text-xs">
          <Volume2 className="w-4 h-4" />
          <span>Voice commands are secured with Ryse Shield</span>
        </div>
      </div>

      <BottomNav currentScreen="voice" navigateTo={navigateTo} />
    </div>
  );
}