from werkzeug.security import generate_password_hash, check_password_hash

def hash_password(password: str) -> str:
    """Hashes a password using a secure hashing algorithm."""
    return generate_password_hash(password)

def verify_password(password: str, password_hash: str) -> bool:
    """Verifies a password against a hashed password."""
    return check_password_hash(password_hash, password)