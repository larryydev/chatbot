import datetime

import jwt
from flask import Flask, request, jsonify
from flask_cors import CORS

import init
import utils.auth as auth
import utils.sender as sender
import utils.chat as chat


app = Flask(__name__)
CORS(app, origins="*")


API_VERSION_BASE_URL = '/api/v1'


@app.route(f'{API_VERSION_BASE_URL}/signup', methods=['POST'])
def signup_route():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')


    resp, status_code = auth.signup(email=email, password=password)

    if status_code == 201:
        sender.send_signup_confirmation_email(recipient=email)

    return jsonify(resp), status_code


@app.route(f'{API_VERSION_BASE_URL}/login', methods=['POST'])
def login_route():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')


    resp, status_code = auth.login(email=email, password=password)

    if status_code == 200:
        token = jwt.encode({
            'email': email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        resp['token'] = token

    return jsonify(resp), status_code
    
@app.route(f'{API_VERSION_BASE_URL}/chat', methods=['POST'])
def chat_route():
    data = request.get_json()
    prompt = data.get('prompt')
    response = chat.chat_with_gpt(prompt)
    bot_msg = response.choices[0].message.content

    if not bot_msg:
        return 'OPENAI issue', 405
    
    ret = {
        'bot': bot_msg
    }
    return jsonify(ret), 200

if __name__ == '__main__':
    init.init_db()
    app.run(port = 8000, debug=True)