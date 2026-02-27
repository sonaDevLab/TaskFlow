import { useState } from "react";
import { createUser } from "../services/userService";

export default function UserForm(){
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => setUser({
        ...user,
        [e.target.name]: e.target.value
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const createdUser = await createUser(user);
            alert(`Usuario creado con ID: ${createdUser.id}`);
            setUser({
                name: "",
                email: "",
                password: ""
            });
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input name='name' value={user.name} onChange={handleChange} />
                {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input name='email' value={user.email} onChange={handleChange} />
                {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
            </div>
            <div>
                <label>Contraseña:</label>
                <input type='password' name='password' value={user.password} onChange={handleChange} />
                {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
            </div>
            <button type='submit'>Crear usuario</button>
        </form>
    );
}