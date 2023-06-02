import React from 'react';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>ReactMeals</h1>
      <HeaderCartButton />
    </header>
  );
};

export default Header;
