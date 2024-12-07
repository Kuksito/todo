import './styles.css';

const addTaskBtn = document.querySelector('#btn-add-task');
const addListBtn = document.querySelector('#btn-add-list');
const dialog = document.querySelector('[data-dialog]');
const form = document.querySelector('#task-form');
const taskContainer = document.querySelector('#task-container');
const listContainer = document.querySelector('#list-container');
const listSelect = document.querySelector('#list');
const listDialog = document.querySelector('#list-dialog');
const listForm = document.querySelector('#list-form');

const tasks = [];
const lists = [];
let newTask;
let listInfo;

class Task{
    constructor(title, description, dueDate, priority, list){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.list = list;
    }
    displayTaskInfo(task){
        createTaskInfo(task);
    }
};

addTaskBtn.addEventListener('click', () => {
    dialog.showModal();
});

function createTaskInfo(task){
    const taskWrapper = document.createElement('div');
    const taskInfo = document.createElement('div');
    const taskTitleWrapper = document.createElement('div');
    const taskTitle = document.createElement('h4');
    const taskPriority = document.createElement('span');
    const taskDueDate = document.createElement('p');
    const taskBtnsContainer = document.createElement('div');
    const btnCheck = document.createElement('button');
    const btnDelete = document.createElement('button');
    const taskDescr = document.createElement('p');

    taskWrapper.classList.add('item');
    taskInfo.classList.add('item-info');
    taskTitleWrapper.classList.add('title-wrapper');
    taskTitle.classList.add('item-title');
    taskPriority.classList.add('priority');
    taskDueDate.classList.add('date');
    taskBtnsContainer.classList.add('item-btns');
    btnCheck.classList.add('btn', 'btn-check');
    btnDelete.classList.add('btn');
    taskDescr.classList.add('description');

    taskTitle.textContent = `${task.title}`;
    taskPriority.textContent = `${task.priority}`;
    taskDueDate.textContent = `due to: ${task.dueDate}`;
    taskDescr.textContent = `${task.description}`;
    btnDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 26 26">
<path d="M 11.5 -0.03125 C 9.542969 -0.03125 7.96875 1.59375 7.96875 3.5625 L 7.96875 4 L 4 4 C 3.449219 4 3 4.449219 3 5 L 3 6 L 2 6 L 2 8 L 4 8 L 4 23 C 4 24.644531 5.355469 26 7 26 L 19 26 C 20.644531 26 22 24.644531 22 23 L 22 8 L 24 8 L 24 6 L 23 6 L 23 5 C 23 4.449219 22.550781 4 22 4 L 18.03125 4 L 18.03125 3.5625 C 18.03125 1.59375 16.457031 -0.03125 14.5 -0.03125 Z M 11.5 2.03125 L 14.5 2.03125 C 15.304688 2.03125 15.96875 2.6875 15.96875 3.5625 L 15.96875 4 L 10.03125 4 L 10.03125 3.5625 C 10.03125 2.6875 10.695313 2.03125 11.5 2.03125 Z M 6 8 L 11.125 8 C 11.25 8.011719 11.371094 8.03125 11.5 8.03125 L 14.5 8.03125 C 14.628906 8.03125 14.75 8.011719 14.875 8 L 20 8 L 20 23 C 20 23.5625 19.5625 24 19 24 L 7 24 C 6.4375 24 6 23.5625 6 23 Z M 8 10 L 8 22 L 10 22 L 10 10 Z M 12 10 L 12 22 L 14 22 L 14 10 Z M 16 10 L 16 22 L 18 22 L 18 10 Z"></path>
</svg>`;
    taskPriority.style.paddingRight = '5px';
    taskDescr.style.display = 'none';

    taskWrapper.append(taskInfo, taskDescr);
    taskInfo.append(taskTitleWrapper, taskBtnsContainer);
    taskTitleWrapper.append(taskTitle, taskDueDate);
    taskTitle.prepend(taskPriority);
    taskBtnsContainer.append(btnCheck, btnDelete);

    generatePriorityColor(taskPriority);
    generateCheckBtn(btnCheck, taskTitleWrapper);
    openCloseDescription(taskTitleWrapper, taskDescr);
    deleteTask(btnDelete, taskWrapper);
};

function generatePriorityColor(priority){
    if(priority.textContent === '1'){
        priority.style.color = 'brown';
    }
    if(priority.textContent === '2'){
        priority.style.color = '#ff8f00';
    }
    if(priority.textContent === '3'){
        priority.style.color = '#08bd08';
    }
};

function generateCheckBtn(btnCheck, taskTitleWrapper){
    btnCheck.addEventListener('click', () => {
        if(btnCheck.textContent != ''){
            btnCheck.textContent = '';
            taskTitleWrapper.style.textDecorationLine = 'blink';
        } else {
            btnCheck.textContent = '✔';
            btnCheck.style.color = 'blue';
            btnCheck.style.fontSize = '2rem';
            taskTitleWrapper.style.textDecorationLine = 'line-through';
        }
    });
};

function deleteTask(deleteBtn, item){
    deleteBtn.addEventListener('click', () => {
        item.remove();
        tasks.splice(item);    
        console.log(tasks);
    });
};

function openCloseDescription(taskTitleWrapper, descr){
    taskTitleWrapper.addEventListener('click', () => {
        if(descr.style.display === 'block'){
            descr.style.display = 'none';
        } else {
            descr.style.display = 'block';
        }
    });
};

function addTask(){
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        newTask = new Task(title.value, description.value, dueDate.value, priority.value);
        tasks.push(newTask);
        dialog.close();
        form.reset();
        displayTask();        
    });
};

//addTask();

function displayTask(){
    taskContainer.innerHTML = '';
    for(let i = 0; i < tasks.length; i++){
        newTask.displayTaskInfo(tasks[i]);
    };
};

function createListInfo(){
    const listWrapper = document.createElement('div');
    const item = document.createElement('div');
    const taskTitle = document.createElement('h4');
    const taskPriority = document.createElement('span');
    const taskBtnsContainer = document.createElement('div');
    const btnCheck = document.createElement('button');
    const btnDelete = document.createElement('button');
    const descr = document.createElement('p');
    const listTitle = document.querySelector('#list-title');
    const newList = document.createElement('p');
    newList.innerHTML = listTitle.value;
    listWrapper.setAttribute('id',`${newList.textContent}`);
    listWrapper.classList.add('list-wrapper');
    listTitle.classList.add('list-title');
    item.classList.add('item');
    taskTitle.classList.add('item-title');
    taskPriority.classList.add('priority');
    taskBtnsContainer.classList.add('item-btns', 'item-btn-small');
    btnCheck.classList.add('btn', 'btn-check', 'btn-small');
    btnDelete.classList.add('btn', 'btn-small');
    listContainer.append(listWrapper);
    listWrapper.append(newList, item);

    lists.push(newList.textContent);
    console.log(listWrapper.id)

    return function displayTaskInAList(newTask){
        item.append(newTask)
    };
};

addListBtn.addEventListener('click', ()=>{
    listDialog.showModal();
});

listForm.addEventListener('submit', (e) => {
    e.preventDefault();
    listInfo = createListInfo();
    updateListOptions();
    listDialog.close();
    listForm.reset();
});

function updateListOptions(){
    const option = document.createElement('option');
    for(let i = 0; i < lists.length; i++){
        option.value = lists[i];
        option.textContent = lists[i];
        option.id = i;
        listSelect.append(option);
    };
};

listSelect.addEventListener('click', getSelectedValue);

function getSelectedValue(){
    const selected = listSelect.value;
    if(lists.includes(selected)){
        appendTaskToList()
    } else {
        addTask()
    }
};

const a = [];

function appendTaskToList(){
    form.addEventListener('submit', (e) => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    e.preventDefault();
    const taskTitle = document.getElementById('title');
    const taskDescr = document.getElementById('description');
    const taskDueDate = document.getElementById('dueDate');
    const taskPriority = document.getElementById('priority');

    const newTask = document.createElement('div');
    newTask.classList.add('item-info');
    newTask.innerHTML = `
    <h4 class="item-title" id="task-title"><span class="priority" id="task-priority">${taskPriority.value}</span>${taskTitle.value}</h4>
    <p class="date" id="task-date">${taskDueDate.value}</p>
    <div class="item-btns">
        <button class="btn btn-check" id="task-btn-check"></button>
        <button class="btn" id="task-delete-btn"></button>
    </div>
    <p class="description" id="task-description">${taskDescr.value}</p>`

    // APPEND NEW TASK IN THE LAST LIST!!! WITH EMPTY DIV AFTER
    listInfo(newTask);
    saveTaskToLocalStorage(newTask);
    localStorage.setItem('tasks', JSON.stringify(savedTasks))
    dialog.close();
    form.reset();
    });
};

function saveTaskToLocalStorage(task){
    const savedTasks = [];
    savedTasks.push(task.textContent);
    const uniqueTasks = [...new Set(savedTasks)]
    localStorage.setItem('savedTasks', JSON.stringify(uniqueTasks));
    console.log(uniqueTasks)
};

// does not work!!!
function getTasksFromLocalStorage(){
    const savedTasks = JSON.parse(localStorage.getItem('savedTasks')) || [];
    savedTasks.forEach(task => {
        const taskTitle = document.getElementById('title');
        const taskDescr = document.getElementById('description');
        const taskDueDate = document.getElementById('dueDate');
        const taskPriority = document.getElementById('priority');

        const newTask = document.createElement('div');
        newTask.classList.add('item-info');
        newTask.innerHTML = `
        <h4 class="item-title" id="task-title"><span class="priority" id="task-priority">${taskPriority.value}</span>${taskTitle.value}</h4>
        <p class="date" id="task-date">${taskDueDate.value}</p>
        <div class="item-btns">
            <button class="btn btn-check" id="task-btn-check"></button>
            <button class="btn" id="task-delete-btn"></button>
        </div>
        <p class="description" id="task-description">${taskDescr.value}</p>`

        // APPEND NEW TASK IN THE LAST LIST!!! WITH EMPTY DIV AFTER
        listInfo(newTask);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    getTasksFromLocalStorage();
})