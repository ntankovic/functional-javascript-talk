const R = require('ramda');

const config = {
    showCompleted: false,
};

let tasks = [
    { user: 'Nikola', completed: false, task: '(1) Learn functional programming' },
    { user: 'Marko', completed: true, task: '(2) Learn functional programming' },
    { user: 'Lucas', completed: true, task: '(3) Learn functional programming' },
    { user: 'John', completed: false, task: '(4) Learn functional programming' },
];

let incompleted = R.filter(R.whereEq({ completed: config.showCompleted }));

console.log(incompleted(tasks));
