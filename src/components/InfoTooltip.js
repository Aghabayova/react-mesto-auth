import React from 'react';
import success from '../images/register-success.svg';
import error from '../images/register-error.svg';

function InfoTooltip({ onClose, isOpen, isRegisterSuccess }) {
  
  return (

    <section className={(isOpen ? 'popup popup_opened' : 'popup')}>
      <div className="popup__content" id="infotooltip-popup">
        <button className="popup__close" onClick={onClose} type="button">+</button>
        <img src={isRegisterSuccess ? success : error}
          alt={isRegisterSuccess ? "Успешная регистрация." : "Ошибка при регистрации"}
          className="popup__register-img" />
        <h2 className="popup__register-title">
          {isRegisterSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;