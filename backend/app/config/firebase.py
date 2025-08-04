import os
from dotenv import load_dotenv
from google.cloud import firestore

# Explicitly tell it where the .env file is (project root)
from pathlib import Path
env_path = Path(__file__).resolve().parent.parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# Read the credential path
cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
if not cred_path:
    print("ENV VALUE:", os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))
    raise RuntimeError("Missing GOOGLE_APPLICATION_CREDENTIALS in .env")

# Set it (Google client may use this env var)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path

# Initialize Firestore client
db = firestore.Client()