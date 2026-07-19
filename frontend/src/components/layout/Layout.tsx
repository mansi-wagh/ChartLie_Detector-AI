import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen w-full bg-[#07070a] text-slate-100 overflow-x-hidden">
      {/* Desktop Sidebar (Permanent left column) */}
      <div className="hidden lg:block lg:w-64 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen">
        <Sidebar />
      </div>

      {/* Mobile Drawer Navigation (Slide-over overlay using Framer Motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            {/* Sliding drawer panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-72 lg:hidden"
            >
              <Sidebar onClose={closeMobileMenu} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Workspace Pane */}
      <div className="flex flex-1 flex-col min-w-0">
        <Navbar onMenuToggle={toggleMobileMenu} />

        <main className="flex-1 px-4 py-8 sm:px-6 md:px-8">
          <div className="mx-auto max-w-6xl w-full">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}