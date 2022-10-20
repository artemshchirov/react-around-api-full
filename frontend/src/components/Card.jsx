import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(UserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = isLiked ? 'button_like_isLiked' : '';

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      {isOwn && <button className="button button_card_delete" onClick={handleDeleteClick} />}
      <div className="card__title-like-container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-count-container">
          <button
            className={`button button_like ${cardLikeButtonClassName}`}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
