import { useState, useRef } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordConfirmation: '',
	});
	const [errorEmail, setErrorEmail] = useState(null);
	const [errorPassword, setErrorPassword] = useState(null);
	const submitButtonRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(formData);
	};

	const onLoginChange = ({ target }) => {
		setFormData({ ...formData, email: target.value });

		let error = null;
		const emailInputRegex = /^[a-zA-Z0-9._@-]*$/;

		if (!emailInputRegex.test(target.value)) {
			error =
				'Неверная почта. Допустимые символы - буквы, цифры и нижнее подчеркивание, точка и @';
		}
		setErrorEmail(error);
	};

	const onLoginBlur = () => {
		const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;
		if (!emailRegex.test(formData.email)) {
			setErrorEmail(
				'Неверная почта. Проверьте на ошибки email. Наличие @ и доменной зоны.',
			);
		}
	};

	const onPasswordChange = ({ target }) => {
		setFormData({ ...formData, password: target.value });
		setErrorPassword(null);
	};

	const onPasswordBlur = ({ target }) => {
		let error = null;
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

		if (!passwordRegex.test(target.value)) {
			error =
				'Пароль должен содержать буквы в нижнем и верхнем регистре, цифру, специальный символ и быть не короче 8 символов.';
		} else if (
			formData.passwordConfirmation !== target.value &&
			formData.passwordConfirmation
		) {
			error = 'Пароли не совпадают';
		}
		setErrorPassword(error);
	};

	const onConfirmationPasswordChange = ({ target }) => {
		setFormData({ ...formData, passwordConfirmation: target.value });
		if (formData.password === target.value && target.value) {
			submitButtonRef.current.focus();
		}
		setErrorPassword(null);
	};

	const onConfirmationPasswordBlur = ({ target }) => {
		if (formData.password !== target.value && target.value) {
			setErrorPassword('Пароли не совпадают');
		} else {
			setErrorPassword(null);
		}
	};

	const errorStatus = errorEmail || errorPassword;

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={onSubmit}>
				<input
					className={styles.input}
					type="email"
					name="email"
					id="email"
					placeholder="Email"
					value={formData.email}
					onChange={onLoginChange}
					onBlur={onLoginBlur}
				/>
				{errorEmail && <span className={styles.span}>{errorEmail}</span>}
				<br />
				<input
					className={styles.input}
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					value={formData.password}
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				/>
				{errorPassword && <span className={styles.span}>{errorPassword}</span>}
				<br />
				<input
					className={styles.input}
					type="password"
					name="confirm_password"
					id="confirm_password"
					placeholder="Confirm Password"
					value={formData.passwordConfirmation}
					onChange={onConfirmationPasswordChange}
					onBlur={onConfirmationPasswordBlur}
				/>
				<br />
				<button
					className={styles.button}
					type="submit"
					ref={submitButtonRef}
					disabled={errorStatus}
				>
					Submit
				</button>
			</form>
		</div>
	);
};
