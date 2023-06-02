// import { configure } from '@testing-library/react';
import { useCallback, useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoaing] = useState(false);
  const [message, setMessage] = useState(null);
  const fetchHandler = useCallback(async (url, config, handelData) => {
    try {
      setIsLoaing(true);
      const timeout = sec => {
        return new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('ERR_CONNECTION_TIMED_OUT'));
          }, sec * 1000);
        });
      };
      const resp = await Promise.race([fetch(url, config), timeout(5)]);

      if (!resp.ok) throw Error('Failed to fetch');

      const data = await resp.json();

      handelData(data);
      config &&
        setMessage({
          text: 'Your order is in process, thank you for waiting. 🎉',
          timer: 3,
        });
    } catch (err) {
      setMessage({
        text: `Sorry; ${
          config
            ? 'Your order could not be completed 😥, Please try again.'
            : 'The meal menu could not be loaded 😥, Please try again.'
        } `,
        timer: null,
        orderErr: config ? true : false,
      });
    }
    setIsLoaing(false);
  }, []);

  return { isLoading, message, setMessage, fetchHandler };
};

export default useFetch;
