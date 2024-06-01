import os

# database
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
DATABASE_DIR = os.path.join(parent_dir, 'db')
os.makedirs(DATABASE_DIR, exist_ok=True)
DATABASE = os.path.join(DATABASE_DIR, 'database.db')




# !!!! UPDATE THE FOLLOWING
OPEN_AI_API_KEY = None


# IF YOU ARE USING GMAIL
# you need to setup "APP PASSWORD" in your google account
EMAIL_SENDER = None
EMAIL_PWD = None
