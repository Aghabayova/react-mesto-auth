import React from 'react';

function ImagePopup(props) {
    return (
        <section className={(props.card.isOpen ? "popup popup_opened" : "popup")} id="view-image">
            <figure className="popup__view">
                <button className="popup__close" id="close-view" onClick={props.onClose} type="button">+</button>
                <img className="popup__image" alt={props.card.name} src={props.card.link} />
                <figcaption className="popup__caption">{props.card.name}</figcaption>
            </figure>
        </section>
    );
}
export default ImagePopup;


