import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {
  
  
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

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

    function handleUpdateAvatar(data){
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
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
            <div className="page">
                <Header />
                <Main
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardDelete={handleCardDelete}
                        onCardLike={handleCardLike} />


                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closePopups} onUpdateAvatar={handleUpdateAvatar} />

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closePopups} onUpdateUser={handleUpdateUser} />

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closePopups} onUpdatePlace={handleUpdateCards}/>

                    <PopupWithForm title="Вы уверены?" name="delete" buttonName="Да" onClose={closePopups} />

                    <ImagePopup card={selectedCard} onClose={closePopups} />

                    
                <Footer />
            </div>
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
