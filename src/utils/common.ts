import { LOCAL_STORAGE_KEY } from "./constants";

export function getAllItems() {
    const todoList = (`${localStorage.getItem('todos')}`) ? JSON.parse(`${localStorage.getItem('todos')}`) : [];
    return todoList;
}

export function setTodoItems(items: object[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
}