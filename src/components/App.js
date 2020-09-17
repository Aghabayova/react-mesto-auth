import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import * as auth from '../utils/auth.js';
import Register from './Register.js';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '', _id: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: '',
    link: ''
  });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedInEmail, setLoggedInEmail] = React.useState('');
  const [userData, setUserData] = React.useState(null);
  const [loginState, setLoginState]= React.useState(true);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);

  const history = useHistory();


  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // проверим токен
      auth.getContent(jwt).then((res) => {
        if (res) {
          setUserData({
            id:res.data._id,
            email: res.data.email
          });
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {console.log(err)})
    }
  }

  //React.useEffect(() => {
    //tokenCheck();
    //history.push('/cards');
  //}, []);

  // Регистрация
  function handleRegister({email, password}) {
    setIsLoading(true);
    return auth.register(email, password)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          return true;
        } else {
          throw new Error('некорректно заполнено одно из полей');
        }
      })

  }
  function handleLogin({ email, password }) {
    setIsLoading(true);
    return auth.authorise(email, password)
    .then((res) => {
      if (res && res.token) {
        setLoggedIn(true);
        tokenCheck();
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  function handleloginState(){
    setLoginState(false);
  }

  React.useEffect(() => {

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCards(cards);
        setCurrentUser(userData);

      })
      .catch(err => console.log(err));

  }, []);


  /* componentDidMount() {
    // настало время проверить токен
      this.tokenCheck();
    };
    */

  function handleRegisterSuccess(state){
    setIsInfoTooltipPopupOpen(true);
    setIsRegisterSuccess(state);

  }



  
  //обработчики открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleConfirmPopupClick() {
    setIsDeleteCardPopupOpen(true);
  }
  //при нажатии на удаление карточки открываем попам подтверждения
  function handleCardDelete(card) {
    setCardDelete(card)
    handleConfirmPopupClick();
  }
  //обработчик закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardClick(props) {
    setSelectedCard({
      isOpen: true,
      name: props.name,
      link: props.link
    });
  }
  //обработчик обновления данных пользователя
  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.editUserInfo(userData)
      .then((res) => {
        setCurrentUser({ ...currentUser, name: res.name, about: res.about });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }
  //обработчик обновления аватара
  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api.editUserAvatar(userData)
      .then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  //обработчик добавления карточки
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addNewCard(data)
      .then((photoData) => {
        setCards([...cards, photoData]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  //обработчик удаления карточки
  function handleCardDeleteSubmit() {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(cardDelete._id)
      .then(() => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.filter((c) => c._id !== cardDelete._id);
        // Обновляем стейт
        setCards(newCards);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header
          loggedInEmail={loggedInEmail}
          loginState={loginState}
          loggedIn={loggedIn}
          signOut={handleLogOut} 
          handleloginState={handleloginState} />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path='/sign-in'>
              <Login onLogin={handleLogin} />
            </Route>
            <Route path='/sign-up'>
              <Register onRegister={handleRegister}
              onConfirm={handleRegisterSuccess} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

        <DeleteConfirmPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onConfirmClick={handleCardDeleteSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateCard={handleAddPlaceSubmit} isLoading={isLoading} />

        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isRegisterSuccess={isRegisterSuccess} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Footer />

      </div>
    </CurrentUserContext.Provider >
  );
}
export default App;
