const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListners();

//  Load all event listners
function loadEventListners() {
    // add task evnt 
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', reomveTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTask);
    // Filter task event
    filter.addEventListener('keyup', filterTask);
    // Dom Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
}
// Get Tasks from LS
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append is to ul
        taskList.appendChild(li);
    });
}
// Add Task
function addTask(e) {
    if (taskInput.value === ' ') {
        alert('Add a task');
    }
    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append is to ul
    taskList.appendChild(li);
    // Store in Ls
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';

    // console.log(li);

    e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        task = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    task.push(task);
    localStorage.setItem('task', JSON.stringify(tasks));
}
// Remove task

function reomveTask(e) {
    if (e.target.partentElement.classList.contains('delete-item'))
    {
        if(confirm('Are You sure?')){
            e.target.partentElement.partentElement.remove();
            // reomove from Ls
            reomoveTaskFromLocalStorage(e.target.partentElement.partentElement);
    }
  }
}
// Reomve from Ls
function reomoveTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        if (taskItem.textContent ===  task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}
// clear task
function clearTask() {
    // taskList.innerHTML = ' ';
    // faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
// https://jsperf.com/innerhtml-vs-removechild

// clear from LS
    clearTaskFromLocalStorage();
}
// clear task for lS
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

// filter task
function filterTask() {
    const text = e.target.vale.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
        }
    );
}
