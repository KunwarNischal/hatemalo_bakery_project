/**
 * Hook: useFormValidation
 * Advanced form validation with field-level rules
 * 
 * @description Provides comprehensive form validation with multiple rule types
 * @param {Object} validationRules - Rules object where keys are field names and values are rule arrays
 * 
 * @returns {Object} { errors, validateForm, validateField, clearErrors }
 * 
 * @example
 * const { errors, validateForm, validateField } = useFormValidation({
 *   firstName: [
 *     { required: 'First name is required' },
 *     { minLength: { value: 2, message: 'Min 2 characters' } }
 *   ],
 *   email: [
 *     { required: 'Email is required' },
 *     { pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } }
 *   ]
 * });
 */

import { useState, useCallback } from 'react';

export const useFormValidation = (validationRules = {}) => {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((fieldName, value) => {
    if (!validationRules[fieldName]) {
      return '';
    }

    const rules = validationRules[fieldName];
    const ruleArray = Array.isArray(rules) ? rules : [rules];

    for (let rule of ruleArray) {
      // Handle required validation
      if (rule.required) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return rule.required;
        }
      }

      // Handle minLength validation
      if (rule.minLength && value) {
        if (value.length < rule.minLength.value) {
          return rule.minLength.message;
        }
      }

      // Handle maxLength validation
      if (rule.maxLength && value) {
        if (value.length > rule.maxLength.value) {
          return rule.maxLength.message;
        }
      }

      // Handle pattern validation
      if (rule.pattern && value) {
        if (!rule.pattern.value.test(value)) {
          return rule.pattern.message;
        }
      }

      // Handle custom validation function
      if (rule.validate && typeof rule.validate === 'function') {
        const result = rule.validate(value);
        if (result) {
          return result;
        }
      }
    }

    return '';
  }, [validationRules]);

  const validateForm = useCallback((formData) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validationRules, validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateForm,
    validateField,
    clearErrors
  };
};
