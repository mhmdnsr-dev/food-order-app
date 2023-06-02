import React, { useContext } from 'react';
import AppConext from '../../store/AppContext';
import Cart from '../Cart/Cart';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

const Model = () => {
  const { showModal, isModal } = useContext(AppConext);

  return createPortal(
    <>
      <div
        className={`${styles.overlay} ${isModal ? styles.show : ''}`}
        onClick={showModal}
      ></div>
      <Cart />
    </>,
    document.body
  );
};

export default Model;
