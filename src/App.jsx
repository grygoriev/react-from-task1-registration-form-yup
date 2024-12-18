/*Вопросы по реализации задачи через React Hook Form и Yup:
1. Не понятно как реализовать фокусирование без использования хука useEffect, который еще не проходили
2. Не понятно как реализовать различные события для разных ситуаций валидации onChange и onBlur
 */
import { useEffect, useRef } from 'react';
import styles from './App.module.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.email('Некорректный email'),
	password: yup
		.string()
		.min(8, 'Пароль должен быть не короче 8 символов')
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
			'Пароль должен содержать буквы в верхнем и нижнем регистре, цифру и символ'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const App = () => {
	const submitButtonRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordConfirmation: '',
		},
		mode: 'onChange',
		resolver: yupResolver(fieldsSchema),
	});

	useEffect(() => {
		if (isValid) {
			submitButtonRef.current?.focus();
		}
	}, [isValid]);

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input
					className={styles.input}
					type="email"
					placeholder="Email"
					{...register('email')}
				/>
				{errors.email && <span className={styles.span}>{errors.email.message}</span>}
				<br />
				<input
					className={styles.input}
					type="password"
					placeholder="Password"
					{...register('password')}
				/>
				{errors.password && (
					<span className={styles.span}>{errors.password.message}</span>
				)}
				<br />
				<input
					className={styles.input}
					type="password"
					placeholder="Confirm Password"
					{...register('passwordConfirmation')}
				/>
				{errors.passwordConfirmation && (
					<span className={styles.span}>{errors.passwordConfirmation.message}</span>
				)}
				<br />
				<button
					className={styles.button}
					type="submit"
					ref={submitButtonRef}
					disabled={!isValid}
				>
					Submit
				</button>
			</form>
		</div>
	);
};
