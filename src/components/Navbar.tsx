import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { label: 'Features', page: 'features' },
  { label: 'How It Works', page: 'how-it-works' },
  { label: 'Pricing', page: 'pricing' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
          >
            {/* SVG ModofX logo mark: | X | — two vertical bars flanking a crossing X */}
            <svg width="40" height="38" viewBox="0 0 110 104" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Left side: blue top → violet bottom */}
                <linearGradient id="mfxBarL" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6"/>
                  <stop offset="100%" stopColor="#7C3AED"/>
                </linearGradient>
                {/* Right side: orange top → red bottom */}
                <linearGradient id="mfxBarR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316"/>
                  <stop offset="100%" stopColor="#EF4444"/>
                </linearGradient>
                {/* Left-leaning diagonal of X: blue top-left → violet/red bottom-right */}
                <linearGradient id="mfxDiag1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3B82F6"/>
                  <stop offset="50%" stopColor="#9333EA"/>
                  <stop offset="100%" stopColor="#EF4444"/>
                </linearGradient>
                {/* Right-leaning diagonal of X: orange top-right → red bottom-left */}
                <linearGradient id="mfxDiag2" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316"/>
                  <stop offset="50%" stopColor="#EF4444"/>
                  <stop offset="100%" stopColor="#9333EA"/>
                </linearGradient>
              </defs>
              {/* Left vertical bar: y=8 to y=92 */}
              <rect x="5" y="8" width="14" height="84" rx="6" fill="url(#mfxBarL)"/>
              {/* Right vertical bar: y=8 to y=92 */}
              <rect x="91" y="8" width="14" height="84" rx="6" fill="url(#mfxBarR)"/>
              {/* X diagonals: strokeWidth=14, butt caps, inner coords inset by 7 so visual edge = y8..y92 */}
              <line x1="29" y1="15" x2="81" y2="85" stroke="url(#mfxDiag1)" strokeWidth="14" strokeLinecap="butt"/>
              <line x1="81" y1="15" x2="29" y2="85" stroke="url(#mfxDiag2)" strokeWidth="14" strokeLinecap="butt"/>
            </svg>
            <span className="text-xl font-bold text-white tracking-tight">
              Modof<span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">X</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === link.page
                    ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleNav('dashboard')}
              className="btn-ghost text-sm"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="btn-primary text-sm py-2"
            >
              Get Started
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass border-t border-neutral-200 dark:border-neutral-700 px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => handleNav(link.page)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === link.page
                  ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button onClick={() => handleNav('dashboard')} className="btn-secondary text-sm w-full justify-center">
              Dashboard
            </button>
            <button onClick={() => handleNav('contact')} className="btn-primary text-sm w-full justify-center">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
