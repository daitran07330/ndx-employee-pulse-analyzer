
import { BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-8">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-medium tracking-tight">NDX Pulse</h1>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Take Survey
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/dashboard" className={navigationMenuTriggerStyle()}>
                Dashboard
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
