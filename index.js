// Get DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const editModal = document.getElementById('edit-modal');
const editTaskInput = document.getElementById('edit-task-input');
const saveChangesBtn = document.getElementById('save-changes-btn');
const closeModal = document.getElementById('close-modal');

let currentEditIndex = null;

// Function to create a new task item
function createTaskItem(taskText, index) {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    const taskName = document.createElement('span');
    taskName.className = 'task-name';
    taskName.textContent = taskText;
    li.appendChild(taskName);

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'complete-btn';
    completeBtn.onclick = () => toggleComplete(index);
    li.appendChild(completeBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => editTask(index);
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteTask(index);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// Add Task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        createTaskItem(taskText, taskList.children.length);
        taskInput.value = '';
    }
});

// Edit Task
function editTask(index) {
    currentEditIndex = index;
    const taskItem = taskList.children[index];
    const taskName = taskItem.querySelector('.task-name').textContent;
    editTaskInput.value = taskName;
    editModal.style.display = 'flex'; // Show modal
}

// Save Changes
saveChangesBtn.addEventListener('click', () => {
    const newTaskText = editTaskInput.value.trim();
    if (newTaskText && currentEditIndex !== null) {
        const taskItem = taskList.children[currentEditIndex];
        taskItem.querySelector('.task-name').textContent = newTaskText;
        editModal.style.display = 'none'; // Hide modal
        currentEditIndex = null;
    }
});

// Delete Task
function deleteTask(index) {
    taskList.removeChild(taskList.children[index]);
    // Adjust indices after removal
    Array.from(taskList.children).forEach((item, idx) => {
        item.querySelector('.complete-btn').onclick = () => toggleComplete(idx);
        item.querySelector('.edit-btn').onclick = () => editTask(idx);
        item.querySelector('.delete-btn').onclick = () => deleteTask(idx);
    });
}

// Toggle Task Completion
function toggleComplete(index) {
    const taskItem = taskList.children[index];
    taskItem.classList.toggle('completed');
}

// Close Modal
closeModal.addEventListener('click', () => {
    editModal.style.display = 'none'; // Hide modal
});
