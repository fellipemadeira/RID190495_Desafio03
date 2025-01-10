let tasks = [
    { id: 1 , description: 'Implementar tela de listagem de tarefa', etiqueta: 'frontend', dia: '09/01/2025',  checked: false},
    { id: 2 , description: 'Criar endpoint para cadastro de tarefas', etiqueta: 'backend', dia: '09/01/2025',  checked: false},
    { id: 3 , description: 'Implementar protótipo da listagem de tarefas', etiqueta: 'ux', dia: '09/01/2025',
    checked: false},
]

const getCheckBoxInput = ({id, description, etiqueta, dia, checked}) => {
    const checkbox = document.createElement('input');
    const label = document.createElement ('label');
    const wrapper = document.createElement ('div');
    const checkboxId = `${id}-checkbox`;

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = checked || false;

    label.textContent = `${description}  ${etiqueta} Criado em: ${dia}`;
    label.htmlFor = checkboxId;
    wrapper.className = 'checkbox-label-container';
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper;
}

const getNewTaskId = () => {
    const lastId = tasks [tasks.length - 1]?.id;
    return lastId ? lastId + 1 : 1; 
}

const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;
    const etiqueta = event.target.elements.etiqueta.value;
    const id = getNewTaskId();

    return {id, description, etiqueta, dia}
}

const createTask = (event) => {
    const NewTaskData = getNewTaskData (event);
    const {id, description, etiqueta, dia} = NewTaskData;

    const checkbox = getCheckBoxInput (NewTaskData)
    event.preventDefault();
}



window.onload = function() {
    const form = document.getElementById('create-todo-form');
    form.addEventListener ('submit', createTask)


    tasks.forEach((task) => {
        const checkbox =  getCheckBoxInput(task);

        createTaskListItem(task, checkbox)
    })
}
