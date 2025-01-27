import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import ChatHistory from "@/components/ChatHistory";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "First Chat",
      lastMessage: "Hello there!",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Another Chat",
      lastMessage: "How can I help?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const simulateResponse = async (userMessage: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const response = `I received your message: "${userMessage}". This is a simulated response.`;
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: response,
        isUser: false,
        timestamp: new Date().toISOString(),
      },
    ]);
    setIsLoading(false);
  };

  const handleSend = async (message: string) => {
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    await simulateResponse(message);
  };

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading, messages]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="relative">
        <CollapsibleTrigger className="absolute right-0 top-8 z-50 h-8 w-8 -mr-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
          <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="w-80 border-r border-border/40 glass-dark">
          <ChatHistory sessions={chatSessions} />
        </CollapsibleContent>
      </Collapsible>
      <div className={`flex-1 flex flex-col transition-all ${isOpen ? 'ml-80' : 'ml-0'}`}>
        <Header />
        <main className="flex-1 overflow-hidden pt-16 pb-[76px]">
          <div className="container h-full">
            <div className="flex h-full flex-col overflow-y-auto py-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
              {isLoading && (
                <div className="px-4 py-2">
                  <div className="typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <div className={`fixed bottom-0 transition-all ${isOpen ? 'left-80' : 'left-0'} right-0`}>
          <ChatInput onSend={handleSend} disabled={isLoading} ref={inputRef} />
        </div>
      </div>
    </div>
  );
};

export default Index;