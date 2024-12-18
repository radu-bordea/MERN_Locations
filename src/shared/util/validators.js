// Define constants for various validator types.
const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';

// Factory functions to create validator objects for different validation rules.
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val // Minimum length value for validation.
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val // Maximum length value for validation.
});
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val }); // Minimum numeric value for validation.
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val }); // Maximum numeric value for validation.
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL }); // Email format validation.

// Validation function to check a value against a list of validators.
export const validate = (value, validators) => {
  let isValid = true; // Start with a valid state.
  
  // Loop through each validator and apply its rules.
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      // Check if the value is non-empty.
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      // Check if the value meets the minimum length requirement.
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      // Check if the value does not exceed the maximum length.
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      // Check if the numeric value is greater than or equal to the minimum.
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      // Check if the numeric value is less than or equal to the maximum.
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      // Check if the value matches a valid email format.
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }

  return isValid; // Return the overall validity of the value.
};
