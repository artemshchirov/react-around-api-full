import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { register, authorize, getContent } from '../utils/auth';
import UserContext from '../contexts/UserContext';

import Login from './Login';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ProtectedRoute from './ProtectedRoute';
import ImagePopup from './ImagePopup';
import SubmitPopup from './SubmitPopup';
import InfoToolTip from './InfoToolTip';
import Alert from './Alert/Alert';
import api from '../utils/api';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [imagePopupCard, setImagePopupCard] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(null);
  const [statusInfoToolTip, setStatusInfoToolTip] = useState(null);

  const [messageAlert, setMessageAlert] = useState(null);
  const [isActiveAlert, setIsActiveAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleLoginToken();
  }, []);

  const handleLoginToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getContent(jwt)
        .then(({ email }) => {
          getInitialContent();
          setUserEmail(email);
          setLoggedIn(true);
        })
        .catch((err) => {
          handleLogout();
          showAlert('Ошибка инициализации контента 1');
          console.error(`Ошибка получения контента.\n${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      handleLogout();
    }
  };

  const getUserInfo = () => {
    api
      .getUserInfo()
      .then(({ _id, name, about, avatar }) => {
        setCurrentUser({
          _id,
          name,
          about,
          avatar
        });
      })
      .catch((err) => {
        showAlert(`Ошибка загрузки данных пользователя`);
        console.error(`Ошибка загрузки данных пользователя.\n${err}`);
      });
  };

  const getCards = () => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        showAlert(`Ошибка загрузки карточек`);
        console.error(`Ошибка загрузки карточек.\n${err}`);
      });
  };

  const getInitialContent = () => {
    getUserInfo();
    getCards();
  };

  const handleRegister = (email, password) => {
    register(email, password)
      .then(() => {
        handleLogin(email, password);
        setStatusInfoToolTip(true);
      })
      .catch((err) => {
        setStatusInfoToolTip(false);
        console.error(`Ошибка регистрации пользователя.\n${err}`);
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  };

  const handleLogin = (email, password) => {
    authorize(email, password)
      .then(({ token }) => {
        if (token) {
          localStorage.setItem('jwt', token);
          api.setToken(token);
          getContent(token)
            .then(() => {
              getInitialContent();
              setUserEmail(email);
              setLoggedIn(true);
              navigate('/');
            })
            .catch((err) => {
              handleLogout();
              showAlert('Ошибка инициализации контента 2');
              console.error(`Ошибка инициализации контента.\n${err}`);
            });
        }
      })
      .catch((err) => {
        setStatusInfoToolTip(false);
        setIsInfoToolTipOpen(true);
        console.error(`Ошибка авторизации пользователя.\n${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/signin');
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleAddCardClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleSubmitDeleteClick = (card) => {
    setIsDeletePopupOpen(true);
    setDeleteCard(card);
  };

  const handleCardClick = (card) => {
    setImagePopupCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setImagePopupCard(null);
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo({ name, about })
      .then(() => {
        setCurrentUser({
          name,
          about,
          avatar: currentUser.avatar,
          _id: currentUser._id
        });
        closeAllPopups();
      })
      .catch((err) => {
        showAlert('Ошибка обновления name, about');
        console.error(`Ошибка при обновлении name, about.\n${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api
      .setAvatar({ avatar })
      .then(() => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar,
          _id: currentUser._id
        });
        closeAllPopups();
      })
      .catch((err) => {
        showAlert('Ошибка обновления аватара');
        console.error(`Ошибка при обновлении аватара.\n${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = (card) => {
    setIsLoading(true);
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        showAlert('Ошибка добавления/удаления лайка');
        console.error(`Ошибка при добавлении/удалении лайка.\n${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteItem(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        showAlert('Ошибка удаления карточки');
        console.error(`Ошибка при удалении карточки.\n${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);
    api
      .addItem({ name, link })
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => {
        showAlert('Ошибка создания карточки');
        console.error(`Ошибка при создании новой карточки.\n${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const showAlert = (message) => {
    setMessageAlert(message);
    setIsActiveAlert(true);
    setTimeout(() => {
      setIsActiveAlert(false);
    }, 3000);
  };

  return (
    <div className="page">
      <div className="page__container">
        <UserContext.Provider value={{ currentUser }}>
          <Routes>
            <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
            <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute path="/" loggedIn={loggedIn} isLoading={isLoading}>
                  <Header loggedIn={loggedIn} email={userEmail} handleLogout={handleLogout} />
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardClick={handleCardClick}
                    onAddPlace={handleAddCardClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onCardDelete={handleSubmitDeleteClick}
                  />
                  <Footer />
                </ProtectedRoute>
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isSending={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isSending={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isSending={isLoading}
          />
          <SubmitPopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmitDelete={handleCardDelete}
            card={deleteCard}
            isSending={isLoading}
          />
          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            currentStatus={statusInfoToolTip}
          />
          <ImagePopup card={imagePopupCard} onClose={closeAllPopups} />
          <Alert messageAlert={messageAlert} isActiveAlert={isActiveAlert} />
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
