import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

import nodemailer from 'nodemailer';

// API route to handle contact form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, project, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Basic nodemailer transport configuration.
    // Ensure SMTP_USER and SMTP_PASS are set in your environment
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Use App Password for Gmail
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`, // sender address
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // list of receivers (the mailbox to receive emails)
      replyTo: email,
      subject: `New Portfolio Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nProject Type: ${project || 'N/A'}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email. Check SMTP configuration." });
  }
});

// Setup Vite Dev server or static asset hosting
async function boot() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started in full-stack mode on http://0.0.0.0:${PORT}`);
  });
}

boot();
