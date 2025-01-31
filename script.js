document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const API_URL = 'http://localhost:5000/api'; // Your back-end URL

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form 
        const formData = {
            fullName: form.querySelector('input[type="text"]').value.trim(),
            email: form.querySelector('input[type="email"]').value.trim(),
            password: form.querySelectorAll('input[type="password"]')[0].value,
            confirmPassword: form.querySelectorAll('input[type="password"]')[1].value,
            dateOfBirth: form.querySelector('input[type="date"]').value,
            gender: form.querySelector('select').value
        };

        // Basic validation
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            alert('All fields are required.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        if (!form.querySelector('#terms').checked) {
            alert('You must accept the terms and conditions.');
            return;
        }

        try {
            // Show loading state
            const submitButton = form.querySelector('.btn-primary');
            submitButton.disabled = true;
            submitButton.textContent = 'Creating Account...';

            // Send registration request
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Handle successful registration
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);

            // Show success message
            alert('Registration successful! Redirecting to login...');
            window.location.href = '/login.html';
        } catch (error) {
            // Show error message
            alert(error.message);
        } finally {
            // Reset button state
            const submitButton = form.querySelector('.btn-primary');
            submitButton.disabled = false;
            submitButton.textContent = 'Start Listening';
        }
    });

    // Google button functionality
    document.querySelector('.btn-social:nth-child(2)').addEventListener('click', function () {
        alert('Google OAuth coming soon!');
    });

    // Facebook button functionality
    document.querySelector('.btn-social:nth-child(3)').addEventListener('click', function () {
        alert('Facebook OAuth coming soon!');
    });
});
