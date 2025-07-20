from flask import Blueprint
default_bp = Blueprint('default', __name__, template_folder='../../templates/default')

from . import routes