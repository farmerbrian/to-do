import './style.css';

import { makeTask } from './taskfunctions.js';
import { updateTasks } from './taskfunctions.js';
import { tasks } from './taskfunctions.js';
import { refreshTasks } from './taskfunctions.js';
import { showDetails } from './taskfunctions.js';
import { saveDetails } from './taskfunctions.js';
import { showDetailsListener } from './taskfunctions.js';
import { projects } from './projectfunctions.js';
import { makeProject } from './projectfunctions.js';

function preventRefresh() {
	let taskForm = document
		.getElementById('task')
		.addEventListener('submit', function (event) {
			event.preventDefault();
		});
	let projectForm = document
		.getElementById('project')
		.addEventListener('submit', function (event) {
			event.preventDefault();
		});
}
preventRefresh();

const newProjectBtn = document.querySelector('#newProject');
const newProjectValue = document.getElementById('project');
newProjectBtn.addEventListener('click', (event) => {
	event.preventDefault();
	let newProject = makeProject(newProjectValue.value);
	newProject.add();
	console.log(projects);
	// refreshTasks();
	// updateTasks(tasks);
	// showDetailsListener();
	newProjectValue.value = '';
});

const newTaskBtn = document.querySelector('#newTask');
const newTaskValue = document.getElementById('task');
newTaskBtn.addEventListener('click', (event) => {
	event.preventDefault();
	let newTask = makeTask(0, newTaskValue.value);
	newTask.add();
	refreshTasks();
	updateTasks(projects[0].tasks);
	showDetailsListener();
	newTaskValue.value = '';
});

const defaultProject = makeProject('Reminders');
defaultProject.add();

const taskA = makeTask('0', 'Pick up groceries');
taskA.add();

const taskB = makeTask('0', 'Take out trash');
taskB.add();

taskA.description = 'This is a task I need to do.';

updateTasks(projects[0].tasks);

showDetailsListener();
console.log(projects);
