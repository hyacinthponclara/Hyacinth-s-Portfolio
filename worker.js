addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    try {
        const data = await request.json();
        const { name, email, subject, message } = data;

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }

        await fetch('https://api.mailchannels.net/tx/v1/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                personalizations: [{
                    to: [{ email: 'ponclara.hyacinthrose@gmail.com', name: 'Hyacinth Rose' }]
                }],
                from: {
                    email: 'noreply@hyacinthportoflio.hyacinth-rose-ponclara.workers.dev',
                    name: name
                },
                reply_to: { email: email, name: name },
                subject: subject || `New message from ${name}`,
                content: [{
                    type: 'text/plain',
                    value: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
                }]
            })
        });

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }
}
