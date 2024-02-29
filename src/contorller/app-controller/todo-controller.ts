import { todoView } from "../../view/todo-view.js";

import { localServer } from "../../model/local-server.js";

import { cloudServer } from "../../model/cloud-server.js";

import { eventManager } from "./event-manager.js";

import { objectType } from "./types.js";
import { selector } from "../../utils/common.js";

let storage = selector('.storage');
const btn = selector('.btn');
export const input = selector('.input');
export const ul = selector('.taskList');

export function selectStorage() {
    if (storage.value === 'localStorage') {
        return localServer
    } else {
        return cloudServer
    }
}

function control() {
    let setStorage = selectStorage()
    return {
        createAllTasks: async function () {
            if (storage.value === 'cloudStorage') {
                let list = await cloudServer().getAllItems()
                list.map(({ name , id, isCompleted } : objectType) => {
                    this.instance({name, id, isCompleted})
                })
                
            } else {
                let todo = localServer().getAllItems()
                todo.map(({ name , id , isCompleted} : objectType) => {
                    this.instance( {name , id , isCompleted})
                    console.log(id)
                }) 
            }
        },

        createSingleTask: async function () {
            const value = input.value
            if (value) {
                input.value = '';
                let result =await setStorage().postSingleItem(value) 
                if (result.id && result.name) {
                    let postArguments = { name : result.name , id : result.id , isCompleted : result.isCompleted}
                    this.instance( postArguments )
                }
                else {
                    let args = { name : value , id : result.id}
                    this.instance( args )
                    console.log(result)
                }
            } else {
                alert('Enter task name')
            }
        },

        instance: function ({name ,id , isCompleted } : objectType) {
            return todoView(eventManager).createListElement(name , id , isCompleted as boolean)
        },
    }
}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    control().createSingleTask()
})

storage.addEventListener('change', () => {
   let changeStorage = confirm(`U are changing the storage .=> you data will store only in ${storage.value}`)

    if(changeStorage === true){
        ul.innerHTML = ''
        control().createAllTasks()
    }    
})

control().createAllTasks();

(document.querySelector('.clearAllBtn') as HTMLButtonElement).addEventListener('click', () => {
    let setStorage = selectStorage()
    setStorage().deleteAllItems()
})


