import React, { useEffect, useState, useReducer } from 'react';
import AppConext from './AppContext';
import useFetch from '../hooks/use-fetch';

const storageCart = data =>
  localStorage.setItem('cart-items', JSON.stringify(data));

const mealsCartReducer = (prevState, action) => {
  if (action.type === 'added') {
    for (const item of prevState) {
      if (item.meal.id === action.meal.id) {
        item.amount += action.amount;
        const nextState = [...prevState];
        storageCart(nextState);
        return nextState;
      }
    }
    const nextState = [
      ...prevState,
      { meal: action.meal, amount: action.amount },
    ];
    storageCart(nextState);
    return nextState;
  }

  if (action.type === 'decrease') {
    prevState.forEach(el => el.meal.id === action.id && el.amount--);
    const nextState = prevState.filter(el => el.amount !== 0);
    storageCart(nextState);
    return nextState;
  }

  if (action.type === 'increase') {
    prevState.forEach(el => el.meal.id === action.id && el.amount++);
    const nextState = [...prevState];
    storageCart(nextState);
    return nextState;
  }
  if (action.type === 'init') return action.storedCart;

  return [];
};

const AppConextProvider = ({ children }) => {
  const { isLoading, message, setMessage, fetchHandler } = useFetch();
  const [isReload, setIsReload] = useState(false);
  const [mealsCart, dispatchMealsCart] = useReducer(mealsCartReducer, []);
  const [meals, setMeals] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const showModal = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    fetchHandler(
      'https://my-first-project-e6704-default-rtdb.firebaseio.com/meals.json',
      null,
      data => {
        const { '-NV9sE7hBLGevkvd1ghL': loadedMeals } = data;
        const arrMeals = [];
        for (const key in loadedMeals) {
          arrMeals.push({
            id: key,
            name: loadedMeals[key].name,
            description: loadedMeals[key].description,
            price: loadedMeals[key].price,
          });
        }
        setMeals(arrMeals);
      }
    );
    const storedCart = JSON.parse(localStorage.getItem('cart-items'));
    if (!storedCart) return;
    dispatchMealsCart({ type: 'init', storedCart });
  }, [isReload, fetchHandler]);

  return (
    <AppConext.Provider
      value={{
        isLoading,
        message,
        setMessage,
        setIsReload,
        meals,
        isModal,
        showModal,
        mealsCart,
        dispatchMealsCart,
      }}
    >
      {children}
    </AppConext.Provider>
  );
};

export default AppConextProvider;
