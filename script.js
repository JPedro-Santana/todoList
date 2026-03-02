document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const nameList = params.get("list");

  const taskInput = document.getElementById("task-input");
  const addButton = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");
  const todoContainer = document.querySelector(".todo-container");
  const progressBar = document.getElementById("progress");
  const progressNumbers = document.getElementById("numbers");
  const listName = document.getElementById("list-name");

  const getLists = () => {
    return JSON.parse(localStorage.getItem("lists")) || {};
  };

  const saveLists = (lists) => {
    localStorage.setItem("lists", JSON.stringify(lists));
  };

  if (!nameList) {
  const form = document.querySelector(".input-area");
  const ul = document.querySelector(".lists-ul");

  if (!form || !ul) return;

  const renderLists = () => {
    const lists = getLists();
    ul.innerHTML = "";

    Object.keys(lists).forEach((name) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";

      const span = document.createElement("span");
      span.textContent = name;
      span.style.cursor = "pointer";

      span.addEventListener("click", () => {
        window.location.href = `./list.html?list=${encodeURIComponent(
          name
        )}`;
      });

      const buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("list-buttons");
      buttonsDiv.style.display = "flex";
      buttonsDiv.style.gap = "10px";

      /* EDIT BUTTON */
      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
      editBtn.classList.add("edit-btn");

      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const newName = prompt("Novo nome da lista:", name);
        if (!newName || newName.trim() === "" || newName === name) return;

        const lists = getLists();

        if (lists[newName]) {
          alert("Já existe uma lista com esse nome.");
          return;
        }

        lists[newName] = lists[name];
        delete lists[name];

        saveLists(lists);
        renderLists();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteBtn.classList.add("delete-btn");

      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const confirmDelete = confirm(
          `Are you sure you want to delete the "${name}"?`
        );

        if (!confirmDelete) return;

        const lists = getLists();
        delete lists[name];
        saveLists(lists);
        renderLists();
      });

      buttonsDiv.appendChild(editBtn);
      buttonsDiv.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(buttonsDiv);

      ul.appendChild(li);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const input = form.querySelector("input");
    const name = input.value.trim();

    if (!name) return;

    const lists = getLists();

    if (lists[name]) {
      alert("Lista já existe!");
      return;
    }

    lists[name] = [];
    saveLists(lists);

    input.value = "";
    renderLists();
  });

  renderLists();
  return;
}

  if (!taskList || !taskInput) return;

  listName.textContent = nameList;

  const toggleEmpty = () => {
    todoContainer.style.width =
      taskList.children.length > 0 ? "100%" : "50%";
  };

  const updateProgress = (checkCompletion = true) => {
    const totalTasks = taskList.children.length;
    const completedTasks =
      taskList.querySelectorAll(".checkbox:checked").length;

    const motivation = document.querySelector(".motivation");

    const completion = totalTasks
      ? (completedTasks / totalTasks) * 100
      : 0;

    if (progressBar)
      progressBar.style.width = totalTasks
        ? `${completion}%`
        : "0%";

    if (progressNumbers)
      progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

    if (motivation) {
      if (completion >= 50 && completion < 100) {
        motivation.textContent = "Almost Done!";
      } else if (completion === 100 && totalTasks > 0) {
        motivation.textContent = "Great Job!";
        if (checkCompletion) showConfetti();
      } else {
        motivation.textContent = "Keep it Up!";
      }
    }
  };

  const saveTasks = () => {
    const lists = getLists();

    lists[nameList] = Array.from(
      taskList.querySelectorAll("li")
    ).map((li) => ({
      text: li.querySelector("span").textContent,
      completed: li.querySelector(".checkbox").checked,
    }));

    saveLists(lists);
  };

  const loadTasks = () => {
    const lists = getLists();
    const tasks = lists[nameList] || [];

    tasks.forEach(({ text, completed }) => {
      addTask(text, completed, false);
    });

    toggleEmpty();
    updateProgress(false);
  };

  const addTask = (text, completed = false, checkCompletion = true) => {
    const taskText = text || taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${
        completed ? "checked" : ""
      }/>
      <span>${taskText}</span> 
      <div class="task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    const checkbox = li.querySelector(".checkbox");
    const editBtn = li.querySelector(".edit-btn");

    if (completed) {
      li.classList.add("completed");
      editBtn.disabled = true;
      editBtn.style.opacity = "0.5";
      editBtn.style.pointerEvents = "none";
    }

    checkbox.addEventListener("change", () => {
      const isChecked = checkbox.checked;
      li.classList.toggle("completed", isChecked);
      editBtn.disabled = isChecked;
      editBtn.style.opacity = isChecked ? "0.5" : "1";
      editBtn.style.pointerEvents = isChecked ? "none" : "auto";
      updateProgress();
      saveTasks();
    });

    editBtn.addEventListener("click", () => {
      if (!checkbox.checked) {
        taskInput.value = li.querySelector("span").textContent;
        li.remove();
        toggleEmpty();
        updateProgress(false);
        saveTasks();
      }
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
      toggleEmpty();
      updateProgress();
      saveTasks();
    });

    taskList.appendChild(li);
    taskInput.value = "";
    toggleEmpty();
    updateProgress(checkCompletion);
    saveTasks();
  };

  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });

  loadTasks();
});

const showConfetti = () => {
  if (typeof confetti !== "undefined") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
};