import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import TodoList from '../components/TodoList/TodoList';
import EditForm from '../components/EditForm/EditForm';
import { nanoid } from 'nanoid';

import { useEffect, useState } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    const initialTodos = [];
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      if (parsedTodos.length > 0) {
        return parsedTodos;
      }
    }
    return initialTodos;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const onSubmit = (value) => {
    const newTodo = {
      id: nanoid(),
      text: value,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  const onDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  }
  
  const onEdit = (todo) => {
    setIsEditing(true);
    setEditingTodo(todo);
  }
  
  const onUpdate = (newValue) => {
    setTodos((prevTodos) => {
      return prevTodos.map(todo => {
        if (todo.id === editingTodo.id) {
          return { ...todo, text: newValue };
        }
        return todo;
      });
    });
    setIsEditing(false);
    setEditingTodo({});
  }

  const onCancelUpdate = () => { 
    setIsEditing(false);
    setEditingTodo({});
  }

  
  return (
    <>
      {
        isEditing ?
        <EditForm updateTodo={onUpdate} cancelUpdate={onCancelUpdate} defaultValue={editingTodo.text} /> :
        <Form onSubmit={onSubmit} />
      }  
      {todos.length === 0 && <Text textAlign="center">There are no any todos ...</Text>}
      {todos.length > 0 &&  <TodoList todos={todos} onDelete={onDelete} onEdit={onEdit} />}
    </>
  );
};

export default Todos;
