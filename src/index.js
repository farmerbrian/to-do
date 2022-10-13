import './style.css';

import { makeTask } from './maketask.js';
import { updateTasks } from './maketask.js';
import { tasks } from './maketask.js';
import { refreshTasks } from './maketask.js';
import { showDetails } from './edittask.js';
import { saveDetails } from './edittask.js';
import { showDetailsListener } from './edittask.js';

const newTaskBtn = document.querySelector('#newTask');
const newTaskValue = document.getElementById('task');
newTaskBtn.addEventListener('click', (event) => {
	let newTask = makeTask(newTaskValue.value);
	newTask.add();
	refreshTasks();
	updateTasks(tasks);
	showDetailsListener();
});

// let tasks = [];
const taskA = makeTask('Task A');
taskA.add();

const taskB = makeTask('Task B');
taskB.add();

taskA.description = 'This is a task I need to do.';

updateTasks(tasks);

showDetailsListener();
