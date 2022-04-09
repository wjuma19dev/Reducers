/*
  useReducer
  https://es.reactjs.org/docs/hooks-reference.html#usereducer

  Una alternativa a useState. Acepta un reducer de tipo (state, action) => newState y devuelve el estado actual emparejado con un método dispatch. (Si está familiarizado con Redux, ya sabe cómo funciona).

  useReducer a menudo es preferible a useState cuando se tiene una lógica compleja que involucra múltiples subvalores o cuando el próximo estado depende del anterior. useReducer además te permite optimizar el rendimiento para componentes que activan actualizaciones profundas, porque puedes pasar hacia abajo dispatch en lugar de callbacks.

*/

import React, { useReducer, useEffect } from 'react';
import { todoReducer } from './TodoReducer';
import { useForm } from '../hooks/useForm';

// Setear los valores iniciales de mi state, lo que devuelva esta función se pasara al arreglo vacio del reducer.
const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
}

export const TodoApp = () => {

  // Recibe el valor del formulario
  const [{ description }, inputHandlerChange, reset] = useForm({
    description: ''
  })

  // Reducer
  const [ todos, dispatch ] = useReducer(todoReducer, [], init);

  // Envio del formulario
  const onFormSubmit = e => {
    e.preventDefault();

    if(description.trim() <= 1 ) {
      return;
    }

    const newTodo = {
      id: 2,
      todo: description,
      status: 'PENDING'
    }

    const action = {
      type: 'AGREGAR',
      payload: newTodo
    }

    dispatch(action);
    reset();
  }

  // Guardar los todos en la localStore
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Eliminar un todo por ID
  const onHandlerDelete = (todoId) => {
    console.log(todoId);

    // TODO: Crear el action

    // TODO: Disparar el dispatch
  }

  return (
    <div className="row">

      <div className="col-12 mt-5">
        <h1>TodoApp ({ todos.length })</h1>
        <hr />
      </div>

      <div className="col-12">
        <div className="row">

          <div className="col-7">
            <ul className="list-group list-group-flush">
              {
                todos.map((t, i) => (
                  <li
                    key={t.id}
                    className="list-group-item d-flex justify-content-between align-items-center">
                    <p className="text-capitalize mb-0">
                      {i+1}. {t.todo}
                    </p>
                    <button className="btn btn-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="col-5">
            <form onSubmit={e => onFormSubmit(e)}>
              <fieldset>
                <div className="mb-2">
                  <label>Agregar una tarea</label>
                  <input
                    placeholder="Aprender React"
                    value={description}
                    onChange={inputHandlerChange}
                    name="description"
                    type="text"
                    className="form-control" />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-outline-primary">Agregar</button>
                </div>
              </fieldset>
            </form>
          </div>

        </div>
      </div>

    </div>

  );
}
