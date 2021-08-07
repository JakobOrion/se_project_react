import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onCardClick, onCardLike, onDeleteClick } = props;
  const user = useContext(CurrentUserContext);

  const isOwn = card.owner._id === user._id;
  const isLiked = card.likes.some(i => i._id === user._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  return (
    <li className="photo-card">
      <button
        type="button"
        aria-label="Delete"
        className="photo-card__delete-button"
        onClick={handleDeleteClick}
        hidden={!isOwn}
      ></button>
      <img
        className="photo-card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="photo-card__info">
        <h2 className="photo-card__title">{card.name}</h2>
        <button
          type="button"
          aria-label="Like"
          className={`photo-card__heart ${isLiked && 'photo-card__heart_active'}`}
          onClick={handleLikeClick}
        ></button>
        <div className="photo-card__likes">{card.likes.length}</div>
      </div>
    </li>
  );
}

export default Card;
