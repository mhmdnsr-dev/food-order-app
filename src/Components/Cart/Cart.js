import React, { useContext } from 'react';
import AppConext from '../../store/AppContext';
import FetchMessage from '../UI/FetchMessage';
import Spinner from '../UI/Spinner';
import styles from './Cart.module.css';
import useFetch from '../../hooks/use-fetch';

const Cart = () => {
  const { mealsCart, dispatchMealsCart, showModal, isModal } =
    useContext(AppConext);

  const { isLoading, message, setMessage, fetchHandler } = useFetch();

  const orderMealsHandler = () => {
    fetchHandler(
      'https://my-first-project-e6704-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealsCart),
      },
      () => {
        dispatchMealsCart({ type: 'default' });
      }
    );
  };

  const increaseMealsHandel = id => {
    dispatchMealsCart({ type: 'increase', id: id });
  };
  const decreaseMealsHandel = id => {
    dispatchMealsCart({ type: 'decrease', id: id });
  };

  const totalPrice = mealsCart
    .reduce((acc, item) => acc + item.amount * item.meal.price, 0)
    .toFixed(2);

  const cartItems = (
    <ul>
      {mealsCart.map(maelCart => (
        <li key={maelCart.meal.id}>
          <div className={styles['details-item']}>
            <span className={styles.title}>{maelCart.meal.name}</span>
            <span className={styles.price}>${maelCart.meal.price}</span>
            <span className={styles['amount']}>X {maelCart.amount}</span>
          </div>
          <div className={styles['change-amount']}>
            <button
              className="increase"
              onClick={increaseMealsHandel.bind(null, maelCart.meal.id)}
            >
              +
            </button>
            <button
              className="decrease"
              onClick={decreaseMealsHandel.bind(null, maelCart.meal.id)}
            >
              -
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className={`${styles['container-cart']} ${
        isModal ? styles['show-cart'] : ''
      }`}
    >
      <div className={`${styles['cart-items']}`}>
        {!isLoading && !message && mealsCart.length > 0 && cartItems}
        {!isLoading && !message && mealsCart.length === 0 && (
          <p className={styles.empty}>You haven't selected any meals yet</p>
        )}
        {isLoading && <Spinner />}
        {message && <FetchMessage message={message} setMessage={setMessage} />}
      </div>
      {!isLoading && !message && (
        <div className={styles['order-section']}>
          <div className={styles['total-amount']}>
            <span>Total Amount</span>
            <span>${totalPrice}</span>
          </div>
          <div>
            <button className={styles.close} onClick={showModal}>
              Close
            </button>
            {mealsCart.length > 0 ? (
              <button className={styles.order} onClick={orderMealsHandler}>
                Order
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
