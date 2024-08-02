import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button } from 'reactstrap';
import { useContext } from 'react';
import UserContext from './userContext';

function NavBar({ logout }) {
	const currUser = useContext(UserContext)

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
				<Button color='link' onClick={logout} className='nav-link'>
					Logout
				</Button>
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
	)

	let links = currUser.username ? loggedInLinks : anonLinks;
	
	return (
		<div>
			<Navbar color='info' expand='md'>
				<NavLink to='/'>
					Jobly
				</NavLink>
				{links}
			</Navbar>
		</div>
	);
}

export default NavBar;
