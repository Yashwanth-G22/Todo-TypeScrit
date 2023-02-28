import { selectStorage } from "./todo-controller.js";
import { ul } from "./todo-controller.js";
import { input } from "./todo-controller.js";
let flag : boolean = true

function eventManager () {    
    let setStorage = selectStorage()
    return {
        singleTaskDelete: function (index : number , li : HTMLElement) {
            setStorage().deleteSingleItem(index)
            ul.removeChild(li)
        },

        updateList: function (span : HTMLSpanElement , index : number, elem : string, editBtn : HTMLButtonElement) {
            const update = document.createElement('input')
            update.classList.add('secondInput')  
            update.setAttribute("type" , "text");
            update.placeholder = elem;
            if (flag) {
                flag = false
                span.innerHTML = "";
                span.appendChild(update)
                editBtn.innerHTML = `<i class="fa fa-check"></i>`
            } else {
                flag = true;
                let updateValue = (document.querySelector('.secondInput') as HTMLInputElement).value
                if (input.checked) {
                    setStorage().putSingleItem(index, updateValue, true)
                    span.style.textDecoration = 'line-through';
                } else {
                    
                    setStorage().putSingleItem(index, updateValue, false ) 
                }
                span.innerHTML = updateValue
                updateValue = ''
                editBtn.innerHTML = `<i class="fas fa-pencil"></i>`
            }
        },

        checkedOfItem: function (input : HTMLInputElement , span : HTMLSpanElement, elem : string, index : number) {
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


export { eventManager }