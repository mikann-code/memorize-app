import React, { useContext, useRef } from 'react'
import './Todo.css';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import AutoFixHigh from '@mui/icons-material/AutoFixHigh';
import {  AppContext } from '../../useContext';
import { auth  } from "../../firebase/firebase";
import { useAuthState } from 
"react-firebase-hooks/auth";


export const TodoPage = () => {
  const { todos,setTodos } = useContext(AppContext);
  const ref = useRef();
  const [user] = useAuthState(auth); 

  const handleSubmitButton = () => {
     if(ref.current.value === "")return;
     const newTodos = [...todos,{id:uuidv4(),title:ref.current.value,isCompleted:false}];
     setTodos(newTodos);
     clearInputValue();
  }

  const handleDeleteTodo = (e) => {
    if(!window.confirm("クリックされたtodoを削除してもよろしいですか?"))return;
    const prevTodos = [...todos];
    const todoId = e.currentTarget.dataset.id;
    const clearTodos = prevTodos.filter((todo) => {
      return todoId !== todo.id;
    });
    setTodos(clearTodos);
  }

  const clearInputValue = () => {
    ref.current.value = "";
  }

  const handleCheckboxChange = (e) => {
    const targetTodoId = e.currentTarget.dataset.id;
    const updatedTodos = todos.map((todo) => {
      return {
        id:todo.id,
        title:todo.title,
        isCompleted: todo.id === targetTodoId ? !todo.isCompleted : todo.isCompleted,
      }
    })
    setTodos(updatedTodos);
  }

  const handleDeleteCheckedTodo = () => {
    if(!window.confirm("チェックがついたtodoを削除してもよろしいですか?"))return;
    const deletedTodos = todos.filter((todo) => {
      return todo.isCompleted === false;
    })
    setTodos(deletedTodos);
  }


  return (
    <>
    {user?(
    <section className='todoList'>
      <h1 className='todoListHeading'>Todos</h1>

      <input type="text" placeholder='Write your new task'
        ref={ref} className='inputTodoLocation'/>
      <Button variant='contained'
        
        className='submitButton'
        onClick={handleSubmitButton}
      >SUBMIT</Button>
      <AutoFixHigh className='clearTodoButton' onClick={handleDeleteCheckedTodo}/>

      <ul>
        {todos.map((todo) => {
          return (
            <li className="todo" key={todo.id}>
              <input type='checkbox' className='checkbox' checked={todo.isCompleted} onChange={handleCheckboxChange}
              data-id={todo.id}></input>
              <p>{todo.title}</p>
              <DeleteForever className='deleteIcon' onClick={handleDeleteTodo} data-id={todo.id}/>
            </li>
          )
        })}
      </ul>

    </section >
  ) : (
    <div className='attention'> 
      <p>ログインしてご利用ください</p>
    </div>
    )
    }
    </>
  );
}
