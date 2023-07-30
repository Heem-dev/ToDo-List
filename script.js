let addButton = document.querySelector("#add");
let listContainer = document.querySelector("#listContainer");
let taskInput = document.querySelector("#taskInput");

let finishedTask = document.createElement("img");
finishedTask.src = "checkmark-svgrepo-com.svg";
finishedTask.alt = "finished";
finishedTask.classList.add("finishedTask");
finishedTask.setAttribute("onclick", "strikeThrough(this.parentNode)");

let deleteButton = document.createElement("img");
deleteButton.classList.add("deleteButton");
deleteButton.setAttribute("onclick", "deleteFunction(this.parentNode)");
deleteButton.src = "close-svgrepo-com.svg";
deleteButton.alt = "delete";

let deleteBtn = document.querySelectorAll(".deleteButton");

function addTask(arg) {
  if (taskInput.value === "") {
    taskInput.placeholder = "Task cannot be empty";
    return;
  } else {
    let newTask = document.createElement("div");
    newTask.classList.add("taskItem");
    let textElement = document.createElement("p");
    textElement.classList.add("taskText");
    textElement.innerText = taskInput.value;

    newTask.appendChild(finishedTask.cloneNode(true));
    newTask.appendChild(textElement);

    console.log(taskInput.value);
    taskInput.value = "";
    // add delete button to the task.

    // deleteButton.addEventListener("click", function () { deleteFunction(newTask) });
    newTask.appendChild(deleteButton.cloneNode(true));

    listContainer.appendChild(newTask);

    taskInput.placeholder = "Enter a task";
    saveData();
  }
}

// event listener for the add button when clicked or enter is pressed
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (taskInput.value.length > 30 && event.keyCode != 13) {
    taskInput.value = taskInput.value.slice(0, -1);
    return;
  } else if (event.keyCode === 13) {
    addTask();
  }
});

function saveData() {
  localStorage.setItem("listData", listContainer.innerHTML);
}

function loadData() {
  listContainer.innerHTML = localStorage.getItem("listData");
}

function deleteFunction(elem) {
  elem.remove();
  saveData();
}

function strikeThrough(elem) {
  elem.classList.toggle("strikeThrough");
  saveData();
}
// event listener for the delete button

loadData();
