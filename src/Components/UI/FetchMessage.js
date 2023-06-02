import { useRef } from 'react';
import styles from './FetchMessage.module.css';

const refreshIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="30"
    height="30"
    viewBox="0 0 48 48"
    fill="white"
  >
    <path d="M 24 5 C 16.291968 5 10 11.291968 10 19 L 10 28.171875 L 8.4140625 26.585938 A 2.0002 2.0002 0 0 0 6.9785156 25.980469 A 2.0002 2.0002 0 0 0 5.5859375 29.414062 L 10.408203 34.236328 A 2.0002 2.0002 0 0 0 13.599609 34.228516 L 18.414062 29.414062 A 2.0002 2.0002 0 1 0 15.585938 26.585938 L 14 28.171875 L 14 19 C 14 13.454032 18.454032 9 24 9 C 26.184807 9 28.180172 9.6997689 29.830078 10.888672 A 2.0002 2.0002 0 1 0 32.169922 7.6445312 C 29.875828 5.9914341 27.047193 5 24 5 z M 35.970703 12.972656 A 2.0002 2.0002 0 0 0 34.40625 13.765625 L 29.585938 18.585938 A 2.0002 2.0002 0 1 0 32.414062 21.414062 L 34 19.828125 L 34 29 C 34 34.545968 29.545968 39 24 39 C 21.815193 39 19.819828 38.300231 18.169922 37.111328 A 2.0002 2.0002 0 1 0 15.830078 40.355469 C 18.124172 42.008566 20.952807 43 24 43 C 31.708032 43 38 36.708032 38 29 L 38 19.828125 L 39.585938 21.414062 A 2.0002 2.0002 0 1 0 42.414062 18.585938 L 37.585938 13.757812 A 2.0002 2.0002 0 0 0 35.970703 12.972656 z"></path>
  </svg>
);

const FetchMessage = ({ message, setMessage, setIsReload }) => {
  const timerRef = useRef(null);
  let buttonText = 'X';

  const msgErrorHandler = () => {
    if (message.orderErr) setMessage(null);
    else if (message.timer === null) {
      setMessage(null);
      setIsReload(prev => !prev);
    }
  };

  if (message?.text) {
    !timerRef.current &&
      message.timer !== null &&
      (timerRef.current = setInterval(
        () =>
          setMessage({
            text: message.text,
            timer: (message.timer -= 1),
          }),
        1000
      ));
    if (message.timer < 1 && message.timer !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTimeout(() => setMessage(null), 1000);
    }

    message.timer !== null && (buttonText = message.timer);
    !message.orderErr && message.timer === null && (buttonText = refreshIcon);

    return (
      <div
        className={styles['error-msg']}
        // style={message.timer === null ? { color: 'red' } : {}}
      >
        <p>{message.text}</p>
        <button onClick={msgErrorHandler}>{buttonText}</button>
      </div>
    );
  } else return null;
};

export default FetchMessage;
