const API = "/api/tasks";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "auth.html";
}

function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "auth.html";
}

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const emptyState = document.getElementById("emptyState");

let tasks = [];

async function loadTasks() {
    try {
        const res = await fetch(API, { headers: authHeaders() });

        if (res.status === 401) {
            logout();
            return;
        }

        tasks = await res.json();

        renderTasks(tasks);

    } catch (err) {
        console.log(err);
    }
}

function renderTasks(taskArray) {

    taskList.innerHTML = "";

    updateStats(taskArray);

    if (taskArray.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    taskArray.forEach(task => {

        const card = document.createElement("div");
        card.className = "task";

        card.innerHTML = `
            <div class="task-left">

                <div class="task-info">

                    <h3>${task.title}</h3>

                    <span class="status">${task.status}</span>

                </div>

            </div>

            <div class="actions">

                <button class="edit-btn" onclick="editTask('${task._id}')">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="delete-btn" onclick="deleteTask('${task._id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        taskList.appendChild(card);

    });

}

function updateStats(taskArray) {

    totalTasks.textContent = taskArray.length;

    const pending = taskArray.filter(
        task => task.status === "Pending"
    ).length;

    const completed = taskArray.filter(
        task => task.status === "Completed"
    ).length;

    pendingTasks.textContent = pending;
    completedTasks.textContent = completed;

}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        addTask();
    }

});

async function addTask() {

    const title = taskInput.value.trim();

    if (!title) return;

    const res = await fetch(API, {

        method: "POST",

        headers: authHeaders(),

        body: JSON.stringify({
            title
        })

    });

    if (res.status === 401) {
        logout();
        return;
    }

    taskInput.value = "";

    loadTasks();

}

async function deleteTask(id) {

    const ok = confirm("Delete this task?");

    if (!ok) return;

    const res = await fetch(`${API}/${id}`, {

        method: "DELETE",

        headers: authHeaders()

    });

    if (res.status === 401) {
        logout();
        return;
    }

    loadTasks();

}

function editTask(id) {

    alert("Edit feature coming in next update 🚀");

}

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const filtered = tasks.filter(task =>
        task.title.toLowerCase().includes(keyword)
    );

    renderTasks(filtered);

});

loadTasks();