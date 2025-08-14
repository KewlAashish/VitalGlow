from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    from .routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from .routes.trainer_routes import trainer_bp
    app.register_blueprint(trainer_bp, url_prefix='/api/trainer')

    from .routes.client_routes import client_bp
    app.register_blueprint(client_bp, url_prefix='/api/client')

    @app.get("/healthz")
    def healthz():
        return {"status": "ok"}, 200

    return app