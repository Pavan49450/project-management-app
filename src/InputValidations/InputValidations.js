// Example validation functions
const nameValidation = (value) => {
  // Add your validation logic for name here
  return value.trim() !== "" && /^[a-zA-Z]+$/.test(value); // Example: Not empty and contains only alphabets
};

export const NoOfYearsValidation = (value) => {
  // Add your validation logic for mobile number here
  return /^\d{1,2}$/.test(value.trim()); // Matches 1 or 2 digits
};
export const ValueUndefinedValidations = (value) => {
  // Add your validation logic for mobile number here
  return value !== undefined && value !== null; // Matches 1 or 2 digits
};

export const BooleanValidation = (value) => {
  return value === false || value === true;
};

export const fullNameValidation = (value) => {
  return value.trim() !== "" && /^[a-zA-Z\s]+$/.test(value); // Not empty and contains only alphabets and spaces
};

export const descriptionValidation = (value) => {
  return value.trim().length >= 5 && value.trim().length <= 200;
};

export const NumberValidation = (value) => {
  return value !== undefined && value !== null && /^\d+(\.\d+)?$/.test(value);
};

const mobileNumberValidation = (value) => {
  // Add your validation logic for mobile number here
  return value.trim() !== "" && /^\d{10}$/.test(value); // Example: Not empty and exactly 10 digits
};

const emailValidation = (value) => {
  // Add your validation logic for email here
  return value.trim() !== "" && /^\S+@\S+\.\S+$/.test(value); // Example: Not empty and follows email format
};

export const urlValidation = (value) => {
  // Add your validation logic for URL here
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // Protocol
      "((([a-zA-Z0-9$-_.+!*'(),]|%[0-9a-fA-F]{2})+)(:([a-zA-Z0-9$-_.+!*'(),]|%[0-9a-fA-F]{2})+)?@)?" + // User:pass
      "(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))" + // IP address
      "|((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}))" + // Domain name
      "(\\:[0-9]{1,5})?" + // Port number
      "(\\/($|[a-zA-Z0-9$-_.+!*'(),;:@&=/?%#]*)?$)",
    "i"
  ); // Path and query string

  return value.trim() !== "" && urlPattern.test(value); // Example: Not empty and follows URL format
};

const aadhaarValidation = (value) => {
  // Add your validation logic for Aadhaar number here
  return value.trim() !== "" && /^\d{12}$/.test(value); // Example: Not empty and exactly 12 digits
};

const passwordValidation = (value) => {
  // Add your validation logic for password here

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(value)) {
    return false;
  }

  // Check if the password contains at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return false;
  }

  // Check if the password contains at least one digit
  if (!/\d/.test(value)) {
    return false;
  }

  // Check if the password length is at least 8 characters
  if (value.length < 8) {
    return false;
  }

  // If all conditions pass, return true indicating that the password is valid
  return true;
};

const confirmPasswordValidation = (value, passwordValue) => {
  // Add your validation logic for confirm password here
  return value === passwordValue; // Example: Confirm password must match the original password
};

const addressValidation = (value) => {
  // Add your validation logic for address here
  return value.trim() !== ""; // Example: Address must not be empty
};

const DOBValidation = (value) => {
  return value.toString().trim() !== "";
};

export const yearValidation = (value) => {
  const currentYear = new Date().getFullYear();
  const regex = /^(17\d{2}|18\d{2}|19\d{2}|20\d{2}|21\d{2})$/;
  return (
    regex.test(value) &&
    parseInt(value) >= 1700 &&
    parseInt(value) <= currentYear
  );
};

export const fromDateValidation = (date) => {
  const fromDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison

  // Check if fromDate is not beyond today's date
  return fromDate <= today;
};

export const fileLastModifiedValidation = (file) => {
  // Check if file object is provided
  if (!file) {
    return false; // Invalid file object
  }

  return file;
};

export const toDateValidation = (fromDate, toDate) => {
  const fromDateObj = new Date(fromDate);
  const toDateObj = new Date(toDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison

  // Check if toDate is not today and is not before fromDate
  return toDateObj <= today && toDateObj >= fromDateObj;
};

export const endYearValidation = (value, startYear) => {
  const currentYear = new Date().getFullYear();
  const regex = /^(17\d{2}|18\d{2}|19\d{2}|20\d{2}|21\d{2})$/;
  const isValidYear =
    regex.test(value) &&
    parseInt(value) >= 1700 &&
    parseInt(value) <= currentYear;

  if (!isValidYear) return false;

  const difference = parseInt(value) - parseInt(startYear);
  return difference <= 10 && difference >= 0;
};

export const percentageValidation = (value) => {
  const regex = /^\d+(\.\d+)?$/;
  return regex.test(value);
};

export const annualIncomeValidator = (value) => {
  if (!value || value.trim() === "") {
    return false;
  }

  if (isNaN(Number(value))) {
    return false;
  }

  return true;
};

// export const fileValidations = (file)=>{
//   {validateValue:(file) => profilePicInput.setValue(file)}
// }

export {
  nameValidation,
  mobileNumberValidation,
  emailValidation,
  aadhaarValidation,
  passwordValidation,
  confirmPasswordValidation,
  addressValidation,
  DOBValidation,
};
