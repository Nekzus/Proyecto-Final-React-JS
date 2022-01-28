import React, { useContext } from 'react';
import CartWidget from '../Cart/CartWidget';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { cartContext } from '../../Context/CartContext';
import { Button } from 'react-bootstrap';
import MenuCategories from '../Menues/MenuCategories';
import SearchItems from '../Common/SearchItems';
import { FiPower } from "react-icons/fi";
import { userContext } from '../../Context/UserContext';
import { useUser } from '../../hooks/useUser';
import { HiArrowLeft } from 'react-icons/hi';

const NavBar = () => {
    const cartResult = useContext(cartContext);
    const { cart } = cartResult;
    const userResult = useContext(userContext);
    const { logOut } = userResult;
    const { isLogged, users } = useUser("");
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error.message);
        }
    };
    
    return (
        <Navbar className='fixed-top-nav fixed-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                {(pathname !== '/') && <Button className="btn btn-history btn-dark p-3" onClick={() => { navigate(-1) }}><HiArrowLeft /> Volver</Button>}
                <NavLink className='navbar-brand' to="/">CinesNKMAX</NavLink>
                {cart.length !== 0 &&
                    <NavLink className='navbar-brand' to="/cart"><CartWidget /></NavLink>}
                <Nav className="me-auto p-3">
                    <SearchItems />
                </Nav>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {!isLogged && <NavLink className='navbar-brand' to="/auth/register">Creá tu cuenta</NavLink>}
                    {isLogged && users && <Nav className="me-auto">Bienvenid@ {users.name}</Nav>}
                    {isLogged
                        ? <NavLink className='navbar-brand' to='#' onClick={handleLogOut}><FiPower /></NavLink>
                        : <NavLink className='navbar-brand' to="/auth/login">Ingresá</NavLink>}
                    <Nav className="me-auto p-3">
                        <MenuCategories />
                    </Nav>
                    <Nav className="me-auto">
                        <NavLink to='/'><Button className='btn btn-history btn-dark' >Ir al catálogo</Button></NavLink>
                    </Nav>
                    <Nav className="me-auto">
                        <NavLink to='/orders'><Button className='btn btn-history btn-dark' >Mis compras</Button></NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};
export default NavBar;
