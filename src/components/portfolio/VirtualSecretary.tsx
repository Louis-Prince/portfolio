import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Calendar,
  Mail,
} from "lucide-react";
import {
  chatbotResponses,
  personalInfo,
  secretarySystemPrompt,
} from "@/lib/data";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function VirtualSecretary() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: chatbotResponses.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
    duration: "30",
    meetingType: "google-meet",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpenSecretary = () => {
      setIsOpen(true);
    };

    window.addEventListener("openSecretary", handleOpenSecretary);
    return () =>
      window.removeEventListener("openSecretary", handleOpenSecretary);
  }, []);

  const { email, phone } = personalInfo;
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    const matches = {
      goals: ["goal", "vision", "aspiration", "future", "ambition", "dream"],
      skills: [
        "skill",
        "expertise",
        "expert in",
        "what can",
        "capabilities",
        "proficient",
        "cybersecurity",
        "machine learning",
        "data science",
        "ai",
        "design",
        "ui/ux",
        "software",
      ],
      projects: [
        "project",
        "built",
        "building",
        "work",
        "portfolio",
        "e-learning",
        "fire protection",
        "face recognition",
        "crop",
        "focusmate",
        "website",
      ],
      contact: [
        "contact",
        "reach",
        "email",
        "phone",
        "instagram",
        "linkedin",
        "github",
        "social",
        "call",
      ],
      services: [
        "service",
        "offer",
        "help with",
        "can you do",
        "do you",
        "develop",
        "consulting",
        "support",
        "build",
        "create",
      ],
      availability: [
        "available",
        "hire",
        "opportunity",
        "freelance",
        "collaboration",
        "internship",
        "job",
        "opening",
      ],
      schedule: [
        "schedule",
        "meeting",
        "appointment",
        "book",
        "time",
        "call",
        "chat",
      ],
      location: ["location", "where", "based", "kigali", "rwanda", "place"],
      downloads: ["cv", "resume", "download", "certification", "certificate"],
      pricing: ["price", "cost", "rate", "budget", "fee", "charge"],
      greeting: [
        "hello",
        "hi",
        "hey",
        "greetings",
        "good morning",
        "good afternoon",
        "good evening",
      ],
      thanks: ["thank", "thanks", "appreciate", "thank you"],
      intro: [
        "who are you",
        "yourself",
        "what are you",
        "assistant",
        "help me",
        "tell me about",
      ],
    };

    const matchesAny = (keys: string[]) =>
      keys.some((key) =>
        matches[key as keyof typeof matches].some((term) =>
          message.includes(term),
        ),
      );

    if (matchesAny(["greeting"])) {
      return "Hello! Great to connect with you. I'm Louis Prince, an IT graduate specializing in cybersecurity, system administration, and intelligent systems. I enjoy building secure, scalable solutions that solve real-world problems. What can I help you with?";
    }

    if (matchesAny(["intro"])) {
      return "I'm Louis Prince, an IT graduate from University of Rwanda with strong expertise in cybersecurity, networking, and programming. I combine technical skills with real-world experience from internships and certifications. Ask me about my projects, skills, or how I can help with your tech challenges.";
    }

    if (matchesAny(["goals"])) {
      return chatbotResponses.goals;
    }

    if (matchesAny(["skills"])) {
      return chatbotResponses.skills;
    }

    if (matchesAny(["projects"])) {
      return chatbotResponses.projects;
    }

    if (matchesAny(["contact"])) {
      return chatbotResponses.contact;
    }

    if (matchesAny(["downloads"])) {
      return "My CV, portfolio, and certifications are available in the Communications Materials section. You can download everything directly there. If you'd like, I can also connect you via email or phone. What would you like to discuss?";
    }

    if (matchesAny(["pricing"])) {
      return "Rates depend on the project scope, complexity, and timeline. I'd recommend a short consultation so I can understand your needs and provide a tailored quote. Would you like to schedule a call?";
    }

    if (matchesAny(["services"])) {
      return chatbotResponses.services;
    }

    if (matchesAny(["availability"])) {
      return chatbotResponses.availability;
    }

    if (matchesAny(["schedule"])) {
      setShowAppointmentForm(true);
      return "Perfect! I can help you schedule a 15, 30, or 60-minute consultation during business hours (Mon-Fri, 09:00-18:00 Kigali time). Please fill out the form and I'll take care of the rest.";
    }

    if (matchesAny(["location"])) {
      return "I'm based in Kicukiro-Kigali, Rwanda. I work with teams globally and can handle remote consultations via Google Meet, Zoom, or phone, plus in-person meetings when it makes sense.";
    }

    if (matchesAny(["thanks"])) {
      return "You're welcome! Ask me anything else about my work, expertise, or let's get you scheduled for a conversation. How else can I assist?";
    }

    return `That's a great question! I can help you learn about my skills in cybersecurity, AI, system administration, and full-stack development, or connect you directly via email at ${email} or phone at ${phone}. What would you like to ask next?`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleScheduleAppointment = async () => {
    if (
      !appointmentData.name ||
      !appointmentData.email ||
      !appointmentData.date ||
      !appointmentData.time
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate appointment scheduling
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(
      "Appointment scheduled successfully! GATAMBA Louis Prince will receive your request and send you a confirmation email.",
    );

    const confirmationMessage: Message = {
      id: Date.now().toString(),
      text: `Perfect! I've scheduled your ${appointmentData.duration}-minute ${appointmentData.meetingType.replace("-", " ")} session for ${appointmentData.date} at ${appointmentData.time} (Kigali time). GATAMBA Louis Prince will send you a confirmation email with the meeting details shortly. Is there anything else I can help you with?`,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, confirmationMessage]);
    setShowAppointmentForm(false);
    setAppointmentData({
      name: "",
      email: "",
      date: "",
      time: "",
      message: "",
      duration: "30",
      meetingType: "google-meet",
    });
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
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
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
                Louis Prince — Portfolio Assistant
                <Badge
                  variant="secondary"
                  className="ml-auto bg-green-100 text-green-700"
                >
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 space-y-3">
                <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                  GATAMBA Louis Prince — IT Graduate specializing in
                  cybersecurity, AI, and system administration.
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="secondary">
                    <a
                      href={`mailto:${email}`}
                      className="block"
                      title={`Email: ${email}`}
                      aria-label={`Email: ${email}`}
                    >
                      Email
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a
                      href={phoneHref}
                      className="block"
                      title={`Call: ${phone}`}
                      aria-label={`Call: ${phone}`}
                    >
                      Call
                    </a>
                  </Button>
                </div>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900 min-h-0 scroll-smooth">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-green-600 text-white rounded-br-none"
                          : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === "bot" && (
                          <Bot className="w-4 h-4 mt-0.5 text-green-600" />
                        )}
                        {message.sender === "user" && (
                          <User className="w-4 h-4 mt-0.5" />
                        )}
                        <p className="text-sm leading-relaxed">
                          {message.text}
                        </p>
                      </div>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
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
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
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
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        Schedule Appointment
                      </span>
                    </div>
                    <Input
                      placeholder="Your name"
                      value={appointmentData.name}
                      onChange={(e) =>
                        setAppointmentData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="text-sm"
                    />
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={appointmentData.email}
                      onChange={(e) =>
                        setAppointmentData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        value={appointmentData.date}
                        onChange={(e) =>
                          setAppointmentData((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                        className="text-sm"
                      />
                      <Input
                        type="time"
                        value={appointmentData.time}
                        onChange={(e) =>
                          setAppointmentData((prev) => ({
                            ...prev,
                            time: e.target.value,
                          }))
                        }
                        className="text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={appointmentData.duration}
                        onValueChange={(value) =>
                          setAppointmentData((prev) => ({
                            ...prev,
                            duration: value,
                          }))
                        }
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={appointmentData.meetingType}
                        onValueChange={(value) =>
                          setAppointmentData((prev) => ({
                            ...prev,
                            meetingType: value,
                          }))
                        }
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Meeting type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google-meet">
                            Google Meet
                          </SelectItem>
                          <SelectItem value="zoom">Zoom</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="in-person">In-person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      placeholder="Brief message (optional)"
                      value={appointmentData.message}
                      onChange={(e) =>
                        setAppointmentData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="text-sm"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleScheduleAppointment}
                        size="sm"
                        className="flex-1"
                      >
                        Schedule
                      </Button>
                      <Button
                        onClick={() => setShowAppointmentForm(false)}
                        variant="outline"
                        size="sm"
                      >
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
                    placeholder="Ask about my skills, projects, experience, or schedule a call..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    disabled={!inputText.trim()}
                  >
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
