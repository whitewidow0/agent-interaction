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
        className="bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 p-4"
      >
        <div className="container max-w-4xl flex gap-4 items-end">
          <IconButton
            type="button"
            variant="ghost"
            className="shrink-0 text-zinc-400 hover:text-zinc-300"
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
                "w-full resize-none bg-zinc-800/50 p-3 focus:outline-none",
                "rounded-lg border border-zinc-700",
                "placeholder:text-zinc-500 text-zinc-100",
                disabled && "opacity-50"
              )}
              style={{ maxHeight: "200px" }}
              disabled={disabled}
            />
          </div>
          <IconButton
            type="submit"
            className={cn(
              "shrink-0",
              !message.trim() || disabled
                ? "text-zinc-600 bg-zinc-800/50"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            )}
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