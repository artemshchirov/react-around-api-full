import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SelectLang from './SelectLang/SelectLang';

import logo from '../images/logo-around.svg';

function Login({ handleLogin }) {
  const { t } = useTranslation();
  const [loginData, setLoginData] = useState({});

  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState({});

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;

    setLoginData((oldData) => ({
      ...oldData,
      [name]: value
    }));

    setIsValid(input.closest('form').checkValidity());
    setValidationMessage({
      ...validationMessage,
      [name]: input.validationMessage
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    if (evt.target.closest('form').checkValidity()) {
      const { email, password } = loginData;
      if (!email || !password) return;
      handleLogin(email, password);
    } else {
      setIsValid(false);
      setValidationMessage({
        email: 'Please fill out this field.',
        password: 'Please insert correct password.'
      });
    }
  }

  return (
    <>
      <header className="header page__header">
        <img src={logo} alt="logo 'Around'" className="logo" />
        <SelectLang />
        <Link to="/signup" className="header__link">
          {t('sign__title_reg')}
        </Link>
      </header>
      <section className="sign">
        <form name="login" onSubmit={handleSubmit} noValidate>
          <fieldset className="sign__form">
            <legend className="sign__title">{t('sign__title_log')}</legend>
            <input
              className={`sign__input ${validationMessage.email && 'sign__input_type_error'}`}
              name="email"
              id="email-signin"
              type="email"
              placeholder="E-mail"
              minLength="2"
              maxLength="320"
              value={loginData.email || ''}
              onChange={handleChange}
              ref={inputRef}
              required
            />
            <span
              id="email-error"
              className={`sign__input-error ${!isValid && 'sign__input-error_visible'}`}>
              {validationMessage.email}
            </span>
            <input
              className={`sign__input ${validationMessage.password && 'sign__input_type_error'}`}
              name="password"
              id="password-signin"
              type="password"
              placeholder={t('sign__input_password')}
              minLength="2"
              maxLength="15"
              value={loginData.password || ''}
              onChange={handleChange}
              required
            />
            <span
              id="password-error"
              className={`sign__input-error ${!isValid && 'sign__input-error_visible'}`}>
              {validationMessage.password}
            </span>
            <button
              className={`button button_form_submit-sign ${!isValid && 'button_disabled'}`}
              type="submit">
              {t('button_form_submit_log')}
            </button>
          </fieldset>
        </form>
        <Link to="/signup" className="sign__login">
          {t('sign__login')}
        </Link>
      </section>
    </>
  );
}

export default Login;
