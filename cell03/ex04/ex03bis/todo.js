function loadTasks() {
    const tasks = getCookie("tasks");
    if (tasks) {
        const tasksArray = JSON.parse(tasks);
        tasksArray.forEach(task => {
            addTaskToDOM(task);
        });
    }
}

function addTaskToDOM(taskContent) {
    const taskDiv = $("<div>").text(taskContent);
    taskDiv.on("click", function() {
        const confirmation = confirm("Do you want to remove this task?");
        if (confirmation) {
            taskDiv.remove();
            updateTasksCookie();
        }
    });
    $("#ft_list").prepend(taskDiv);
}

function updateTasksCookie() {
    const taskArray = [];
    $("#ft_list div").each(function() {
        taskArray.push($(this).text());
    });
    document.cookie = "tasks=" + JSON.stringify(taskArray) + "; path=/";
}

function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.indexOf(name + "=") == 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return null;
}

window.onload = function() {
    loadTasks();
    $("#bot").on("click", function() {
        const newTask = prompt("Enter a new task:");
        if (newTask && newTask.trim() !== "") {
            addTaskToDOM(newTask);
            updateTasksCookie();
        } else {
            alert("Task cannot be empty!");
        }
    });
};
