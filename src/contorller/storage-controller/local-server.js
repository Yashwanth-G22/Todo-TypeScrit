import { todoObject } from "./todo-object.js";
function localServer() {
    return {
        getAllItems: function () {
            const todoList = (`${localStorage.getItem('todos')}`) ? JSON.parse(`${localStorage.getItem('todos')}`) : [];
            return todoList;
        },
        postSingleItem: function (todo) {
            console.log("object");
            let set_Todo = this.getAllItems();
            let single_todo = todoObject(todo, set_Todo.length);
            set_Todo.push(single_todo);
            localStorage.setItem('todos', JSON.stringify(set_Todo));
            return single_todo;
        },
        putSingleItem: function (index, elem, value) {
            let edit_Todo = this.getAllItems();
            edit_Todo.splice(index, 1, todoObject(elem, index, value));
            localStorage.setItem('todos', JSON.stringify(edit_Todo));
        },
        deleteSingleItem: function (index) {
            let delete_Todo = this.getAllItems();
            console.log(index);
            delete_Todo.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(delete_Todo));
        },
        deleteAllItems: function () {
            let deleteAll_Todo = this.getAllItems();
            deleteAll_Todo = [];
            localStorage.setItem('todos', JSON.stringify(deleteAll_Todo));
        },
    };
}
console.log(localServer().deleteSingleItem(1));
