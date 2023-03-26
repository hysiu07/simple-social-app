import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = (props) => {

  // ref's in funcion component
	let inputRefName = HTMLInputElement;
	let inputRefEmail = HTMLInputElement;
	let inputRefConfirmPass = HTMLInputElement;
	let inputRefPass = HTMLInputElement;

	const [userName, setUserName] = useState();
	const [userEmail, setUserEmail] = useState();
	const [userPass, setUserPass] = useState();
	const [userConfirmPass, setUserConfirmPass] = useState();

	const [errorFlag, setErrorFlag] = useState(true);

	const [errorInfoName, setErrorInfoName] = useState('');
	const [errorInfoEmail, setErrorInfoEmail] = useState('');
	const [errorInfoPass, setErrorInfoPass] = useState('');

  const[confirmFlag, setConfirmFlag] = useState('')

	const sendForm = (e) => {
		e.preventDefault();

		// username

		if (userName.length <= 4  ) {
			setErrorInfoName('Za krótka nazwa');
			setErrorFlag(true);
		} else if (!/^[^\s]*$/.test(userName)) {
			setErrorInfoName('Skasuj białe znaki');
			setErrorFlag(true);
		} else {
			setErrorInfoName('');
			setErrorFlag(false);
		}

		// email valid

		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userEmail)) {
			setErrorFlag(true);
			setErrorInfoEmail('Zły e-mail');
		} else {
			setErrorInfoEmail('');
			setErrorFlag(false);
		}

		// password valid

		if (userPass === '') {
			setErrorInfoPass('Podaj hasło');
			setErrorFlag(true);
		} else if (userPass !== userConfirmPass) {
			setErrorInfoPass('Hasła muszą być takie same');
			setErrorFlag(true);
		} else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(userPass)) {
			setErrorInfoPass('hasło musi zawierać znaki specjalne');
			setErrorFlag(true);
		} else {
			setErrorInfoPass('');
			setErrorFlag(false);
		}

		if (errorFlag === false) {
			axios
				.post('https://akademia108.pl/api/social-app/user/signup', {
					username: userName,
					email: userEmail,
					password: userPass,
					confirmPassword: userConfirmPass,
				})
				.then((res) => {
					console.log(res);

          setConfirmFlag(res.data.signedup)
          

				
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			console.log('błąd formularza');
		}

    if(confirmFlag === true){
      inputRefName.value = ''
      inputRefEmail.value = ''
      inputRefPass.value = ''
      inputRefConfirmPass.value = ''

      setUserName('')
      setUserEmail('')
      setUserPass('')
      setUserConfirmPass('')
    }

	};

	const valueInputs = () => {
		setUserName(inputRefName.value.trim());
		setUserEmail(inputRefEmail.value.trim());
		setUserPass(inputRefPass.value.trim());
		setUserConfirmPass(inputRefConfirmPass.value.trim());
	};

	return (
		<div className='signUp'>
			{props.user && <Navigate to='/' />}
			<form onSubmit={sendForm}>
				<input
					ref={(element) => {
						inputRefName = element;
					}}
					type='text'
					name='username'
					placeholder='User name'
					onChange={valueInputs}
				/>
				<p>{errorInfoName}</p>

				<input
					ref={(element) => {
						inputRefEmail = element;
					}}
					type='text'
					name='email'
					placeholder='Email'
					onChange={valueInputs}
				/>
				<p>{errorInfoEmail}</p>
				<input
					ref={(element) => {
						inputRefPass = element;
					}}
					type='password '
					name='password'
					placeholder='Password'
					onChange={valueInputs}
				/>
				<p>{errorInfoPass}</p>

				<input
					ref={(element) => {
						inputRefConfirmPass = element;
					}}
					type='password '
					name='confirmPassword'
					placeholder='Confirm password'
					onChange={valueInputs}
				/>
				<button type='submit' className='btn'>
					SignUp!
				</button>
			</form>
      <p>{confirmFlag && "Zarejestrowano uzytkownika!"}</p>
      <p>{confirmFlag && "Zaloguj się!"}</p>
     
		</div>
	);
};

export default SignUp;
