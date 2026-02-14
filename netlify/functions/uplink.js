exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        let data;
        // Handle both JSON and URL-Encoded
        if (event.headers["content-type"] === "application/x-www-form-urlencoded") {
            const params = new URLSearchParams(event.body);
            data = Object.fromEntries(params.entries());
        } else {
            data = JSON.parse(event.body);
        }

        console.log("LEAD_CAPTURE_SUCCESS:", JSON.stringify(data));

        // --- BRIDGE TO LOCAL DASHBOARD ---
        // Replace with your temporary Cloudflare/Ngrok URL
        const localBridgeUrl = "YOUR_LOCAL_BRIDGE_URL/bridge";
        try {
            if (localBridgeUrl && !localBridgeUrl.includes("YOUR_LOCAL")) {
                await fetch(localBridgeUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
        } catch (bridgeErr) {
            console.error("BRIDGE_FORWARD_FAILED:", bridgeErr);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Transmission Successful", id: Date.now() }),
            headers: {
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        console.error("LEAD_CAPTURE_ERROR:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to process transmission" })
        };
    }
};
