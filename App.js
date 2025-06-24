import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Your actual logo image URL
const LOGO_URL = "data:image/png;base64,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";

const TripNTravelHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing experience! Trip N Travel made our honeymoon unforgettable. Professional service and great value.",
      initials: "SJ"
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Best travel agency I've ever used. They found us the perfect luxury resort at an unbeatable price.",
      initials: "MC"
    },
    {
      name: "Emma Rodriguez",
      rating: 5,
      text: "Excellent customer support and handpicked destinations. Our family vacation was perfect!",
      initials: "ER"
    }
  ];

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API}/packages`);
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus(''), 3000);
    } catch (error) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus(''), 3000);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-50 nav-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="brand-logo">
                <img 
                  src={LOGO_URL} 
                  alt="Trip N Travel Logo" 
                  className="logo-image"
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <button onClick={() => scrollToSection('home')} className="nav-link text-primary hover:text-accent px-3 py-2 text-sm font-semibold">Home</button>
                <div className="relative group">
                  <button className="nav-link text-primary hover:text-accent px-3 py-2 text-sm font-semibold flex items-center">
                    Holiday Packages
                    <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="dropdown-menu">
                    <div className="py-2">
                      <a href="#" className="dropdown-item">All Inclusive</a>
                      <a href="#" className="dropdown-item">Budget Friendly</a>
                      <a href="#" className="dropdown-item">Last Minute</a>
                      <a href="#" className="dropdown-item">Luxury</a>
                    </div>
                  </div>
                </div>
                <button onClick={() => scrollToSection('packages')} className="nav-link text-primary hover:text-accent px-3 py-2 text-sm font-semibold">Destinations</button>
                <button onClick={() => scrollToSection('packages')} className="nav-link text-primary hover:text-accent px-3 py-2 text-sm font-semibold">Top Deals</button>
                <button onClick={() => scrollToSection('contact')} className="nav-link text-primary hover:text-accent px-3 py-2 text-sm font-semibold">Inquiry</button>
                <button onClick={() => scrollToSection('about')} className="nav-link text-primary hover:text-accent px-3 py-2 text-sm font-semibold">About</button>
                <button onClick={() => scrollToSection('contact')} className="nav-link text-primary hover:text-accent px-3 py-2 text-sm font-semibold">Contact</button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-primary hover:text-accent focus:outline-none focus:text-accent"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <button onClick={() => scrollToSection('home')} className="text-primary hover:text-accent block px-3 py-2 text-base font-medium w-full text-left">Home</button>
                <button onClick={() => scrollToSection('packages')} className="text-primary hover:text-accent block px-3 py-2 text-base font-medium w-full text-left">Holiday Packages</button>
                <button onClick={() => scrollToSection('packages')} className="text-primary hover:text-accent block px-3 py-2 text-base font-medium w-full text-left">Destinations</button>
                <button onClick={() => scrollToSection('packages')} className="text-primary hover:text-accent block px-3 py-2 text-base font-medium w-full text-left">Top Deals</button>
                <button onClick={() => scrollToSection('contact')} className="text-primary hover:text-accent block px-3 py-2 text-base font-medium w-full text-left">Inquiry</button>
                <button onClick={() => scrollToSection('about')} className="text-primary hover:text-accent block px-3 py-2 text-base font-medium w-full text-left">About</button>
                <button onClick={() => scrollToSection('contact')} className="text-primary hover:text-accent block px-3 py-2 text-base font-medium w-full text-left">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center hero-section">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586500036065-bdaeac7a4feb')`,
          }}
        >
          <div className="hero-overlay"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <h1 className="hero-title">
            Explore the World with Trip N Travel
          </h1>
          <p className="hero-subtitle">
            Unforgettable holidays, unbeatable prices
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
            <button 
              onClick={() => scrollToSection('packages')}
              className="btn-primary"
            >
              View Packages
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-secondary"
            >
              Send Inquiry
            </button>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section id="about" className="why-book-section">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title">Why Book With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card">
              <div className="feature-icon trusted-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="feature-title">Trusted by Thousands</h3>
              <p className="feature-description">Over 50,000 satisfied customers trust our travel expertise</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon handpicked-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="feature-title">Handpicked Deals</h3>
              <p className="feature-description">Carefully selected destinations and accommodations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon support-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.4 0-2.72-.35-3.88-.97L7 19.5l.47-1.12C6.85 17.72 6.5 16.4 6.5 15c0-3.03 2.47-5.5 5.5-5.5s5.5 2.47 5.5 5.5S15.03 20.5 12 20.5z"/>
                </svg>
              </div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">Round-the-clock customer support for your peace of mind</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon price-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.42 0 2.13.54 2.17 1.4h1.75c-.05-1.44-1.02-2.77-2.92-3.21V3h-2v2.09c-1.68.34-2.85 1.34-2.85 2.91 0 1.85 1.27 2.59 3.65 3.21 2.5.65 3 1.41 3 2.35 0 .81-.58 1.65-2.61 1.65-1.72 0-2.44-.56-2.5-1.4H5.44c.04 1.68 1.26 2.83 3.01 3.19V19h2v-2.15c1.95-.37 3.09-1.41 3.09-3.05 0-2.34-1.93-2.98-3.72-3.81z"/>
                </svg>
              </div>
              <h3 className="feature-title">Best Price Guarantee</h3>
              <p className="feature-description">We match any competitor's price or refund the difference</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section id="packages" className="packages-section">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title text-white">Featured Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package-image-container">
                  <img 
                    src={pkg.image_url} 
                    alt={pkg.destination}
                    className="package-image"
                  />
                  <div className="package-overlay">
                    <span className="package-rating">
                      {[...Array(pkg.hotel_rating)].map((_, i) => (
                        <span key={i} className="star">⭐</span>
                      ))}
                    </span>
                  </div>
                </div>
                <div className="package-content">
                  <h3 className="package-title">{pkg.destination}</h3>
                  <p className="package-description">{pkg.description}</p>
                  <p className="package-duration">{pkg.duration}</p>
                  <div className="package-pricing">
                    <span className="package-price">${pkg.price_per_person}</span>
                    <span className="package-per-person">per person</span>
                  </div>
                  <button className="btn-package">
                    View Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews-section">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="review-container">
            <div className="review-card">
              <div className="reviewer-avatar">
                <span className="avatar-text">{reviews[currentReview].initials}</span>
              </div>
              <div className="review-stars">
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <span key={i} className="review-star">⭐</span>
                ))}
              </div>
              <p className="review-text">"{reviews[currentReview].text}"</p>
              <p className="reviewer-name">- {reviews[currentReview].name}</p>
            </div>
            <div className="review-navigation">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`review-dot ${index === currentReview ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="newsletter-title">Get the Best Holiday Deals in Your Inbox</h2>
          <p className="newsletter-subtitle">Subscribe to receive exclusive offers and travel inspiration</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="newsletter-input"
              required
            />
            <button 
              type="submit"
              className="newsletter-button"
            >
              Subscribe Now
            </button>
          </form>
          {newsletterStatus === 'success' && (
            <p className="newsletter-success">Successfully subscribed to our newsletter!</p>
          )}
          {newsletterStatus === 'error' && (
            <p className="newsletter-error">Email already subscribed or error occurred.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="footer-brand">
                <div className="footer-logo">
                  <img 
                    src={LOGO_URL} 
                    alt="Trip N Travel Logo" 
                    className="footer-logo-image"
                  />
                </div>
                <p className="footer-description">Your trusted partner for unforgettable travel experiences worldwide.</p>
              </div>
            </div>
            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><button onClick={() => scrollToSection('home')} className="footer-link">Home</button></li>
                <li><button onClick={() => scrollToSection('packages')} className="footer-link">Packages</button></li>
                <li><button onClick={() => scrollToSection('about')} className="footer-link">About</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="footer-link">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Holiday Packages</a></li>
                <li><a href="#" className="footer-link">Luxury Travel</a></li>
                <li><a href="#" className="footer-link">Group Tours</a></li>
                <li><a href="#" className="footer-link">Custom Itineraries</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Follow Us</h4>
              <div className="social-links">
                <a href="#" className="social-link facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-link instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.729-1.378l-.726 2.781c-.264 1.02-.976 2.304-1.441 3.081 1.089.337 2.24.517 3.435.517 6.624 0 11.99-5.367 11.99-11.989C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="social-link twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="social-link whatsapp">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Trip N Travel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return <TripNTravelHomepage />;
}

export default App;
