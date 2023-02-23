function todoView(eventManager) {
    const ul = document.querySelector('.taskList');
    const { checked, updateOfList, singleTaskDelete } = (eventManager);
    return {
        //create list element , append and return ul
        createListElement: function (elem, index, value) {
            const li = createNode('li');
            li.classList.add("li-List");
            const span = createNode('span', elem);
            appendNode(li, updateInput(span, elem, index, value, checked));
            appendNode(li, span);
            appendNode(li, editButton(span, index, elem, updateOfList));
            appendNode(li, deleteButton(index, li, singleTaskDelete));
            return appendNode(ul, li);
        },
    };
}
//new elements create function
function createNode(elementName, elementValue = '') {
    let taskNode = document.createElement(elementName);
    taskNode.innerHTML = elementValue;
    return taskNode;
}
// appending parent and child nodes
function appendNode(parentNode, childNode) {
    return parentNode.appendChild(childNode);
}
// updateButton function 
function updateInput(span, elem, index, value, checked) {
    const input = createNode('input');
    input.setAttribute("type", "checkbox");
    input.classList.add('checkBox');
    if (value) {
        span.style.textDecoration = 'line-through';
    }
    input.addEventListener('click', checked.bind(this, input, span, elem, index));
    return input;
}
//edit button function
function editButton(span, index, elem, updateOfList) {
    let editBtn = createNode('button', `<i class="fas fa-pencil"></i>`);
    editBtn.addEventListener('click', updateOfList.bind(this, span, index, elem, editBtn));
    return editBtn;
}
//delete button function
function deleteButton(index, li, singleTaskDelete) {
    const button = createNode('button', `<i class="fa-solid fa-xmark"></i>`);
    button.addEventListener('click', singleTaskDelete.bind(this, index, li));
    return button;
}
export { todoView };
