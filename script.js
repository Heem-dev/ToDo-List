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
  textElm.addEventListener("input", (e) => {
    const isAlphanumeric = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\s-]$/.test(
      e.data
    );
    if (!isAlphanumeric) {
      // e.preventDefault();
      saveData();
      return;
    } else if (isAlphanumeric) {
      // e.preventDefault();
      // textElm.value += e.key;
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
    //
    //   saveData();
    // });

    textElement.classList.add("taskText");
    textElement.setAttribute("value", taskInput.value);
    // textElement.value = taskInput.value;
    // textElement.setAttribute('readonly','readonly')
    // textElement.disabled = true
    textElement.maxLength = 26;

    const importanceValue = document.querySelector(
      "input[type=radio]:checked"
    ).value;
    newTask.setAttribute("data-importance", importanceValue);
    newTask.appendChild(finishedTask.cloneNode(true));
    newTask.appendChild(textElement);
    const importanceIndicator = document.createElement("span");
    importanceIndicator.setAttribute("data-importance", importanceValue);
    importanceIndicator.setAttribute("onclick", "importanceCycle(this.parentNode)");
    importanceIndicator.classList.add("importance_Indicator", importanceValue);
    newTask.appendChild(importanceIndicator);
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

function importanceCycle(elem) {
  let currentImportance = elem.getAttribute("data-importance");
  let nextImportance = "";
  switch (currentImportance) {
    case "low":
      nextImportance = "medium";
      break;
    case "medium":
      nextImportance = "high";
      break;
    case "high":
      nextImportance = "low";
      break;
  }
  elem.setAttribute("data-importance", nextImportance);
  elem.querySelector(".importance_Indicator").classList.remove(currentImportance);
  elem.querySelector(".importance_Indicator").classList.add(nextImportance);
  saveData();
}


loadData();
