import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <button onClick={() => handleNav('home')} className="flex items-center gap-2 mb-4 group">
              <svg width="40" height="38" viewBox="0 0 110 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="ftrBarL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="100%" stopColor="#7C3AED"/>
                  </linearGradient>
                  <linearGradient id="ftrBarR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F97316"/>
                    <stop offset="100%" stopColor="#EF4444"/>
                  </linearGradient>
                  <linearGradient id="ftrDiag1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="50%" stopColor="#9333EA"/>
                    <stop offset="100%" stopColor="#EF4444"/>
                  </linearGradient>
                  <linearGradient id="ftrDiag2" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F97316"/>
                    <stop offset="50%" stopColor="#EF4444"/>
                    <stop offset="100%" stopColor="#9333EA"/>
                  </linearGradient>
                </defs>
                <rect x="5" y="8" width="14" height="84" rx="6" fill="url(#ftrBarL)"/>
                <rect x="91" y="8" width="14" height="84" rx="6" fill="url(#ftrBarR)"/>
                <line x1="29" y1="15" x2="81" y2="85" stroke="url(#ftrDiag1)" strokeWidth="14" strokeLinecap="butt"/>
                <line x1="81" y1="15" x2="29" y2="85" stroke="url(#ftrDiag2)" strokeWidth="14" strokeLinecap="butt"/>
              </svg>
              <span className="text-xl font-bold text-white tracking-tight">
                Modof<span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">X</span>
              </span>
            </button>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              AI-powered accounting automation for Tally ERP and modern ERP systems. Streamline your invoice workflows.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                { label: 'Features', page: 'features' },
                { label: 'How It Works', page: 'how-it-works' },
                { label: 'Pricing', page: 'pricing' },
                { label: 'Dashboard', page: 'dashboard' },
              ].map(item => (
                <li key={item.page}>
                  <button
                    onClick={() => handleNav(item.page)}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', page: 'about' },
                { label: 'Contact', page: 'contact' },
                { label: 'Blog', page: 'home' },
                { label: 'Careers', page: 'home' },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNav(item.page)}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:support@modofx.com" className="hover:text-white transition-colors">support@modofx.com</a>
              </li>
              <li className="text-sm text-neutral-400">
                Chennai, Tamil Nadu · Redhills, 600067
              </li>
            </ul>
            <button
              onClick={() => handleNav('contact')}
              className="mt-4 btn-primary text-sm py-2"
            >
              Request Demo
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} ModofX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
