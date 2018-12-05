const promisfyIDBRequest = (IDBRequest) => {
    return new Promise((resolve, reject) => {
        IDBRequest.onsuccess = () => {
            resolve(IDBRequest.result);
        }
        IDBRequest.onerror = () => {
            reject(IDBRequest.error);
        }
    });
}

export const open = (dbName, upgradeCallback) => {
    const DBOpenRequest = indexedDB.open(dbName);

    DBOpenRequest.onupgradeneeded = (e) => {
        const db = e.target.result;
        upgradeCallback(db);
    }

    return promisfyIDBRequest(DBOpenRequest);;
}

export const getAll = (store) => {
    return promisfyIDBRequest(store.getAll());
}

export const get = (store, uuid) => {
    return promisfyIDBRequest(store.get(uuid));
}

export const add = (store, item) => {
    return promisfyIDBRequest(store.add(item));
}

export const remove = (store, uuid) => {
    return promisfyIDBRequest(store.delete(uuid));
}

export const update = (store, newVal) => {
    return promisfyIDBRequest(store.put(newVal));
}

export default {
    open,
    getAll,
    get,
    add,
    remove,
    update,
}