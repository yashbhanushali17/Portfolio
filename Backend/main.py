from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
import resend
import os

load_dotenv()
resend.api_key=os.getenv("RESEND_API_KEY")

app=FastAPI(
    title="portfolio backend",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name : str
    email : str
    subject : str
    message : str


@app.get("/")
def home():
    return {"message":"backend is running !"}

@app.get("/health")
def health():
    return {"status": "Ok"}


@app.get("/env")
def check_env():
    return {

        "api_loaded":bool(os.getenv("RESEND_API_KEY")),
        "email":os.getenv("MY_EMAIL")
    }

@app.post("/contact")
def contact(form: ContactForm):
    
    response= resend.Emails.send({
        "from":"onboarding@resend.dev",
        "to":os.getenv("MY_EMAIL"),
        "subject":form.subject,
        "html":f"""
                <h1>📩 New Portfolio Message</h1>
                <p><strong>Name:</strong> {form.name}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Subject:</strong> {form.subject}</p>
                <p><strong>Message:</strong></p>
                <p>{form.message}</p>
                """
    })
    print(response)

    return {"message":"Form received successfully!"}