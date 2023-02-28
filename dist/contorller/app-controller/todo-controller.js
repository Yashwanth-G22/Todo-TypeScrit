import { todoView } from "../../view/todo-view.js";
import { localServer } from "../storage-controller/local-server.js";
import { cloudServer } from "../storage-controller/cloud-server.js";
import { eventManager } from "./event-manager.js";
let storage = document.querySelector(".storage");
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const ul = document.querySelector('.taskList');
export function selectStorage() {
    if (storage.value === "localStorage") {
        return localServer;
    }
    else {
        return cloudServer;
    }
}
function control() {
    let setStorage = selectStorage();
    return {
        createAllTasks: async function () {
            if (storage.value === "cloudStorage") {
                let list = await cloudServer().getAllItems();
                list.map(({ name, id, isCompleted }) => {
                    this.instance({ name, id, isCompleted });
                });
            }
            else {
                let todo = localServer().getAllItems();
                todo.map(({ name, id, isCompleted }) => {
                    this.instance({ name, id, isCompleted });
                    console.log(id);
                });
            }
        },
        createSingleTask: async function () {
            const value = input.value;
            if (value) {
                input.value = '';
                let result = await setStorage().postSingleItem(value);
                if (result.id && result.name) {
                    let CreateArguments = { name: result.name, id: result.id, isCompleted: result.isCompleted };
                    this.instance(CreateArguments);
                }
                else {
                    let args = { name: value, id: result.id };
                    this.instance(args);
                    console.log(result);
                }
            }
            else {
                alert('Enter task name');
            }
        },
        instance: function ({ name, id, isCompleted }) {
            return todoView(eventManager).createListElement(name, id, isCompleted);
        },
    };
}
btn.addEventListener('click', (e) => {
    e.preventDefault();
    control().createSingleTask();
});
storage.addEventListener('change', () => {
    let changeStorage = confirm(`U are changing the storage .=> you data will store only in ${storage.value}`);
    if (changeStorage === true) {
        ul.innerHTML = '';
        control().createAllTasks();
    }
});
control().createAllTasks();
document.querySelector('.clearAllBtn').addEventListener('click', () => {
    let setStorage = selectStorage();
    setStorage().deleteAllItems();
});
