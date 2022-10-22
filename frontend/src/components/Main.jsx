import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import Card from './Card';

export default function Main({
  cards,
  onCardLike,
  onAddPlace,
  onCardClick,
  onEditAvatar,
  onCardDelete,
  onEditProfile
}) {
  const { currentUser } = useContext(UserContext);

  return (
    <main className="content page__content">
      <section className="profile section content__section">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="User avatar" className="profile__avatar" />
        </div>
        <div className="profile__content">
          <div className="profile__name-btn-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="button button_profile_edit" type="button" onClick={onEditProfile} />
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="button button_profile_add" type="button" onClick={onAddPlace} />
      </section>
      <section className="cards section content__section">
        {cards
          .slice(0)
          .reverse()
          .map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
      </section>
    </main>
  );
}
