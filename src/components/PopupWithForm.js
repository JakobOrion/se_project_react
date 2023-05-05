import Popup from './Popup';

function PopupWithForm({
    name,
    title,
    children,
    buttonText,
    isOpen,
    isValid,
    isLoading,
    onClose,
    onSubmit,
}) {
    return (
        <Popup isOpen={isOpen} name={name} onClose={onClose}>
            <h3 className="popup__title">{title}</h3>
            <form className="popup__form" name={name} onSubmit={onSubmit}>
                {children}
                <button
                    type="submit"
                    name={buttonText}
                    className={`form__submit ${
                        !isValid && 'form__submit_disabled'
                    }`}
                    disabled={!isValid ? true : ''}
                >
                    {isLoading ? 'Saving...' : buttonText}
                </button>
            </form>
        </Popup>
    );
}

export default PopupWithForm;
