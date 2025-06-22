function addTask() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span onclick="toggleComplete(this)">${taskText}</span>
    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
  `;

  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
}

function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
}

function toggleComplete(span) {
  span.parentElement.classList.toggle("completed");
}
