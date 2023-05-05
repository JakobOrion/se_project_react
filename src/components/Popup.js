import { useEffect } from 'react';

const Popup = ({ isOpen, name, onClose, children }) => {
    useEffect(() => {
        if (!isOpen) return;
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose(e);
            }
        };

        document.addEventListener('keydown', closeByEscape);
        // eslint-disable-next-line consistent-return
        return () => document.removeEventListener('keydown', closeByEscape);
    }, [isOpen, onClose]);

    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    };

    return (
        <div
            className={`popup ${
                isOpen ? 'popup_opened' : ''
            } popup_type_${name}`}
            onClick={handleOverlay}
        >
            <div
                className={`popup__container ${
                    name === 'image' ? 'popup__container_figure' : ''
                } ${name === 'tooltip' ? 'popup__container_tooltip' : ''}`}
            >
                {children}
                <button
                    className="popup__close"
                    aria-label="Close"
                    type="button"
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

export default Popup;
