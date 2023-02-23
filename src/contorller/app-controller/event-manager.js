"use strict";
exports.__esModule = true;
exports.eventManager = void 0;
var local_server_js_1 = require("../storage-controller/local-server.js");
var cloud_server_js_1 = require("../storage-controller/cloud-server.js");
var storage = document.querySelector(".storage");
var ul = document.querySelector('.taskList');
var input = document.querySelector('.input');
var flag = true;
function eventManager() {
    var setStorage = selectStorage();
    return {
        singleTaskDelete: function (index, li) {
            setStorage().deleteSingleItem(index);
            ul.removeChild(li);
        },
        updateOfList: function (span, index, elem, editBtn) {
            var update = document.createElement('input');
            update.classList.add('secondInput');
            update.setAttribute("type", "text");
            update.placeholder = elem;
            if (flag) {
                flag = false;
                span.innerHTML = '';
                span.appendChild(update);
                editBtn.innerHTML = "<i class=\"fa fa-check\"></i>";
            }
            else {
                flag = true;
                var updateValue = document.querySelector('.secondInput').value;
                if (input.checked !== false) {
                    setStorage().putSingleItem(index, updateValue, true);
                    span.style.textDecoration = 'line-through';
                }
                else {
                    setStorage().putSingleItem(index, updateValue, false);
                }
                span.innerHTML = updateValue;
                updateValue = '';
                editBtn.innerHTML = "<i class=\"fas fa-pencil\"></i>";
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
        }
    };
}
exports.eventManager = eventManager;
function selectStorage() {
    if (storage.value === "cloudStorage") {
        return cloud_server_js_1.cloudServer;
    }
    else {
        return local_server_js_1.localServer;
    }
}
