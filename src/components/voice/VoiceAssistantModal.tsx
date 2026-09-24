'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Globe, 
  X, 
  Sparkles, 
  Send, 
  MessageSquare,
  Radio,
  CornerDownLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SupportedLanguage = 'en' | 'te' | 'hi' | 'ta' | 'kn';

interface Message {
  id: string;
  sender: 'user' | 'nexus';
  text: string;
  timestamp: string;
}

const LANGUAGES: { code: SupportedLanguage; name: string; nativeName: string; speechCode: string; samplePrompt: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-IN', samplePrompt: 'Where is the nearest safe shelter for Kurla flood?' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN', samplePrompt: 'వరద బాధితులకు సమీప సహాయ శిబిరం ఎక్కడ ఉంది?' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechCode: 'hi-IN', samplePrompt: 'बाढ़ से बचने के लिए निकटतम राहत केंद्र कहाँ है?' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN', samplePrompt: 'வெள்ள அபாயத்தில் இருந்து தப்பிக்க பாதுகாப்பான முகாம் எங்குள்ளது?' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechCode: 'kn-IN', samplePrompt: 'ಪ್ರವಾಹದಿಂದ ರಕ್ಷಿಸಲು ಹತ್ತಿರದ ನಿರಾಶ್ರಿತರ ಕೇಂದ್ರ ಎಲ್ಲಿದೆ?' },
];

export default function VoiceAssistantModal({ isOpen, onClose }: VoiceAssistantModalProps) {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('en');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'nexus',
      text: 'NEXUS Emergency Voice Dispatch online. How can I assist your safety? You can speak in English, Telugu, Hindi, Tamil, or Kannada.',
      timestamp: 'Just now'
    }
  ]);

  const recognitionRef = useRef<any>(null);

  // Initialize SpeechRecognition if available in browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        
        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');
          setInputText(transcript);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInputText('');
      const currLang = LANGUAGES.find(l => l.code === selectedLang);
      if (recognitionRef.current) {
        recognitionRef.current.lang = currLang?.speechCode || 'en-IN';
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.warn('SpeechRecognition start error, falling back to simulated prompt');
          simulateVoiceInput();
        }
      } else {
        simulateVoiceInput();
      }
    }
  };

  const simulateVoiceInput = () => {
    setIsListening(true);
    const currLang = LANGUAGES.find(l => l.code === selectedLang);
    setTimeout(() => {
      setInputText(currLang?.samplePrompt || 'Emergency help requested');
      setIsListening(false);
    }, 2200);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputText;
    setInputText('');

    // Generate Multilingual Response
    setTimeout(() => {
      let reply = '';
      if (selectedLang === 'te') {
        reply = 'కుర్లా వరద జోన్ కోసం సమీప ఆశ్రయం "డాన్ బాస్కో రిలీఫ్ సెంటర్" (Don Bosco Relief Center). ఇది 1.2 కిమీ దూరంలో ఉంది, 390 పడకలు మరియు తాగునీరు సిద్ధంగా ఉన్నాయి. అంబులెన్స్ A-12 మార్గంలో ఉంది.';
      } else if (selectedLang === 'hi') {
        reply = 'कुर्ला बाढ़ क्षेत्र के लिए निकटतम सुरक्षित आश्रय "डॉन बॉस्को रिलीफ सेंटर" (Don Bosco Shelter) है। यह 1.2 किमी की दूरी पर है। एम्बुलेंस A-12 और एनडीआरएफ नाव दल वहां पहुंच रहे हैं।';
      } else if (selectedLang === 'ta') {
        reply = 'வெள்ளப் பகுதிக்கான பாதுகாப்பான நிவாரண மையம் "டான் போஸ்கோ மையம்" (Don Bosco Center). இது 1.2 கிமீ தூரத்தில் உள்ளது. மருத்துவ உதவி மற்றும் குடிநீர் வசதிகள் தயாராக உள்ளன.';
      } else if (selectedLang === 'kn') {
        reply = 'ಪ್ರವಾಹ ಪ್ರದೇಶಕ್ಕೆ ಹತ್ತಿರದ ಸುರಕ್ಷಿತ ಶಿಬಿರ "ಡಾನ್ ಬಾಸ್ಕೊ ರಿಲೀಫ್ ಸೆಂಟರ್" (Don Bosco Shelter). ಇದು 1.2 ಕಿಮೀ ದೂರದಲ್ಲಿದೆ. ಆಂಬ್ಯುಲೆನ್ಸ್ A-12 ಹೊರಟಿದೆ.';
      } else {
        reply = 'The nearest designated safe sanctuary for the Kurla Flash Flood is Don Bosco Relief Center S-02, located 1.2 km north via elevated transit. 390 beds and emergency water purification are ready. Ambulance A-12 is en route.';
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'nexus',
        text: reply,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMsg]);
      speakText(reply, selectedLang);
    }, 800);
  };

  const speakText = (text: string, lang: SupportedLanguage) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const currLang = LANGUAGES.find(l => l.code === lang);
      utterance.lang = currLang?.speechCode || 'en-IN';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel w-full max-w-2xl rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl flex flex-col h-[600px]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-navy-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                NEXUS AI Multilingual Voice Assistant
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-cyan-300">
                  REAL-TIME DISPATCH
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Voice-guided triage in English, Telugu, Hindi, Tamil, and Kannada
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Tabs */}
        <div className="px-6 py-2.5 bg-navy-950 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="text-xs font-mono text-slate-400 mr-2 flex-shrink-0">DIALECT:</span>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => setSelectedLang(l.code)}
              className={`px-3 py-1 rounded-lg text-xs font-heading font-medium transition-all flex-shrink-0 ${
                selectedLang === l.code
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                  : 'bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400'
              }`}
            >
              {l.name} <span className="opacity-70 text-[10px]">({l.nativeName})</span>
            </button>
          ))}
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-navy-900/90 border border-slate-700/80 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-70 mb-1 font-mono">
                  <span>{m.sender === 'user' ? 'CITIZEN' : 'NEXUS COMMAND'}</span>
                  <span>{m.timestamp}</span>
                </div>
                <p>{m.text}</p>
                {m.sender === 'nexus' && (
                  <button
                    onClick={() => speakText(m.text, selectedLang)}
                    className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-300 font-mono"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Speak Audio
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Dynamic Audio Waveform during voice input */}
          {isListening && (
            <div className="flex items-center space-x-2 p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl">
              <span className="text-xs font-mono text-cyan-400 animate-pulse">LISTENING...</span>
              <div className="flex items-center space-x-1 h-6">
                {[40, 70, 90, 60, 100, 50, 80, 45, 95, 30].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ['20%', `${h}%`, '20%'] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.08 }}
                    className="w-1 bg-cyan-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar & Mic Trigger */}
        <div className="p-4 bg-navy-900/80 border-t border-slate-800 flex items-center gap-3">
          <button
            onClick={toggleListening}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
              isListening
                ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse'
                : 'bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
            }`}
            title="Toggle Microphone"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask in ${LANGUAGES.find(l => l.code === selectedLang)?.name}... (e.g. "${LANGUAGES.find(l => l.code === selectedLang)?.samplePrompt}")`}
              className="w-full bg-navy-950/90 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition-all flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
