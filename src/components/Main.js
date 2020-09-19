import React from 'react';
import Card from './Card';
import pen from '../images/pencil.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__box">
                    <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
                    <img className="profile__pencil" onClick={props.onEditAvatar} src={pen} alt="Редактировать" />
                </div>
                <div className="profile__info">
                    <div>
                        <h1 className="profile__name" data-id="">{currentUser.name}</h1>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                    <button className="profile__edit-button" onClick={props.onEditProfile} type="button" />
                </div>
                <button className="add-button" onClick={props.onAddPlace} type="button" />
            </section>

            <section className="cards">
                {props.cards.map(item =>
                    <Card
                        key={item._id}
                        card={item}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />)}
            </section>
        </main>
    );
}
export default Main;
