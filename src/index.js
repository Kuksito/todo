import './styles.css';

const content = document.querySelector('#content');
const addTaskBtn = document.querySelector('#btn-add-task');
const addListBtn = document.querySelector('#btn-add-list');
const dialog = document.querySelector('[data-dialog]');
const form = document.querySelector('#task-form');
const taskContainer = document.querySelector('#task-container');

const tasks = [];
let newTask;

class Task{
    constructor(title, description, dueDate, priority, list){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.list = list;
    }
    displayTaskInfo(task){
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
        itemPriority.style.paddingRight = '5px';
        item.append(itemInfo, descr);
        itemInfo.append(itemTitleWrapper, itemBtnsContainer);
        itemTitleWrapper.append(itemTitle, itemDueDate);
        itemTitle.prepend(itemPriority);
        itemBtnsContainer.append(btnCheck,btnDelete);
        taskContainer.append(item);

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
    }
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
        displayTask();
    });
};

addTask();

addTaskBtn.addEventListener('click', () => {
    dialog.showModal();
});

addListBtn.addEventListener('click', () => {

    // const listContainer = document.createElement('div');
    // const listWrapper = document.createElement('div');
    // const item = document.createElement('div');
    // const titleLabel = document.createElement('label');
    // const titleInput = document.createElement('input');
    // listContainer.classList.add('list-container');
    // listWrapper.classList.add('list-wrapper');
    // item.classList.add('item');
    // titleInput.type = 'text';
    // titleInput.id = 'list_title';
    // content.prepend(listContainer);
    // listContainer.append(listWrapper);
    // listWrapper.append(titleInput, item);
    
    // <div class="list-container">
    //     <div class="list-wrapper">
    //         <h3 class="list-title">list 1</h3>
    //         <div class="item">
    //             <h4 class="item-title"><span class="priority">4</span> title 2</h4>
    //             <div class="item-btns item-btn-small">
    //                 <button class="btn btn-check btn-small"></button>
    //                 <button class="btn btn-small">delete</button>
    //             </div>
    //         </div>
    //     </div>
    // </div>
})