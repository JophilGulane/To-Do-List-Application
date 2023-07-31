// Global array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        return; // Do not add empty tasks
    }

    const newTask = {
        id: Date.now(), // Generate a unique ID for each task
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = "";
    saveTasks();
    renderTasks();
}

// Function to toggle task completion status
function toggleTaskStatus(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        renderTasks();
    }
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Function to render tasks in the list
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerText = task.text;
        li.addEventListener("click", () => toggleTaskStatus(task.id));

        if (task.completed) {
            li.classList.add("completed");
        }

        taskList.appendChild(li);
    });
}

// Call the loadTasks function when the application starts
loadTasks();
