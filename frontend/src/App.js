import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
                <div className="logo-circle">
                  <div className="logo-elements">
                    <div className="logo-sun"></div>
                    <div className="logo-plane">✈</div>
                    <div className="logo-pin">📍</div>
                  </div>
                </div>
                <div className="brand-text">
                  <h1 className="text-2xl font-bold text-primary leading-tight">Trip N Travel</h1>
                </div>
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
                <span className="icon-text">👥</span>
              </div>
              <h3 className="feature-title">Trusted by Thousands</h3>
              <p className="feature-description">Over 50,000 satisfied customers trust our travel expertise</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon handpicked-icon">
                <span className="icon-text">✨</span>
              </div>
              <h3 className="feature-title">Handpicked Deals</h3>
              <p className="feature-description">Carefully selected destinations and accommodations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon support-icon">
                <span className="icon-text">🕐</span>
              </div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">Round-the-clock customer support for your peace of mind</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon price-icon">
                <span className="icon-text">💰</span>
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
                  <div className="logo-circle small">
                    <div className="logo-elements">
                      <div className="logo-sun"></div>
                      <div className="logo-plane">✈</div>
                      <div className="logo-pin">📍</div>
                    </div>
                  </div>
                  <h3 className="footer-brand-text">Trip N Travel</h3>
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
                <a href="#" className="social-link facebook">📘</a>
                <a href="#" className="social-link instagram">📷</a>
                <a href="#" className="social-link twitter">🐦</a>
                <a href="#" className="social-link whatsapp">💬</a>
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