import React from 'react';
import { Link } from 'react-router-dom';
import './AppNav.css';
import axios from 'axios';

const AppNav = (props) => {
	const handleLogou = (e) => {
		e.preventDefault();

		axios
			.post('https://akademia108.pl/api/social-app/user/login')
			.then((res) => {

				props.setUser(null);
				localStorage.setItem('user', null);
				
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<nav className='mainNav'>
			<ul>
				<li>
					<Link to='/' className='link one'>
						Home
					</Link>
				</li>
				{!props.user && (
					<li>
						<Link to='/login'>Login</Link>
					</li>
				)}

				{!props.user && (
					<li>
						<Link to='/signup'>SignUp</Link>
					</li>
				)}

				{props.user && (
					<li>
						<Link onClick={handleLogou} to='/'>
							Logout
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default AppNav;
