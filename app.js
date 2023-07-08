// Function to render the task list
function renderTaskList() {
  const taskListContainer = document.getElementById("task-list");
  taskListContainer.innerHTML = "";

  tasks.forEach(task => {
    const taskElement = document.createElement("div");
    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Status: ${task.status}</p>
      <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskListContainer.appendChild(taskElement);
  });
}

// Function to show a success message
function showSuccessMessage(message) {
  alert(message);
}

// Function to add a new task
function addTask(event) {
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const statusInput = document.getElementById("status");

  const newTask = {
    id: tasks.length + 1,
    title: titleInput.value,
    description: descriptionInput.value,
    status: statusInput.value
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Clear input fields
  titleInput.value = "";
  descriptionInput.value = "";
  statusInput.value = "To Do";

  showSuccessMessage("Task added successfully");

  // Open the home page (index.html) in a new window
  window.open("index.html", "_blank");
}

// Function to edit a task
function editTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const newTitle = prompt("Enter new title:", task.title);
  const newDescription = prompt("Enter new description:", task.description);
  const newStatus = prompt("Enter new status:", task.status);

  task.title = newTitle || task.title;
  task.description = newDescription || task.description;
  task.status = newStatus || task.status;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  showSuccessMessage("Task updated successfully");

  renderTaskList();
}

// Function to delete a task
function deleteTask(taskId) {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return;

  tasks.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showSuccessMessage("Task deleted successfully");

  renderTaskList();
}

// Attach event listener to the form submit event
const taskForm = document.getElementById("task-form");
if (taskForm) {
  taskForm.addEventListener("submit", addTask);
}

// Retrieve tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Initial rendering of the task list
const taskListContainer = document.getElementById("task-list");
if (taskListContainer) {
  renderTaskList();
}
