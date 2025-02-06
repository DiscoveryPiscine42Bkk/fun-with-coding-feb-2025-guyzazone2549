function loadTasks() {
    const tasks = getCookie("tasks");
    if (tasks) {
        try {
            const tasksArray = JSON.parse(decodeURIComponent(tasks));
            tasksArray.forEach(task => {
                addTaskToDOM(task);
            });
        } catch (error) {
            console.error("Error parsing tasks from cookie:", error);
        }
    }
}

function addTaskToDOM(taskContent) {
    const taskDiv = document.createElement("div");
    taskDiv.textContent = taskContent;
    taskDiv.addEventListener("click", () => {
        const confirmation = confirm("Do you want to remove this task?");
        if (confirmation) {
            taskDiv.remove();
            updateTasksCookie();
        }
    });
    document.getElementById("ft_list").prepend(taskDiv);
}

function updateTasksCookie() {
    const taskElements = document.getElementById("ft_list").getElementsByTagName("div");
    const taskArray = [];
    for (let i = 0; i < taskElements.length; i++) {
        taskArray.push(taskElements[i].textContent);
    }
    document.cookie = "tasks=" + encodeURIComponent(JSON.stringify(taskArray)) + ";";
}

function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.indexOf(name + "=") == 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

window.onload = loadTasks;
document.getElementById("newTaskButton").addEventListener("click", () => {
    const newTask = prompt("Enter a new task:");
    if (newTask && newTask.trim() !== "") {
        addTaskToDOM(newTask);
        updateTasksCookie();
    } else {
        alert("Task cannot be empty!");
    }
});
