import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';


function Register({ onRegister, onConfirm }) {
  const [email, setEmail] = React.useState('');

  const [password, setPassword] = React.useState('');
  //const [errorMessage, setErrorMessage] = React.useState('');
  const history = useHistory();

  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  function handleChange(e) {
    const { value } = e.target;
    e.target.name === 'email'
      ? setEmail(value)
      : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onRegister({ email, password })
      .then(() => {
        onConfirm(true);
        history.push('/sign-in');
      })
      .catch(() => {
        onConfirm(false);
      });
  }

return (
  <div className="auth">
    <p className="auth__heading">Регистрация</p>
    <form onSubmit={handleSubmit} className="auth__form">
      <input
        className="auth__input"
        onChange={handleChange}
        id="email"
        placeholder="Email"
        value={email || ''}
        type="email"
        name="email"
        minLength='6'
        maxLength="40"
        required 
        ref={emailRef}/>

      <input
        className="auth__input"
        onChange={handleChange}
        id="password"
        placeholder="Пароль"
        type="password"
        value={password || ''}
        name="password"
        maxLength="40"
        required 
        ref={passwordRef}/>

      <button className="auth__submit-btn" type="submit" onSubmit={handleSubmit}>Зарегистрироваться</button>
    </form>
    <div className="auth__entry">
      <Link to="/login" className="auth__login-link">Уже зарегистрированы? Войти</Link>
    </div>
  </div>
);
}

export default withRouter(Register);