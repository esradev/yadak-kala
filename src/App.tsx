import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LiveChatWidget } from './components/LiveChatWidget';
import { CarSelectorModal } from './components/CarSelectorModal';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { FAQPage } from './pages/FAQPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostDetailPage } from './pages/BlogPostDetailPage';

const MainContent: React.FC = () => {
  const { page } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'catalog':
        return <CatalogPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'order-history':
        return <OrderHistoryPage />;
      case 'profile':
        return <UserProfilePage />;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactUsPage />;
      case 'faq':
        return <FAQPage />;
      case 'blog':
        return <BlogPage />;
      case 'blog-detail':
        return <BlogPostDetailPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* Toast Notification Layer */}
      <Toast />

      {/* Global Garage Modal */}
      <CarSelectorModal />

      {/* Sticky Header */}
      <Header />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Persian Footer */}
      <Footer />

      {/* Real-time Technical Live Chat Widget */}
      <LiveChatWidget />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
