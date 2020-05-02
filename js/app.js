const form = document.querySelector('form');
const input = document.querySelector('.todo-input');
const list = document.getElementById('list');
const date = document.getElementById('date');
const clear = document.getElementById('clear');

let items = [];

// Get items from localStorage
const data = JSON.parse(localStorage.getItem('todo'));

if (data && data.length != 0) {
    items = data;
    items.forEach(item => addTodo(item));
}

// Date
const options = {weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'};
date.innerText = new Date().toLocaleDateString("en-US", options);

// Submit form
form.addEventListener('submit', e => {
    e.preventDefault();

    const name = input.value.trim();

    if (name) {
        const todo = {
            name,
            id: Date.now(),
            done: false,
            trash: false
        };

        items.push(todo);
        addTodo(todo);

        localStorage.setItem('todo', JSON.stringify(items));
        input.value = '';
    }

    input.focus();
});

// Add todo
function addTodo(item) {
    const done = item.done ? 'bg-success' : '';
    const checked = item.done ? 'checked' : '';
    const line = item.done ? 'line' : '';

    const todo = `<a class="list-group-item list-group-item-action todo-item ${done}" id="${item.id}">
                    <input type="checkbox" id="${item.id}" ${checked}>
                    <span class="${line}" id="${item.id}">${item.name}</span>
                    <button class="btn btn-sm btn-danger float-right delete" id="${item.id}">delete</button>
                  </a>`;

    list.insertAdjacentHTML('afterbegin', todo);

    // OR

    // const todo = document.createElement('a');
    // const input = document.createElement('input');
    // const span = document.createElement('span');
    // const button = document.createElement('button');

    // todo.classList = `list-group-item list-group-item-action todo-item ${done}`;
    // todo.id = item.id;

    // input.type = 'checkbox'; // or input.setAttribute('type', 'checkbox')
    // input.id = item.id;
    // input.checked = item.done;

    // span.classList = line;
    // span.id = item.id;
    // span.innerText = item.name;

    // button.classList.add('btn', 'btn-sm', 'btn-danger', 'float-right', 'delete');
    // button.id = item.id;
    // button.innerText = 'delete';

    // todo.appendChild(input);
    // todo.appendChild(span);
    // todo.appendChild(button);

    // list.insertAdjacentElement('afterbegin', todo);
}

// Click todo
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        removeTodo(e.target);
    } else {
        checkTodo(e.target);
    }

    items = items.filter(item => item.trash === false);
    localStorage.setItem('todo', JSON.stringify(items));
});

// Complete todo
function checkTodo(el) {
    const todo = items.find(item => item.id == el.id);
    const item = document.getElementById(el.id);
    const checkbox = item.querySelector('input[type=checkbox]');

    if (checkbox.checked == todo.done) {
        checkbox.checked = !checkbox.checked;
    }

    item.classList.toggle('bg-success');
    item.querySelector('span').classList.toggle('line');

    todo.done = !todo.done;
}

// Remove todo
function removeTodo(el) {
    el.parentNode.remove();
    const todo = items.find(item => item.id == el.id);

    todo.trash = true;
}

// Clear localStorage
clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});