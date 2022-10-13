let tasks = [];

const makeTask = (title) => {
	const task = {};
	task.title = title;
	task.dueDate = '';
	task.priority = '';
	task.description = '';
	task.notes = '';
	task.complete = false;
	// console.log('hello this is inside makeTask');
	task.add = function () {
		tasks.push(this);
		// console.log('inside task add');
		// console.log(tasks);
		return tasks;
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

export { makeTask };
export { updateTasks };
export { refreshTasks };

export { tasks };
