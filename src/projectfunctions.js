import { updateTasks } from './taskfunctions.js';
import { refreshTasks } from './taskfunctions.js';
import { showDetailsListener } from './taskfunctions.js';

// create projects array and attempt to load existing projects from localstorage
let projects;
let storage = JSON.parse(localStorage.getItem('projects'));
if (storage) {
	projects = storage;
} else {
	projects = [];
}

// set initial default project
let selectedProject = 0;

// factory function for creating and saving new projects
const makeProject = (title) => {
	const project = {};
	project.title = title;
	project.tasks = [];
	project.add = function () {
		projects.push(this);
		localStorage.setItem('projects', JSON.stringify(projects));
		return projects;
	};
	// projects.remove = function () {

	// };
	return project;
};

const content = document.getElementById('project-container');

// clear list of projects prior to update
function refreshProjects() {
	content.innerHTML = null;
}

// build list of projects in html from object
function updateProjects(array) {
	for (let i = 0; i < array.length; i++) {
		let divEl = document.createElement('div');
		divEl.className = 'project';
		divEl.id = `project-${i}`;
		let divTitleEl = document.createElement('div');
		divTitleEl.className = 'project-title-div';
		let inputH3 = document.createElement('h3');
		inputH3.classList.add('project-name');
		inputH3.innerHTML = array[i].title;
		divTitleEl.appendChild(inputH3);
		divEl.appendChild(divTitleEl);
		content.appendChild(divEl);
	}
}

// update selectedProject from click event and update html to newly selected project
function selectProjectListener() {
	const allProjects = document.querySelectorAll('.project');
	allProjects.forEach((projectDiv) => {
		projectDiv.firstChild.addEventListener('click', (event) => {
			let divId = projectDiv.id;
			selectedProject = divId.match(/[0-9]+/g);
			refreshTasks();
			updateTasks(projects[selectedProject].tasks);
			showDetailsListener();
		});
	});
}

export { projects };
export { makeProject };
export { refreshProjects };
export { updateProjects };
export { selectProjectListener };
export { selectedProject };
