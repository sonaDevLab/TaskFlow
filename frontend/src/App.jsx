import {useEffect, useState} from "react";
import {getCurrentUser, logout} from "./services/authService.js";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

function App() {

    const [user, setUser] = useState(null);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        const storedUser = getCurrentUser();
        if(storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    if(!user){
        return showRegister ? (
            <RegisterForm
                onRegister={() => setShowRegister(false)}
                onSwitch={() => setShowRegister(false)}
            />
        ) : (
            <LoginForm
                onLogin={setUser}
                onSwitch={() => setShowRegister(true)}
            />
        );
    }

    return (
      <div style={{ padding: '20px' }}>
          <h2>Bienvenida {user.name}</h2>
          <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    );
}

export default App;
