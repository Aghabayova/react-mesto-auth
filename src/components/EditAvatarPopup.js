import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditAvatarPopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value, /* Значение инпута, полученное с помощью рефа */
        });
    }

    function handleClick() {
        avatarRef.current.focus(); 
        // вызываем нужный метод на поле current объекта
      }

      React.useEffect(() => {
        avatarRef.current.value = '';
      }, [currentUser]);

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} heading="Обновить аватар?" buttonText="Сохранить" isLoading={props.isLoading}>
            <input
                className="popup__field popup__field_avatar"
                ref={avatarRef}
                onChange={handleClick}
                id="url-input"
                placeholder="Ссылка на картинку"
                type="url"
                name="link"
                required />
            <span className="popup__span-error" id="url-input-error"></span>
        </PopupWithForm>

    )
}
export default EditAvatarPopup