import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

// Reducer function to manage the state of the input field.
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      // Updates the input value and validates it using the provided validators.
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH':
      // Marks the input as touched, enabling validation feedback.
      return {
        ...state,
        isTouched: true
      };
    default:
      return state; // Return current state for unknown action types.
  }
};

// Input component that renders a dynamic input or textarea field with validation.
const Input = props => {
  // useReducer hook to manage input state (value, validity, and touched status).
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false
  });

  const { id, onInput } = props; // Destructure `id` and `onInput` from props.
  const { value, isValid } = inputState; // Destructure `value` and `isValid` from input state.

  // useEffect hook to notify parent components of input changes.
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  // Handles input value changes and dispatches them to the reducer.
  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  // Handles marking the input as touched when it loses focus.
  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  // Dynamically render either an <input> or a <textarea> based on props.
  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3} // Default to 3 rows if not provided.
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  // Render the input field with a label, validation message, and dynamic styles.
  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
