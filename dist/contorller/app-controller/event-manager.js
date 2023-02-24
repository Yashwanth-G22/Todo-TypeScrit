import { localServer } from "../storage-controller/local-server.js";
import { cloudServer } from "../storage-controller/cloud-server.js";
const storage = document.querySelector(".storage");
const ul = document.querySelector('.taskList');
const input = document.querySelector('.input');
let flag = true;
function eventManager() {
    let setStorage = selectStorage();
    return {
        singleTaskDelete: function (index, li) {
            setStorage().deleteSingleItem(index);
            ul.removeChild(li);
        },
        updateOfList: function (span, index, elem, editBtn) {
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
                if (input.checked === true) {
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
        checked: function (input, span, elem, index) {
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
function selectStorage() {
    if (storage.value === "cloudStorage") {
        return cloudServer;
    }
    else {
        return localServer;
    }
}
export { eventManager };
