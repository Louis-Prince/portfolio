import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import nodemailer from 'nodemailer';
import validator from 'validator';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn('WARNING: EMAIL_USER or EMAIL_PASS is not set in .env');
}

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests. Please try again in a minute.',
  },
});

app.use(helmet());
app.use(cors({ origin: FRONTEND_ORIGIN, methods: ['GET', 'POST'], credentials: true }));
app.use(express.json());
app.use(limiter);

function sanitizeInput(value) {
  return validator.escape(value.trim());
}

function validateContactPayload(payload) {
  const errors = [];

  if (!payload.name || !payload.name.toString().trim()) {
    errors.push('Name is required.');
  }

  if (!payload.email || !payload.email.toString().trim()) {
    errors.push('Email is required.');
  } else if (!validator.isEmail(payload.email.toString())) {
    errors.push('A valid email address is required.');
  }

  if (!payload.message || !payload.message.toString().trim()) {
    errors.push('Message is required.');
  }

  return errors;
}

async function sendContactEmail({ name, email, message }) {
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error('Email credentials are not configured. Please set EMAIL_USER and EMAIL_PASS.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${name} <${EMAIL_USER}>`,
    to: EMAIL_USER,
    subject: `New contact message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${validator.escape(message).replace(/\n/g, '<br>')}</p>`,
  };

  return transporter.sendMail(mailOptions);
}

app.post('/api/contact', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const payload = { name, email, message };
    const errors = validateContactPayload(payload);

    if (errors.length > 0) {
      return res.status(400).json({ status: 'error', errors });
    }

    const sanitizedData = {
      name: sanitizeInput(name.toString()),
      email: sanitizeInput(email.toString()),
      message: sanitizeInput(message.toString()),
    };

    await sendContactEmail(sanitizedData);

    res.status(200).json({
      status: 'success',
      message: 'Your message has been sent successfully.',
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).json({ status: 'error', error: 'Resource not found.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: 'error',
    error: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
