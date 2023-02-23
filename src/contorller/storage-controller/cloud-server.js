"use strict";
function cloudServer() {
    const apiURL = "https://mk-todo-web-api.azurewebsites.net/api/YeswanthTodoItems";
    return {
        getAllItems: async function () {
            const response = await fetch(apiURL, { method: 'GET' });
            return response.json();
        },
        postSingleItem: async function (name) {
            const response = await set(apiURL, {
                method: 'POST',
                body: JSON.stringify({
                    name: name
                })
            });
            return response.json();
        },
        putSingleItem: async function (id, name, value) {
            await set(`${apiURL}/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    "id": id,
                    "name": name,
                    "isCompleted": value
                })
            });
        },
        deleteSingleItem: function (id) {
            set(`${apiURL}/${id}`, {
                method: 'DELETE',
            });
        },
        deleteAllItems: function () {
            set(`https://mk-todo-web-api.azurewebsites.net/deleteAll`, {
                method: 'DELETE'
            });
        }
    };
}
function set(url, options) {
    const header = new Headers;
    header.append('content-type', 'application/json');
    return fetch(url, {
        ...options,
        headers: header,
    });
}
// export default cloudServer
let result = cloudServer().putSingleItem(1, "testing", true);
console.log(result);
