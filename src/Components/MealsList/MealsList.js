import React, { useContext } from 'react';
import AppConext from '../../store/AppContext';
import FetchMessage from '../UI/FetchMessage';
import Spinner from '../UI/Spinner';
import Form from './Form';
import styles from './MealsList.module.css';

const MealsList = () => {
  const { isLoading, message, setMessage, setIsReload, meals } =
    useContext(AppConext);

  return (
    <ul className={styles['meals-list']}>
      {meals.map(meal => (
        <li key={meal.id}>
          <Form
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        </li>
      ))}
      {isLoading && <Spinner />}
      {message && (
        <FetchMessage
          message={message}
          setMessage={setMessage}
          setIsReload={setIsReload}
        />
      )}
    </ul>
  );
};

export default MealsList;
