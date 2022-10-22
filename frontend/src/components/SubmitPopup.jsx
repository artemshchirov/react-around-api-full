import { useTranslation } from 'react-i18next';

import PopupWithForm from './PopupWithForm';

function SubmitPopup({ isOpen, onClose, onSubmitDelete, card, isSending }) {
  const { t } = useTranslation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitDelete(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="card-delete"
      title={t('popup_card_delete')}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isSending ? t('popup_card_deleting') + '...' : t('popup_card_delete_approve')}
      buttonActive
    />
  );
}

export default SubmitPopup;
