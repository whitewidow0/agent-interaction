import { cn } from "@/lib/utils";
import { Paperclip, Send } from "lucide-react";
import { forwardRef, useRef, useState } from "react";
import IconButton from "./IconButton";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ onSend, disabled }, ref) => {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (message.trim() && !disabled) {
        onSend(message);
        setMessage("");
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      setMessage(textarea.value);
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="glass-dark border-t border-border/40 p-4"
      >
        <div className="container flex gap-4 items-end">
          <IconButton
            type="button"
            variant="ghost"
            className="shrink-0"
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </IconButton>
          <div className="relative flex-1">
            <textarea
              ref={(element) => {
                textareaRef.current = element;
                if (typeof ref === "function") {
                  ref(element);
                } else if (ref) {
                  ref.current = element;
                }
              }}
              value={message}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Message Agent1..."
              rows={1}
              className={cn(
                "w-full resize-none bg-transparent p-3 focus:outline-none",
                "rounded-lg border border-border/40",
                "placeholder:text-muted-foreground",
                disabled && "opacity-50"
              )}
              style={{ maxHeight: "200px" }}
              disabled={disabled}
            />
          </div>
          <IconButton
            type="submit"
            className="shrink-0"
            disabled={!message.trim() || disabled}
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </IconButton>
        </div>
      </form>
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;