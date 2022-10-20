import PopupWithForm from './PopupWithForm';

function SubmitPopup({ isOpen, onClose, onSubmitDelete, card, isSending }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitDelete(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="card-delete"
      title="Вы уверены?"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isSending ? 'Удаление...' : 'Да'}
      buttonActive
    />
  );
}

export default SubmitPopup;
