const createtasklistItem = (task , checkbox) => {
    const list = document.getElementById ('todo-list');
    const todo =  document.createElement ('li');

    todo.id = task.id;
    todo.appendChild(checkbox);
    list.appendChild (todo);

    return todo;
}

const getCheckboxInput = ({id, description, checked}) => {
    const checkbox = document.createElement ('input');
    const label = document.createElement ('label');
    const wrapper = document.createElement ('div');
    const checkboxId = `${id}-checkbox`;

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = checked || false;
    
    label.textContent = description;
    label.htmlFor = checkboxId;
    wrapper.className = 'checkbox-label-container';

    wrapper.appendChild (checkbox);
    wrapper.appendChild (label);
    return wrapper;
    }

const getnewTaskId = () => {
    const lastId = tasks[tasks.length - 1]?.id;
    return lastId ? lastId +1 : 1;
}

const getnewTaskdata = (event) => {
    const description = event.target.elements.description.value;
    const id = getnewTaskId ();

    return {description , id};
}

const createTask = (event) => {
    event.preventdeFault();
    const newTaskData =  getnewTaskdata (event);
    const {id, description} = newTaskData;
    const checkbox = getCheckboxInput (newTaskData)
    console.log (lastId);
}

window.onload = function () {
    const form = document.getElementById('create-todo-form'); 
    form.addEventListener('submit', createTask);

    tasks.forEach ((task) => {
        const checkbox = getCheckboxInput(task);
        createtasklistItem (task, checkbox);

    })
}