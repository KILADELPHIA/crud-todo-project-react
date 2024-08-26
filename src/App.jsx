
/* eslint-disable no-unused-vars */

import { 
  useEffect, 
  useState 
} from 'react'

import { addTodo, getTodos, updateTodo } from './api/todo';
import { getNormilizedTodos } from './utils/get-normilized-todo';
import Todo from './components/Todo/Todo.jsx';
import { deleteTodo } from './api/todo';
import {v4 as uuidv4} from 'uuid';


import './App.css'


function App() {

  const [todosIds, setTodosIds] = useState(null);
  const [todosById, setTodosById] = useState({});
  const [isTodosLoading, setTodosLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [todoTitle, setTodoTitle] = useState('')

  useEffect(() => {
    setIsError(false);
    setTodosLoading(true);

    getTodos()
      .then(todos => {
        const [ids, byIds] = getNormilizedTodos(todos)

        setTodosLoading(false);
        setTodosIds(ids);
        setTodosById(byIds);
      })

      .catch(error => {
        setIsError(true);
        setTodosLoading(false)
      });
    }, [])

  function handleDeleteTodo (id) {
    setTodosIds(todosIds.filter(todoId => todoId !== id));
    deleteTodo(id)
  }

  function handleToggleTodo (id) {
    const todo = {
      ...todosById[id],
        completed: !todosById[id].completed
    }

    setTodosById ({
      ...todosById,
      [id] : todo
    });

    updateTodo(todo)
  }
  
  function handleInputTodoTitleChange (event) {
    setTodoTitle(event.target.value);
  }

  function handleAddTodoBtnClick() {
    const id = uuidv4();
    const todo = {
      id: id,
      title: todoTitle,
      completed: false
    }

    setTodosById({
      ...todosById,
      [todo.id]: todo
    });

    setTodosIds([todo.id, ...todosIds])

    addTodo(todo)
  }

  return (
    <div>
      <h1>Список задач</h1>
      {isError && 'Произошла ошибка'}
      {isTodosLoading && 'Загружаем список задач'}

      <input 
      type="text"
      value={todoTitle}
      onChange={event => handleInputTodoTitleChange(event)}/>

      <button onClick={handleAddTodoBtnClick}>Добавление задачи</button>

      {todosIds && todosIds.map(id => (
        <Todo
          key= {id}
          todo = {todosById[id]}
          onDelete = {() => handleDeleteTodo(id)}
          onToggle = {() => handleToggleTodo(id)}/>
      ))}
    </div>
  )
}

export default App
