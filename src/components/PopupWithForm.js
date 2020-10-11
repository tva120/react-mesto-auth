import React from 'react';


function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <form className="popup-container" name={props.name} noValidate  onSubmit={props.onSubmit}>
                <fieldset className="popup__user-info">
                    <h3 className="popup-container__text">{props.title}</h3>
                    {props.children}
                    <button className="popup-container__button-save" type="submit">{props.buttonName}</button>
                </fieldset>
                <button className="close-button popup-container__button-close" id="close-button-avatarform" type="reset" onClick={props.onClose}></button>
            </form>
        </div>
    )
}

export default PopupWithForm