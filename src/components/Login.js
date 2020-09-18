import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';



function Login({ onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();


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
        onLogin({ email, password })
          .then(()=>{
             history.push("/");
          })
            .catch(err => console.log(err)); // запускается, если пользователь не найден 
    }
   
        return (
            <div className="auth">
                <p className="auth__heading">Вход</p>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input
                        className="auth__input"
                        onChange={handleChange}
                        id="email"
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        maxLength="40"
                        required />

                    <input
                        className="auth__input"
                        
                        id="password"
                        placeholder="Пароль"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        maxLength="40"
                        required />

                    <button className="auth__submit-btn" type="submit" onSubmit={handleSubmit}>Войти</button>
                </form>
                <div className="auth__entry">
                    <Link to="/register" className="auth__login-link">Еще не зарегистрированы? Регистрация</Link>
                </div>
            </div>
        );
    }



export default withRouter(Login);