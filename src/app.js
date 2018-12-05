import { findChildEl, findEl } from './utils/dom';
import { todoItems } from './data';
import {
    TODO_ITEM_DELETE,
    TODO_ITEM_CHECK,
    TODO_ITEM_ADD,
    TODO_ITEM_EDIT,
    TODO_ITEM_NEW_LINE,
 } from './components/todo-item/actions';
import { openIDB, getAllTodos, addTodo, deleteTodo, updateTodo } from './db';
const uuidv4 = require('uuid/v4');

/**
 * TODOS:
 * 1) Clean up code
 * 2) A way to order objects
 * 3) Handle errors
 */
const $todoBody = document.getElementById('todo-body');
const $todoList = document.querySelector('todo-list[type="todo"]');
const $completedList = document.querySelector('todo-list[type="completed"]');
const $errorBanner = document.getElementById('error-banner');

const initializeDone = (todoItem) => {
    todoItem.setAttribute('checked', '');
    $completedList.appendChild(todoItem);
};

const displayError = () => {
    $errorBanner.style.display = 'block';
    setTimeout(() => {
        $errorBanner.style.display = 'none';
    }, 5000)
}

const initializeTodo = (todoItem) => $todoList.appendChild(todoItem);

const initializeList = (todoItems) => {
    if (!$todoList || !$todoBody || !$completedList) return
    todoItems.forEach((item) => {
        const { value, uuid, done } = item;
        const todoItem = document.createElement('todo-item');

        todoItem.setAttribute('value', value);
        todoItem.setAttribute('uuid', uuid);
        todoItem.setAttribute('slot', 'item');

        (done) ? initializeDone(todoItem) : initializeTodo(todoItem);
    });

    $todoList.appendChild(createNewTodoItem());
}

async function initDB() {
    try {
        await openIDB();
        const todos = await getAllTodos();
        todos.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

        initializeList(todos);
    }
    catch(e) {
        console.log(e);
    }
}

const createNewTodoItem = () => {
    const newTodoItem = document.createElement('todo-item');
    newTodoItem.setAttribute('state', 'new');
    newTodoItem.setAttribute('slot', 'item');

    return newTodoItem;
}

const createTodoItem = () => {
    const todoItem = document.createElement('todo-item');
    const uuid = uuidv4();
    todoItem.setAttribute('uuid', uuid);
    todoItem.setAttribute('slot', 'item');

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

    if (checked) {
        const $child = findChildEl($todoList, 'uuid', uuid);
        $todoList.removeChild($child);
        $completedList.appendChild($child);
    } else {
        const $child = findChildEl($completedList, 'uuid', uuid);
        const $newTodoItem = findChildEl($todoList, 'state', 'new');
        $completedList.removeChild($child);
        $todoList.insertBefore($child, $newTodoItem);
    }
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

// $completedList.addEventListener(TODO_ITEM_CHECK, e => {
//     const { uuid, checked } = e.detail;
//     const payload = {
//         uuid,
//         column: 'done',
//         value: checked,
//     }
//     updateTodo(payload, displayError);

//     if (!checked) {
//         const $child = findChildEl($completedList, 'uuid', uuid);
//         const $newTodoItem = findChildEl($todoList, 'state', 'new');

//         $completedList.removeChild($child);
//         $todoList.insertBefore($child, $newTodoItem);
//     }
// });

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
});

initDB();