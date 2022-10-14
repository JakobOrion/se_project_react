function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div
            className={`popup popup_type_image ${isOpen && 'popup_opened'}`}
            onClick={onClose}
        >
            <div className="popup__container popup__container_figure">
                <button
                    type="button"
                    aria-label="Close"
                    className="popup__close"
                ></button>
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
            </div>
        </div>
    );
}

export default ImagePopup;
