import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameInput(e) {
        setName(e.target.value);
    }
    function handleDescriptionInput(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} heading="Редактировать профиль" buttonText="Сохранить" isLoading={props.isLoading}>
            <input
                className="popup__field popup__field_name"
                onChange={handleNameInput}
                value={name}
                id="name-field"
                placeholder="Имя"
                type="text"
                name="name"
                pattern="[A-Za-zА-Яа-яЁё -]*"
                minLength="2"
                maxLength="40"
                required />
            <span className="popup__span-error" id="name-field-error"></span>
            <input
                className="popup__field popup__field_job"
                value={description}
                onChange={handleDescriptionInput}
                id="job-field" placeholder="О себе"
                type="text"
                name="about"
                required
                minLength="2"
                maxLength="200" />
            <span className="popup__span-error" id="job-field-error"></span>
        </PopupWithForm >
    )

}
export default EditProfilePopup;