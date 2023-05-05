import { Link } from 'react-router-dom';
import useFormAndValidation from '../hooks/useFormAndValidation';

function Login({ onLogin }) {
    const { values, handleChange, handlePaste, errors } =
        useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        const userData = {
            email: values.email,
            password: values.password,
        };
        onLogin(userData);
    }
    return (
        <div className="auth-form">
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__wrapper">
                    <h3 className="auth-form__title">Log in</h3>
                    <label className="auth-form__input">
                        <input
                            aria-label="Email"
                            type="text"
                            name="email"
                            id="email"
                            className="auth-form__textfield"
                            placeholder="Email"
                            autoComplete="username"
                            value={values.email || ''}
                            onChange={handleChange}
                            onPaste={handlePaste}
                            aria-required="true"
                            required
                        />
                        <span
                            className={`form__error ${
                                errors.email && 'form__error_visible'
                            }`}
                            aria-live="polite"
                        >
                            {errors.email}
                        </span>
                    </label>
                    <label className="auth-form__input">
                        <input
                            aria-label="Password"
                            type="password"
                            name="password"
                            id="password"
                            className="auth-form__textfield"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={values.password || ''}
                            onChange={handleChange}
                            onPaste={handlePaste}
                            aria-required="true"
                            required
                        />
                        <span
                            className={`form__error ${
                                errors.password && 'form__error_visible'
                            }`}
                            aria-live="polite"
                        >
                            {errors.password}
                        </span>
                    </label>
                </div>
                <div className="auth-form__wrapper">
                    <button className="auth-form__button" type="submit">
                        Log in
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
