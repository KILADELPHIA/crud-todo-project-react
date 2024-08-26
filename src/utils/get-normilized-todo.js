
export function getNormilizedTodos (todoList) {
    const ids = [];
    const byIds = {};

    todoList.map(todo => {
        ids.push(todo.id);
        byIds[todo.id] = todo;
    })

    return [ids, byIds]

}