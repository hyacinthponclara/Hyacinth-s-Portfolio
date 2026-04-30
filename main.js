function openTab(event, tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.tablinks').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('hero').style.display = 'none';
    document.getElementById('backBtn').style.display = 'inline-block';
    const target = document.getElementById(tabName);
    target.style.display = 'block';
    event.currentTarget.classList.add('active');
}

function goHome() {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.tablinks').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('hero').style.display = 'flex';
    document.getElementById('backBtn').style.display = 'none';
}

function openImage(src) {
    const overlay = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    overlay.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) closeLightbox();
    });

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const status = document.getElementById('formStatus');
            status.textContent = 'Sending...';
            status.style.color = '#555';

            try {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;

               const res = await fetch('https://hyacinthportoflio.hyacinth-rose-ponclara.workers.dev/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, subject, message })
                });

                const result = await res.json();

                if (result.success) {
                    status.textContent = '✅ Message sent! I\'ll get back to you soon.';
                    status.style.color = 'green';
                    form.reset();
                } else {
                    status.textContent = '❌ Something went wrong. Please try again.';
                    status.style.color = 'red';
                }
            } catch (error) {
                status.textContent = '❌ Could not send message. Please try again later.';
                status.style.color = 'red';
            }
        });
    }
});
