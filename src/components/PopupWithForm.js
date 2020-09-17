import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={(props.isOpen ? "popup popup_opened" : "popup")} id={props.name}>
            <div className="popup__content" id="edit-popup-form">
                <button className="popup__close" onClick={props.onClose} id="popup-close-edit" type="button">+</button>

                <form onSubmit={props.onSubmit} className="popup__form popup__edit_profile" name="edit">
                    <h3 className="popup__heading">{props.heading}</h3>
                    {props.children}
                    <button className="popup__save-btn" id="popup-save-btn" type="submit">{props.isLoading ? 'Загрузка...' : props.buttonText}</button>
                </form>
            </div>
        </section>
    );
}
export default PopupWithForm;