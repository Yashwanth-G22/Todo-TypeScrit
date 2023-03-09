import { todoObject } from "./todo-object.js";
function localServer() {
    return {
        getAllItems: function () {
            const todoList = (`${localStorage.getItem('todos')}`) ? JSON.parse(`${localStorage.getItem('todos')}`) : [];
            return todoList;
        },
        postSingleItem: function (todo) {
            let set_Todo = this.getAllItems();
            let single_todo = todoObject(todo, set_Todo.length);
            set_Todo.push(single_todo);
            setLocalServer(set_Todo);
            return single_todo;
        },
        putSingleItem: function (index, elem, value) {
            let edit_Todo = this.getAllItems();
            edit_Todo.splice(index, 1, todoObject(elem, index, value));
            setLocalServer(edit_Todo);
        },
        deleteSingleItem: function (index) {
            let delete_Todo = this.getAllItems();
            console.log(index);
            delete_Todo.splice(index, 1);
            setLocalServer(delete_Todo);
        },
        deleteAllItems: function () {
            let deleteAll_Todo = this.getAllItems();
            deleteAll_Todo = [];
            setLocalServer(deleteAll_Todo);
        },
    };
}
function setLocalServer(items) {
    return localStorage.setItem('todos', JSON.stringify(items));
}
export { localServer };
