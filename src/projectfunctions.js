let projects = [];

const makeProject = (title) => {
	const project = {};
	project.title = title;
	project.taskList = [];
	project.add = function () {
		projects.push(this);
		return projects;
	};
	// projects.remove = function () {

	// };
	return project;
};

export { projects };
export { makeProject };
