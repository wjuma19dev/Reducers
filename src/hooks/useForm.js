import { useState } from 'react';

export const useForm = (initialState={}) => {

  const [formvalue, setFormvalue] = useState(initialState);

  const reset = () => {
    setFormvalue(initialState);
  }

  const inputHandlerChange = ({ target }) => {
    setFormvalue({
      ...formvalue,
      [target.name]: target.value
    });
  }

  return [formvalue, inputHandlerChange, reset];
}
