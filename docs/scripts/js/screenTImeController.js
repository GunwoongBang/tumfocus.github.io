// Pop Up adding applications
document.addEventListener('DOMContentLoaded', () => {
  const newPackagePlusButton = document.getElementById('newPackagePlus');
  const applicationModal = document.getElementById('applicationModal');
  const closeApplicationModal = document.getElementById('closeApplicationModal');


  // Check if the elements exist before adding event listeners
  if (newPackagePlusButton && applicationModal && closeApplicationModal) {
      // Open the modal when the "+" button is clicked
      newPackagePlusButton.addEventListener('click', () => {
          console.log('Plus button clicked'); // Debug log
          applicationModal.style.bottom = '0'; // Slide the modal up
      });
      // Close the modal when the close button is clicked
      closeApplicationModal.addEventListener('click', () => {
          console.log('Close button clicked'); // Debug log
          applicationModal.style.bottom = '-100%'; // Slide the modal down
      });
      // Optional: Close the modal when clicking outside of it
      window.addEventListener('click', (event) => {
          if (event.target === applicationModal) {
              console.log('Clicked outside the modal'); // Debug log
              applicationModal.style.bottom = '-100%';
          }
      });
    } else {
        console.error('Required elements for modal functionality are missing!');
    }
  });

  // Timer Function
  let timerInterval;
  let isPaused = false;
  let remainingTime;
  let timerHistory = JSON.parse(localStorage.getItem('timerHistory')) || [];

  const startButton = document.getElementById("start-button");
  const pauseButton = document.getElementById("pause-button");
  const stopButton = document.getElementById("stop-button");
  const countdownDisplay = document.getElementById("countdown-display");
  const hoursColumn = document.querySelector(".hours");
  const minutesColumn = document.querySelector(".minutes");
  const secondsColumn = document.querySelector(".seconds");
  const historyList = document.getElementById('history-list');

  function getSelectedTime() {
    const hour = parseInt(hoursColumn.scrollTop / 40);
    const minute = parseInt(minutesColumn.scrollTop / 40);
    const second = parseInt(secondsColumn.scrollTop / 40);
    return { hour, minute, second };
  }

  function updateCountdownDisplay(hours, minutes, seconds) {
    countdownDisplay.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startTimer() {
    const { hour, minute, second } = getSelectedTime();
    remainingTime = hour * 3600 + minute * 60 + second;

    startButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");

    timerInterval = setInterval(() => {
      if (!isPaused) {
        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          alert("Time's up!");
          resetUI();
        } else {
          remainingTime--;
          const hours = Math.floor(remainingTime / 3600);
          const minutes = Math.floor((remainingTime % 3600) / 60);
          const seconds = remainingTime % 60;
          updateCountdownDisplay(hours, minutes, seconds);
        }
      }
    }, 1000);
  }

  function pauseTimer() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Resume" : "Pause";
  }

  function stopTimer() {
    clearInterval(timerInterval);
    resetUI();
  }

  function resetUI() {
    startButton.classList.remove("hidden");
    pauseButton.classList.add("hidden");
    pauseButton.textContent = "Pause";
    countdownDisplay.textContent = "";
    isPaused = false;
  }

  function createTimePickerValues(columnId, maxValue) {
      const column = document.getElementById(columnId);
      for (let i = 0; i <= maxValue; i++) {
        const valueDiv = document.createElement('div');
        valueDiv.classList.add('value');
        valueDiv.textContent = String(i).padStart(2, '0'); // Add leading zero
        column.appendChild(valueDiv);
      }
  }
    
  // Populate the hours, minutes, and seconds columns
  createTimePickerValues('hours-column', 23);
  createTimePickerValues('minutes-column', 59);
  createTimePickerValues('seconds-column', 59);

  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  stopButton.addEventListener("click", stopTimer);


  // Function to add timer to history
  function addToHistory(hour, minute, second) {
    const timerValue = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    if (!timerHistory.includes(timerValue)) {
      timerHistory.unshift(timerValue);
      if (timerHistory.length > 3 ) { timerHistory.pop();} // Keep only the last 5 entries
      localStorage.setItem('timerHistory', JSON.stringify(timerHistory));
      updateHistoryUI();
    }
  }

  // Function to update the history list UI
  function updateHistoryUI() {
    historyList.innerHTML = ''; // Kosongkan elemen daftar

    timerHistory.forEach((timer, index) => {
    //  to create elements/screen time packages
      const li = document.createElement('li');
      li.classList.add('application-package'); 

     
      const header = document.createElement('div');
      header.classList.add('package-header');

      const title = document.createElement('h3');
      title.textContent = `Screen Time Package ${index + 1}`; 
      header.appendChild(title);

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-start-stop');

      const startButton = document.createElement('button');
      startButton.classList.add('start');
      startButton.textContent = 'Start';

      const stopButton = document.createElement('button');
      stopButton.classList.add('stop');
      stopButton.textContent = 'Stop';

     
      startButton.addEventListener('click', () => {
        selectTimer(timer); 
        startTimer(); 
      });

      buttonContainer.appendChild(startButton);
      buttonContainer.appendChild(stopButton);
      header.appendChild(buttonContainer);

      li.appendChild(header);

     
      const body = document.createElement('div');
      body.classList.add('package-body');

      const details = document.createElement('div');
      details.classList.add('package-details');

      const timeDisplay = document.createElement('p');
      timeDisplay.textContent = timer; 

      const durationDisplay = document.createElement('p');
      const [hours, minutes, seconds] = timer.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + Math.floor(seconds / 60);
      durationDisplay.textContent = totalMinutes > 60
        ? `${Math.floor(totalMinutes / 60)} hour`
        : `${totalMinutes} minutes`;

      details.appendChild(timeDisplay);
      details.appendChild(durationDisplay);

      const appContainer = document.createElement('div');
      appContainer.classList.add('package-applications');

      const appBox = document.createElement('div');
      appBox.classList.add('app');

      const addAppButton = document.createElement('div');
      addAppButton.classList.add('add-app');
      addAppButton.textContent = '+';

      appContainer.appendChild(appBox);
      appContainer.appendChild(addAppButton);

      body.appendChild(details);
      body.appendChild(appContainer);

      li.appendChild(body);

     
      historyList.appendChild(li);
    });
  }

  // Function to select a timer from the history
  function selectTimer(timer) {
    const [hour, minute, second] = timer.split(':').map(Number);
    // Scroll ke nilai yang sesuai pada time picker
    document.querySelector('.hours').scrollTop = hour * 40;
    document.querySelector('.minutes').scrollTop = minute * 40;
    document.querySelector('.seconds').scrollTop = second * 40;

    // Update countdown display dengan waktu yang dipilih
    updateCountdownDisplay(hour, minute, second);
  }

  // Example usage: Save and update history after the user starts the timer
  document.getElementById('start-button').addEventListener('click', () => {
  const { hour, minute, second } = getSelectedTime(); // Ambil juga nilai detik0
  addToHistory(hour, minute, second); // Kirim semua nilai ke fungsi addToHistory
  });

  // Initialize the history on page load
  updateHistoryUI();
