import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {
    const [newCard, setNewCard] = React.useState({ name: '', link: '' });

    React.useEffect(() => {
        setNewCard({ name: '', link: '' });
        
      }, [props.isOpen]);

    function handleCardNameInput(e) {
        setNewCard({ ...newCard, name: e.target.value });
    }
    function handleLinkInput(e) {
        setNewCard({ ...newCard, link: e.target.value });
    }

    
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateCard(newCard);
    }

    return (

        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} heading="Новое место" buttonText="Создать" isLoading={props.isLoading}>
            <input
                className="popup__field popup__field_card"
                id="title-input"
                onChange={handleCardNameInput}
                placeholder="Название"
                type="text"
                name="name"
                value={newCard.name}
                required
                minLength="1"
                maxLength="30" />
            <span className="popup__span-error" id="title-input-error"></span>
            <input
                className="popup__field popup__field_link"
                onChange={handleLinkInput}
                value={newCard.link}
                id="url-input" placeholder="Ссылка на картинку"
                type="url"
                required name="link" />
            <span className="popup__span-error" id="url-input-error"></span>
        </PopupWithForm >
    )
}
export default AddPlacePopup