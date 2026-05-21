import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="text-xl font-black italic tracking-tighter text-brand-red">
            HOUSE OF <span className="text-white">MERTUA</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-12">
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.3em] font-bold opacity-70">
            <Link 
              to="/" 
              className={cn(
                "transition-colors hover:text-brand-red",
                location.pathname === "/" && "text-brand-red border-b-2 border-brand-red pb-1"
              )}
            >
              Home
            </Link>
            <a href="#menu" className="hover:text-brand-red transition-colors">Menu</a>
            
          </div>

          
        </div>
      </div>
    </nav>
  );
}
