document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const todoContainer = document.querySelector('.todo-container');
    const progressBar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');
    const listName = document.getElementById('list-name');

    const toggleEmpty = () => {
        lenght === 0 ? 'block' : 'none';
        todoContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };

    const updateProgress = (checkCompletion = true) => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length
        
        progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%'
        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

        const motivationalText = document.getElementsByClassName('motivation');
        if(completedTasks === '50%'){
            motivationalText.textContent = 'Almost Done';
        }

        if(checkCompletion && totalTasks > 0 && completedTasks === totalTasks){
            Confetti();
        }
    };

    const saveTasks = () =>{
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent, completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));

    };

    const loadTasks = () =>{
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({text, completed}) => addTask(text,completed,false));
        toggleEmpty();
        updateProgress();
    }

    const addTask = (text, completed = false, checkCompletion = true) => {
        const taskText = text || taskInput.value.trim();
        if(!taskText){      
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}/>
        <span>${taskText}</span> 
        <div class="task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        
        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');
        
        if(completed){
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () =>{
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress();
            saveTasks();
        });
        
        editBtn.addEventListener('click', () => {
            if(!checkbox.checked){
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmpty();
                updateProgress(false);
                saveTasks();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmpty();
            updateProgress();
            saveTasks();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmpty();
        updateProgress(checkCompletion);
        saveTasks();
    };

    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();     
                addTask();
        }

        loadTasks();
    });
});

const Confetti = () => {
    confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
});
}