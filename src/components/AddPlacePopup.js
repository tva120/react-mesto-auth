import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const inputName = React.useRef();
    const inputLink = React.useRef();

    function handleSubmit(e){
        e.preventDefault();
        props.onUpdatePlace({
            name: inputName.current.value,
            link: inputLink.current.value
        });
    }


    return (
        <PopupWithForm title="Новое место" name="add" buttonName="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                        children={
                            <>
                                <input className="popup-container__infoform popup-container__infoform_place-name" name="place-name" id="place-input" type="text"
                                    placeholder="Название" required minLength="1" maxLength="30" ref={inputName} />
                                
                                <span className="popup__error" id="place-input-error"></span>
                                
                                <input className="popup-container__infoform popup-container__infoform_place-link" name="link" id="link-input" type="url"
                                    placeholder="Ссылка на картинку" required ref={inputLink} />
                                
                                <span className="popup__error" id="link-input-error"></span>
                            </>
                        }
                    />
    )
}

export default AddPlacePopup