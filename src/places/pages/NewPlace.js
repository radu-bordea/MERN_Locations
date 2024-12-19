import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./PlaceForm.css";

// Reducer function to manage the state of the form.
// Handles input changes and validates the overall form state.
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      // Check if all inputs are valid after the current input change.
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state, // Preserve existing state.
        inputs: {
          ...state.inputs, // Update only the specific input that changed.
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid, // Update form validity.
      };
    default:
      return state; // Return current state for unknown action types.
  }
};

// Main component for adding a new place.
const NewPlace = () => {
  // Use the `useReducer` hook to manage form state with `formReducer`.
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false, // Initial form validity is false.
  });

  // Handler function to dispatch input changes to the reducer.
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE", // Action type to update the input.
      value: value, // New input value.
      isValid: isValid, // Input validity.
      inputId: id, // ID of the input being updated.
    });
  }, []);

  // Handler function for form submission.
  const placeSubmitHandler = (event) => {
    event.preventDefault(); // Prevent default form submission behavior.
    console.log(formState.inputs); // Log form inputs (to be sent to the backend).
  };

  return (
    // Render the form with input fields and a submit button.
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]} // Validation rule: required.
        errorText="Please enter a valid title." // Error message for invalid input.
        onInput={inputHandler} // Input change handler.
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]} // Validation rule: min length of 5.
        errorText="Please enter a valid description (at least 5 characters)." // Error message.
        onInput={inputHandler} // Input change handler.
      />
      <Input
        id="address"
        element="input"
        label="ADDRESS"
        validators={[VALIDATOR_REQUIRE()]} // Validation rule: required.
        errorText="Please enter a valid address." // Error message.
        onInput={inputHandler} // Input change handler.
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
