import { useState } from "react";
import { register } from "../services/authService.js";

function RegisterForm({ onSwitch}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await register(name, email, password);
            onSwitch(); // vuelve al login
        } catch (error) {
            setError("Error al registrar usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type='text'
                placeholder='Nombre'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type='password'
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type='submit'>Registrarse</button>

            <p>
                ¿Ya tienes una cuenta?{" "}
                <button type='button' onClick={onSwitch}>
                    Inicia sesión
                </button>
            </p>
        </form>
    );
}

export default RegisterForm;