import React, { useRef, useContext } from 'react';
import AppConext from '../../store/AppContext';
import Input from '../Layout/Input';
import styles from './MealsList.module.css';

const Form = ({ id, name, description, price }) => {
  const { dispatchMealsCart } = useContext(AppConext);
  const inputRef = useRef(null);

  const submitHandel = e => {
    e.preventDefault();
    const meal = { id, name, price };
    const amount = +inputRef.current.value;
    dispatchMealsCart({ type: 'added', meal, amount });
    inputRef.current.value = 0;
  };

  return (
    <form onSubmit={submitHandel}>
      <div>
        <span className={styles.title}>{name}</span>
        <span className={styles.description}>{description}</span>
        <span className={styles.price}>${price}</span>
      </div>
      <div>
        <Input
          id={id}
          inputProps={{
            type: 'number',
            max: '5',
            min: '1',
            defaultValue: '0',
          }}
          ref={inputRef}
        />
        <button>+ Add</button>
      </div>
    </form>
  );
};

export default Form;
