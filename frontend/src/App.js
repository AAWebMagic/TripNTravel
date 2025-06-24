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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">Trip N Travel</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-primary hover:text-accent px-3 py-2 text-sm font-medium">Home</a>
                <div className="relative group">
                  <button className="text-primary hover:text-accent px-3 py-2 text-sm font-medium flex items-center">
                    Holiday Packages
                    <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white">All Inclusive</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white">Cheap</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white">Last Minute</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white">Luxury</a>
                    </div>
                  </div>
                </div>
                <a href="#destinations" className="text-primary hover:text-accent px-3 py-2 text-sm font-medium">Destinations</a>
                <a href="#deals" className="text-primary hover:text-accent px-3 py-2 text-sm font-medium">Top Deals</a>
                <a href="#inquiry" className="text-primary hover:text-accent px-3 py-2 text-sm font-medium">Inquiry</a>
                <a href="#about" className="text-primary hover:text-accent px-3 py-2 text-sm font-medium">About</a>
                <a href="#contact" className="text-primary hover:text-accent px-3 py-2 text-sm font-medium">Contact</a>
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
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="#home" className="text-primary hover:text-accent block px-3 py-2 text-base font-medium">Home</a>
                <a href="#packages" className="text-primary hover:text-accent block px-3 py-2 text-base font-medium">Holiday Packages</a>
                <a href="#destinations" className="text-primary hover:text-accent block px-3 py-2 text-base font-medium">Destinations</a>
                <a href="#deals" className="text-primary hover:text-accent block px-3 py-2 text-base font-medium">Top Deals</a>
                <a href="#inquiry" className="text-primary hover:text-accent block px-3 py-2 text-base font-medium">Inquiry</a>
                <a href="#about" className="text-primary hover:text-accent block px-3 py-2 text-base font-medium">About</a>
                <a href="#contact" className="text-primary hover:text-accent block px-3 py-2 text-base font-medium">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586500036065-bdaeac7a4feb')`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Explore the World with Trip N Travel
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Unforgettable holidays, unbeatable prices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-accent px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300">
              View Packages
            </button>
            <button className="btn-cta px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300">
              Send Inquiry
            </button>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">Why Book With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1634869258987-f13de2902431" alt="Trusted" className="w-12 h-12 rounded-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Trusted by Thousands</h3>
              <p className="text-gray-600">Over 50,000 satisfied customers trust our travel expertise</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Handpicked Deals</h3>
              <p className="text-gray-600">Carefully selected destinations and accommodations</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <img src="https://images.pexels.com/photos/7564246/pexels-photo-7564246.jpeg" alt="24/7 Support" className="w-12 h-12 rounded-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for your peace of mind</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">We match any competitor's price or refund the difference</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section id="packages" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">Featured Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={pkg.image_url} 
                  alt={pkg.destination}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">{pkg.destination}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(pkg.hotel_rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  <p className="text-sm text-gray-500 mb-4">{pkg.duration}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-cta">${pkg.price_per_person}</span>
                    <span className="text-sm text-gray-500">per person</span>
                  </div>
                  <button className="w-full mt-4 btn-accent py-2 rounded-lg font-semibold transition-all duration-300">
                    View Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">What Our Customers Say</h2>
          <div className="relative">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">{reviews[currentReview].initials}</span>
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-lg mb-4 italic">"{reviews[currentReview].text}"</p>
              <p className="font-semibold text-primary">- {reviews[currentReview].name}</p>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentReview ? 'bg-accent' : 'bg-gray-300'
                  } transition-colors duration-300`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Get the Best Holiday Deals in Your Inbox</h2>
          <p className="text-xl text-white mb-8">Subscribe to receive exclusive offers and travel inspiration</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <button 
              type="submit"
              className="btn-cta px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300"
            >
              Subscribe Now
            </button>
          </form>
          {newsletterStatus === 'success' && (
            <p className="text-accent mt-4 font-semibold">Successfully subscribed to our newsletter!</p>
          )}
          {newsletterStatus === 'error' && (
            <p className="text-red-300 mt-4 font-semibold">Email already subscribed or error occurred.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Trip N Travel</h3>
              <p className="text-gray-300">Your trusted partner for unforgettable travel experiences worldwide.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-accent transition-colors">Home</a></li>
                <li><a href="#packages" className="text-gray-300 hover:text-accent transition-colors">Packages</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-accent transition-colors">About</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Holiday Packages</a></li>
                <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Luxury Travel</a></li>
                <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Group Tours</a></li>
                <li><a href="#" className="text-gray-300 hover:text-accent transition-colors">Custom Itineraries</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.729-1.378l-.726 2.781c-.264 1.02-.976 2.304-1.441 3.081 1.089.337 2.24.517 3.435.517 6.624 0 11.99-5.367 11.99-11.989C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">&copy; 2025 Trip N Travel. All rights reserved.</p>
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