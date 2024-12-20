const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail
    pass: 'your-app-password' // Replace with your Gmail app password
  }
});

app.post('/api/schedule-call', async (req, res) => {
  const { name, email, company, timePreference, message } = req.body;

  try {
    // Send email to Sujay
    await transporter.sendMail({
      from: 'your-email@gmail.com', // Replace with your Gmail
      to: 'sujay@equihome.com.au',
      subject: 'New Call Schedule Request',
      html: `
        <h2>New Call Schedule Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Preferred Time (Sydney):</strong> ${timePreference}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `
    });

    // Send confirmation email to the user
    await transporter.sendMail({
      from: 'your-email@gmail.com', // Replace with your Gmail
      to: email,
      subject: 'Call Request Confirmation - Equihome Partners',
      html: `
        <h2>Thank you for scheduling a call with Equihome Partners</h2>
        <p>We have received your request for a call during the following time:</p>
        <p><strong>${timePreference}</strong> (Sydney Time)</p>
        <p>Our team will reach out to you shortly to confirm the exact time for the call.</p>
        <br>
        <p>Best regards,</p>
        <p>Equihome Partners Team</p>
      `
    });

    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send request' });
  }
});

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 