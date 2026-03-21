/**
 * Hook: useFormValidation
 * Advanced form validation with field-level rules
 * 
 * @description Provides comprehensive form validation with multiple rule types
 * @param {Object} initialValues - Initial form values object
 * @param {Object} validationRules - Rules object where keys are field names and values are rule functions
 * 
 * @returns {Object} { values, errors, validate, validateField, setFieldValue, reset, isValid }
 * 
 * @example
 * const { values, errors, validate, validateField } = useFormValidation(
 *   { firstName: '', email: '', password: '' },
 *   {
 *     firstName: [
 *       (value) => !value ? 'First name is required' : '',
 *       (value) => value.length < 2 ? 'Min 2 characters' : ''
 *     ],
 *     email: [
 *       (value) => !value ? 'Email is required' : '',
 *       (value) => !/\S+@\S+\.\S+/.test(value) ? 'Invalid email' : ''
 *     ]
 *   }
 * );
 */

import { useState, useCallback, useMemo } from 'react';

export const useFormValidation = (initialValues, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateField = useCallback((name, value) => {
    if (!validationRules[name]) {
      return '';
    }

    const rules = validationRules[name];
    const ruleArray = Array.isArray(rules) ? rules : [rules];

    for (let rule of ruleArray) {
      const error = rule(value);
      if (error) {
        return error;
      }
    }

    return '';
  }, [validationRules]);

  const validate = useCallback(() => {
    const newErrors = {};

    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validateField]);

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field on change
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  return {
    values,
    errors,
    validate,
    validateField,
    setFieldValue,
    reset,
    isValid
  };
};
