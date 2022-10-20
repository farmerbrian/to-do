import { updateTasks } from './taskfunctions.js';
import { refreshTasks } from './taskfunctions.js';
import { showDetailsListener } from './taskfunctions.js';

let projects = [];

let selectedProject = 0;

const makeProject = (title) => {
	const project = {};
	project.title = title;
	project.tasks = [];
	project.add = function () {
		projects.push(this);
		return projects;
	};
	// projects.remove = function () {

	// };
	return project;
};

const content = document.getElementById('project-container');

function refreshProjects() {
	content.innerHTML = null;
}

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
