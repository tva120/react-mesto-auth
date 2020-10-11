import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Card(props) {
    function handleClick() {
        props.onClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleCardDelete() {
        props.onCardDelete(props.card)
    }

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn  = props.card.owner._id === currentUser._id;

    const cardTrashButtonClassName = (
        `element__trash ${isOwn  ? '' : 'element__trash_hidden'}`
      );
    
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__button ${isLiked ? 'element__button_like-active' : ''}`;

  

    return (
        <div className="element" key={props.card._id}>
            <img className="element__image" alt="" src={props.card.link} onClick={handleClick} />


            <div className="element__places">
                <h2 className="element__place">{props.card.name}</h2>
                <div className="element__likeblock">
                    <button className={cardLikeButtonClassName}  onClick={handleLikeClick}></button>
                    <p className="element__likecount">{props.card.likes.length}</p>
                </div>
            </div>
            <button className={cardTrashButtonClassName} type="button"  onClick={handleCardDelete}></button>


            
        </div>
    )
}

export default Card