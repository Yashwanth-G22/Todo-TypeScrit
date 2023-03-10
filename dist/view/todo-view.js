function todoView(eventManager) {
    const ul = document.querySelector('.taskList');
    const { checkedOfItem, updateList, singleTaskDelete } = eventManager();
    return {
        createListElement: function (elem, index, value) {
            const li = createNode('li');
            li.classList.add('li-List');
            const span = createNode('span', elem);
            appendNode(li, updateInput(span, elem, index, value, checkedOfItem));
            appendNode(li, span);
            appendNode(li, editButton(span, index, elem, updateList));
            appendNode(li, deleteButton(index, li, singleTaskDelete));
            return appendNode(ul, li);
        },
    };
}
function createNode(elementName, elementValue = '') {
    let taskNode = document.createElement(elementName);
    taskNode.innerHTML = elementValue;
    return taskNode;
}
function appendNode(parentNode, childNode) {
    return parentNode.appendChild(childNode);
}
function updateInput(span, elem, index, value, checkedOfItem) {
    const input = createNode('input');
    input.setAttribute('type', 'checkbox');
    input.classList.add('checkBox');
    if (value) {
        input.checked = true;
        span.style.textDecoration = 'line-through';
    }
    input.addEventListener('click', () => checkedOfItem(input, span, elem, index));
    return input;
}
function editButton(span, index, elem, updateList) {
    let editBtn = createNode('button', `<i class="fas fa-pencil"></i>`);
    editBtn.addEventListener('click', () => updateList(span, index, elem, editBtn));
    return editBtn;
}
function deleteButton(index, li, singleTaskDelete) {
    const button = createNode('button', `<i class="fa-solid fa-xmark"></i>`);
    button.addEventListener('click', () => singleTaskDelete(index, li));
    return button;
}
export { todoView };
