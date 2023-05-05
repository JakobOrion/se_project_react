import SuccessIcon from '../images/success.svg';
import ErrorIcon from '../images/fail.svg';
import Popup from './Popup';

function InfoTooltip({ isOpen, onClose, status }) {
    return (
        <Popup isOpen={isOpen} name={'tooltip'} onClose={onClose}>
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
        </Popup>
    );
}

export default InfoTooltip;
