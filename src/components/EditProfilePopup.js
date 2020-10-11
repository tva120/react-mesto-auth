import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            author: name,
            about: description
        });
    }

  
    return (
        <PopupWithForm title="Редактировать профиль" name="info" buttonName="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
            children={
                <>
                    <input className="popup-container__infoform popup-container__infoform_author" name="author" id="name-input" type="text" required
                        minLength="2" maxLength="40" pattern="[A-Za-zА-ЯЁа-яё -]{1,}" placeholder="Автор" defaultValue={name} onChange={handleNameChange} />

                    <span className="popup__error" id="author-input-error"></span>

                    <input className="popup-container__infoform popup-container__infoform_about" name="about" id="about-input" type="text" required
                        minLength="2" maxLength="200" placeholder="Занятие" defaultValue={description} onChange={handleDescriptionChange} />

                    <span className="popup__error" id="about-input-error"></span>
                </>
            }
        />
    )
}

export default EditProfilePopup