import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const userData = {
            email,
            password,
        };
        onLogin(userData);
    }
    return (
        <div className="auth-form">
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__wrapper">
                    <h3 className="auth-form__title">Lob in</h3>
                    <label className="auth-form__input">
                        <input
                            type="text"
                            name="name"
                            id="email"
                            className="auth-form__textfield"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <lable className="auth-form__input">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="auth-form__textfield"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </lable>
                </div>
                <div className="auth-form__wrapper">
                    <button className="auth-form__button" type="submit">
                        Sign in
                    </button>
                    <p className="auth-form__text">
                        Not a member yet?{' '}
                        <Link className="auth-form__link" to="/signup">
                            Sign up here!
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;