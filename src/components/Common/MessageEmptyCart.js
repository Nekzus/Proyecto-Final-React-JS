import React from 'react'
import { Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MessageEmptyCart = () => {
    return (
        <div className="container cart-container">
            <Alert variant='dark' className='text-center'>
                <Alert.Heading >Tu carrito esta vacío</Alert.Heading>
                <p>
                    Comienza agregando productos
                </p>
                <hr />
                <p className="mb-0">
                    <NavLink to={`/`}><button className="btn btn-dark">Volver al catalogo</button></NavLink>
                </p>
            </Alert>
        </div>
    )
};
export default MessageEmptyCart;
