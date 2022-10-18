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

document
	.getElementById('task')
	.addEventListener('submit', function (event) {
		event.preventDefault();
	});

const newTaskBtn = document.querySelector('#newTask');
const newTaskValue = document.getElementById('task');
newTaskBtn.addEventListener('click', (event) => {
	event.preventDefault();
	let newTask = makeTask(newTaskValue.value);
	newTask.add();
	refreshTasks();
	updateTasks(tasks);
	showDetailsListener();
});

const defaultProject = makeProject('Reminders');
defaultProject.add();
console.log(projects);

const taskA = makeTask('Pick up groceries');
taskA.add();

const taskB = makeTask('Take out trash');
taskB.add();

taskA.description = 'This is a task I need to do.';

updateTasks(tasks);

showDetailsListener();
