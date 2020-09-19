import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки

    const {
        card,
        onCardClick,
        onCardLike,
        onCardDelete } = props;
    const isOwn = card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__trash ${isOwn ? '' : 'card__trash_hidden'}`
    );
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`);

    function handleClick() {
        onCardClick(card)
    }
    function handleLike() {
        onCardLike(card)
    }
    function handleDelete() {
        onCardDelete(card)
    }

    const imageStyle = {
        backgroundImage: `url(${card.link})`,
    };
    return (
        <div className="card" key={card._id}>
            <div className="card__image" onClick={handleClick} style={imageStyle} />
            <div className="card__description">
                <h3 className="card__title">{card.name}</h3>
                <div className="card__like">
                    <button className={cardLikeButtonClassName} onClick={handleLike} type="button"></button>
                    <span className="card__like-counter">{card.likes.length}</span>
                </div>
            </div>
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDelete} ></button>
        </div>
    );
}
export default Card;