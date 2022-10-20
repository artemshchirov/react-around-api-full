import React from 'react';
import logo from '../images/logo-mesto.svg';

export default function Header({ loggedIn, email, handleLogout }) {
  return (
    <header className="header page__header">
      <a href="https://artemshchirov.github.io/around/index.html" target="_blank" rel="noreferrer">
        <img src={logo} alt="Логотип 'Место'" className="logo button" />
      </a>
      <div className="header__sign">
        {loggedIn && <p className="header__email">{email}</p>}
        <button
          className="header__link header__link_type_gray"
          type="button"
          onClick={handleLogout}>
          {loggedIn ? 'Выйти' : 'Войти'}
        </button>
      </div>
    </header>
  );
}
