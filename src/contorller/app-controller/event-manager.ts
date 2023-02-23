import { localServer } from "../storage-controller/local-server.js";

import { cloudServer } from "../storage-controller/cloud-server.js";

const storage = document.querySelector(".storage") as HTMLInputElement;
const ul = document.querySelector('.taskList') as HTMLInputElement;
const input = document.querySelector('.input') as HTMLInputElement;
let flag : boolean = true

function eventManager () {    
    let setStorage = selectStorage()
    return {
        singleTaskDelete: function (index : number , li : HTMLElement) {
            setStorage().deleteSingleItem(index)
            ul.removeChild(li)
        },

        updateOfList: function (span : HTMLElement , index : number, elem : string, editBtn : HTMLElement) {
            const update = document.createElement('input')
            update.classList.add('secondInput')  
            update.setAttribute("type" , "text");
            update.placeholder = elem;
            if (flag) {
                flag = false
                span.innerHTML = ''
                span.appendChild(update)
                editBtn.innerHTML = `<i class="fa fa-check"></i>`
            } else {
                flag = true;
                let updateValue = (document.querySelector('.secondInput') as HTMLInputElement).value
                if (input.checked !== false) {
                    setStorage().putSingleItem(index , updateValue, true)
                    span.style.textDecoration = 'line-through';
                } else {
                    
                    setStorage().putSingleItem(index, updateValue, false ) 
                }
                span.innerHTML = updateValue
                updateValue = ''
                editBtn.innerHTML = `<i class="fas fa-pencil"></i>`
            }
        },

        checked: function (input : HTMLInputElement , span : HTMLInputElement, elem : string, index : number) {
            if (input.checked) {
                span.style.textDecoration = "line-through";
                setStorage().putSingleItem(index, elem, true)
            }else{
                span.style.textDecoration = "";
                setStorage().putSingleItem(index, elem, false)
            }
        },
    }
}

function selectStorage () {
    if (storage.value === "cloudStorage"){
        return cloudServer
    } else {
        return localServer
    }
}

export { eventManager }