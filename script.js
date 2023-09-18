
document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const suggestedTaskList = document.getElementById("suggestedTaskList");

    const suggestedTasks = suggestedTaskList.getElementsByTagName("li");
    for (const suggestedTask of suggestedTasks) {
        suggestedTask.addEventListener("click", function () {
            addTask(suggestedTask.textContent);
        });
    }

    addTaskButton.addEventListener("click", function () {
        addTask(taskInput.value);
        taskInput.value = "";
    });

    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask(taskInput.value);
            taskInput.value = "";
        }
    });

    function addTask(taskText) {
        if (taskText.trim() === "") {
            return;
        }

        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox">
            <input type="text" value="${taskText}">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;

        const deleteButton = li.querySelector(".delete");
        deleteButton.addEventListener("click", function () {
            li.remove();
        });

        const editButton = li.querySelector(".edit");
        const taskInput = li.querySelector("input[type='text']");
        editButton.addEventListener("click", function () {
            if (editButton.textContent === "Edit") {
                taskInput.removeAttribute("readonly");
                taskInput.focus();
                editButton.textContent = "Save";
            } else {
                taskInput.setAttribute("readonly", true);
                editButton.textContent = "Edit";
            }
        });

        taskList.appendChild(li);
    }
});
