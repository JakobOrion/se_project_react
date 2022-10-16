import SuccessIcon from '../images/success.svg';
import ErrorIcon from '../images/fail.svg';

function InfoTooltip({ isOpen, onClose, status }) {
    return (
        <div
            className={`popup popup_type_tooltip ${isOpen && 'popup_opened'}`}
            onClick={onClose}
        >
            <div className="popup__container popup__container_tooltip">
                <form className="popup__form" noValidate>
                    <button
                        type="button"
                        aria-label="Close"
                        className="popup__close"
                    ></button>
                    {status === 'success' ? (
                        <div>
                            <img
                                className="popup__icon"
                                src={SuccessIcon}
                                alt="Success!"
                            />
                            <p className="popup__status-message">
                                Success! You have now been registered.
                            </p>
                        </div>
                    ) : (
                        <div>
                            <img
                                className="popup__icon"
                                src={ErrorIcon}
                                alt="Opps, something went wrong!"
                            />
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
