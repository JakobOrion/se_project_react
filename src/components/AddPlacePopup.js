import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace }) {
    const {
        values,
        handleChange,
        handlePaste,
        errors,
        isValid,
        setValues,
        resetForm,
    } = useFormAndValidation();

    useEffect(() => {
        setValues({ name: '', link: '' });
        resetForm();
    }, [isOpen]);

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: values.name,
            link: values.link,
        });
    }

    return (
        <PopupWithForm
            name="add-card"
            title="New place"
            buttonText="Create"
            isOpen={isOpen}
            isValid={isValid}
            isLoading={isLoading}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
            onAddPlace={onAddPlace}
        >
            <input
                aria-label="Title"
                type="text"
                className={`form__input form__input_type_card-title ${
                    errors.name && 'form__input_type_error'
                }`}
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                onPaste={handlePaste}
                placeholder="Title"
                minLength="1"
                maxLength="30"
                aria-required="true"
                required
            />
            <span
                className={`form__error ${
                    errors.name && 'form__error_visible'
                }`}
                aria-live="polite"
            >
                {errors.name}
            </span>

            <input
                aria-label="Image URL"
                type="url"
                className={`form__input form__input_type_url ${
                    errors.link && 'form__input_type_error'
                }`}
                name="link"
                value={values.link || ''}
                onChange={handleChange}
                onPaste={handlePaste}
                placeholder="Image link"
                aria-required="true"
                required
            />
            <span
                className={`form__error ${
                    errors.link && 'form__error_visible'
                }`}
                aria-live="polite"
            >
                {errors.link}
            </span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
