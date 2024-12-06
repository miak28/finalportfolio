document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // You can process the form data here if needed
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log('Form submitted!');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);

        // Display the thank you message
        responseMessage.style.display = 'block';

        // Optionally, reset the form fields
        form.reset();
    });
});
