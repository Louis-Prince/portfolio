import "dotenv/config";
import nodemailer from "nodemailer";
import validator from "validator";

function sanitizeInput(value: string) {
  return validator.escape(value.trim());
}

function validateContactPayload(payload: { name?: string; email?: string; message?: string }) {
  const errors: string[] = [];

  if (!payload.name || !payload.name.trim()) {
    errors.push("Name is required.");
  }

  if (!payload.email || !payload.email.trim()) {
    errors.push("Email is required.");
  } else if (!validator.isEmail(payload.email.trim())) {
    errors.push("A valid email address is required.");
  }

  if (!payload.message || !payload.message.trim()) {
    errors.push("Message is required.");
  }

  return errors;
}

async function sendContactEmail({ name, email, message }: { name: string; email: string; message: string }) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Email credentials are not configured. Set EMAIL_USER and EMAIL_PASS in Vercel environment variables.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
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
    html: `<p><strong>Name:</strong> ${validator.escape(name)}</p><p><strong>Email:</strong> ${validator.escape(email)}</p><p><strong>Message:</strong></p><p>${validator.escape(message).replace(/\n/g, "<br>")}</p>`,
  };

  return transporter.sendMail(mailOptions);
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ status: "error", error: "Method not allowed" });
    return;
  }

  const { name, email, message } = req.body || {};
  const payload = { name, email, message };
  const errors = validateContactPayload(payload);

  if (errors.length > 0) {
    res.status(400).json({ status: "error", errors });
    return;
  }

  try {
    const sanitizedData = {
      name: sanitizeInput(name.toString()),
      email: sanitizeInput(email.toString()),
      message: sanitizeInput(message.toString()),
    };

    await sendContactEmail(sanitizedData);

    res.status(200).json({
      status: "success",
      message: "Your message has been sent successfully.",
    });
  } catch (error: any) {
    console.error("Vercel API error:", error);
    res.status(500).json({
      status: "error",
      error: error?.message || "Internal Server Error",
    });
  }
}
