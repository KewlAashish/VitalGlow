from flask import Flask
from .default import default_bp
from .auth import auth_bp
from .constants.const_version import CSS_VERSION

def create_app():
    app = Flask(__name__, static_folder='../static')
    app.config.from_pyfile('../config.py')

    # Registering blueprints
    app.register_blueprint(default_bp)
    app.register_blueprint(auth_bp)

    # Inject constants globally into all templates
    @app.context_processor
    def inject_constants():
        return dict(css_version=CSS_VERSION)

    return app
