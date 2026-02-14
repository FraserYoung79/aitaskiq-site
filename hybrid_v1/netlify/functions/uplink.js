export default async (request, context) => {
    // Only allow POST
    if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {
        const data = await request.json();

        // Forward to n8n (Server-to-Server)
        // Using PRODUCTION URL (drops '-test') to ensure it runs even if UI is closed
        const n8nResponse = await fetch("https://fraser79.app.n8n.cloud/webhook/mission-uplink", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!n8nResponse.ok) {
            console.error("n8n Error:", n8nResponse.status);
            return new Response(`Uplink Error: ${n8nResponse.status}`, { status: 502 });
        }

        return new Response(JSON.stringify({ status: "uplink_established" }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error) {
        console.error("Proxy Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
