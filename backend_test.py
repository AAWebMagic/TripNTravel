#!/usr/bin/env python3
import requests
import json
import unittest
import random
import string
import sys
import os
from typing import Dict, Any, List

# Get the backend URL from the frontend .env file
BACKEND_URL = "https://b308d30e-7e44-4808-82b5-4a0e16d34a61.preview.emergentagent.com"
API_BASE_URL = f"{BACKEND_URL}/api"

class TripNTravelAPITest(unittest.TestCase):
    """Test suite for Trip N Travel API endpoints"""
    
    def generate_random_email(self) -> str:
        """Generate a random email for testing"""
        random_str = ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))
        return f"test_{random_str}@example.com"
    
    def test_01_api_health_check(self):
        """Test the API health check endpoint"""
        print("\n🔍 Testing API health check endpoint...")
        response = requests.get(f"{API_BASE_URL}/")
        self.assertEqual(response.status_code, 200, "API health check failed")
        data = response.json()
        self.assertEqual(data["message"], "Trip N Travel API", "Unexpected response message")
        print("✅ API health check passed")
    
    def test_02_get_travel_packages(self):
        """Test the travel packages endpoint"""
        print("\n🔍 Testing travel packages endpoint...")
        response = requests.get(f"{API_BASE_URL}/packages")
        self.assertEqual(response.status_code, 200, "Failed to get travel packages")
        
        packages = response.json()
        self.assertIsInstance(packages, list, "Packages response is not a list")
        self.assertEqual(len(packages), 4, "Expected 4 travel packages")
        
        # Verify package structure
        for package in packages:
            self.assertIn("id", package, "Package missing 'id' field")
            self.assertIn("destination", package, "Package missing 'destination' field")
            self.assertIn("hotel_rating", package, "Package missing 'hotel_rating' field")
            self.assertIn("price_per_person", package, "Package missing 'price_per_person' field")
            self.assertIn("image_url", package, "Package missing 'image_url' field")
            self.assertIn("description", package, "Package missing 'description' field")
            self.assertIn("duration", package, "Package missing 'duration' field")
            
            # Verify data types
            self.assertIsInstance(package["id"], str, "Package 'id' is not a string")
            self.assertIsInstance(package["destination"], str, "Package 'destination' is not a string")
            self.assertIsInstance(package["hotel_rating"], int, "Package 'hotel_rating' is not an integer")
            self.assertIsInstance(package["price_per_person"], (int, float), "Package 'price_per_person' is not a number")
            self.assertIsInstance(package["image_url"], str, "Package 'image_url' is not a string")
            self.assertIsInstance(package["description"], str, "Package 'description' is not a string")
            self.assertIsInstance(package["duration"], str, "Package 'duration' is not a string")
            
        print("✅ Travel packages endpoint test passed")
    
    def test_03_newsletter_subscription_valid(self):
        """Test newsletter subscription with valid email"""
        print("\n🔍 Testing newsletter subscription with valid email...")
        email = self.generate_random_email()
        
        payload = {"email": email}
        response = requests.post(f"{API_BASE_URL}/newsletter", json=payload)
        
        self.assertEqual(response.status_code, 200, f"Failed to subscribe with valid email: {response.text}")
        data = response.json()
        self.assertEqual(data["email"], email, "Email in response doesn't match submitted email")
        self.assertIn("id", data, "Response missing 'id' field")
        self.assertIn("subscribed_at", data, "Response missing 'subscribed_at' field")
        
        print(f"✅ Newsletter subscription with valid email ({email}) passed")
        return email
    
    def test_04_newsletter_subscription_duplicate(self):
        """Test newsletter subscription with duplicate email"""
        print("\n🔍 Testing newsletter subscription with duplicate email...")
        # First, create a subscription
        email = self.test_03_newsletter_subscription_valid()
        
        # Try to subscribe again with the same email
        payload = {"email": email}
        response = requests.post(f"{API_BASE_URL}/newsletter", json=payload)
        
        self.assertEqual(response.status_code, 400, "Expected 400 error for duplicate email")
        data = response.json()
        self.assertIn("detail", data, "Error response missing 'detail' field")
        self.assertEqual(data["detail"], "Email already subscribed", "Unexpected error message")
        
        print("✅ Newsletter duplicate email check passed")
    
    def test_05_newsletter_subscription_invalid_email(self):
        """Test newsletter subscription with invalid email format"""
        print("\n🔍 Testing newsletter subscription with invalid email format...")
        
        payload = {"email": "invalid-email"}
        response = requests.post(f"{API_BASE_URL}/newsletter", json=payload)
        
        self.assertEqual(response.status_code, 422, "Expected 422 error for invalid email format")
        
        print("✅ Newsletter invalid email format check passed")
    
    def test_06_contact_inquiry_valid(self):
        """Test contact inquiry submission with valid data"""
        print("\n🔍 Testing contact inquiry submission...")
        
        payload = {
            "name": "John Doe",
            "email": self.generate_random_email(),
            "phone": "+1234567890",
            "message": "I'm interested in booking a trip to Maldives for my family."
        }
        
        response = requests.post(f"{API_BASE_URL}/contact", json=payload)
        
        self.assertEqual(response.status_code, 200, f"Failed to submit contact inquiry: {response.text}")
        data = response.json()
        
        # Verify response structure
        self.assertEqual(data["name"], payload["name"], "Name in response doesn't match submitted name")
        self.assertEqual(data["email"], payload["email"], "Email in response doesn't match submitted email")
        self.assertEqual(data["phone"], payload["phone"], "Phone in response doesn't match submitted phone")
        self.assertEqual(data["message"], payload["message"], "Message in response doesn't match submitted message")
        self.assertIn("id", data, "Response missing 'id' field")
        self.assertIn("created_at", data, "Response missing 'created_at' field")
        
        print("✅ Contact inquiry submission passed")
    
    def test_07_contact_inquiry_invalid(self):
        """Test contact inquiry submission with invalid data"""
        print("\n🔍 Testing contact inquiry with invalid data...")
        
        # Missing required fields
        payload = {
            "email": self.generate_random_email(),
            "message": "Test message"
            # Missing name field
        }
        
        response = requests.post(f"{API_BASE_URL}/contact", json=payload)
        
        self.assertEqual(response.status_code, 422, "Expected 422 error for missing required fields")
        
        print("✅ Contact inquiry invalid data check passed")
    
    def test_08_cors_headers(self):
        """Test CORS headers in the API response"""
        print("\n🔍 Testing CORS headers...")
        
        # Send an OPTIONS request to check CORS headers
        response = requests.options(f"{API_BASE_URL}/")
        
        self.assertEqual(response.status_code, 200, "OPTIONS request failed")
        self.assertIn("Access-Control-Allow-Origin", response.headers, "Missing CORS header")
        self.assertEqual(response.headers["Access-Control-Allow-Origin"], "*", "Unexpected CORS origin")
        self.assertIn("Access-Control-Allow-Methods", response.headers, "Missing CORS methods header")
        
        print("✅ CORS headers check passed")

