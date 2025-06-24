from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

class TravelPackage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    destination: str
    hotel_rating: int
    price_per_person: float
    image_url: str
    description: str
    duration: str

class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactInquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Trip N Travel API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/newsletter", response_model=NewsletterSubscription)
async def subscribe_newsletter(subscription: NewsletterSubscriptionCreate):
    # Check if email already exists
    existing = await db.newsletter_subscriptions.find_one({"email": subscription.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    subscription_obj = NewsletterSubscription(**subscription.dict())
    await db.newsletter_subscriptions.insert_one(subscription_obj.dict())
    return subscription_obj

@api_router.get("/packages", response_model=List[TravelPackage])
async def get_travel_packages():
    # Return sample packages with the images we got from vision_expert_agent
    sample_packages = [
        {
            "id": str(uuid.uuid4()),
            "destination": "Maldives Paradise",
            "hotel_rating": 5,
            "price_per_person": 2499.00,
            "image_url": "https://images.unsplash.com/photo-1586500036065-bdaeac7a4feb",
            "description": "Luxury water villas with pristine beaches and crystal clear waters",
            "duration": "7 days / 6 nights"
        },
        {
            "id": str(uuid.uuid4()),
            "destination": "Tropical Beach Resort",
            "hotel_rating": 4,
            "price_per_person": 1899.00,
            "image_url": "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
            "description": "Beautiful tropical destination with white sand beaches",
            "duration": "5 days / 4 nights"
        },
        {
            "id": str(uuid.uuid4()),
            "destination": "Mountain Adventure",
            "hotel_rating": 4,
            "price_per_person": 1299.00,
            "image_url": "https://images.unsplash.com/photo-1587669011728-ed189a1f6e8d",
            "description": "Scenic mountain landscapes with thrilling adventure activities",
            "duration": "4 days / 3 nights"
        },
        {
            "id": str(uuid.uuid4()),
            "destination": "Luxury Ocean Resort",
            "hotel_rating": 5,
            "price_per_person": 3299.00,
            "image_url": "https://images.unsplash.com/photo-1589779677460-a15b5b5790ce",
            "description": "Exclusive overwater bungalows with infinity pool views",
            "duration": "10 days / 9 nights"
        }
    ]
    return sample_packages

@api_router.post("/contact", response_model=ContactInquiry)
async def create_contact_inquiry(inquiry: ContactInquiryCreate):
    inquiry_obj = ContactInquiry(**inquiry.dict())
    await db.contact_inquiries.insert_one(inquiry_obj.dict())
    return inquiry_obj

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()