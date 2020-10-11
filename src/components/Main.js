import React from 'react';
//import api from '../utils/api';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar-pics">
                        <img src={currentUser.avatar} className="profile__avatar" alt="Жак-Ив Кусто" />
                        <button className="profile__edit" onClick={props.onEditAvatar}></button>
                    </div>

                    <div className="profile__info">
                        <div className="profile__author">
                            <h2 className="profile__author-name">{currentUser.name}</h2>
                            <button className="profile__button-edit" onClick={props.onEditProfile} aria-label="Редактировать"></button>
                        </div>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__button-add" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {props.cards.map(item => <Card key={item._id} card={item} onClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)}
            </section>
        </main>
    )
}

export default Main