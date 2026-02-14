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

        // Optional: Forward to N8N here if needed
        // const n8nUrl = "YOUR_N8N_URL";
        // if (n8nUrl) { await fetch(n8nUrl, { method: 'POST', body: JSON.stringify(data) }); }

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
