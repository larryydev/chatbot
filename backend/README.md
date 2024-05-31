This Flask API provides endpoints for user authentication and a chatbot interaction.

## Routes

### Sign Up

- **URL:** `/api/v1/signup`
- **Method:** `POST`
- **Description:** Allows users to sign up with their email and password.
- **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    - Status Code: `201 Created` if successful
    - Status Code: `4xx` if unsuccessful
    ```json
    {
        "message": "User created successfully"
    }
    ```

### Log In

- **URL:** `/api/v1/login`
- **Method:** `POST`
- **Description:** Allows users to log in with their email and password.
- **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    - Status Code: `200 OK` if successful
    - Status Code: `4xx` if unsuccessful
    ```json
    {
        "message": "Login successful",
        "token": "<JWT_TOKEN>"
    }
    ```

### Chat

- **URL:** `/api/v1/chat`
- **Method:** `POST`
- **Description:** Allows users to interact with a chatbot using a prompt.
- **Request Body:**
    ```json
    {
        "prompt": "Hello, GPT!"
    }
    ```
- **Response:**
    - Status Code: `200 OK` if successful
    - Status Code: `405 Method Not Allowed` if bot message is empty
    ```json
    {
        "bot": "Bot's response message"
    }
    ```


### How to run
1. Start a python environment
2. Install -r requirements.txt
3. Run routesv1.py