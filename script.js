let categories = [
  { title: "XR Applications", img: "xr.png" },
  { title: "English", img: "uk.png" },
  { title: "Social Psychology", img: "psychology.png" },
  { title: "Computer Logic", img: "logic.png" },
  { title: "Data Analysis", img: "data.png" },
  { title: "Information Security", img: "information-security.png" },
  { title: "Math", img: "math.png" },
  { title: "Blockchain", img: "blockchain.png" },
];

let tasks = [];

// Preselect the first category
let selectedCategory = categories[0];

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const wrapper = document.querySelector('.wrapper-main');

  function handleLogin(event) {
    event.preventDefault(); // Preventing the default form submission behavior
    const username = document.querySelector("#username").value; // Getting the username from the input 
    const password = document.querySelector("#password").value; // Getting the password from the input 

    if (validateLogin(username, password)) { //  checking here the credentials
      localStorage.setItem('isLoggedIn', 'true'); // Store login status in localStorage
      localStorage.setItem('username', username); // Store the username
      showMainContent();
    } else {
      alert("Invalid credentials");
    }
  }

  function validateLogin(username, password) {
    // Simple validation just for now, I'll update it further
    return username === "Can" && password === "pass";
  }

  function showMainContent() {
    wrapper.classList.remove("show-login");
    document.querySelector(".welcome h1").textContent = `Welcome, ${localStorage.getItem('username')}!`;
  }

  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      showMainContent();
    } else {
      wrapper.classList.add('show-login');
    }
  }

  checkLoginStatus();
  loginForm.addEventListener('submit', handleLogin);
});

// Main
const mainWrapper = document.querySelector(".wrapper");
const backBtn = document.querySelector(".back-btn");
const menuBtn = document.querySelector(".menu-btn");

// Category Toggle Part
const toggleScreen = () => {
  mainWrapper.classList.toggle("show-category");
};

menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);

const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");

const toggleAddTaskForm = () => {
  addTaskForm.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm); // for mobile

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");

const calculateTotal = () => {
  const categoryTasks = tasks.filter(task => task.category.toLowerCase() === selectedCategory.title.toLowerCase());
  totalCategoryTasks.innerHTML = `${categoryTasks.length} Tasks`;
  totalTasks.innerHTML = tasks.length;
};

const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach(category => {
    const categoryTasks = tasks.filter(task => task.category.toLowerCase() === category.title.toLowerCase());
    const div = document.createElement("div");
    div.classList.add("category");
    div.addEventListener("click", () => {
      mainWrapper.classList.add("show-category");
      selectedCategory = category;
      calculateTotal();
      categoryTitle.innerHTML = category.title;
      categoryImg.src = `images/${category.img}`;
      renderTasks();
    });
    div.innerHTML = `
      <div class="left">
        <img src="images/${category.img}" alt="${category.title}">
        <div class="content">
          <h1>${category.title}</h1>
          <p>${categoryTasks.length} Tasks</p>
        </div>
      </div>
      <div class="options">
        <div class="toggle-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </div>
      </div>
    `;
    categoriesContainer.appendChild(div);
  });
};

const tasksContainer = document.querySelector(".tasks");

const renderTasks = () => {
  tasksContainer.innerHTML = "";
  const categoryTasks = tasks.filter(task => task.category.toLowerCase() === selectedCategory.title.toLowerCase());
  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-task">No tasks for this category</p>`;
  } else {
    categoryTasks.forEach(task => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");
      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        const index = tasks.findIndex(t => t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        saveLocal();
        calculateTotal();
        renderCategories();
      });

      div.innerHTML = `
        <div class="delete">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
          </svg>
        </div>
      `;

      label.innerHTML = `
        <span class="checkmark">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <p>${task.task}</p>
      `;

      label.prepend(checkbox);
      div.prepend(label);
      tasksContainer.appendChild(div);

      const deleteBtn = div.querySelector(".delete");
      deleteBtn.addEventListener("click", () => {
        const index = tasks.findIndex(t => t.id === task.id);
        tasks.splice(index, 1);
        saveLocal();
        renderTasks();
        calculateTotal();
        renderCategories();
      });
    });
  }
};

// saving and getting tasks from local storage
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getLocal = () => {
  const localTasks = JSON.parse(localStorage.getItem("tasks"));
  //if tasks found
  if (localTasks) {
    tasks = localTasks;
  }
};

// adding functionality to add new tasks
const categorySelect = document.querySelector("#category-select");
const taskInput = document.querySelector("#task-input");
const cancelBtn = document.querySelector(".cancel-btn");
cancelBtn.addEventListener("click", toggleAddTaskForm);

const addBtn = document.querySelector(".add-btn");
const addTask = (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const category = categorySelect.value;

  if (task === "") {
    alert("Please enter a task");
  } else {
    const newTask = {
      id: tasks.length + 1,
      task,
      category,
      completed: false,
    };
    taskInput.value = "";
    tasks.push(newTask);
    saveLocal();
    toggleAddTaskForm();
    renderTasks();
    calculateTotal();
    renderCategories();
  }
};
addBtn.addEventListener("click", addTask);

categories.forEach(category => {
  const option = document.createElement("option");
  option.value = category.title.toLocaleLowerCase();
  option.textContent = category.title;
  categorySelect.appendChild(option);
});

getLocal();
calculateTotal();
renderCategories();
renderTasks();
