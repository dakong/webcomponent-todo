import { findChildEl, findEl } from './utils/dom';
import {
    TODO_ITEM_DELETE,
    TODO_ITEM_CHECK,
    TODO_ITEM_ADD,
    TODO_ITEM_EDIT,
    TODO_ITEM_NEW_LINE,
 } from './components/todo-item/actions';
import { openIDB, getAllTodos, addTodo, deleteTodo, updateTodo } from './db';
const uuidv4 = require('uuid/v4');

const $todoBody = document.getElementById('todo-body');
const $todoList = document.querySelector('todo-list');
const $loader = document.querySelector('todo-loader');
const $errorBanner = document.getElementById('error-banner');

const displayError = () => {
    $errorBanner.style.display = 'block';
    setTimeout(() => {
        $errorBanner.style.display = 'none';
    }, 5000)
}

const initializeList = (todoItems) => {
    if (!$todoList || !$todoBody) return
    todoItems.forEach((item) => {
        const { value, uuid, done } = item;
        const todoItem = document.createElement('todo-item');

        todoItem.setAttribute('value', value);
        todoItem.setAttribute('uuid', uuid);

        if (done) {
            todoItem.setAttribute('slot', 'completed-item');
            todoItem.setAttribute('checked', '');
        }
        else
            todoItem.setAttribute('slot', 'todo-item');

        $todoList.append(todoItem);

    });

    $todoList.appendChild(createNewTodoItem());
}

const startLoading = () => {
    $todoList.style.display = 'none';
    $loader.setAttribute('loading', '');
}

const finishLoading = () => {
    $todoList.style.display = 'block';
    $loader.removeAttribute('loading');
}

async function initDB() {
    startLoading();
    try {
        await openIDB();
        const todos = await getAllTodos();
        todos.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
        finishLoading();
        initializeList(todos);
    }
    catch(e) {
        console.log(e);
    }
}

const createNewTodoItem = () => {
    const newTodoItem = document.createElement('todo-item');
    newTodoItem.setAttribute('state', 'new');
    newTodoItem.setAttribute('placeholder', 'List item');
    newTodoItem.setAttribute('slot', 'todo-item');

    return newTodoItem;
}

const createTodoItem = () => {
    const todoItem = document.createElement('todo-item');
    const uuid = uuidv4();
    todoItem.setAttribute('uuid', uuid);
    todoItem.setAttribute('slot', 'todo-item');

    addTodo({
        uuid,
        done: false,
    }, displayError);

    return todoItem;
}

$todoList.addEventListener(TODO_ITEM_ADD , (e) => {
    const { uuid, value } = e.detail;

    // store in database here
    addTodo({
        uuid,
        value,
        done: false,
    }, displayError);

    $todoList.append(createNewTodoItem());
});

$todoBody.addEventListener(TODO_ITEM_CHECK, e => {
    const { uuid, checked } = e.detail;
    const payload = {
        uuid,
        column: 'done',
        value: checked,
    };

    updateTodo(payload, displayError);
    const $child = findChildEl($todoList, 'uuid', uuid);

    (checked) ? $child.setAttribute('slot', 'completed-item') : $child.setAttribute('slot', 'todo-item');
});

$todoList.addEventListener(TODO_ITEM_EDIT, e => {
    const { uuid, value } = e.detail;
    const payload = {
        uuid,
        value,
        column: 'value',
    };
    updateTodo(payload, displayError);
});

$todoList.addEventListener(TODO_ITEM_NEW_LINE, (e) => {
    const { uuid } = e.detail;
    const prevSlot = findChildEl($todoList, 'uuid', uuid);
    if (prevSlot) {
        const todoItem = createTodoItem();
        todoItem.setAttribute('focus-input', '');
        prevSlot.after(todoItem);
    }
});

$todoBody.addEventListener(TODO_ITEM_DELETE, (e) => {
    const { uuid } = e.detail;
    deleteTodo(uuid, displayError);
    const $child = findChildEl($todoList, 'uuid', uuid);
    $todoList.removeChild($child);
});

initDB();