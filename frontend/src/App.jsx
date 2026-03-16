import {useContext, useEffect, useState} from "react";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import TaskList from "./components/TaskList.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ThemeSwitch from "./components/ThemeSwitch.jsx";

function App() {

    const { user, logout } = useContext(AuthContext);
    const [showRegister, setShowRegister] = useState(false);

    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        if(isDark) {
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
        }
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    // AUTH - Si no hay usuario logueado
    if(!user){
        return (
            <div className='w-full min-h-screen flex felx-col items-center justify-center px-4'>
                <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 50}}>
                    <ThemeSwitch isDark={isDark} onToggle={toggleTheme} />
                </div>
                {showRegister ? (
                   <RegisterForm onSwitch={() => setShowRegister(false)}/>
                ) : (
                    <LoginForm onSwitch={() => setShowRegister(true)}/>
                )}
            </div>
        );
    }

    //Si hay usuario logueado
    return (
        <ProtectedRoute>
            <div className='w-full min-h-screen px-4 py-8'>
                <div className='max-w-3xl mx-auto'>
                    {/* Header */}
                    <header
                        className='flex iems-center justify-between mb-10 animate-fadeUp'
                        style={{ animationDelay: '0s'}}
                    >
                        <div className='flex items-center gap-3'>
                            <div
                                className='w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold'
                                style={{
                                    background: 'var(--accent)',
                                    boxShadow: '0 0 16px var(--accent-glow)'
                                }}
                            >
                                TF
                            </div>
                            <span
                                className='text-xl font-bold tracking-tight'
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    color: "var(--text-primary)"
                                }}
                            >
                                TaskFlow
                            </span>
                        </div>

                        <div className='flex items-center gap-4'>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                Hola, {" "}
                                <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>
                                    {user.name}
                                </span>
                            </span>

                            <ThemeSwitch isDark={isDark} onToggle={toggleTheme} />

                            <button
                                onClick={logout}
                                className='px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200'
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.boderColor = 'var(--danger)';
                                    e.currentTarget.style.color = 'var(--danger)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.boderColor = 'var(--border)';
                                    e.currentTarget.style.color = 'var(--text-muted)';
                                }}
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </header>

                    <TaskList user={user} />
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default App;
