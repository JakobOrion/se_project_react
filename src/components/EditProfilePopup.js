import { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
    const user = useContext(CurrentUserContext);
    const { values, handleChange, handlePaste, errors, isValid, setValues } =
        useFormAndValidation();

    useEffect(() => {
        setValues({ name: user.name, about: user.about });
    }, [user, isOpen]);

    function handleProfileSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Edit profile"
            buttonText="Save"
            isOpen={isOpen}
            isValid={isValid}
            isLoading={isLoading}
            onClose={onClose}
            onSubmit={handleProfileSubmit}
        >
            <input
                aria-label="Name"
                type="text"
                className={`form__input form__input_type_name ${
                    errors.name && 'form__input_type_error'
                }`}
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                onPaste={handlePaste}
                placeholder="Name"
                minLength="2"
                maxLength="40"
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
                aria-label="About me"
                type="text"
                className={`form__input form__input_type_description ${
                    errors.about && 'form__input_type_error'
                }`}
                name="about"
                value={values.about || ''}
                onChange={handleChange}
                onPaste={handlePaste}
                placeholder="About me"
                minLength="2"
                maxLength="200"
                aria-required="true"
                required
            />
            <span
                className={`form__error ${
                    errors.about && 'form__error_visible'
                }`}
                aria-live="polite"
            >
                {errors.about}
            </span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
