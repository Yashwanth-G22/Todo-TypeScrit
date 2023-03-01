import { selectStorage } from "./todo-controller.js";
import { ul } from "./todo-controller.js";
import { input } from "./todo-controller.js";
let flag = true;
function eventManager() {
    let setStorage = selectStorage();
    return {
        singleTaskDelete: function (index, li) {
            setStorage().deleteSingleItem(index);
            ul.removeChild(li);
        },
        updateList: function (span, index, elem, editBtn) {
            const update = document.createElement('input');
            update.classList.add('secondInput');
            update.setAttribute("type", "text");
            update.placeholder = elem;
            if (flag) {
                flag = false;
                span.innerHTML = "";
                span.appendChild(update);
                editBtn.innerHTML = `<i class="fa fa-check"></i>`;
            }
            else {
                flag = true;
                let updateValue = document.querySelector('.secondInput').value;
                if (input.checked) {
                    setStorage().putSingleItem(index, updateValue, true);
                    span.style.textDecoration = 'line-through';
                }
                else {
                    setStorage().putSingleItem(index, updateValue, false);
                }
                span.innerHTML = updateValue;
                updateValue = '';
                editBtn.innerHTML = `<i class="fas fa-pencil"></i>`;
            }
        },
        checkedOfItem: function (input, span, elem, index) {
            if (input.checked) {
                span.style.textDecoration = "line-through";
                setStorage().putSingleItem(index, elem, true);
            }
            else {
                span.style.textDecoration = "";
                setStorage().putSingleItem(index, elem, false);
            }
        },
    };
}
export { eventManager };
