import { useState, useEffect, useContext } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
    const { isOpen, isLoading, onClose, onUpdateUser } = props
    const user = useContext(CurrentUserContext)
    const [inputs, setInputs] = useState({})
    const [isError, setIsError] = useState({})
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
        setInputs({ name: user.name, about: user.about })
    }, [user])

    function checkIsFormValid() {
        if (
            isError.name !== '' ||
            isError.about !== '' ||
            inputs.name === '' ||
            inputs.about === ''
        ) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }

    function handlePaste(e) {
        e.target.value = e.clipboardData.getData('text/plain')
        handleChange(e)
    }

    function handleChange(e) {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
        setIsError({ ...isError, [e.target.name]: e.target.validationMessage })
        checkIsFormValid()
    }

    function handleProfileSubmit(e) {
        e.preventDefault()
        onUpdateUser({
            name: inputs.name,
            about: inputs.about,
        })
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
                    isError.name && 'form__input_type_error'
                }`}
                name="name"
                value={inputs.name || ''}
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
                    isError.name && 'form__error_visible'
                }`}
                aria-live="polite"
            >
                {isError.name}
            </span>

            <input
                aria-label="About me"
                type="text"
                className={`form__input form__input_type_description ${
                    isError.about && 'form__input_type_error'
                }`}
                name="about"
                value={inputs.about || ''}
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
                    isError.about && 'form__error_visible'
                }`}
                aria-live="polite"
            >
                {isError.about}
            </span>
        </PopupWithForm>
    )
}

export default EditProfilePopup
