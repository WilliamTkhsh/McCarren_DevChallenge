from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from pydantic import BaseModel
from typing import List
import requests
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
client = OpenAI(
    api_key = os.environ.get("OPENAI_API_KEY")
)


class ProfileRequest(BaseModel):
    url: str

class CompanyProfile(BaseModel):
    company_name: str
    service_line: List[str]
    company_description: str
    tier1_keywords: List[str]
    tier2_keywords: List[str]
    emails: List[str] = []
    poc: str = ""


def build_prompt(website_url: str) -> str:
    return f"""
Given the URL of a company's website below, extract the following information:

- Company Name
- One or more Service Lines (e.g., Cybersecurity, Software Development)
- Short Company Description
- Tier 1 Keywords (keywords that this company would use to search for public
government opportunities ('solar' would be a good keyword for a company that
sells solar pannels))
- Tier 2 Keywords (keywords taht this company MIGHT use to search for government
opportunities)

Return the result in the following JSON format:
{{
  "company_name": "",
  "service_line": [],
  "company_description": "",
  "tier1_keywords": [],
  "tier2_keywords": []
}}

Here is the URL for the website:
{website_url}
"""

def call_gpt(prompt: str) -> CompanyProfile:
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an assistant that summarizes company websites and always responds with a valid JSON object that matches the CompanyProfile schema. Do not include explanations."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=800
        )
        content = response.choices[0].message.content
        data = json.loads(content)
        return CompanyProfile(**data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"GPT API error: {str(e)}")

@app.post("/generate-profile", response_model=CompanyProfile)
def generate_profile(request: ProfileRequest):
    prompt = build_prompt(request.url)
    print(prompt)
    profile = call_gpt(prompt)
    return profile