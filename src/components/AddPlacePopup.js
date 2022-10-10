import { useState } from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
    const { isOpen, isLoading, onClose, onAddPlace } = props
    const [inputs, setInputs] = useState({})
    const [isError, setIsError] = useState({})
    const [isValid, setIsValid] = useState(false)

    function checkIsFormValid() {
        if (
            isError.name !== '' ||
            isError.link !== '' ||
            inputs.name === '' ||
            inputs.link === ''
        ) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }

    function handleChange(e) {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
        setIsError({ ...isError, [e.target.name]: e.target.validationMessage })
        checkIsFormValid()
    }

    function handlePaste(e) {
        e.target.value = e.clipboardData.getData('text/plain')
        handleChange(e)
    }

    function handleAddPlaceSubmit(e) {
        e.preventDefault()
        onAddPlace({
            name: inputs.name,
            link: inputs.link,
        })
        setInputs({})
        setIsError({})
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
                    isError.name && 'form__input_type_error'
                }`}
                name="name"
                value={inputs.name || ''}
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
                    isError.name && 'form__error_visible'
                }`}
                aria-live="polite"
            >
                {isError.name}
            </span>

            <input
                aria-label="Image URL"
                type="url"
                className={`form__input form__input_type_url ${
                    isError.link && 'form__input_type_error'
                }`}
                name="link"
                value={inputs.link || ''}
                onChange={handleChange}
                onPaste={handlePaste}
                placeholder="Image link"
                aria-required="true"
                required
            />
            <span
                className={`form__error ${
                    isError.link && 'form__error_visible'
                }`}
                aria-live="polite"
            >
                {isError.link}
            </span>
        </PopupWithForm>
    )
}

export default AddPlacePopup
