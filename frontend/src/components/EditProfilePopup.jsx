import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSending }) {
  const { t } = useTranslation();
  const inputRef = useRef();
  const { currentUser } = useContext(UserContext);
  const [profileData, setProfileData] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState({});

  useEffect(() => {
    if (isOpen) inputRef.current.focus();

    setProfileData({
      name: currentUser.name,
      about: currentUser.about
    });
    setIsValid(true);
    setValidationMessage({});
  }, [currentUser, isOpen]);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;
    setProfileData((oldData) => ({
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
    onUpdateUser({
      name: profileData.name,
      about: profileData.about
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="profile-edit"
      title={t('popup_edit_profile_title')}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isSending ? `${t('btn_save')}...` : t('btn_save')}
      buttonActive={isValid}>
      <input
        className={`form__input ${validationMessage.name && 'form__input_type_error'}`}
        name="name"
        id="name-profile"
        type="text"
        placeholder={t('popup_edit_profile_input')}
        minLength="2"
        maxLength="40"
        value={profileData.name || ''}
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
        className={`form__input ${validationMessage.about && 'form__input_type_error'}`}
        name="about"
        id="about"
        type="text"
        placeholder={t('popup_edit_profile_input_2')}
        minLength="2"
        maxLength="200"
        value={profileData.about || ''}
        onChange={handleChange}
        required
      />
      <span
        id="about-error"
        className={`form__input-error ${!isValid && 'form__input-error_visible'}`}>
        {validationMessage.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
