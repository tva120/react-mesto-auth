import React from 'react';
import successPic from '../images/Success.svg';
import unsuccessPic from '../images/Unsuccess.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup-container">
                <div className="popup-container__infotooltip">
                    <img src={`${props.isLoggedIn ? successPic : unsuccessPic}`} className="popup-container__login_logo" alt="Логин" />
                    <h3 className="popup-container__infotooltip-text">{`${props.isLoggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</h3>
                </div>
                <button className="close-button popup-container__button-close" id="close-button-avatarform" type="reset" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip