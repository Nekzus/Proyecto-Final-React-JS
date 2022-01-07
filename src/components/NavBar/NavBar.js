import React, { useContext } from 'react';
import CartWidget from '../Cart/CartWidget';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { context } from '../../Context/CartContext';
import { Button } from 'react-bootstrap';
import MenuCategories from '../Menues/MenuCategories';
import SearchItems from '../Common/SearchItems';


const NavBar = () => {
    const result = useContext(context);
    const { cart } = result;

    return (
        <Navbar className='fixed-top-nav fixed-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NavLink className='navbar-brand' to="/">CinesNKMAX</NavLink>
                {cart.length !== 0 &&
                    <NavLink className='navbar-brand' to="/cart"><CartWidget /></NavLink>}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto p-3">
                        <SearchItems />
                    </Nav>
                    <Nav className="me-auto p-3">
                        <MenuCategories />
                    </Nav>
                    <Nav className="me-auto">
                        <NavLink to='/orders'><Button className='btn btn-history btn-dark' >Historial ordenes</Button></NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};
export default NavBar;
