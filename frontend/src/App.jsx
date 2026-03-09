import {useEffect, useState} from "react";
import {getCurrentUser, logout} from "./services/authService.js";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {

    const [user, setUser] = useState(null);
    const [showRegister, setShowRegister] = useState(false);

    // Revisar si hay usaurio guardado en LocalStorage
    useEffect(() => {
        const storedUser = getCurrentUser();
        if(storedUser) {
            setUser(storedUser);
        }
    }, []);

    //Cerrar sesión
    const handleLogout = () => {
        logout();
        setUser(null);
    };

    // Si no hay usuario logueado
    if(!user){
        return showRegister ? (
            <div style={{ padding: '20px' }}>
                <h1>TaskFlow - Registro</h1>
                <RegisterForm
                    onRegister={(newUser) => setUser(newUser)}
                    onSwitch={() => setShowRegister(false)}
                />
            </div>
        ) : (
            <div style={{ padding: '20px' }}>
                <h1>TaskFlow - Login</h1>
                <LoginForm
                    onLogin={(loggedUser) => setUser(loggedUser)}
                    onSwitch={() => setShowRegister(true)}
                />
            </div>
        );
    }

    //Si hay usuario logueado
    return (
      <div style={{ padding: '20px' }}>
          <h2>Bienvenida {user.name}</h2>
          <button onClick={handleLogout}>Cerrar sesión</button>

          <TaskList user={user}/>
      </div>
    );
}

export default App;
