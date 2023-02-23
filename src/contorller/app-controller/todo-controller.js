"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var todo_view_js_1 = require("../../view/todo-view.js");
var local_server_js_1 = require("../storage-controller/local-server.js");
var cloud_server_js_1 = require("../storage-controller/cloud-server.js");
var event_manager_js_1 = require("./event-manager.js");
var storage = document.querySelector(".storage");
var input = document.querySelector('.input');
var btn = document.querySelector('.btn');
var ul = document.querySelector('.taskList');
function selectStorage() {
    if (storage.value === "localStorage") {
        return local_server_js_1.localServer;
    }
    else {
        return cloud_server_js_1.cloudServer;
    }
}
function control() {
    var setStorage = selectStorage();
    return {
        createAllTasks: function () {
            return __awaiter(this, void 0, void 0, function () {
                var list, todo;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(storage.value === "cloudStorage")) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, cloud_server_js_1.cloudServer)().getAllItems()];
                        case 1:
                            list = _a.sent();
                            list.map(function (_a) {
                                var name = _a.name, id = _a.id, isCompleted = _a.isCompleted;
                                _this.instance(name, id, isCompleted);
                            });
                            return [3 /*break*/, 3];
                        case 2:
                            todo = (0, local_server_js_1.localServer)().getAllItems();
                            todo.map(function (_a) {
                                var name = _a.name, id = _a.id, isCompleted = _a.isCompleted;
                                _this.instance(name, id, isCompleted);
                                console.log(id);
                            });
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        createSingleTask: function () {
            return __awaiter(this, void 0, void 0, function () {
                var value, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = input.value;
                            if (!value) return [3 /*break*/, 2];
                            input.value = '';
                            return [4 /*yield*/, setStorage().postSingleItem(value)];
                        case 1:
                            result = _a.sent();
                            if (result.id && result.name) {
                                this.instance(result.name, result.id, result.isCompleted);
                            }
                            else {
                                this.instance(value, result.id);
                                console.log(result);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            alert('Enter task name');
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        instance: function () {
            var _a;
            var options = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                options[_i] = arguments[_i];
            }
            return (_a = (0, todo_view_js_1.todoView)(event_manager_js_1.eventManager)).createListElement.apply(_a, options);
        }
    };
}
btn.addEventListener('click', function (e) {
    e.preventDefault();
    control().createSingleTask();
});
storage.addEventListener('change', function () {
    var changeStorage = confirm("U are changing the storage .=> you data will store only in ".concat(storage.value));
    if (changeStorage === true) {
        ul.innerHTML = '';
        control().createAllTasks();
    }
});
control().createAllTasks();
document.querySelector('.clearAllBtn').addEventListener('click', function () {
    var setStorage = selectStorage();
    setStorage().deleteAllItems();
});
