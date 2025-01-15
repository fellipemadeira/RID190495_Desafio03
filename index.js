let tasks = [
    { id: 1 , description: 'Implementar tela de listagem de tarefa', etiqueta: 'frontend', date: '09/01/2025',  checked: false},
    { id: 2 , description: 'Criar endpoint para cadastro de tarefas', etiqueta: 'backend', date: '09/01/2025',  checked: false},
    { id: 3 , description: 'Implementar protótipo da listagem de tarefas', etiqueta: 'ux', date: '09/01/2025',
    checked: false},
]

const renderTasksProgressData = (tasks) => {
    let tasksProgress;
    const tasksProgressDOM = document.getElementById('tasks-progress');

    if (tasksProgressDOM) {
        tasksProgress = tasksProgressDOM;
    } else {
        const newTasksProgressDOM = document.createElement('div');
        newTasksProgressDOM.id = 'tasks-progress';
        document.getElementById('todo-footer').appendChild(newTasksProgressDOM);
        tasksProgress = newTasksProgressDOM;
    }

    const doneTasks = tasks.filter(({ checked }) => checked).length;
    tasksProgress.textContent = `${doneTasks} tarefas concluídas`;
};


const createTaskListItem = (task, checkbox) => {
    const list = document.getElementById('todo-list'); 
    const toDo = document.createElement('li');

    toDo.id = task.id;
    toDo.appendChild(checkbox);
    list.appendChild(toDo);
};

const getCheckBoxInput = ({ id, description, etiqueta, date, checked }) => {
    const wrapper = document.createElement('div');
    const checkbox = document.createElement('input');
    const buttonLabel = document.createElement('span');
    const descriptionDiv = document.createElement('div');
    const detailsDiv = document.createElement('div');
    const etiquetaSpan = document.createElement('span');
    const dateSpan = document.createElement('span');
    const checkboxId = `${id}-checkbox`;

    wrapper.className = 'checkbox-wrapper';
    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = checked || false;
    checkbox.className = 'hidden-checkbox';

    checkbox.addEventListener('change', () => {
        tasks.find(task => task.id === id).checked = checkbox.checked;
        renderTasksProgressData(tasks);
    });


    descriptionDiv.textContent = description;
    descriptionDiv.className = 'task-description';


    etiquetaSpan.textContent = etiqueta;
    etiquetaSpan.className = 'task-etiqueta';


    dateSpan.textContent = `Criado em: ${date}`;
    dateSpan.className = 'task-date';

    detailsDiv.className = 'task-details';
    detailsDiv.appendChild(etiquetaSpan);
    detailsDiv.appendChild(dateSpan);


    buttonLabel.className = 'button-label';
    buttonLabel.textContent = 'Concluir';

    wrapper.appendChild(checkbox);
    wrapper.appendChild(buttonLabel);
    wrapper.appendChild(descriptionDiv);
    wrapper.appendChild(detailsDiv);

    return wrapper;
};

const getNewTaskId = () => {
    const lastId = tasks [tasks.length - 1]?.id;
    return lastId ? lastId + 1 : 1; 
}

const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;
    const etiqueta = event.target.elements.etiqueta.value;
    const id = getNewTaskId();
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    const date = `${day}/${month}/${year}`;

    return { id, description, etiqueta, date };
}

const createTask = (event) => {
    event.preventDefault(); 

    const newTaskData = getNewTaskData(event);
    tasks.push(newTaskData); 

    const checkbox = getCheckBoxInput(newTaskData);
    createTaskListItem(newTaskData, checkbox);
}




window.onload = function() {
    const form = document.getElementById('create-todo-form');
    form.addEventListener ('submit', createTask)


    tasks.forEach((task) => {
        const checkbox =  getCheckBoxInput(task);

        createTaskListItem (task, checkbox);
    })

    renderTasksProgressData(tasks);
}
