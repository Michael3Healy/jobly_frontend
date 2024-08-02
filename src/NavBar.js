import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { useContext } from 'react';
import UserContext from './userContext';

function NavBar({ logout }) {
	const { currUser } = useContext(UserContext);

	// eslint-disable-next-line
	const loggedInLinks = (
		<Nav className='ml-auto' navbar>
			<NavItem>
				<NavLink to='/companies'>Companies</NavLink>
			</NavItem>
			<NavItem>
				<NavLink to='/jobs'>Jobs</NavLink>
			</NavItem>
			<NavItem>
				<NavLink to='/profile'>Profile</NavLink>
			</NavItem>
			<NavItem>
				{/* eslint-disable-next-line*/}
				<a onClick={logout} className='logout'>
					Logout
				</a>
			</NavItem>
		</Nav>
	);

	const anonLinks = (
		<Nav className='ml-auto' navbar>
			<NavItem>
				<NavLink to='/login'>Login</NavLink>
			</NavItem>
			<NavItem>
				<NavLink to='/signup'>Signup</NavLink>
			</NavItem>
		</Nav>
	);

	let links = currUser.username ? loggedInLinks : anonLinks;

	return (
		<div>
			<Navbar color='light' expand='md'>
				<NavLink to='/' className='navbar-brand'>
					Jobly
				</NavLink>
				{links}
			</Navbar>
		</div>
	);
}

export default NavBar;
