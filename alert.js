function showAlert(message) {
    const alertModal = document.getElementById('alert-modal');
    const alertMessage = document.getElementById('alert-message');

    // Prepare text with line breaks
    const maxLineLength = 40;
    let formattedMessage = '';
    let currentLine = '';

    const words = message.split(' ');

    words.forEach(word => {
        if (currentLine.length + word.length + 1 > maxLineLength) {
            formattedMessage += currentLine + '<br>';
            currentLine = word;
        } else {
            currentLine = currentLine ? `${currentLine} ${word}` : word;
        }
    });

    if (currentLine) {
        formattedMessage += currentLine;
    }

    // Set the message in the modal
    alertMessage.innerHTML = formattedMessage;

    // Show modal with fade-in animation
    alertModal.classList.remove('hide');
    alertModal.classList.add('show');
    alertModal.style.display = 'flex';

    // Handle "OK" button click to hide the modal with fade-out animation
    document.getElementById('alert-ok-btn').onclick = () => {
        alertModal.classList.remove('show');
        alertModal.classList.add('hide');

        setTimeout(() => {
            alertModal.style.display = 'none';
        }, 300); // Match the fade-out duration
    };
}