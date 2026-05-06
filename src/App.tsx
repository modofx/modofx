import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';

type Page = 'home' | 'features' | 'how-it-works' | 'pricing' | 'about' | 'contact' | 'dashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDashboard = currentPage === 'dashboard';

  const renderPage = () => {
    switch (currentPage) {
      case 'home':         return <HomePage onNavigate={navigate} />;
      case 'features':     return <FeaturesPage onNavigate={navigate} />;
      case 'how-it-works': return <HowItWorksPage onNavigate={navigate} />;
      case 'pricing':      return <PricingPage onNavigate={navigate} />;
      case 'about':        return <AboutPage onNavigate={navigate} />;
      case 'contact':      return <ContactPage />;
      case 'dashboard':    return <DashboardPage onNavigate={navigate} />;
      default:             return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      {!isDashboard && <Footer onNavigate={navigate} />}
      {!isDashboard && <BackToTop />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
