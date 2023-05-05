import { Link } from 'react-router-dom';
import useFormAndValidation from '../hooks/useFormAndValidation';

function Register({ onRegister }) {
    const { values, handleChange, handlePaste, errors } =
        useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        const userData = {
            email: values.email,
            password: values.password,
        };
        onRegister(userData);
    }
    return (
        <div className="auth-form">
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__wrapper">
                    <h3 className="auth-form__title">Sign up</h3>
                    <label className="auth-form__input">
                        <input
                            aria-label="Email"
                            type="text"
                            name="email"
                            id="email"
                            className={`auth-form__textfield ${
                                errors.email && 'form__input_type_error'
                            }`}
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
                                errors.name && 'form__error_visible'
                            }`}
                            aria-live="polite"
                        >
                            {errors.name}
                        </span>
                    </label>
                    <label className="auth-form__input">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="auth-form__textfield"
                            placeholder="Password"
                            autoComplete="new-password"
                            value={values.password || ''}
                            onChange={handleChange}
                            onPaste={handlePaste}
                            aria-required="true"
                            required
                        />
                        <span
                            className={`form__error ${
                                errors.name && 'form__error_visible'
                            }`}
                            aria-live="polite"
                        >
                            {errors.name}
                        </span>
                    </label>
                </div>
                <div className="auth-form__wrapper">
                    <button className="auth-form__button" type="submit">
                        Sign up
                    </button>
                    <p className="auth-form__text">
                        Already a member?{' '}
                        <Link className="auth-form__link" to="/signin">
                            Log in here!
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Register;
