"use strict";
exports.__esModule = true;
exports.localServer = void 0;
var todo_object_js_1 = require("./todo-object.js");
function localServer() {
    return {
        getAllItems: function () {
            var todoList = ("".concat(localStorage.getItem('todos'))) ? JSON.parse("".concat(localStorage.getItem('todos'))) : [];
            return todoList;
        },
        postSingleItem: function (todo) {
            console.log("object");
            var set_Todo = this.getAllItems();
            var single_todo = (0, todo_object_js_1.todoObject)(todo, set_Todo.length);
            set_Todo.push(single_todo);
            localStorage.setItem('todos', JSON.stringify(set_Todo));
            return single_todo;
        },
        putSingleItem: function (index, elem, value) {
            var edit_Todo = this.getAllItems();
            edit_Todo.splice(index, 1, (0, todo_object_js_1.todoObject)(elem, index, value));
            localStorage.setItem('todos', JSON.stringify(edit_Todo));
        },
        deleteSingleItem: function (index) {
            var delete_Todo = this.getAllItems();
            console.log(index);
            delete_Todo.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(delete_Todo));
        },
        deleteAllItems: function () {
            var deleteAll_Todo = this.getAllItems();
            deleteAll_Todo = [];
            localStorage.setItem('todos', JSON.stringify(deleteAll_Todo));
        }
    };
}
exports.localServer = localServer;