def run_tests():
    """Run all the API tests"""
    print(f"\n🚀 Starting Trip N Travel API tests against {API_BASE_URL}")
    
    # Create a test suite
    test_suite = unittest.TestSuite()
    test_suite.addTest(TripNTravelAPITest('test_01_api_health_check'))
    test_suite.addTest(TripNTravelAPITest('test_02_get_travel_packages'))
    test_suite.addTest(TripNTravelAPITest('test_03_newsletter_subscription_valid'))
    test_suite.addTest(TripNTravelAPITest('test_04_newsletter_subscription_duplicate'))
    test_suite.addTest(TripNTravelAPITest('test_05_newsletter_subscription_invalid_email'))
    test_suite.addTest(TripNTravelAPITest('test_06_contact_inquiry_valid'))
    test_suite.addTest(TripNTravelAPITest('test_07_contact_inquiry_invalid'))
    test_suite.addTest(TripNTravelAPITest('test_08_cors_headers'))
    
    # Run the tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(test_suite)
    
    # Print summary
    print("\n📊 Test Summary:")
    print(f"Total tests: {result.testsRun}")
    print(f"Passed: {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f"Failed: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")
    
    # Return True if all tests passed, False otherwise
    return len(result.failures) == 0 and len(result.errors) == 0

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)