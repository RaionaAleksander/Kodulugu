function validateField(input, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    
    if (!input.checkValidity()) {
        errorElement.textContent = input.validationMessage;
    } else {
        errorElement.textContent = '';
    }
}

document.getElementById('js__first-name').addEventListener('input', function () {
    validateField(this, 'js__first-name-error');
});

document.getElementById('js__last-name').addEventListener('input', function () {
    validateField(this, 'js__last-name-error');
});

document.getElementById('js__email').addEventListener('input', function () {
    validateField(this, 'js__email-error');
});

document.getElementById('js__password').addEventListener('input', function () {
    validateField(this, 'js__password-error');
});
