import { useTranslation } from 'react-i18next';

import SelectLang from './SelectLang/SelectLang';

import logo from '../images/logo-around.svg';

export default function Header({ loggedIn, email, handleLogout }) {
  const { t } = useTranslation();
  return (
    <header className="header page__header">
      <a href="https://artemshchirov.github.io/around/index.html" target="_blank" rel="noreferrer">
        <img src={logo} alt="logo 'Around" className="logo button" />
      </a>
      <SelectLang />
      <div className="header__sign">
        {loggedIn && <p className="header__email">{email}</p>}
        <button
          className="header__link header__link_type_gray"
          type="button"
          onClick={handleLogout}>
          {loggedIn ? t('header__link_2') : t('header__link_1')}
        </button>
      </div>
    </header>
  );
}
