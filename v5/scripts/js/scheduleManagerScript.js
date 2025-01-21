const todoList = document.getElementById("todoList");
let lastClickedTask = null;
let lastAddedTask = null;

// Adds a new task with a checkbox and input fields
function addEmptyTask() {
  const listItem = document.createElement("li");
  listItem.className = "todo-item";

  const listItemPackage = document.createElement("div");
  listItemPackage.className = "todo-item-header";

  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Enter your task here";

  const noteInput = document.createElement("input");
  noteInput.type = "text1";
  noteInput.placeholder = "Add note";

  const deleteTaskButton = document.createElement("button");
  deleteTaskButton.className = "function-btn";
  deleteTaskButton.innerHTML = `<img src="images/user-trash-icon.png" alt="delete icon">`;

  const detailsButton = document.createElement("button");
  detailsButton.className = "function-btn";
  detailsButton.innerHTML = `<img src="images/detailsButton.png" alt="details icon">`;

  detailsButton.addEventListener("click", (event) => {
    event.stopPropagation();
    detailsTemplate.classList.toggle("show");
  });

  deleteTaskButton.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTaskButton.parentElement.parentElement.remove();
  });

  const closeButton = document.createElement("button");
  closeButton.className = "close-btn";
  closeButton.innerHTML = `<img src="images/closeDetails.png" alt="close details icon">`;

  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    detailsTemplate.classList.toggle("show");
  });

  const detailsTemplate = document.createElement("div");
  detailsTemplate.className = "details-template";

  const detailsHeader = document.createElement("p");
  detailsHeader.className = "details-header";
  detailsHeader.textContent = "Details";

  const dateCheckbox = document.createElement("input");
  dateCheckbox.type = "checkbox";

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Date";

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = new Date().toISOString().split("T")[0];
  dateInput.disabled = true;

  const timeCheckbox = document.createElement("input");
  timeCheckbox.type = "checkbox";

  const timeLabel = document.createElement("label");
  timeLabel.textContent = "Time";

  const timeInput = document.createElement("input");
  timeInput.type = "time";
  timeInput.disabled = true;

  // Append details elements
  detailsTemplate.append(
    detailsHeader,
    closeButton,
    dateCheckbox,
    dateLabel,
    dateInput,
    timeCheckbox,
    timeLabel,
    timeInput
  );

  dateCheckbox.addEventListener("change", () => {
    dateInput.disabled = !dateCheckbox.checked;
  });

  timeCheckbox.addEventListener("change", () => {
    timeInput.disabled = !timeCheckbox.checked;
  });

  textInput.addEventListener("focus", () => {
    noteInput.style.display = "block";
  });

  listItem.addEventListener("click", () => {
    if (lastClickedTask && lastClickedTask !== listItem) {
      lastClickedTask.querySelector(
        'input[placeholder="Add note"]'
      ).style.display = "none";
    }
    noteInput.style.display = "block";
    lastClickedTask = listItem;
  });

  textInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const taskText = textInput.value.trim();
      if (!taskText) {
        alert("Please enter a task.");
        return;
      }
      noteInput.style.display = noteInput.value.trim() ? "block" : "none";

      const label = document.createElement("label");
      label.textContent = taskText;
      listItemPackage.replaceChild(label, textInput);

      addEmptyTask();
    }
  });

  const taskLabel = document.querySelector("label");
  console.log(taskLabel);

  if (taskLabel) {
    editTask(taskLabel, listItemPackage);
  }

  listItemPackage.append(
    checkboxInput,
    textInput,
    deleteTaskButton,
    detailsButton,
    detailsTemplate
  );
  listItem.append(listItemPackage, noteInput);
  todoList.appendChild(listItem);

  textInput.focus();
  lastAddedTask = listItem;
}

let clickCount = 0;

// Automatically adds a new task when clicking outside of existing ones
document.addEventListener("click", (event) => {
  clickCount++;
  // Check if the click is odd or even
  if (clickCount % 2 !== 0) {
    // Odd click: Add a new task
    if (
      !document.querySelector('input[type="text"]') &&
      !["INPUT", "LABEL", "LI", "BUTTON", "A"].includes(
        event.target.tagName.toUpperCase()
      ) &&
      !event.target.closest(".menu-item")
    ) {
      console.log(event.target.tagName);
      addEmptyTask();
      if (lastClickedTask) {
        lastClickedTask.querySelector(
          'input[placeholder="Add note"]'
        ).style.display = "none";
      }
    }
  } else if (
    !["INPUT", "LI", "BUTTON", "A"].includes(
      event.target.tagName.toUpperCase()
    ) &&
    !event.target.closest(".menu-item")
  ) {
    console.log(event.target.tagName);
    // Even click: Eliminate the last added task
    eliminateLastTask();
  }
});

// Function to eliminate the last added task (implement based on your structure)
function eliminateLastTask() {
  const taskList = document.querySelectorAll(".todo-item"); // Adjust selector to match your task elements
  if (taskList.length > 0) {
    taskList[taskList.length - 1].remove(); // Remove the last task
  }
}

function editTask(taskLabel, listItemPackage) {
  taskLabel.addEventListener("click", (event) => {
    event.stopPropagation();

    // Create the input element
    const taskEditInput = document.createElement("input");
    taskEditInput.type = "text";
    taskEditInput.value = taskLabel.textContent; // Set input value to label's text

    // Find the parent element of the label
    const listItemPackage = taskLabel.parentElement;

    if (!listItemPackage) {
      console.error("Parent element not found for the label.");
      return;
    }
    // Ensure the label is a child of the parent before replacing
    if (listItemPackage.contains(taskLabel)) {
      listItemPackage.replaceChild(taskEditInput, taskLabel);
      // Focus the input for editing
      taskEditInput.focus();

      // Handle the Enter key event to switch back to label
      taskEditInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const newLabel = document.createElement("label");
          newLabel.textContent = taskEditInput.value; // Update label with input value

          // Replace input with the new label
          listItemPackage.replaceChild(newLabel, taskEditInput);

          // Reattach the click event to the new label for future edits
          newLabel.addEventListener("click", (event) => {
            event.stopPropagation();
            taskLabel.click(); // Trigger the edit mode again
          });
        }
      });

      // Optional: handle blur to save and switch back
      taskEditInput.addEventListener("blur", () => {
        const newLabel = document.createElement("label");
        newLabel.textContent = taskEditInput.value;

        // Replace input with the new label
        listItemPackage.replaceChild(newLabel, taskEditInput);

        // Reattach the click event
        newLabel.addEventListener("click", (event) => {
          event.stopPropagation();
          taskLabel.click();
        });
      });
    } else {
      console.error("Label is not a child of the expected parent.");
    }
  });
}
