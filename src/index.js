import './style.css';

import { makeTask } from './taskfunctions.js';
import { updateTasks } from './taskfunctions.js';
import { checkboxListener } from './taskfunctions.js';
import { refreshTasks } from './taskfunctions.js';

import { showDetailsListener } from './taskfunctions.js';
import { projects } from './projectfunctions.js';
import { makeProject } from './projectfunctions.js';
import { refreshProjects } from './projectfunctions.js';
import { updateProjects } from './projectfunctions.js';
import { selectProjectListener } from './projectfunctions.js';
import { selectedProject } from './projectfunctions.js';

function preventRefresh() {
	let taskForm = document
		.getElementById('task')
		.addEventListener('submit', function (event) {
			event.preventDefault();
		});
	let projectForm = document
		.getElementById('project')
		.addEventListener('submit', function (event) {
			console.log('This is in the preventRefresh function:');
			console.log(event);
			event.preventDefault();
		});
}
preventRefresh();

const newProjectBtn = document.querySelector('#newProject');
const newProjectValue = document.getElementById('project');
newProjectBtn.addEventListener('click', (event) => {
	event.preventDefault();
	// console.log(`beginning selectedProject is ${selectedProject}`);
	let newProject = makeProject(newProjectValue.value);
	newProject.add();
	newProjectValue.value = '';
	refreshProjects();
	updateProjects(projects);
	selectProjectListener();
	// refreshTasks();
	// updateTasks(projects[selectedProject].tasks);
	// console.log(`ending selectedProject is ${selectedProject}`);
	showDetailsListener();
	checkboxListener();
});

const newTaskBtn = document.querySelector('#newTask');
const newTaskValue = document.getElementById('task');
newTaskBtn.addEventListener('click', (event) => {
	event.preventDefault();
	let newTask = makeTask(selectedProject, newTaskValue.value);
	newTask.add();
	newTaskValue.value = '';
	refreshTasks();
	updateTasks(projects[selectedProject].tasks);
	showDetailsListener();
	checkboxListener();
});

const defaultProject = makeProject('Reminders');
defaultProject.add();

const taskA = makeTask('0', 'Pick up groceries');
taskA.add();

const taskB = makeTask('0', 'Take out trash');
taskB.add();

taskA.description = 'This is a task I need to do.';

refreshTasks();
updateTasks(projects[selectedProject].tasks);
updateProjects(projects);

checkboxListener();
selectProjectListener();
showDetailsListener();
