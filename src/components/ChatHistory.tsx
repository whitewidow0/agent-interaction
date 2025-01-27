import { Clock } from "lucide-react";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ChatHistoryProps {
  sessions: ChatSession[];
}

const ChatHistory = ({ sessions }: ChatHistoryProps) => {
  return (
    <div className="h-full pt-16">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-100">
          <Clock className="w-5 h-5" />
          Chat History
        </h2>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        {sessions.map((session) => (
          <button
            key={session.id}
            className="w-full text-left p-4 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50"
          >
            <h3 className="font-medium truncate text-zinc-200">{session.title}</h3>
            <p className="text-sm text-zinc-400 truncate">
              {session.lastMessage}
            </p>
            <span className="text-xs text-zinc-500">
              {new Date(session.timestamp).toLocaleDateString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;