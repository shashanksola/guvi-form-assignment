function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function validateForm(event: Event): Promise<void> {
    event.preventDefault();
    const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
    let isValid = true;
    const formData: Record<string, string> = {};

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.style.borderColor = 'red';
            input.placeholder = 'This field is required';
            isValid = false;
        } else {
            input.style.borderColor = 'green';
            input.placeholder = '';
            formData[input.id] = input.value.trim();
        }
    });

    if (formData.email && !isValidEmail(formData.email)) {
        const emailInput = document.getElementById('email') as HTMLInputElement;
        emailInput.style.borderColor = 'red';
        emailInput.placeholder = 'Invalid email format';
        isValid = false;
    }

    if (isValid) {
        try {
            const response = await fetch('https://6717d39db910c6a6e02a29fc.mockapi.io/form-date', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            alert("Form Submitted Successfully");
        } catch (error) {
            console.error(error);
            alert("Submission Failed");
        }
    }
}

function handleInput(event: Event): void {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (input.value.trim() !== '') {
        input.style.borderColor = 'green';
        input.placeholder = '';
    } else {
        input.style.borderColor = '';
        input.placeholder = 'This field is required';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', validateForm);
        const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('input', handleInput);
        });
    }
});
