import SuccessIcon from "../images/success-icon.svg";
import ErrorIcon from "../images/error-icon.svg"

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <div className={`popup ${isOpen && "popup_is-opened"}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button
            type="button"
            className="popup__close"
            onClick={onClose}
          ></button>
          {status === "success" ? (
            <div>
              <img className="popup__icon" src={SuccessIcon} alt="" />
              <p className="popup__status-message">
                Success! You have now been registered.
              </p>
            </div>
          ) : (
            <div>
              <img className="popup__icon" src={ErrorIcon} alt="" />
              <p className="popup__status-message">
                Oops, something went wrong! Please try again.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;