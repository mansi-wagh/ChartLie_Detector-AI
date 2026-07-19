import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FileText, 
  Settings, 
  UploadCloud, 
  LayoutDashboard,
  ShieldCheck,
  BarChart3
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const menus = [
    {
      icon: UploadCloud,
      title: "Verify Chart",
      path: "/"
    },
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      path: "/dashboard"
    },
    {
      icon: FileText,
      title: "History",
      path: "/history"
    },
    {
      icon: BarChart3,
      title: "Reports",
      path: "/reports"
    }
  ];

  return (
    <aside className="flex h-full w-full flex-col border-r border-white/5 bg-[#0a0a0f]/90 px-6 py-8 backdrop-blur-md">
      {/* Brand Header */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        <div>
          <span className="font-sans text-base font-bold tracking-tight text-white">
            ChartLieDetector
          </span>
          <span className="ml-1 text-[10px] font-medium uppercase tracking-wider text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded-full">
            AI
          </span>
        </div>
      </div>

      {/* Menu Links */}
      <nav className="flex-1 space-y-1.5">
        {menus.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `relative flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 group ${
                isActive 
                  ? "text-white bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/10" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02] border border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-4.5 w-4.5 transition-colors duration-300 ${
                  isActive ? "text-violet-400" : "text-slate-400 group-hover:text-slate-200"
                }`} />
                <span>{item.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-1/4 h-1/2 w-1 rounded-r-full bg-gradient-to-b from-violet-500 to-indigo-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Info / Settings */}
      <div className="border-t border-white/5 pt-6">
        <NavLink
          to="/settings"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 group ${
              isActive 
                ? "text-white bg-white/5 border border-white/10" 
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
            }`
          }
        >
          <Settings className="h-4.5 w-4.5 text-slate-400 group-hover:text-slate-200" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}