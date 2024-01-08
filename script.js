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

function modifyText(textElm) {
  textElm.addEventListener("keydown", (e) => {
    const isAlphanumeric = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\s-]$/.test(e.key);
    if (!isAlphanumeric) {
      // e.preventDefault();
      return;
    } else if (isAlphanumeric) {
      e.preventDefault();
      console.log(e);
      console.log(textElm.value);
      textElm.value += e.key;
      console.log(textElm.value);
      console.log(e.key);
      textElm.setAttribute("value", textElm.value);
      saveData();
    }
  });
}

function addTask(arg) {
  if (taskInput.value === "") {
    taskInput.placeholder = "Task cannot be empty";
    return;
  } else {
    let newTask = document.createElement("div");

    newTask.classList.add("taskItem");
    let textElement = document.createElement("input");
    textElement.setAttribute("type", "text");
    textElement.setAttribute("onclick", "modifyText(this)");
    // textElement.addEventListener("keydown", (e) => {
    //   const isAlphanumeric = /^[a-zA-Z0-9]$/.test(e.key);
    //   if (!isAlphanumeric) {
    //     // e.preventDefault();
    //     return;
    //   }

    //   let currentVal = e.target.value;
    //   let keyy = e.key;

    //   e.target.setAttribute("value", currentVal + keyy);
    //   textElement.maxLength = 26;
    //   saveData();
    // });

    textElement.classList.add("taskText");
    textElement.setAttribute("value", taskInput.value);
    // textElement.value = taskInput.value;
    // textElement.setAttribute('readonly','readonly')
    // textElement.disabled = true
    textElement.maxLength = 26;

    newTask.appendChild(finishedTask.cloneNode(true));
    newTask.appendChild(textElement.cloneNode(true));

    taskInput.value = "";

    newTask.appendChild(deleteButton.cloneNode(true));

    listContainer.appendChild(newTask);

    taskInput.placeholder = "Enter a task";
    saveData();
  }
}

// event listener for the add button when clicked or enter is pressed
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (taskInput.value.length > 25 && event.keyCode != 13) {
    // taskInput.value = taskInput.value.slice(0, -1);

    event.preventDefault();
    saveData();
  } else if (event.keyCode === 13) {
    addTask();
  }
});

function saveData() {
  localStorage.setItem("listDataJson", JSON.stringify(listContainer.innerHTML));
  // localStorage.setItem("listData", listContainer.innerHTML);
}

function loadData() {
  // listContainer.innerHTML = localStorage.getItem("listData");
  listContainer.innerHTML = JSON.parse(localStorage.getItem("listDataJson"));
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

document.getElementById("deleteAll").addEventListener("click", function () {
  // console.log("clicked");
  listContainer.innerHTML = "";
  saveData();
});

loadData();
