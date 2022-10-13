import { tasks, updateTasks, refreshTasks } from './maketask.js';

function showDetailsListner() {
	const allTasks = document.querySelectorAll('.task');
	allTasks.forEach((taskDiv) => {
		taskDiv.firstChild.addEventListener('click', (event) => {
			if (taskDiv.childNodes.length == 1) {
				let findDiv = document.querySelector('.task-details-div');
				if (findDiv == null) {
					showDetails(taskDiv.id);
					// saveBtnListner();
				} else {
					findDiv.remove();
					showDetails(taskDiv.id);
					// saveBtnListner();
				}
			} else {
				let findDiv = document.querySelector('.task-details-div');
				findDiv.remove();
			}
		});
	});
}

function showDetails(id) {
	const div = document.getElementById(id);

	let detailsDiv = document.createElement('div');
	detailsDiv.className = 'task-details-div';

	let detailsForm = document.createElement('form');
	detailsForm.classList.add('task-details-form');

	let labelTitle = document.createElement('label');
	labelTitle.htmlFor = 'taskTitle';
	labelTitle.innerHTML = 'Task Name:';
	let inputTitle = document.createElement('input');
	inputTitle.type = 'text';
	inputTitle.id = 'taskTitle';
	inputTitle.name = 'taskTitle';
	inputTitle.value = tasks[id].title;

	let labelDueDate = document.createElement('label');
	labelDueDate.htmlFor = 'taskDueDate';
	labelDueDate.innerHTML = 'Due Date:';
	let inputDueDate = document.createElement('input');
	inputDueDate.type = 'date';
	inputDueDate.id = 'taskDueDate';
	inputDueDate.name = 'taskDueDate';
	inputDueDate.value = tasks[id].dueDate;

	let labelPriority = document.createElement('label');
	labelPriority.htmlFor = 'taskPriority';
	labelPriority.innerHTML = 'Priority:';
	let inputPriority = document.createElement('input');
	inputPriority.type = 'number';
	inputPriority.id = 'taskPriority';
	inputPriority.name = 'taskPriority';
	inputPriority.value = tasks[id].priority;

	let labelDesc = document.createElement('label');
	labelDesc.htmlFor = 'taskDescription';
	labelDesc.innerHTML = 'Description:';
	let inputDesc = document.createElement('input');
	inputDesc.type = 'text';
	inputDesc.id = 'taskDescription';
	inputDesc.name = 'taskDescription';
	inputDesc.value = tasks[id].description;

	let labelNotes = document.createElement('label');
	labelNotes.htmlFor = 'taskNotes';
	labelNotes.innerHTML = 'Notes:';
	let inputNotes = document.createElement('input');
	inputNotes.type = 'text';
	inputNotes.id = 'taskNotes';
	inputNotes.name = 'taskNotes';
	inputNotes.value = tasks[id].notes;

	let saveBtn = document.createElement('button');
	saveBtn.type = 'button';
	saveBtn.id = 'saveBtn';
	saveBtn.innerHTML = 'Save';

	detailsForm.appendChild(labelTitle);
	detailsForm.appendChild(inputTitle);
	detailsForm.appendChild(labelDueDate);
	detailsForm.appendChild(inputDueDate);
	detailsForm.appendChild(labelPriority);
	detailsForm.appendChild(inputPriority);
	detailsForm.appendChild(labelDesc);
	detailsForm.appendChild(inputDesc);
	detailsForm.appendChild(labelNotes);
	detailsForm.appendChild(inputNotes);
	detailsForm.appendChild(saveBtn);
	detailsDiv.appendChild(detailsForm);
	div.appendChild(detailsDiv);

	const saveTaskBtn = document.getElementById('saveBtn');
	saveTaskBtn.addEventListener('click', (event) => {
		const saveTaskBtnId = saveTaskBtn.closest('.task');
		// console.log(saveTaskBtnId.id);
		saveDetails(saveTaskBtnId.id);
		refreshTasks();
		updateTasks(tasks);
		showDetailsListner();
	});
}

function saveDetails(id) {
	const title = document.getElementById('taskTitle');
	// console.log(title.value);
	tasks[id].title = title.value;
	const dueDate = document.getElementById('taskDueDate');
	tasks[id].dueDate = dueDate.value;
	const priority = document.getElementById('taskPriority');
	tasks[id].priority = priority.value;
	const description = document.getElementById('taskDescription');
	tasks[id].description = description.value;
	const notes = document.getElementById('taskNotes');
	tasks[id].notes = notes.value;
	// updateTasks(tasks);
	// console.log(tasks);
}

export { showDetails };
export { saveDetails };
export { showDetailsListner };
