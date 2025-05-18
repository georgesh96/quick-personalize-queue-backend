# Queue Personalization API

This is a simple Node.js/Express API that simulates the process of queuing a personalization task. It validates the input and logs the request to simulate adding a job to a queue.

## Features

- RESTful POST endpoint at `/api/queue-personalization`
- Input validation for `url` and `templateId`
- Informative console logging simulates job queuing

## Requirements

- Node.js (v18 or higher recommended)
- npm

## Installation

1. Clone the repository or copy the `app.js` file to your local machine.

2. Install dependencies:

   ```bash
   npm install
   ```


## Running the Application

To start the server:

```bash
node app.js 
```
or you can run make sure you have nodemon installed globally if yes skip the below bash command and move to next one

```bash
npm install nodemon -g
```

```bash
npm run dev 
```

The server will run on `http://localhost:3000` by default.

## API Endpoint

### POST `/api/queue-personalization`

**Request Body:**

```json
{
  "url": "https://www.example.com",
  "templateId": "welcome_email_v1"
}
```

**Success Response:**

- Status: `200 OK`
- Body:

```json
{
  "message": "Personalization queued successfully for URL: https://www.example.com"
}
```

**Validation Errors:**

- Status: `400 Bad Request`
- Body example (for missing `url`):

```json
{
  "status": 400,
  "error": "INVALID_DATA",
  "message": "URL is required"
}
```