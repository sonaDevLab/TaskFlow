import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function LoginForm({ onSwitch }) {

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await login(email, password);
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