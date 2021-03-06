import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { userContext } from "../../Context/UserContext";
import { useForm } from "../../hooks/useForm";

const LoginUser = () => {
    const userResult = useContext(userContext);
    const { logIn } = userResult;
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [formValues, handleInputChange, reset] = useForm({ email: '', password: '', });
    const { email, password } = formValues;
    const lastPath = localStorage.getItem('lastPath') || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            reset();
            navigate(lastPath);
        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/wrong-password') {
                setError('Error: La contraseña es incorrecta');
            } else if (error.code === 'auth/user-not-found') {
                setError('Error: El usuario no existe');
            } else if (error.code === 'auth/invalid-email') {
                setError('Error: El email no es valido');
            } else if (error.code === 'auth/too-many-requests') {
                setError('Error: Demasiadas solicitudes');
            } else {
                setError('Error desconocido');
            }
        }
    };

    return (
        <>
            <div className="p-4 box">
                <h2 className="mb-3 text-center">Inicia sesión</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            placeholder="E-mail"
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Contraseña"
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="dark" type="Submit">
                            Iniciar sesión
                        </Button>
                    </div>
                </Form>
                <hr />
                <div className="box mt-3 text-center">
                    {error && <Alert variant="danger">{error}</Alert>}
                </div>
            </div>
            <div className="box mt-2 text-center">
                ¿No tienes una cuenta? <Link to="/auth/register">Crear cuenta</Link>
            </div>
        </>
    );
};
export default LoginUser;