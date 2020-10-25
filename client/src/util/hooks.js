import { useState } from 'react';

export const useForm = (callback, initialValue) => {
  const [values, setValues] = useState(initialValue);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    callback();
  };
  return { values, handleChange, handleSubmit };
};
