//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector(".todo__input--new-task");//Add a new task.
const addButton = document.querySelector(".todo__button--add-task");//first button
const incompleteTaskHolder = document.querySelector(".todo__list--open-task");//ul of #incompleteTasks
const completedTasksHolder = document.querySelector(".todo__list--completed-task");//completed-tasks

//New task list item
let createNewTaskElement = function(taskString) {

  let listItem = document.createElement("li");
  listItem.className = "todo__task";

  //input (checkbox)
  let checkBox = document.createElement("input");//checkbox
  checkBox.type = "checkbox";
  checkBox.className = "todo__input-checkbox";
  //label
  let label = document.createElement("label");//label
  label.innerText = taskString;
  label.className = "todo__input-label";
  //input (text)
  let editInput = document.createElement("input");//text
  editInput.type = "text";
  editInput.className = "todo__input todo__input--hidden";
  //button.edit
  let editButton = document.createElement("button");//edit button
  editButton.innerText = "Edit";
  editButton.className = "todo__button todo__button--edit";

  //button.delete
  let deleteButton = document.createElement("button");//delete button
  deleteButton.className = "todo__button todo__button--delete";
  let deleteButtonImg = document.createElement("img");//delete button image
  deleteButton.appendChild(deleteButtonImg);
  deleteButtonImg.className = "todo__delete-img";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove task icon";

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

let addTask = function() {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.

let editTask = function() {
  console.log("Edit Task...");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector('.todo__input');
  let label = listItem.querySelector(".todo__input-label");
  let editBtn = listItem.querySelector(".todo__button--edit");

  if (editBtn.innerText === 'Save') {
    console.log("Change 'save' to 'edit'");
    
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    console.log("Change 'edit' to 'save'");

    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle editmode on the parent.
  editInput.classList.toggle("todo__input--hidden")
  label.classList.toggle("todo__input-label--hidden")
};


//Delete task.
let deleteTask = function() {
  console.log("Delete Task...");
  
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
let taskCompleted = function() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  let label = listItem.querySelector(".todo__input-label")
  label.classList.add("todo__input-label--completed-task")
  bindTaskEvents(listItem, taskIncomplete);
}


let taskIncomplete = function() {
  console.log("Incomplete Task...");
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  let label = listItem.querySelector("todo__input-label");
  label.classList.remove("todo__input-label--completed-task")
  bindTaskEvents(listItem, taskCompleted);
}



let ajaxRequest = function() {
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

let bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("bind list item events");
//select ListItems children
  let checkBox = taskListItem.querySelector(".todo__input-checkbox");
  let editButton = taskListItem.querySelector(".todo__button");
  let deleteButton = taskListItem.querySelector(".todo__button--delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++){
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.