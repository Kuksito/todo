import './styles.css';

const content = document.querySelector('#content');
const addTaskBtn = document.querySelector('#btn-add-task');
const addListBtn = document.querySelector('#btn-add-list');
const dialog = document.querySelector('[data-dialog]');
const form = document.querySelector('#task-form');
const formListBtn = document.querySelector('#list');
const taskContainer = document.querySelector('#task-container');
const listContainer = document.querySelector('#list-container');

const tasks = [];
const lists = [];
let newTask;
let newList;

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

function createTaskInfo(task){
    const item = document.createElement('div');
    const itemInfo = document.createElement('div');
    const itemTitleWrapper = document.createElement('div');
    const itemTitle = document.createElement('h4');
    const itemPriority = document.createElement('span');
    const itemDueDate = document.createElement('p');
    const itemBtnsContainer = document.createElement('div');
    const btnCheck = document.createElement('button');
    const btnDelete = document.createElement('button');
    const descr = document.createElement('p');
    // const listInfo = document.createElement('p');
    item.classList.add('item');
    itemInfo.classList.add('item-info');
    itemTitleWrapper.classList.add('title-wrapper');
    itemTitle.classList.add('item-title');
    itemPriority.classList.add('priority');
    itemDueDate.classList.add('date');
    itemBtnsContainer.classList.add('item-btns');
    btnCheck.classList.add('btn', 'btn-check');
    btnDelete.classList.add('btn');
    descr.classList.add('description');
    itemTitle.textContent = ` ${task.title}`;
    itemPriority.textContent = `${task.priority}`;
    itemDueDate.textContent = `due to: ${task.dueDate}`;
    descr.textContent = `${task.description}`;
    // listInfo.textContent = `${task.list}`;
    btnDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 26 26">
<path d="M 11.5 -0.03125 C 9.542969 -0.03125 7.96875 1.59375 7.96875 3.5625 L 7.96875 4 L 4 4 C 3.449219 4 3 4.449219 3 5 L 3 6 L 2 6 L 2 8 L 4 8 L 4 23 C 4 24.644531 5.355469 26 7 26 L 19 26 C 20.644531 26 22 24.644531 22 23 L 22 8 L 24 8 L 24 6 L 23 6 L 23 5 C 23 4.449219 22.550781 4 22 4 L 18.03125 4 L 18.03125 3.5625 C 18.03125 1.59375 16.457031 -0.03125 14.5 -0.03125 Z M 11.5 2.03125 L 14.5 2.03125 C 15.304688 2.03125 15.96875 2.6875 15.96875 3.5625 L 15.96875 4 L 10.03125 4 L 10.03125 3.5625 C 10.03125 2.6875 10.695313 2.03125 11.5 2.03125 Z M 6 8 L 11.125 8 C 11.25 8.011719 11.371094 8.03125 11.5 8.03125 L 14.5 8.03125 C 14.628906 8.03125 14.75 8.011719 14.875 8 L 20 8 L 20 23 C 20 23.5625 19.5625 24 19 24 L 7 24 C 6.4375 24 6 23.5625 6 23 Z M 8 10 L 8 22 L 10 22 L 10 10 Z M 12 10 L 12 22 L 14 22 L 14 10 Z M 16 10 L 16 22 L 18 22 L 18 10 Z"></path>
</svg>`;
    itemPriority.style.paddingRight = '5px';
    item.append(itemInfo, descr);
    itemInfo.append(itemTitleWrapper, itemBtnsContainer);
    itemTitleWrapper.append(itemTitle, itemDueDate);
    itemTitle.prepend(itemPriority);
    itemBtnsContainer.append(btnCheck,btnDelete);
    taskContainer.append(item);

    if(formListBtn.textContent != ''){
        item.append(itemInfo, descr);
        itemInfo.append(itemTitleWrapper, itemBtnsContainer);
        itemTitleWrapper.append(itemTitle, itemDueDate);
        itemTitle.prepend(itemPriority);
        itemBtnsContainer.append(btnCheck,btnDelete);
        taskContainer.append(item);
    }

    if(descr.textContent != ''){
        descr.style.display = 'none';
    };

    itemTitleWrapper.addEventListener('click', () => {
        if(descr.style.display === 'block'){
            descr.style.display = 'none';
        } else {
            descr.style.display = 'block';
        }
    });

    if(itemPriority.textContent === '1'){
        itemPriority.style.color = '#08bd08';
    }
    if(itemPriority.textContent === '2'){
        itemPriority.style.color = '#9b8900';
    }
    if(itemPriority.textContent === '3'){
        itemPriority.style.color = 'orange';
    }
    if(itemPriority.textContent === '4'){
        itemPriority.style.color = 'brown';
    }
    if(itemPriority.textContent === '5'){
        itemPriority.style.color = 'red';
    }

    btnCheck.addEventListener('click', () => {
        if(btnCheck.textContent != ''){
            btnCheck.textContent = '';
        } else {
            btnCheck.textContent = '✔';
            btnCheck.style.color = 'blue';
            btnCheck.style.fontSize = '2rem';
        }
    });

    return{item}
};

function displayTask(){
    taskContainer.innerHTML = '';
    for(let i = 0; i < tasks.length; i++){
        newTask.displayTaskInfo(tasks[i]);
    };
};

function addTask(){
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        newTask = new Task(title.value, description.value, dueDate.value, priority.value);
        tasks.push(newTask);
        dialog.close();
        form.reset();
        formListBtn.value = '';

        displayTask();
    });
};

addTask();

addTaskBtn.addEventListener('click', () => {
    dialog.showModal();
});

class List{
    constructor(listTitle){
        this.listTitle = listTitle;
    }

    displayList(list){
        const listWrapper = document.createElement('div');
        const listTitle = document.createElement('h3');
        const item = document.createElement('div');
        const itemTitle = document.createElement('h4');
        const itemPriority = document.createElement('span');
        const itemBtnsContainer = document.createElement('div');
        const btnCheck = document.createElement('button');
        const btnDelete = document.createElement('button');
        listWrapper.classList.add('list-wrapper');
        listTitle.classList.add('list-title');
        item.classList.add('item');
        itemTitle.classList.add('item-title');
        itemPriority.classList.add('priority');
        itemBtnsContainer.classList.add('item-btns', 'item-btn-small');
        btnCheck.classList.add('btn', 'btn-check', 'btn-small');
        btnDelete.classList.add('btn', 'btn-small');
        listTitle.textContent = `${list.listTitle}`;
        listContainer.append(listWrapper);
        listWrapper.append(listTitle, item);
    }
};

function addList(){
    listContainer.innerHTML = '';
    for(let i = 0; i < lists.length; i++){
        newList.displayList(lists[i]);
    };
};

addList();

addListBtn.addEventListener('click', () => {
    const titleInput = document.createElement('input');
    const titleLabel = document.createElement('label');
    const inputBtn = document.createElement('button');
    inputBtn.classList.add('btn')
    titleInput.type = 'text';
    titleInput.id = 'listTitle';
    titleLabel.textContent = 'Enter list title';
    inputBtn.innerHTML = `<svg width="18px" height="13px" viewBox="0 0 18 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>check</title><desc>Created with Sketch.</desc><g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Rounded" transform="translate(-171.000000, -3438.000000)"><g id="Navigation" transform="translate(100.000000, 3378.000000)"><g id="-Round-/-Navigation-/-check" transform="translate(68.000000, 54.000000)"><g><polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon><path d="M9,16.17 L5.53,12.7 C5.14,12.31 4.51,12.31 4.12,12.7 C3.73,13.09 3.73,13.72 4.12,14.11 L8.3,18.29 C8.69,18.68 9.32,18.68 9.71,18.29 L20.29,7.71 C20.68,7.32 20.68,6.69 20.29,6.3 C19.9,5.91 19.27,5.91 18.88,6.3 L9,16.17 Z" id="🔹-Icon-Color" fill="#1D1D1D"></path></g></g></g></g></g></svg>`;
    titleLabel.setAttribute('for', 'listTitle');
    listContainer.prepend(titleLabel, titleInput, inputBtn);

    inputBtn.addEventListener('click', () => {
        newList = new List(listTitle.value);
        lists.push(newList);
        addList();
    });
});

function createListDivs(){
    const recordOfList = document.createElement('div');
    recordOfList.classList.add('list-choose-wrapper');
    form.append(recordOfList);
    for(let i = 0; i < lists.length; i++){
        const recordDiv = document.createElement('div');
        recordDiv.classList.add('list-choose-div');
        recordDiv.append(lists[i].listTitle);
        recordOfList.append(recordDiv);

        recordDiv.addEventListener('click', () => {
            recordOfList.style.display = 'none';
            // formListBtn.textContent = recordDiv.textContent;  
            formListBtn.value = recordDiv.textContent; 
        });
    };
};


formListBtn.addEventListener('click', createListDivs);