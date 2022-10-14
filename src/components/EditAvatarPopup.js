import { useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
    const userAvatarRef = useRef();
    const [isError, setIsError] = useState({});
    const [isValid, setIsValid] = useState(false);

    function checkIsFormValid() {
        if (isError.avatar !== '' || userAvatarRef.current.value === '') {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }

    function handleChange(e) {
        setIsError({ ...isError, [e.target.name]: e.target.validationMessage });
        checkIsFormValid();
    }

    function handlePaste(e) {
        userAvatarRef.current.value = e.clipboardData.getData('text/plain');
        handleChange(e);
    }

    function handleAvatarSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(userAvatarRef.current.value);
        userAvatarRef.current.value = '';
        setIsError({});
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
                ref={userAvatarRef}
                aria-label="Image URL"
                type="url"
                className={`form__input form__input_type_url ${
                    isError.avatar && 'form__input_type_error'
                }`}
                name="avatar"
                onChange={handleChange}
                onPaste={handlePaste}
                placeholder="Image link"
                aria-required="true"
                required
            />
            <span
                className={`form__error ${
                    isError.avatar && 'form__error_visible'
                }`}
                aria-live="polite"
            >
                {isError.avatar}
            </span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
