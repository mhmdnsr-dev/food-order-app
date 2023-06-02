import React from 'react';
import AppConextProvider from './store/AppProvider';
import Header from './Components/Header/Header';
import HeroSection from './Components/HeroSection/HeroSection';
import MealsList from './Components/MealsList/MealsList';
import Model from './Components/Modal/Modal';

function App() {
  return (
    <AppConextProvider>
      <Header />
      <HeroSection />
      <MealsList />
      <Model />
    </AppConextProvider>
  );
}

export default App;
