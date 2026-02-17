const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    console.log("📨 Submission Received. Initializing Auto-Responder...");

    // 1. Parse Payload
    let payload;
    try {
        const body = JSON.parse(event.body);
        payload = body.payload; // Netlify wraps form data in a 'payload' object
    } catch (e) {
        console.error("❌ Invalid JSON payload:", e);
        return { statusCode: 400, body: "Invalid JSON" };
    }

    // 2. Extract Data
    const { email, data } = payload;
    const sector = data.sector || "General";
    const objective = data.objective || "No objective provided";
    const name = data['full-name'] || "Agent";

    console.log(`👤 Sending receipt to: ${email} (${sector})`);

    // 3. Configure Transporter (SMTP)
    // NOTE: User must provide EMAIL_USER and EMAIL_PASS in Netlify Env Vars
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("❌ MISSING CREDENTIALS: EMAIL_USER or EMAIL_PASS not set in Netlify.");
        return { statusCode: 500, body: "Server Error: Missing Email Credentials" };
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Built-in support for Gmail (requires App Password)
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // 4. Draft Email Content (Glassmorphic / Cyberpunk Style - Text Only for specific clients, HTML for others)
    const mailOptions = {
        from: `"AI Task IQ Command" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `MISSION RECEIVED: Protocol Initialized [${sector.toUpperCase()}]`,
        text: `COMMAND UPLINK ESTABLISHED.\n\nMission received. Agent Zero is analyzing your objective: "${objective}".\n\nStand by for operational brief.\n\n- AI Task IQ`,
        html: `
        <div style="font-family: 'Courier New', monospace; background-color: #000; color: #0f0; padding: 20px; border: 1px solid #333;">
            <h2 style="border-bottom: 2px solid #0f0; padding-bottom: 10px;">⚡ MISSION UPLINK ESTABLISHED</h2>
            <p><strong>To:</strong> ${email}</p>
            <p><strong>Sector:</strong> ${sector}</p>
            <p><strong>Status:</strong> <span style="color: #ffff00;">ANALYZING</span></p>
            <hr style="border-color: #333;">
            <p>Your briefing has been encrypted and transmitted securely to our Command Center.</p>
            <blockquote style="border-left: 2px solid #0f0; margin: 10px 0; padding-left: 10px; color: #fff;">
                "${objective}"
            </blockquote>
            <p>Agent Zero is currently assessing the tactical viability of this mission. Expect a transmission shortly.</p>
            <br>
            <p style="font-size: 0.8em; color: #888;">END OF LINE.</p>
        </div>
        `
    };

    // 5. Send Email
    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Application Receipt Sent Successfully.");
        return { statusCode: 200, body: "Email Sent" };
    } catch (error) {
        console.error("❌ Email Sending Failed:", error);
        return { statusCode: 500, body: `Email Failed: ${error.message}` };
    }
};
