import { cn } from "@/lib/utils";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import IconButton from "./IconButton";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: string;
}

const ChatMessage = ({ content, isUser, timestamp }: ChatMessageProps) => {
  const [showActions, setShowActions] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard",
    });
  };

  return (
    <div
      className={cn(
        "group flex w-full items-start gap-4 px-4 py-2 animate-fade-in",
        isUser ? "flex-row-reverse" : ""
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md",
          isUser ? "bg-chat-user" : "glass-dark"
        )}
      >
        <span className="text-sm">{isUser ? "You" : "AI"}</span>
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <div
          className={cn(
            "relative rounded-lg px-4 py-3 transition-all",
            isUser
              ? "bg-chat-user text-chat-user-foreground"
              : "glass-dark text-chat-ai-foreground"
          )}
        >
          <p className="whitespace-pre-wrap break-words">{content}</p>
          {!isUser && showActions && (
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <IconButton
                variant="ghost"
                className="h-8 w-8"
                onClick={handleCopy}
                aria-label="Copy message"
              >
                <Copy className="h-4 w-4" />
              </IconButton>
              <IconButton
                variant="ghost"
                className="h-8 w-8"
                aria-label="Thumbs up"
              >
                <ThumbsUp className="h-4 w-4" />
              </IconButton>
              <IconButton
                variant="ghost"
                className="h-8 w-8"
                aria-label="Thumbs down"
              >
                <ThumbsDown className="h-4 w-4" />
              </IconButton>
            </div>
          )}
        </div>
        <span className="text-xs text-muted-foreground px-4">
          {new Date(timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;