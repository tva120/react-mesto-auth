import React from 'react';


function ImagePopup(props) {
    return (
        <div className={`popup popup_show_image ${props.card.isOpen && 'popup_opened'}`}>
            <div className="popup-preview">
                <img className="popup-preview__picture" alt={props.card.name} src={props.card.link} />
                <p className="popup-preview__caption">{props.card.name}</p>
                <button className="close-button popup-preview__button-close" id="close-button-picture" type="reset" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup