import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';

import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSending }) {
  const { t } = useTranslation();
  const inputRef = useRef();
  const [placeData, setPlaceData] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState({});

  useEffect(() => {
    if (isOpen) inputRef.current.focus();
  }, [isOpen]);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;
    setPlaceData((oldData) => ({
      ...oldData,
      [name]: value
    }));
    setIsValid(input.closest('form').checkValidity());
    setValidationMessage({
      ...validationMessage,
      [name]: input.validationMessage
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({
      name: placeData.name,
      link: placeData.link
    });
    setPlaceData({
      name: '',
      link: ''
    });
    setIsValid(false);
    setValidationMessage({});
  };

  return (
    <PopupWithForm
      title={t('popup_add_place_title')}
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isSending ? `${t('btn_creating')}...` : t('btn_create')}
      buttonActive={isValid}>
      <input
        className={`form__input ${validationMessage.name && 'form__input_type_error'}`}
        placeholder={t('popup_add_place_input_1')}
        type="text"
        name="name"
        id="name-card"
        minLength="2"
        maxLength="30"
        value={placeData.name || ''}
        onChange={handleChange}
        ref={inputRef}
        required
      />
      <span
        id="name-error"
        className={`form__input-error ${!isValid && 'form__input-error_visible'}`}>
        {validationMessage.name}
      </span>

      <input
        className={`form__input ${validationMessage.link && 'form__input_type_error'}`}
        placeholder={t('popup_input_link')}
        type="url"
        name="link"
        id="link"
        value={placeData.link || ''}
        onChange={handleChange}
        required
      />
      <span
        id="link-error"
        className={`form__input-error ${!isValid && 'form__input-error_visible'}`}>
        {validationMessage.link}
      </span>
    </PopupWithForm>
  );
}
