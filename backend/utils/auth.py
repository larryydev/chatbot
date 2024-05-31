import re
import sqlite3

from werkzeug.security import generate_password_hash, check_password_hash

import utils.config as config


EMAIL_REGEX = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'


def signup(email, password):
    if not (re.fullmatch(EMAIL_REGEX, email)):
        return_message = {'message': 'invalid email'}
        return_code = 400
        return return_message, return_code

    hash_password = generate_password_hash(password=password, method='scrypt')

    try:
        with sqlite3.connect(config.DATABASE) as conn:
            cur = conn.cursor()
            cur.execute(
                f'INSERT INTO users (email, password) VALUES ("{email}", "{hash_password}")'
            )
            conn.commit()

        return_message = {'message': 'created successfully'}
        return_code = 201
        return return_message, return_code
    
    except:
        return_message = {'message': 'already exists'}
        return_code = 400
        return return_message, return_code
    

def login(email, password):
    if not (re.fullmatch(EMAIL_REGEX, email)):
        return_message = {'message': 'invalid email'}
        return_code = 400
        return return_message, return_code

    try:
        with sqlite3.connect(config.DATABASE) as conn:
            cur = conn.cursor()
            cur.execute(
                'SELECT password FROM users WHERE email = ?', (email,)
            )
            result = cur.fetchone()

            if result and check_password_hash(result[0], password):
                return_message = {'message': 'login successful'}
                return_code = 200
            else:
                return_message = {'message': 'invalid credentials'}
                return_code = 401

        return return_message, return_code
    
    except Exception as e:
        return_message = {'message': str(e)}
        return_code = 500
        return return_message, return_code