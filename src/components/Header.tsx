import { Settings, History } from "lucide-react";
import IconButton from "./IconButton";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Agent1
          </span>
        </div>
        <div className="flex items-center gap-2">
          <IconButton variant="ghost" aria-label="History">
            <History className="h-5 w-5" />
          </IconButton>
          <IconButton variant="ghost" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;