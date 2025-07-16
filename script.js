document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const landing = document.getElementById('landing');
    const todoSection = document.getElementById('todo-section');
    const getStartedBtn = document.getElementById('get-started-btn');
    const homeLink = document.getElementById('home-link');
    const tasksLink = document.getElementById('tasks-link');
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const showAllBtn = document.getElementById('show-all');
    const showActiveBtn = document.getElementById('show-active');
    const showCompletedBtn = document.getElementById('show-completed');

    // State
    let tasks = [];
    let filter = 'all';

    // Navigation
    getStartedBtn.addEventListener('click', () => {
        landing.style.display = 'none';
        todoSection.style.display = 'block';
    });
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        landing.style.display = 'flex';
        todoSection.style.display = 'none';
    });
    tasksLink.addEventListener('click', (e) => {
        e.preventDefault();
        landing.style.display = 'none';
        todoSection.style.display = 'block';
    });

    // Task CRUD
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTask();
    });
    taskList.addEventListener('click', handleTaskClick);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    }

    function handleTaskClick(e) {
        const li = e.target.closest('li');
        const idx = parseInt(li?.dataset?.index);
        if (e.target.classList.contains('delete-btn')) {
            tasks.splice(idx, 1);
            renderTasks();
        } else if (e.target.classList.contains('edit-btn')) {
            const newText = prompt('Edit your task', tasks[idx].text);
            if (newText !== null && newText.trim() !== '') {
                tasks[idx].text = newText.trim();
                renderTasks();
            }
        } else if (e.target.classList.contains('task-text')) {
            tasks[idx].completed = !tasks[idx].completed;
            renderTasks();
        }
    }

    // Filters
    showAllBtn.addEventListener('click', () => { filter = 'all'; setActiveFilter(); renderTasks(); });
    showActiveBtn.addEventListener('click', () => { filter = 'active'; setActiveFilter(); renderTasks(); });
    showCompletedBtn.addEventListener('click', () => { filter = 'completed'; setActiveFilter(); renderTasks(); });

    function setActiveFilter() {
        [showAllBtn, showActiveBtn, showCompletedBtn].forEach(btn => btn.classList.remove('active'));
        if (filter === 'all') showAllBtn.classList.add('active');
        else if (filter === 'active') showActiveBtn.classList.add('active');
        else if (filter === 'completed') showCompletedBtn.classList.add('active');
    }

    function renderTasks() {
        taskList.innerHTML = '';
        let filtered = tasks;
        if (filter === 'active') filtered = tasks.filter(t => !t.completed);
        else if (filter === 'completed') filtered = tasks.filter(t => t.completed);
        filtered.forEach((task, i) => {
            const li = document.createElement('li');
            li.dataset.index = tasks.indexOf(task);
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span class="task-text" style="cursor:pointer;">${task.text}</span>
                <div>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    setActiveFilter();
    renderTasks();
});
