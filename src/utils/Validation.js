import React, { useCallback } from "react";
import validator from 'validator';

export function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
  
    const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setValues({...values, [name]: value});
      if (event.target.type === 'email') {
        if (!validator.isEmail(value)) {
          setErrors({...errors, [name]: 'Введен не корректный email адрес' });
        } else {
          setErrors({...errors, [name]: target.validationMessage });
        }
        setIsValid(target.closest("form").checkValidity() && validator.isEmail(value));
      } else {
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
      }
    };
  
    const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, resetForm };
  }