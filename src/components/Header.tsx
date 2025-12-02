import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">DermaScan AI</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button 
              asChild 
              variant="ghost" 
              className={isActive("/") ? "text-primary" : "text-muted-foreground"}
            >
              <Link to="/">Home</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className={isActive("/demo") ? "text-primary" : "text-muted-foreground"}
            >
              <Link to="/demo">Demo</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className={isActive("/about") ? "text-primary" : "text-muted-foreground"}
            >
              <Link to="/about">About</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className={isActive("/privacy") ? "text-primary" : "text-muted-foreground"}
            >
              <Link to="/privacy">Privacy</Link>
            </Button>
          </nav>

          {/* CTA Button */}
          <Button asChild className="bg-gradient-primary hover:opacity-90">
            <Link to="/demo">Try Demo</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
