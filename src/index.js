import './style.css';

import { makeTask } from './maketask.js';
import { updateTasks } from './maketask.js';
import { tasks } from './maketask.js';

// let tasks = [];
const taskA = makeTask('Task A');
taskA.add();

const taskB = makeTask('Task B');
taskB.add();

taskA.description = 'This is a task I need to do.';

updateTasks(tasks);

// console.log(tasks);
// console.log(taskA);
