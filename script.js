let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false });
    input.value = "";
    save();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    save();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    save();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText && newText.trim()) {
        tasks[index].text = newText.trim();
        save();
        renderTasks();
    }
}

function renderTasks() {
    const filter = document.getElementById("filter").value;
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks
        .filter(task => {
            if (filter === "completed") return task.completed;
            if (filter === "pending") return !task.completed;
            return true;
        })
        .forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";

            li.innerHTML = `
                <span onclick="toggleComplete(${index})">${task.text}</span>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;

            list.appendChild(li);
        });
}

renderTasks();
