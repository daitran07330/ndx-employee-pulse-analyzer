
import { BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ModernHeader = () => {
  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-medium tracking-tight">DADL Viet Name Pulse</h1>
        </div>
        
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard">View Dashboard</Link>
        </Button>
      </div>
    </header>
  );
};

export default ModernHeader;
