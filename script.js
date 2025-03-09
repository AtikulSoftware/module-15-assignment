let todos = [
  {
    name: "Todo 1",
    description: "Description 1",
    date: "2021-09-01",
    status: "incomplete",
  },
];

// initial render
renderTodos();
filterStatus();

const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");

document.getElementById("add-btn").addEventListener("click", () => {
  const name = document.getElementById("todo-name").value.trim();
  const description = document.getElementById("todo-description").value.trim();
  const date = document.getElementById("todo-date").value;
  const status = document.getElementById("todo-status").value;

  if (name === "" || description === "" || date === "") return;

  todos.push({ name, description, date, status });
  document.getElementById("todo-name").value = "";
  document.getElementById("todo-description").value = "";
  document.getElementById("todo-date").value = "";
  document.getElementById("todo-status").value = "incomplete";
  renderTodos();
});

function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "flex",
      "flex-col",
      "border-[1px]",
      "border-gray-200",
      "p-4",
      "rounded",
      "gap-1",
      "m-2"
    );
    listItem.innerHTML = `
              <strong>${todo.name}</strong>
              <p>${todo.description}</p>
              <small>Due: ${todo.date} | Status: ${todo.status}</small>
              <div class="flex justify-end gap-2">
                  <button class="text-yellow-500 px-2 edit-btn" onclick="editTodo(${index})">Edit</button>
                  <button class="text-red-500 px-2 delete-btn" onclick="deleteTodo(${index})">Delete</button>
              </div>
          `;
    list.appendChild(listItem);
  });
  filterStatus();
}

function editTodo(index) {
  modal.classList.remove("hidden");

  document.getElementById("todo-name-update").value = todos[index].name;
  document.getElementById("todo-description-update").value =
    todos[index].description;
  document.getElementById("todo-date-update").value = todos[index].date;
  document.getElementById("todo-status-update").value = todos[index].status;

  document.getElementById("update-btn").onclick = function () {
    const updatedName = document.getElementById("todo-name-update").value;
    const updatedDescription = document.getElementById(
      "todo-description-update"
    ).value;
    const updatedDate = document.getElementById("todo-date-update").value;
    const updatedStatus = document.getElementById("todo-status-update").value;

    todos[index] = {
      name: updatedName,
      description: updatedDescription,
      date: updatedDate,
      status: updatedStatus,
    };

    renderTodos();
    modal.classList.add("hidden");
  };
}

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function getStatusCounts(todos) {
  const statusCounts = {
    incomplete: 0,
    pending: 0,
    complete: 0,
  };

  todos.forEach((todo) => {
    if (todo.status === "incomplete") {
      statusCounts.incomplete++;
    } else if (todo.status === "pending") {
      statusCounts.pending++;
    } else if (todo.status === "complete") {
      statusCounts.complete++;
    }
  });

  return statusCounts;
}

function filterStatus() {
  const statusCounts = getStatusCounts(todos);
  console.log(statusCounts);
  document.getElementById("complete").textContent  = `Complete [ ${statusCounts.complete} ]`;
  document.getElementById("incomplete").textContent  = `Incomplete [ ${statusCounts.incomplete} ]`;
  document.getElementById("pending").textContent  = `Pending [ ${statusCounts.pending} ]`;
}
