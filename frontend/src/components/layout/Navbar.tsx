import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const location = useLocation();

  // Determine current page context title
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Verify Chart";
      case "/dashboard":
        return "Analysis Dashboard";
      case "/history":
        return "Analysis History";
      case "/reports":
        return "Compliance Analytics";
      case "/settings":
        return "Settings";
      default:
        return "ChartLieDetector AI";
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#07070a]/70 px-6 backdrop-blur-md">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <h2 className="text-sm font-semibold tracking-tight text-white lg:text-base">
          {getPageTitle()}
        </h2>
      </div>


    </header>
  );
}