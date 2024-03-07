import { todoObject } from "./todo-object.js"; getAllItems
import { getAllItems, setTodoItems } from '../utils/common'

function localServer() {
    return {
        postSingleItem: function (todo: string) {
            let set_Todo: object[] = getAllItems()
            let single_todo = todoObject(todo, set_Todo.length)
            set_Todo.push(single_todo)
            setTodoItems(set_Todo);
            return single_todo
        },
        putSingleItem: function (index: number, elem: string, value: boolean) {
            let edit_Todo: object[] = getAllItems()
            edit_Todo.splice(index, 1, todoObject(elem, index, value))
            setTodoItems(edit_Todo);
        },

        deleteSingleItem: function (index: number) {
            let delete_Todo: object[] = getAllItems()
            delete_Todo.splice(index, 1)
            setTodoItems(delete_Todo);
        },
        deleteAllItems: function () {
            setTodoItems([]);
        },
    }
}

function setLocalServer (items : object[]) {
    return localStorage.setItem('todos', JSON.stringify(items))
}

export { localServer }