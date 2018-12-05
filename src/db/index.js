import { todoItems } from '../data';
import internals from './internals';

// Initialize database stuff
const TODO_DB = "simple_todo";
let db;

const getStore = (storeName, mode) => {
    try {
        return db.transaction(storeName, mode).objectStore(storeName);
    } catch(rejectedValue) {
        return rejectedValue;
    }
}

export async function openIDB() {
    try {
        db = await internals.open(TODO_DB, (db) => {
            const objectStore = db.createObjectStore('todo', { keyPath: 'uuid' });

            objectStore.createIndex('done', 'done', { unique: false });
            objectStore.createIndex('value', 'value', { unique: false });
            objectStore.createIndex('comment', 'comment', { unique: false });
            objectStore.createIndex('datetime', 'datetime', { unique: false });

            objectStore.transaction.oncomplete = (e) => {
                const todoObjectStore = db.transaction('todo', 'readwrite').objectStore('todo');
                todoItems.forEach(todo => {
                    todoObjectStore.add(todo);
                });
            }
        });
    } catch (rejectedValue) {
        return rejectedValue;
    }
}

export async function getAllTodos() {
    try {
        return await internals.getAll(getStore('todo', 'readonly'));
    } catch (rejectedValue) {
        return errorCallback();
    }
}

export async function addTodo(todo, errorCallback) {
    try {
        const now = new Date().toUTCString();
        await internals.add(getStore('todo', 'readwrite'), { ...todo, datetime: now });
    } catch (rejectedValue) {
        return errorCallback();
    }
}

export async function deleteTodo(uuid, errorCallback) {
    try {
        await internals.remove(getStore('todo', 'readwrite'), uuid)
    } catch (rejectedValue) {
        return errorCallback();
    }
}

export async function updateTodo(payload, errorCallback) {
    const { uuid, column, value } = payload
    try {
        const store = getStore('todo', 'readwrite');
        const oldVal = await internals.get(store, uuid);
        const newVal = {...oldVal, [column]: value };

        await internals.update(store, newVal);

    } catch (rejectedValue) {
        return errorCallback();
    }
}