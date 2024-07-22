document.addEventListener('DOMContentLoaded', function () {
    const termsCheckbox = document.getElementById('termsCheckbox');
    const registerButton = document.getElementById('registerButton');

    termsCheckbox.addEventListener('change', function () {
        if (termsCheckbox.checked) {
            registerButton.disabled = false;
            registerButton.style.backgroundColor = '#28a745'; 
        } else {
            registerButton.disabled = true;
            registerButton.style.backgroundColor = '#e0e0e0'; 
        }
    });


    registerButton.disabled = true;
    registerButton.style.backgroundColor = '#e0e0e0'; 
});


document.getElementById('closeModal').onclick = function () {
    document.getElementById('errorModal').style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == document.getElementById('errorModal')) {
        document.getElementById('errorModal').style.display = 'none';
    }
};