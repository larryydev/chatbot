import smtplib
from email.mime.text import MIMEText

import utils.config as config

def send_signup_confirmation_email(recipient):
    subject = 'email confirmation'
    body = f'{recipient},\n\nThanks you for creating an account with us.\n\nBest,\nSupportU Challenge'
    send_email(recipient=recipient, subject=subject, body=body)

def send_email(recipient, subject, body):
    message = MIMEText(body)
    message['Subject'] = subject
    message['From'] = config.EMAIL_SENDER
    message['To'] = recipient

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(config.EMAIL_SENDER, config.EMAIL_PWD)
        server.sendmail(config.EMAIL_SENDER, recipient, message.as_string())

    print(f'Email Sent! To: {recipient}')


