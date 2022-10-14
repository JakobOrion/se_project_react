import PopupWithForm from './PopupWithForm';

function DeletePlacePopup({
    card,
    isOpen,
    isLoading,
    onClose,
    onConfirmDelete,
}) {
    function handleConfirmSubmit(e) {
        e.preventDefault();
        onConfirmDelete(card);
    }

    return (
        <PopupWithForm
            name="delete-card"
            title="Are you sure?"
            buttonText="Yes"
            isOpen={isOpen}
            isValid={true}
            isLoading={isLoading}
            onClose={onClose}
            onSubmit={handleConfirmSubmit}
        />
    );
}

export default DeletePlacePopup;
