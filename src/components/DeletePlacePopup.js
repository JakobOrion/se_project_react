import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePlacePopup(props) {
  const { card, isOpen, isLoading, onClose, onConfirmDelete } = props;
  const [isValid, setIsValid] = useState(true);

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
    isValid={isValid}
    isLoading={isLoading}
    onClose={onClose}
    onSubmit={handleConfirmSubmit}
    />
  )
}

export default DeletePlacePopup;