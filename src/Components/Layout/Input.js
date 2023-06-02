import React, { forwardRef } from 'react';

const Input = forwardRef(({ id, inputProps, className }, ref) => (
  <div className={className}>
    <label htmlFor={id}> Amount </label>
    <input ref={ref} id={id} {...inputProps} />
  </div>
));

export default Input;
