let lastInputText = ''; // Variable to store the last input value
let lastImageUrl = '';  // Variable to store the last image URL

window.onload = function() {
            document.getElementById("input-field").focus();
        };
// Function to search and display image based on input
function searchImage() {
    const inputField = document.getElementById('input-field');
    let inputText = inputField.value.trim(); // Get and trim the input text

    // Convert the input text to uppercase for consistency
    inputText = inputText.toUpperCase();

    const resultImage = document.getElementById('result-image');
    const errorMessage = document.getElementById('error-message');
    const imageContainer = document.getElementById('image-container');

    // Reset previous error message and image visibility
    
    resetDisplay(errorMessage, resultImage, imageContainer);

    // Validate the input
    if (isInputEmpty(inputText)) {
        showAlert("Input cannot be empty.");
    } else if (isInvalidLength(inputText)) {
        showAlert("Input must be 16 characters.");
    } else {
        handleImageDisplay(inputText, resultImage, errorMessage, imageContainer);
    }
}

// Reset display of error message and image
function resetDisplay(errorMessage, resultImage, imageContainer) {
    errorMessage.style.display = 'none';
    resultImage.style.display = 'none';
    imageContainer.style.display = 'none';
}

// Check if the input is empty
function isInputEmpty(inputText) {
    return inputText === "";
}

// Check if the input length is not 16
function isInvalidLength(inputText) {
    return inputText.length !== 16;
}

// Handle image display logic based on input
function handleImageDisplay(inputText, resultImage, errorMessage, imageContainer) {
    // Check if the input is the same as the last input
    if (inputText === lastInputText) {
        displayCachedImage(resultImage, imageContainer);
    } else {
        fetchNewImage(inputText, resultImage, errorMessage, imageContainer);
    }
}

// Display the cached image if the input matches the last one
function displayCachedImage(resultImage, imageContainer) {
    resultImage.src = lastImageUrl;
    resultImage.style.display = 'block';
    imageContainer.style.display = 'block'; // Show image container
}

// Fetch a new image based on the input
function fetchNewImage(inputText, resultImage, errorMessage, imageContainer) {
    // Generate the image URL
    const imageUrl = `https://pub-ef4186eafb8b40e79ef539d670c6ec78.r2.dev/${encodeURIComponent(inputText)}.png`;

    // Set the image source and load the image
    resultImage.src = imageUrl;
    resultImage.onload = function () {
        resultImage.style.display = 'block'; // Show the image when it loads
        imageContainer.style.display = 'block'; // Show container
        // Update last input and image URL for future use
        lastInputText = inputText;
        lastImageUrl = imageUrl;
    };

    // Handle error if the image fails to load
    resultImage.onerror = function () {
        errorMessage.style.display = 'block'; // Show error message if the image doesn't load
        imageContainer.style.display = 'block'; // Show container
    };
}


let isImageEnlarged = false; // Tracks if the image is enlarged

function toggleImageSize() {
    const resultImage = document.getElementById('result-image'); // Get the image element
    const body = document.body; // Reference to the body element (not used but could be helpful in the future)

    // Check if the image is enlarged
    if (isImageEnlarged) {
        // If image is enlarged, remove the 'enlarged' class
        resultImage.classList.remove('enlarged');
        isImageEnlarged = false; // Update the state to indicate the image is not enlarged
    } else {
        // If image is not enlarged, add the 'enlarged' class
        resultImage.classList.add('enlarged');
        isImageEnlarged = true; // Update the state to indicate the image is enlarged
    }
}

document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            document.getElementById('search-btn').click(); // Trigger the search button click
        }
    }
);
