import { useState, useCallback } from 'react';

export default function useFormAndValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: e.target.validationMessage });
        setIsValid(e.target.closest('form').checkValidity());
    };

    function handlePaste(e) {
        e.target.value = e.clipboardData.getData('text/plain');
        handleChange(e);
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {
        values,
        handleChange,
        handlePaste,
        errors,
        isValid,
        resetForm,
        setValues,
        setIsValid,
    };
}
