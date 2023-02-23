"use strict";
exports.__esModule = true;
exports.todoObject = void 0;
function todoObject(name, id, isCompleted) {
    if (isCompleted === void 0) { isCompleted = false; }
    return {
        name: name,
        id: id,
        isCompleted: isCompleted
    };
}
exports.todoObject = todoObject;
