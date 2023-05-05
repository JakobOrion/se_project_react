import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
    const { values, handleChange, handlePaste, errors, isValid, resetForm } =
        useFormAndValidation();

    useEffect(() => {
        resetForm({ avatar: '' });
    }, [isOpen]);

    function handleAvatarSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: values.avatar });
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Change profile picture"
            buttonText="Save"
            isOpen={isOpen}
            isValid={isValid}
            isLoading={isLoading}
            onClose={onClose}
            onSubmit={handleAvatarSubmit}
            onUpdateAvatar={onUpdateAvatar}
        >
            <input
                aria-label="Image URL"
                type="url"
                className={`form__input form__input_type_url ${
                    errors.avatar && 'form__input_type_error'
                }`}
                name="avatar"
                value={values.avatar || ''}
                onChange={handleChange}
                onPaste={handlePaste}
                placeholder="Image link"
                aria-required="true"
                required
            />
            <span
                className={`form__error ${
                    errors.avatar && 'form__error_visible'
                }`}
                aria-live="polite"
            >
                {errors.avatar}
            </span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
