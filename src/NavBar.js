import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button } from 'reactstrap';

function NavBar({ logout }) {
	return (
		<div>
			<Navbar color='info' expand='md'>
				<NavLink exact to='/'>
					Jobly
				</NavLink>

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
			</Navbar>
		</div>
	);
}

export default NavBar;
