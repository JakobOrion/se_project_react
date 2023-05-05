import Popup from './Popup';

function ImagePopup({ card, isOpen, onClose }) {
    return (
        <Popup isOpen={isOpen} name={'image'} onClose={onClose}>
            <figure className="popup__figure">
                <img
                    className="popup__image"
                    src={card && card.link}
                    alt={card.name}
                />
                <figcaption className="popup__image-title">
                    {card.name}
                </figcaption>
            </figure>
        </Popup>
    );
}

export default ImagePopup;
