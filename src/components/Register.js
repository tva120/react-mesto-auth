import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onSignup(email, password);
    }
    return (
        <main className="content">
            <form className="login" onSubmit={handleSubmit}>
                <h3 className="popup-container__title login__title">Регистрация</h3>
                <input className="popup-container__item login__item popup-container__item_email" name="userEmail" id="email-input" type="email" required
                    placeholder="Email" onChange={handleEmailChange} />
                <span className="popup__error" id="email-input-error"></span>
                <input className="popup-container__item login__item popup-container__item_password" name="userPassword" id="password-input" type="password"
                    required placeholder="Пароль" onChange={handlePasswordChange} />
                <span className="popup__error" id="password-input-error"></span>
                <button className="popup-container__button login__button" type="submit">Зарегистрироваться</button>
                <Link to='/sign-in' className="login__link">Уже зарегистрированы? Войти</Link>
            </form>
        </main>
    );
}

export default Register