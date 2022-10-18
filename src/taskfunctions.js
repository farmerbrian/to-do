import { projects } from './projectfunctions.js';
// import {makeProject} from './projectfunctions.js';
let tasks = [];

const makeTask = (project, title) => {
	const task = {};
	task.title = title;
	task.dueDate = '';
	task.priority = '';
	task.description = '';
	task.notes = '';
	task.complete = false;
	task.add = function () {
		projects[project].tasks.push(this);

		return projects[project].tasks;
	};
	// task.remove = function () {

	// };
	return task;
};

const content = document.getElementById('tasks-container');

function refreshTasks() {
	content.innerHTML = null;
}

function updateTasks(array) {
	for (let i = 0; i < array.length; i++) {
		let divEl = document.createElement('div');
		divEl.className = 'task';
		divEl.id = `${i}`;
		let divTitleEl = document.createElement('div');
		divTitleEl.className = 'task-title-div';
		let inputEl = document.createElement('input');
		inputEl.type = 'checkbox';
		inputEl.id = `checkbox-${i}`;
		inputEl.name = 'complete';
		inputEl.classList.add('checkbox');
		let inputH3 = document.createElement('h3');
		inputH3.classList.add('task-name');
		inputH3.innerHTML = array[i].title;
		divTitleEl.appendChild(inputEl);
		divTitleEl.appendChild(inputH3);
		divEl.appendChild(divTitleEl);
		content.appendChild(divEl);
		// console.log('inside in updatetasks');
	}
	// return content;
}

// updateTasks(tasks);

// console.log(tasks);

function showDetailsListener() {
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

function showDetails(project, id) {
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
	inputTitle.value = projects[project].tasks[id].title;

	let labelDueDate = document.createElement('label');
	labelDueDate.htmlFor = 'taskDueDate';
	labelDueDate.innerHTML = 'Due Date:';
	let inputDueDate = document.createElement('input');
	inputDueDate.type = 'date';
	inputDueDate.id = 'taskDueDate';
	inputDueDate.name = 'taskDueDate';
	inputDueDate.value = projects[project].tasks[id].dueDate;

	let labelPriority = document.createElement('label');
	labelPriority.htmlFor = 'taskPriority';
	labelPriority.innerHTML = 'Priority:';
	let inputPriority = document.createElement('input');
	inputPriority.type = 'number';
	inputPriority.id = 'taskPriority';
	inputPriority.name = 'taskPriority';
	inputPriority.value = projects[project].tasks[id].priority;

	let labelDesc = document.createElement('label');
	labelDesc.htmlFor = 'taskDescription';
	labelDesc.innerHTML = 'Description:';
	let inputDesc = document.createElement('input');
	inputDesc.type = 'text';
	inputDesc.id = 'taskDescription';
	inputDesc.name = 'taskDescription';
	inputDesc.value = projects[project].tasks[id].description;

	let labelNotes = document.createElement('label');
	labelNotes.htmlFor = 'taskNotes';
	labelNotes.innerHTML = 'Notes:';
	let inputNotes = document.createElement('input');
	inputNotes.type = 'text';
	inputNotes.id = 'taskNotes';
	inputNotes.name = 'taskNotes';
	inputNotes.value = projects[project].tasks[id].notes;

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
		updateTasks(projects[project].tasks);
		showDetailsListener();
	});
}

function saveDetails(project, id) {
	const title = document.getElementById('taskTitle');
	// console.log(title.value);
	projects[project].tasks[id].title = title.value;
	const dueDate = document.getElementById('taskDueDate');
	projects[project].tasks[id].dueDate = dueDate.value;
	const priority = document.getElementById('taskPriority');
	projects[project].tasks[id].priority = priority.value;
	const description = document.getElementById('taskDescription');
	projects[project].tasks[id].description = description.value;
	const notes = document.getElementById('taskNotes');
	projects[project].tasks[id].notes = notes.value;
	// updateTasks(tasks);
	// console.log(tasks);
}

export { showDetails };
export { saveDetails };
export { showDetailsListener };

export { makeTask };
export { updateTasks };
export { refreshTasks };
export { projects };
export { tasks };
