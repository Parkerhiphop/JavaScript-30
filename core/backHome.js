let backButton = document.createElement('a');

backButton.setAttribute('href', '/javaScript30');
backButton.classList.add('back-home');
backButton.text = 'Back Home';

const htmlBody = document.querySelector('body');

htmlBody.appendChild(backButton);
