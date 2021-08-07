function PopupWithForm(props) {
  const { name, title, children, buttonText, isOpen, isValid, isLoading, onClose, onSubmit } = props;

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <button
          type="button"
          aria-label="Close"
          className="popup__close"
        ></button>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" name={buttonText} className={`form__submit ${!isValid && 'form__submit_disabled'}`} disabled={!isValid ? true : '' }>
            {isLoading ? 'Saving...' : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
