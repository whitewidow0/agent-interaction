import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import ChatHistory from "@/components/ChatHistory";

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
    // Simulate API delay
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

  // Focus input after sending message
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading, messages]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="w-80 border-r border-border/40 glass-dark">
        <ChatHistory sessions={chatSessions} />
      </div>
      <div className="flex-1 flex flex-col">
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
        <div className="fixed bottom-0 left-80 right-0">
          <ChatInput onSend={handleSend} disabled={isLoading} ref={inputRef} />
        </div>
      </div>
    </div>
  );
};

export default Index;