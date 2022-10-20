const VALIDATION_PARAMS = {
  REGEX: {
    NAME: /^[a-zа-яё-\s]+$/i,
    EMAIL: /[^@\s]+@[^@\s]+\.[^@\s]+/i
  },
  MESSAGES: {
    NAME: 'Имя может состоять только из букв, пробелов и "-"',
    EMAIL: 'Неправильный формат e-mail',
    PASSWORD: 'Минимальная длина пароля: 1 символ'
  }
};

const VALIDATION_CONFIGS = {
  USER_DATA: {
    INPUTS: ['name', 'email'],
    REGEX: {
      name: VALIDATION_PARAMS.REGEX.NAME,
      email: VALIDATION_PARAMS.REGEX.EMAIL
    },
    MESSAGES: {
      name: VALIDATION_PARAMS.MESSAGES.NAME,
      email: VALIDATION_PARAMS.MESSAGES.EMAIL
    }
  },

  LOGIN: {
    INPUTS: ['email'],
    REGEX: {
      email: VALIDATION_PARAMS.REGEX.EMAIL
    },
    MESSAGES: {
      email: VALIDATION_PARAMS.MESSAGES.EMAIL
    }
  }
};

const MESSAGES = {
  NOT_FOUND: 'Ничего не найдено',
  ERROR:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
};

const ALERT_MESSAGES = {
  SUCCESSFULLY: {
    UPDATE_PROFILE: 'Данные пользователя успешно обновлены'
  },
  ERROR: {
    AUTH: 'Неправильные почта или пароль',
    GET_USER: 'Не удалось получить данные пользователя',
    ADD_FILM: 'Не удалось добавить фильм',
    DELETE_FILM: 'Не удалось удалить фильм',
    SEARCH_QUERY: 'Нужно ввести ключевое слово',
    UPDATE_PROFILE: 'Не удалось обновить данные профиля'
  }
};

// SUCCESSFULLY: {
//   UPDATE_PROFILE: 'Successful user info update!',
// },
// ERROR: {
//   UPDATE_PROFILE: 'Error while updating profile',
//   SEARCH_QUERY: 'Keyword required',
//   DELETE_FILM: 'Error while deleting movie',
//   ADD_FILM: 'Error while adding movie',
//   GET_USER: 'Error while get user data',
//   AUTH: 'Incorrect email or password',
// },

const PAGES = {
  MOVIES: '/movies',
  SAVED_MOVIES: '/saved-movies',
  PROFILE: '/profile',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  MAIN: '/'
};

const BASE_URL = 'https://around.backend.nomoredomains.sbs';

export {
  MESSAGES,
  PAGES,
  BASE_URL,
  SHORT_DURATION,
  ALERT_MESSAGES,
  VALIDATION_PARAMS,
  VALIDATION_CONFIGS
};
