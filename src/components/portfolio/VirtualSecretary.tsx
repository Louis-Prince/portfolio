import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Send, X, Bot, User, Calendar, Mail } from 'lucide-react';
import { chatbotResponses, secretarySystemPrompt } from '@/lib/data';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function VirtualSecretary() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: chatbotResponses.greeting,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    message: '',
    duration: '30',
    meetingType: 'google-meet'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpenSecretary = () => {
      setIsOpen(true);
    };

    window.addEventListener('openSecretary', handleOpenSecretary);
    return () => window.removeEventListener('openSecretary', handleOpenSecretary);
  }, []);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('skill') || message.includes('expertise') || message.includes('what can') || message.includes('abilities')) {
      return chatbotResponses.skills;
    } else if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
      return chatbotResponses.portfolio;
    } else if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      return chatbotResponses.contact;
    } else if (message.includes('service') || message.includes('offer') || message.includes('help with')) {
      return chatbotResponses.services;
    } else if (message.includes('available') || message.includes('hire') || message.includes('opportunity')) {
      return chatbotResponses.availability;
    } else if (message.includes('schedule') || message.includes('meeting') || message.includes('appointment') || message.includes('call') || message.includes('book')) {
      setShowAppointmentForm(true);
      return "I'd be happy to help you schedule a meeting with Louis! I can book 15, 30, or 60-minute sessions during business hours (Mon-Fri, 09:00-18:00 Kigali time). Please fill out the appointment form.";
    } else if (message.includes('location') || message.includes('where') || message.includes('based')) {
      return "Louis is based in Kicukiro-Kigali, Rwanda. He's available for both local in-person meetings and remote consultations via Google Meet, Zoom, or phone. What type of meeting would you prefer?";
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Great to meet you. I'm Louis's Portfolio Secretary. I can help you learn about his work, schedule meetings, or answer questions about his services. What would you like to know?";
    } else if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! Is there anything else you'd like to know about Louis's work, or would you like to schedule a consultation?";
    } else if (message.includes('cv') || message.includes('resume') || message.includes('download')) {
      return "Louis's CV and portfolio materials are available in the Communications Materials section on this website. You can download his CV, portfolio collection, and certifications directly. Would you like me to schedule a call to discuss his experience?";
    } else if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
      return "Louis's rates vary depending on the project scope and requirements. I'd recommend scheduling a consultation to discuss your specific needs and get a personalized quote. Shall I book you a call?";
    } else {
      return "That's an interesting question! I can help you learn about Louis's skills, services, availability, or schedule a meeting. You can also download his CV and portfolio materials from this website. What would you like to explore?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleScheduleAppointment = async () => {
    if (!appointmentData.name || !appointmentData.email || !appointmentData.date || !appointmentData.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate appointment scheduling
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Appointment scheduled successfully! Louis will receive your request and send you a confirmation email.');
    
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      text: `Perfect! I've scheduled your ${appointmentData.duration}-minute ${appointmentData.meetingType.replace('-', ' ')} session for ${appointmentData.date} at ${appointmentData.time} (Kigali time). Louis will send you a confirmation email with the meeting details shortly. Is there anything else I can help you with?`,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, confirmationMessage]);
    setShowAppointmentForm(false);
    setAppointmentData({ name: '', email: '', date: '', time: '', message: '', duration: '30', meetingType: 'google-meet' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
        {!isOpen && (
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] z-40 animate-in slide-in-from-bottom-4 duration-300">
          <Card className="h-full flex flex-col shadow-2xl border-slate-200 dark:border-slate-700">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="w-5 h-5" />
                Portfolio Secretary
                <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700">
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white rounded-br-none'
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === 'bot' && <Bot className="w-4 h-4 mt-0.5 text-green-600" />}
                        {message.sender === 'user' && <User className="w-4 h-4 mt-0.5" />}
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg rounded-bl-none shadow-sm">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-green-600" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Appointment Form */}
              {showAppointmentForm && (
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-green-50 dark:bg-green-900/20">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Schedule Appointment</span>
                    </div>
                    <Input
                      placeholder="Your name"
                      value={appointmentData.name}
                      onChange={(e) => setAppointmentData(prev => ({ ...prev, name: e.target.value }))}
                      className="text-sm"
                    />
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={appointmentData.email}
                      onChange={(e) => setAppointmentData(prev => ({ ...prev, email: e.target.value }))}
                      className="text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        value={appointmentData.date}
                        onChange={(e) => setAppointmentData(prev => ({ ...prev, date: e.target.value }))}
                        className="text-sm"
                      />
                      <Input
                        type="time"
                        value={appointmentData.time}
                        onChange={(e) => setAppointmentData(prev => ({ ...prev, time: e.target.value }))}
                        className="text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Select value={appointmentData.duration} onValueChange={(value) => setAppointmentData(prev => ({ ...prev, duration: value }))}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={appointmentData.meetingType} onValueChange={(value) => setAppointmentData(prev => ({ ...prev, meetingType: value }))}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Meeting type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google-meet">Google Meet</SelectItem>
                          <SelectItem value="zoom">Zoom</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="in-person">In-person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      placeholder="Brief message (optional)"
                      value={appointmentData.message}
                      onChange={(e) => setAppointmentData(prev => ({ ...prev, message: e.target.value }))}
                      className="text-sm"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleScheduleAppointment} size="sm" className="flex-1">
                        Schedule
                      </Button>
                      <Button onClick={() => setShowAppointmentForm(false)} variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex gap-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask me anything about Louis..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm" disabled={!inputText.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}