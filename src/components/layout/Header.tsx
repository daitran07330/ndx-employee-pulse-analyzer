
import { BarChart3 } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">NDX Employee Pulse Analyzer</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
