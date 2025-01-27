import { useState } from "react";
import Header from "@/components/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const simulateResponse = async (userMessage: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
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

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
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
      <div className="fixed bottom-0 left-0 right-0">
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
};

export default Index;