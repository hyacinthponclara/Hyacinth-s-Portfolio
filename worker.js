export default {
    async fetch(request) {
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            });
        }

        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 });
        }

        try {
            const data = await request.json();
            const { name, email, subject, message } = data;

            if (!name || !email || !message) {
                return new Response(JSON.stringify({ error: 'Missing fields' }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }

            await fetch('https://api.mailchannels.net/tx/v1/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    personalizations: [{
                        to: [{ email: 'ponclara.hyacinthrose@gmail.com', name: 'Hyacinth Rose' }]
                    }],
                    from: { email: 'noreply@hyacinthportoflio.hyacinth-rose-ponclara.workers.dev', name: name },
                    reply_to: { email: email, name: name },
                    subject: subject || `New message from ${name}`,
                    content: [{
                        type: 'text/plain',
                        value: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
                    }]
                })
            });

            return new Response(JSON.stringify({ success: true }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });

        } catch (err) {
            return new Response(JSON.stringify({ error: 'Failed to send' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
    }
};
