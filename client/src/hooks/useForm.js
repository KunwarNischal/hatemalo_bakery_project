/**
 * Hook: useForm
 * Manages form state, validation, and submission
 * 
 * @description Complete form management including state, validation, and submission handlers
 * @param {Object} options - Configuration object
 * @param {Object} options.initialValues - Initial form field values
 * @param {Function} options.onSubmit - Callback function when form is submitted
 * @param {Object} options.validations - Validation rules object (field: validationFunction)
 * 
 * @returns {Object} { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, resetForm, setFieldValue }
 * 
 * @example
 * const form = useForm({
 *   initialValues: { email: '', password: '' },
 *   validations: {
 *     email: (value) => !value ? 'Email required' : !value.includes('@') ? 'Invalid email' : '',
 *     password: (value) => !value ? 'Password required' : value.length < 6 ? 'Min 6 characters' : ''
 *   },
 *   onSubmit: async (values) => { await api.post('/login', values); }
 * });
 */

import { useState, useCallback } from 'react';

export const useForm = (options = {}) => {
  const { initialValues = {}, onSubmit = () => {}, validations = {} } = options;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value) => {
    if (validations[name]) {
      return validations[name](value);
    }
    return '';
  }, [validations]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (err) {
        console.error('Form submission error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validateField, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue
  };
};
