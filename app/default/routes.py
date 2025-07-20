from . import default_bp
from flask import render_template

@default_bp.route('/')
def home():
    return render_template('home.html')

@default_bp.route('/user')
def user():
    return render_template('dashboard.html')