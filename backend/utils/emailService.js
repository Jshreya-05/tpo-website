import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export const sendRegistrationEmail = async (registrationData) => {
  const { name, email, phone, branch, year } = registrationData;
  const registrationDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f3f4f6;
            color: #1f2937;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 30px;
            margin: 0 auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header {
            border-bottom: 2px solid #c8973a;
            padding-bottom: 15px;
            margin-bottom: 20px;
            text-align: center;
          }
          .header h2 {
            color: #0a1628;
            margin: 0;
            font-size: 22px;
          }
          .header p {
            color: #c8973a;
            margin: 5px 0 0 0;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.1em;
          }
          .item {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #f9fafb;
            border-radius: 8px;
            border-left: 4px solid #1b4fd8;
          }
          .label {
            font-size: 11px;
            text-transform: uppercase;
            color: #6b7280;
            font-weight: bold;
            margin-bottom: 3px;
          }
          .value {
            font-size: 15px;
            color: #111827;
            font-weight: 500;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
            border-top: 1px solid #e5e7eb;
            padding-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>KBP Placement Cell</h2>
            <p>New Student Placement Registration</p>
          </div>
          
          <div class="item" style="border-left-color: #c8973a;">
            <div class="label">Candidate Name</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="item">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${email}" style="color: #1b4fd8; text-decoration: none;">${email}</a></div>
          </div>
          
          <div class="item">
            <div class="label">Mobile Number</div>
            <div class="value"><a href="tel:${phone}" style="color: #1b4fd8; text-decoration: none;">${phone}</a></div>
          </div>
          
          <div class="item">
            <div class="label">Department / Branch</div>
            <div class="value">${branch}</div>
          </div>
          
          <div class="item">
            <div class="label">Year of Study</div>
            <div class="value">${year}</div>
          </div>
          
          <div class="item" style="border-left-color: #9ca3af;">
            <div class="label">Submission Date</div>
            <div class="value">${registrationDate}</div>
          </div>
          
          <div class="footer">
            This is an automated notification from the KBP College of Engineering Training & Placement Portal.
          </div>
        </div>
      </body>
    </html>
  `;

  console.log(`✉️ Dispatching Student Registration email notification for: ${name}...`);

  // Dynamically load nodemailer to ensure the app doesn't crash if dependencies are loading or absent
  try {
    const nodemailer = await import('nodemailer');
    
    // We'll configure a fallback SMTP transport (using default Gmail structure)
    // In production, SMTP host, email, and password should be loaded from env
    const smtpEmail = process.env.SMTP_EMAIL || 'tposanjeevpatil@gmail.com';
    const smtpPass = process.env.SMTP_PASSWORD;
    const adminEmail = 'tposanjeevpatil@gmail.com';

    if (!smtpPass) {
      throw new Error('SMTP_PASSWORD env variable is not configured. Email cannot be sent.');
    }

    const transporter = nodemailer.default.createTransport({
      service: 'gmail',
      auth: {
        user: smtpEmail,
        pass: smtpPass
      }
    });

    const mailOptions = {
      from: `"KBP Placement Portal" <${smtpEmail}>`,
      to: adminEmail,
      subject: `📢 Placement Registration: ${name} (${branch})`,
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Registration email notification dispatched successfully for ${name}.`);
  } catch (error) {
    console.warn(`⚠️ Nodemailer execution failed: ${error.message}`);
    
    // Fallback: Write email to logs/emails.log for testing/verification
    const logFilePath = path.join(logDir, 'emails.log');
    const logEntry = `\n========================================\nDATE: ${registrationDate}\nTO: tposanjeevpatil@gmail.com\nSUBJECT: Placement Registration: ${name}\nDETAILS:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nBranch: ${branch}\nYear: ${year}\n========================================\n`;
    
    fs.appendFileSync(logFilePath, logEntry);
    console.log(`💾 Email contents saved locally inside ${logFilePath}`);
  }
};
