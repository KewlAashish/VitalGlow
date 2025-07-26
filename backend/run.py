from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # enable CORS for React

@app.route("/api/hello")
def hello():
    return {"message": "Hello from Aashish!"}

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
