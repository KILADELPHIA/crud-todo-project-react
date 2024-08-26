/* eslint-disable react/prop-types */
import './Todo.css'

function Todo({
    todo,
    onDelete,
    onToggle
}) {
      return (
      <div>
        <p>{todo.title}</p>
        <input 
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}/>
        <button onClick={onDelete}>Удалить задачу</button>
      </div>
    )
  }
  
  export default Todo
  