import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import * as Auth from '../utils/auth';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

import Login from './Login';
import Register from './Register';

import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

function App() {


    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [user, setUser] = React.useState('');


    const history = useHistory();

    const [selectedCard, setSelectedCard] = React.useState({
        isOpen: false,
        link: '',
        name: ''
    });

    const [cards, setCards] = React.useState([]);

    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, initialCards]) => {
                setCurrentUser(user);
                setCards([...initialCards]);
            })
            .catch(err => console.log(err));
    }, [])

    function signOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setUser('');
        history.push('/sign-in');
    }


    function logIn(email, password, setEmail, setPassword) {
        Auth.authorize(email, password)
            .then(res => {
                localStorage.setItem('jwt', res.token);
                setUser(email);
                setEmail('');
                setPassword('');
                handleLogin();
                history.push('/cards');
                handleInfoTooltip();
            })
            .catch(err => handleInfoTooltip());
    }

    function signUp(email, password) {
        Auth.register(email, password).then((res) => {
            if (res) {
                history.push('/cards');
            } else {
                console.log("Регистрация не прошла!");
            }
        })
            .catch(err => handleInfoTooltip());
    }

    function handleLogin() {
        setLoggedIn(true);
    }

    function handleInfoTooltip() {
        setIsInfoTooltipOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }


    function handleCardClick(props) {
        setSelectedCard({
            isOpen: true,
            name: props.name,
            link: props.link
        });
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then((newData) => {
                setCurrentUser(newData);
                closePopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    function handleUpdateUser(data) {
        api.changeProfileInfo(data)
            .then((newData) => {
                setCurrentUser(newData);
                closePopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }


    function handleUpdateCards(data) {
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closePopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        (!isLiked ? api.putLike(card._id) : api.deleteLike(card._id))
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
            .catch(err => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id);
                setCards(newCards);
            })
            .catch(err => console.log(err));
    }

    function closePopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
        setIsInfoTooltipOpen(false);
    }


    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            Auth.pingMe(jwt).then((res) => {
                if (res) {
                    setUser(res.data.email);
                    setLoggedIn(true);
                    history.push('/cards');
                }
            });
        }
    }

    React.useEffect(() => {
        tokenCheck();
    }, );


    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Header onSignOut={signOut} user={user} isLoggedIn={loggedIn} />
                <Switch>
                    <ProtectedRoute path="/cards" component={Main} loggedIn={loggedIn}
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardDelete={handleCardDelete}
                        onCardLike={handleCardLike} />
                    <Route path="/sign-in">
                        <Login onLogin={logIn} />
                    </Route>
                    <Route path="/sign-up">
                        <Register onSignup={signUp} />
                    </Route>
                    <Route>
                        {<Redirect to={`/${loggedIn ? 'cards' : 'sign-in'}`} />}
                    </Route>
                </Switch>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closePopups} onUpdateAvatar={handleUpdateAvatar} />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closePopups} onUpdateUser={handleUpdateUser} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closePopups} onUpdatePlace={handleUpdateCards} />

                <PopupWithForm title="Вы уверены?" name="delete" buttonName="Да" onClose={closePopups} />

                <ImagePopup card={selectedCard} onClose={closePopups} />

                <InfoTooltip isLoggedIn={loggedIn} isOpen={isInfoTooltipOpen} onClose={closePopups} />
                
                <Footer />
            </CurrentUserContext.Provider>
        </>
    );
}
export default App;
