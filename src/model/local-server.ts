import { todoObject } from "./todo-object.js";

function localServer() {
    return {
        getAllItems: function() {
            const todoList = (`${localStorage.getItem('todos')}`)? JSON.parse(`${localStorage.getItem('todos')}`) : []
            return todoList;
        },
        postSingleItem: function (todo : string) {
            let set_Todo : object[] = this.getAllItems()
            let single_todo = todoObject( todo, set_Todo.length )
            set_Todo.push(single_todo)
            setLocalServer(set_Todo)
            return single_todo
        },
        putSingleItem: function (index : number , elem : string , value : boolean){
            let edit_Todo : object[] = this.getAllItems()
            edit_Todo.splice(index , 1 , todoObject( elem, index , value))
            setLocalServer(edit_Todo)
        },

        deleteSingleItem: function (index : number) {
            let delete_Todo : object[] = this.getAllItems()
            console.log(index)
            delete_Todo.splice(index , 1)
            setLocalServer(delete_Todo)
        },
        deleteAllItems: function () {
            let deleteAll_Todo : object[] = this.getAllItems()
            deleteAll_Todo = []
            setLocalServer(deleteAll_Todo)
        },
    }
}

function setLocalServer (items : object[]) {
    return localStorage.setItem('todos', JSON.stringify(items))
}

export { localServer }