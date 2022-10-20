import { projects, selectedProject } from './projectfunctions.js';
import { selectProjectListener } from './projectfunctions.js';

// factory function for creating and saving new tasks
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
		localStorage.setItem('projects', JSON.stringify(projects));
		return projects[project].tasks;
	};

	return task;
};

const content = document.getElementById('tasks-container');
const projectListName = document.getElementById('project-name');

// clear list of tasks prior to update
function refreshTasks() {
	content.innerHTML = null;
	projectListName.innerHTML = `${projects[selectedProject].title}`;
}

// build list of tasks in html from object
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
		inputEl.checked = array[i].complete;
		inputEl.classList.add('checkbox');
		let inputH3 = document.createElement('h3');
		inputH3.classList.add('task-name');
		inputH3.innerHTML = array[i].title;
		divTitleEl.appendChild(inputEl);
		divTitleEl.appendChild(inputH3);
		divEl.appendChild(divTitleEl);
		content.appendChild(divEl);
	}
}

// show or hide task details from click event
function showDetailsListener() {
	const allTasks = document.querySelectorAll('.task');
	allTasks.forEach((taskDiv) => {
		let taskName = taskDiv.querySelector('h3');
		taskName.addEventListener('click', (event) => {
			if (taskDiv.childNodes.length == 1) {
				let findDiv = document.querySelector('.task-details-div');
				if (findDiv == null) {
					showDetails(selectedProject, taskDiv.id);
				} else {
					findDiv.remove();
					showDetails(selectedProject, taskDiv.id);
				}
			} else {
				let findDiv = document.querySelector('.task-details-div');
				findDiv.remove();
			}
		});
	});
}

// build task details form in html
function showDetails(project, id) {
	const div = document.getElementById(`${id}`);

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

	let delBtn = document.createElement('button');
	delBtn.type = 'button';
	delBtn.id = 'delBtn';
	delBtn.innerHTML = 'Delete';

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
	detailsForm.appendChild(delBtn);
	detailsForm.appendChild(saveBtn);
	detailsDiv.appendChild(detailsForm);
	div.appendChild(detailsDiv);

	// delete button and logic
	const delTaskBtn = document.getElementById('delBtn');
	delTaskBtn.addEventListener('click', (event) => {
		projects[selectedProject].tasks.splice(id, 1);
		refreshTasks();
		updateTasks(projects[project].tasks);
		showDetailsListener();
	});

	// save button and logic
	const saveTaskBtn = document.getElementById('saveBtn');
	saveTaskBtn.addEventListener('click', (event) => {
		const saveTaskBtnId = saveTaskBtn.closest('.task');
		saveDetails(selectedProject, saveTaskBtnId.id);
		localStorage.setItem('projects', JSON.stringify(projects));
		refreshTasks();
		updateTasks(projects[project].tasks);
		showDetailsListener();
	});
}

// did someone click a checkbox?
function checkboxListener() {
	const allCheckboxes = document.querySelectorAll('.checkbox');
	allCheckboxes.forEach((taskCheckBox) => {
		taskCheckBox.addEventListener('click', (event) => {
			saveCheckbox(selectedProject, taskCheckBox.id.match(/[0-9]+/g));
		});
	});
}

// someone clicked a checkbox, better do something and save that to the object and add some styling
function saveCheckbox(project, id) {
	const checkbox = document.getElementById(`checkbox-${id}`);
	const findTaskDiv = document.getElementById(id);
	const findH3 = findTaskDiv.querySelector('.task-name');
	if (checkbox.checked == true) {
		findH3.classList.add('completed-task');
	} else {
		findH3.classList.remove('completed-task');
	}
	projects[project].tasks[id].complete = checkbox.checked;
	localStorage.setItem('projects', JSON.stringify(projects));
}

// save those form details to the object
function saveDetails(project, id) {
	const title = document.getElementById('taskTitle');
	projects[project].tasks[id].title = title.value;
	const dueDate = document.getElementById('taskDueDate');
	projects[project].tasks[id].dueDate = dueDate.value;
	const priority = document.getElementById('taskPriority');
	projects[project].tasks[id].priority = priority.value;
	const description = document.getElementById('taskDescription');
	projects[project].tasks[id].description = description.value;
	const notes = document.getElementById('taskNotes');
	projects[project].tasks[id].notes = notes.value;
}

export { showDetails };
export { saveDetails };
export { showDetailsListener };
export { checkboxListener };
export { makeTask };
export { updateTasks };
export { refreshTasks };
export { projects };
