# Contact Form Backend

This backend handles form submissions from the portfolio frontend and sends contact messages to a Gmail inbox.

## Features

- `POST /api/contact` to send email messages
- `GET /api/health` for health checks
- Input validation and sanitization
- Gmail delivery via Nodemailer
- Rate limiting to prevent spam
- CORS enabled for frontend integration
- Environment variables via dotenv

## Install

```bash
cd server
npm install
```

## Environment

Copy `.env.example` to `.env` and update values:

```env
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

> Use a Gmail App Password instead of your regular account password for security.

## Run

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## API Endpoints

### Health check

`GET /api/health`

Response:

```json
{
  "status": "ok",
  "timestamp": "2026-05-06T00:00:00.000Z"
}
```

### Contact form

`POST /api/contact`

Request body:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "message": "Hello Louis, I'm interested in working with you."
}
```

Successful response:

```json
{
  "status": "success",
  "message": "Your message has been sent successfully."
}
```

Validation error response:

```json
{
  "status": "error",
  "errors": ["Name is required.", "A valid email address is required."]
}
```

## Frontend integration

```js
const formData = {
  name: nameValue,
  email: emailValue,
  message: messageValue,
};

const response = await fetch("http://localhost:4000/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

const data = await response.json();

if (response.ok) {
  console.log(data.message);
} else {
  console.error(data.errors || data.error);
}
```

## Notes

- Keep `.env` out of source control.
- Use Gmail App Passwords for secure authentication.
- Adjust `FRONTEND_ORIGIN` to match your deployed frontend domain.
