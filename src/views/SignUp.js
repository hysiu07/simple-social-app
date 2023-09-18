import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = (props) => {
	const [formInfo, setFormInfo] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [signUpMessage, setSignUpMessage] = useState('');
	const [signUpDone, setSignUpDone] = useState(false);

	const validate = () => {
		let validationErrors = {
			username: false,
			email: false,
			password: false,
			confirmPassword: false,
		};

		// user name validation

		if (formInfo.username.length < 4) {
			validationErrors.username = true;

			setErrors((prevState) => {
				return {
					...prevState,
					username: 'Username should have at least 4 characters',
				};
			});
		} else if (!/^[^\s]*$/.test(formInfo.username)) {
			validationErrors.username = true;

			setErrors((prevState) => {
				return {
					...prevState,
					username: 'Username should`n have empty characters',
				};
			});
		} else {
			validationErrors.username = false;
			setErrors((prevState) => {
				return {
					...prevState,
					username: '',
				};
			});
		}

		// email validation

		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formInfo.email)) {
			validationErrors.email = true;

			setErrors((prevState) => {
				return {
					...prevState,
					email: 'There is no valid email',
				};
			});
		} else {
			validationErrors.email = false;
			setErrors((prevState) => {
				return {
					...prevState,
					email: '',
				};
			});
		}

		// password validation

		if (formInfo.password.length < 6) {
			validationErrors.password = true;

			setErrors((prevState) => {
				return {
					...prevState,
					password: 'Password should have at least 6 characters',
				};
			});
		} else if (!/^[^\s]*$/.test(formInfo.password)) {
			validationErrors.password = true;

			setErrors((prevState) => {
				return {
					...prevState,
					password: 'Password should`n have empty characters',
				};
			});
		} else if (
			!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formInfo.password)
		) {
			validationErrors.password = true;
			setErrors((prevState) => {
				return {
					...prevState,
					password: 'Password must contain one of charts: ! # @ $ %',
				};
			});
		} else {
			validationErrors.password = false;
			setErrors((prevState) => {
				return {
					...prevState,
					password: '',
				};
			});
		}
		// confirm password validation

		if (formInfo.password !== formInfo.confirmPassword) {
			validationErrors.confirmPassword = true;

			setErrors((prevState) => {
				return {
					...prevState,
					confirmPassword: 'Password should be the same',
				};
			});
		} else {
			validationErrors.confirmPassword = false;

			setErrors((prevState) => {
				return {
					...prevState,
					confirmPassword: '',
				};
			});
		}
		return (
			!validationErrors.username &&
			!validationErrors.email &&
			!validationErrors.password &&
			!validationErrors.confirmPassword
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validate()) {
			return;
		}

		axios
			.post('https://akademia108.pl/api/social-app/user/signup', {
				username: formInfo.username,
				email: formInfo.email,
				password: formInfo.password,
			})
			.then((res) => {
				console.log(res.data);
				let resData = res.data;

				if (resData.signedup) {
					setSignUpMessage('Account created');
					setSignUpDone(true);
				} else {
					if (resData.message.username) {
						setSignUpMessage(resData.message.username[0]);
					} else if (resData.message.email) {
						setSignUpMessage(resData.message.email[0]);
					}
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleInputChange = (e) => {
		const target = e.target;
		const name = target.name;

		setFormInfo({
			...formInfo,
			[name]: target.value.trim(),
		});
	};

	return (
		<div className='signUp'>
			{props.user && <Navigate to='/' />}
			<form onSubmit={handleSubmit}>
				{signUpMessage && <h2>{signUpMessage}</h2>}
				<input
					type='text'
					name='username'
					placeholder='User name'
					onChange={handleInputChange}
				/>
				{errors.username && <p>{errors.username}</p>}

				<input
					type='text'
					name='email'
					placeholder='Email'
					onChange={handleInputChange}
				/>
				{errors.email && <p>{errors.email}</p>}
				<input
					type='password '
					name='password'
					placeholder='Password'
					onChange={handleInputChange}
				/>
				{errors.password && <p>{errors.password}</p>}
				<input
					type='password '
					name='confirmPassword'
					placeholder='Confirm password'
					onChange={handleInputChange}
				/>
				{errors.confirmPassword && <p>{errors.confirmPassword}</p>}
				<button type='submit' disabled={signUpDone} className='btn'>
					Sign Up!
				</button>
				{signUpDone && (
					<div className='btn-login'>
						<Link to='/login' className='btn'>
							Go to{' '}
						</Link>
					</div>
				)}
			</form>
		</div>
	);
};

export default SignUp;
