// ฟังก์ชันโหลดงานจากคุกกี้
function loadTasks() {
    const tasks = getCookie("tasks");
    if (tasks) {
        const tasksArray = JSON.parse(tasks);
        tasksArray.forEach(task => {
            addTaskToDOM(task);
        });
    }
}

// ฟังก์ชันเพิ่มงานลงใน DOM
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

// ฟังก์ชันอัปเดตคุกกี้
function updateTasksCookie() {
    const taskElements = document.getElementById("ft_list").getElementsByTagName("div");
    const taskArray = [];
    for (let i = 0; i < taskElements.length; i++) {
        taskArray.push(taskElements[i].textContent);
    }
    document.cookie = "tasks=" + JSON.stringify(taskArray) + "; path=/";
}

// ฟังก์ชันดึงข้อมูลคุกกี้
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

// เมื่อโหลดหน้าเว็บให้โหลดงานจากคุกกี้
window.onload = loadTasks;

// การสร้างงานใหม่เมื่อคลิกปุ่ม "New"
document.getElementById("newTaskButton").addEventListener("click", () => {
    const newTask = prompt("Enter a new task:");
    if (newTask && newTask.trim() !== "") {
        addTaskToDOM(newTask);
        updateTasksCookie();
    } else {
        alert("Task cannot be empty!");
    }
});
