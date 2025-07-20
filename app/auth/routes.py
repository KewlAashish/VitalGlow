from . import auth_bp
from flask import render_template, request, redirect, url_for, flash

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # validate user credentials

        flash("Login Successful!", "success")
        return redirect(url_for('default.user'))

    return render_template('loginPage.html')

@auth_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Save user entity in DB after hashing the password

        flash("Signup Successful!", "success")
        return redirect(url_for('default.user'))

    return render_template('signupPage.html')