import React from 'react';
import heroImg from '../../assets/meals.jpg';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <div className={styles.container}>
      <img src={heroImg} alt="" className={styles.img} />
      <div className={styles.description}>
        <h2>Delicious Food, Delivered To You</h2>
        <p>
          Choose your favorite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <p>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course by experienced chefs!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
