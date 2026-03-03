import { useState } from "react";
import { login } from "../services/authService.js";

function LoginForm({ onLogin, onSwitch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const user = await login(email, password);
            onLogin(user);
        } catch (error) {
            setError("Credeneciales incorrectas");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <input
                    type='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type='submit'>Entrar</button>

            <p>
                ¿No tienes cuenta?{" "}
                <button type='button' onClick={onSwitch}>
                    Regístrate aquí
                </button>
            </p>
        </form>
    );
}

export default LoginForm;