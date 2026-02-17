const fetch = require('node-fetch');

exports.handler = async (event) => {
    console.log("📨 Submission Received. Automation Trigger Initialized.");

    // FLIGHT RECORDER (Debug Logging)
    const logToBridge = async (data) => {
        try {
            await fetch('https://erudite-nonfrigidly-lamar.ngrok-free.dev/webhook/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (e) { /* Ignore logging errors */ }
    };

    // 1. Parse Payload
    let payload;
    try {
        const body = JSON.parse(event.body);
        payload = body.payload;
    } catch (e) {
        console.error("❌ Invalid JSON payload:", e);
        return { statusCode: 400, body: "Invalid JSON" };
    }

    const { email } = payload;
    console.log(`👤 Processing lead: ${email}`);
    await logToBridge({ info: "Processing Lead", email: email });

    // 2. N8N Automation Dispatch
    // URL must be set in Netlify Environment Variables: N8N_WEBHOOK_URL
    if (process.env.N8N_WEBHOOK_URL) {
        try {
            console.log("🚀 Dispatching to N8N Webhook...");
            const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    source: "aitaskiq_native_form",
                    timestamp: new Date().toISOString(),
                    payload: payload
                })
            });

            console.log(`✅ N8N Response: ${n8nResponse.status}`);
            await logToBridge({ success: true, target: "N8N", status: n8nResponse.status });

            return { statusCode: 200, body: "Dispatched to N8N" };
        } catch (error) {
            console.error("❌ N8N Dispatch Failed:", error);
            await logToBridge({ error: "N8N Failed", details: error.message });
            return { statusCode: 502, body: "N8N Gateway Error" };
        }
    } else {
        console.log("⚠️ No N8N_WEBHOOK_URL configured.");
        await logToBridge({ warning: "Missing N8N URL" });
        return { statusCode: 200, body: "Saved to Netlify (No Automation)" };
    }
};
