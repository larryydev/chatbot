import os
import sqlite3


DATABASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'db')
os.makedirs(DATABASE_DIR, exist_ok=True)
DATABASE = os.path.join(DATABASE_DIR, 'database.db')


def init_db():
    with sqlite3.connect(DATABASE) as conn:
        cur = conn.cursor()
        cur.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        ''')
        conn.commit()