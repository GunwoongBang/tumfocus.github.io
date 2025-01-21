// Timer Logic
let timer, seconds = 0, isRunning = false;

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
  }
}

function switchButton() {
  const button = document.getElementById("stopButton");
  button.innerText = (button.innerText === "Stop" && isRunning) ? "Clear" : "Stop";
}

function stopTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    calculateRewards(); // Calculate seeds as a reward
  } else {
    seconds = 0;
    updateDisplay();
  }
}

function calculateRewards() {
  if (seconds >= 10) {
    const seedsEarned = Math.floor(seconds / 10) * 5;
    const message1 = 
    showCustomAlert(`Congratulations!! You've earned ${seedsEarned} seeds for focusing ${Math.floor(seconds / 60)} min ${seconds % 60} sec!`);
  } else {
    showCustomAlert("You need to focus for at least 10 seconds to earn seeds!");
  }
}

function updateDisplay() {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  document.querySelector(".time-display").textContent = `${hrs} hours ${mins} min ${secs} sec`;
}

document.querySelector(".start").addEventListener("click", startTimer);
document.querySelector(".stop").addEventListener("click", switchButton);
document.querySelector(".stop").addEventListener("click", stopTimer);

// White Noise Logic
const noiseOptions = document.querySelectorAll('.noise-option');
const audio = new Audio();
let currentlyPlaying = null; // To track the currently playing sound

noiseOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Check if the clicked option is already playing
        if (currentlyPlaying === option) {
            audio.pause(); // Pause the audio
            currentlyPlaying.classList.remove('playing'); // Remove the "playing" class
            currentlyPlaying = null; // Reset the currently playing option
        } else {
            // Set the audio source to the selected sound
            audio.src = `${option.dataset.sound}`;
            audio.play();

            // Remove "playing" class from the previously playing option
            if (currentlyPlaying) {
                currentlyPlaying.classList.remove('playing');
            }

            // Add "playing" class to the newly selected option
            option.classList.add('playing');
            currentlyPlaying = option; // Update the currently playing option
        }
    });
});

// Optional: Stop playback when the audio ends and remove the "playing" indicator
audio.addEventListener('ended', () => {
    if (currentlyPlaying) {
        currentlyPlaying.classList.remove('playing');
        currentlyPlaying = null; // Reset the currently playing option
    }
});

// Modals Logic
document.addEventListener("DOMContentLoaded", () => {
  const contactButton = document.getElementById("contact");
  const contactModal = document.getElementById("contactModal");
  const closeModal = document.getElementById("closeModal");

  contactButton.addEventListener("click", () => contactModal.style.bottom = "0");
  closeModal.addEventListener("click", () => contactModal.style.bottom = "-100%");
  window.addEventListener("click", (event) => {
    if (event.target === contactModal) contactModal.style.bottom = "-100%";
  });

  const applicationButton = document.getElementById("application");
  const applicationModal = document.getElementById("applicationModal");
  const closeApplicationModal = document.getElementById("closeApplicationModal");

  applicationButton.addEventListener("click", () => applicationModal.style.bottom = "0");
  closeApplicationModal.addEventListener("click", () => applicationModal.style.bottom = "-100%");
  window.addEventListener("click", (event) => {
    if (event.target === applicationModal) applicationModal.style.bottom = "-100%";
  });
});

// Function to show the custom alert
function showCustomAlert(message) {
  const alertBox = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("custom-alert-message");
  
  alertMessage.textContent = message;
  alertBox.style.visibility = "visible";
  alertBox.style.opacity = "1";
}

// Function to hide the custom alert
function hideCustomAlert() {
  const alertBox = document.getElementById("custom-alert");
  alertBox.style.opacity = "0";
  setTimeout(() => {
    alertBox.style.visibility = "hidden";
  }, 300); // Match the transition duration
}

// Add event listener for OK button
document.getElementById("custom-alert-ok").addEventListener("click", hideCustomAlert);
