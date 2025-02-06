$(document).ready(function () {
    loadTasks();

    $("#bot").click(function () {
        const newTask = prompt("Enter a new task:");
        if (newTask && $.trim(newTask) !== "") {
            addTaskToDOM(newTask);
            updateTasksCookie();
        } else {
            alert("Task cannot be empty!");
        }
    });
});

function loadTasks() {
    const tasks = getCookie("tasks");
    if (tasks) {
        try {
            const tasksArray = JSON.parse(decodeURIComponent(tasks));
            $.each(tasksArray, function (_, task) {
                addTaskToDOM(task);
            });
        } catch (error) {
            console.error("Error parsing tasks from cookie:", error);
        }
    }
}

function addTaskToDOM(taskContent) {
    const $taskDiv = $("<div></div>").text(taskContent);
    $taskDiv.click(function () {
        if (confirm("Do you want to remove this task?")) {
            $(this).remove();
            updateTasksCookie();
        }
    });
    $("#ft_list").prepend($taskDiv);
}

function updateTasksCookie() {
    const taskArray = $("#ft_list div").map(function () {
        return $(this).text();
    }).get();
    document.cookie = "tasks=" + encodeURIComponent(JSON.stringify(taskArray)) + ";";
}

function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = $.trim(cookieArr[i]);
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
