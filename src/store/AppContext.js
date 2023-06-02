import { createContext } from 'react';

const AppConext = createContext({
  meals: [],
  isLoading: false,
  message: null,
  setMessage() {},
  mealsCart: [],
  dispatchMealsCart() {},
  isModal: false,
  showModal() {},
  setIsReload() {},
});

export default AppConext;
