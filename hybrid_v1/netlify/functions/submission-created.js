/**
 * submission-created.js
 * Automatically triggered by Netlify on every form submission.
 */

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { payload } = body;
        const { form_name, data } = payload; // Netlify payload structure

        console.log(`[UPLINK] Signal Detected: ${form_name}`);

        // Routing Logic
        let signalType = "UNKNOWN";
        if (form_name === "questionnaire" || form_name === "mission-uplink") {
            signalType = "INITIAL_CONTACT";
            console.log(`[ROUTING] Init Contact -> Send to Analyzer`);
        } else if (form_name === "briefing") {
            signalType = "DEEP_DIVE";
            console.log(`[ROUTING] Deep Dive -> Send to Command`);
        }

        // Construct Unified Payload for n8n
        const n8nPayload = {
            signal_type: signalType,
            form_source: form_name,
            lead_data: data,
            timestamp: new Date().toISOString()
        };

        // Forward to n8n (Mock Log for now, ready for ENV var)
        // const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
        console.log("[TRANSMISSION] Prepared Payload:", JSON.stringify(n8nPayload, null, 2));

        /* 
        // FUTURE: Enable when N8N_WEBHOOK_URL is set
        if (process.env.N8N_WEBHOOK_URL) {
            await fetch(process.env.N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(n8nPayload)
            });
        }
        */

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Signal Processed", type: signalType }),
        };

    } catch (error) {
        console.error('[ERROR] Uplink Failure:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Signal Interrupted" }),
        };
    }
};
