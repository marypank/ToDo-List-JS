// console.log(1);

// all static elements
let btn = document.getElementById('addTask');
let uncompletedTasksTitle = document.getElementById('uncompletedTasks');
let completedTasksTitle = document.getElementById('completedTasks');

let counter = 0;

btn.addEventListener('click', addToDoTask);

function addToDoTask() {
	let task = document.getElementById('textTask').value;

	if (task !== '') {
		// div ----> [input --- label --- button]
		let newDivElem = document.createElement('div');
		newDivElem.classList.add('to-do__list-item');
		newDivElem.classList.add('uncompleted');

		let newInput = document.createElement('input');
		newInput.type = 'checkbox';
		newInput.name = 'toDoTask' + counter;
		newInput.id = 'toDoTask' + counter;

		let newLabel = document.createElement('label');
		newLabel.htmlFor = 'toDoTask' + counter;
		newLabel.textContent = task;

		let newDeleteBtn = document.createElement('button');
		newDeleteBtn.classList.add('deteleTask');
		newDeleteBtn.innerHTML = '<i class="fas fa-minus"></i>';

		counter++;

		// putting elements inside div
		newDivElem.prepend(newInput);
		newDivElem.append(newLabel);
		newDivElem.append(newDeleteBtn);

		// putting div with all elements after title
		uncompletedTasksTitle.after(newDivElem);

		newDeleteBtn.addEventListener('click', deleteTask)
		newInput.addEventListener('change', toggleTask);
	}
};

function toggleTask() {
	let parentElement = this.parentElement;
	let nextElementSibling = this.nextElementSibling;
	let newCompletedTask = parentElement.cloneNode(true);

	if (parentElement.classList.contains('uncompleted')) {
		newCompletedTask.classList.add('completed');
		newCompletedTask.classList.remove('uncompleted');

		parentElement.remove();
		this.checked = true;

		completedTasksTitle.after(newCompletedTask);

		newCompletedTask.lastElementChild.addEventListener('click', deleteTask);
		newCompletedTask.firstElementChild.addEventListener('change', toggleTask);
	}
	if (parentElement.classList.contains('completed')) {
		newCompletedTask.classList.add('uncompleted');
		newCompletedTask.classList.remove('completed');

		parentElement.remove();
		this.checked = true;

		uncompletedTasksTitle.after(newCompletedTask);

		newCompletedTask.lastElementChild.addEventListener('click', deleteTask);
		newCompletedTask.firstElementChild.addEventListener('change', toggleTask);
	}
}

function deleteTask() {
	this.parentElement.remove();
}

