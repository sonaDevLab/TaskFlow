import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from "../services/taskService.js";
import TaskCard from "./TaskCard.jsx";

const FILTERS = [
    {key: 'all', label: 'Todas'},
    {key: 'pending', label: 'Pendientes'},
    {key: 'completed', label: 'Completadas'},
];

function TaskList({ user }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(false);

    //Cargar tareas al iniciar
    useEffect(() => {
       if(localStorage.getItem("token")) loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error cargando tareas:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title) return alert("El título es obligatorio");

        setLoading(true);

        try {
            if(editingId) {
                await updateTask(editingId, {title, description});
                setEditingId(null);
            } else {
                await createTask({title, description});
            }

            setTitle("");
            setDescription("");
            await loadTasks();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setEditingId(task.id);
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(prev => prev.filter(t => t.id !== taskId))
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggle = async (taskId) => {
        try {
            const updated = await toggleTask(taskId);
            setTasks(prev => prev.map(t => t.id === taskId ? updated : t));
        } catch (error) {
            console.error(error);
        }
    };

    //Contador tareas pendientes
    const pendingCount = tasks.filter(t => !t.completed).length;
    const completedCount = tasks.filter(t => t.completed).length;

    //Filtro de tareas
    const filteredTasks = tasks
        .filter(task => {
            if(filter === "pending") return !task.completed;
            if(filter === "completed") return task.completed;
            return true;
        })
        .sort((a, b) => a.completed - b.completed);

    return (
        <div className='space-y-6'>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-3 animate-fadeUp animate-delay-1'>
                {[
                    { label: 'Total', value: tasks.length, color: 'var(--accent)'},
                    { label: 'Pendientes', value: pendingCount, color: '#f59e0b'},
                    { label: 'Completadas', value: completedCount, color: 'var(--success)'},
                ].map(({ label, value, color }) => (
                    <div
                        key={label}
                        className='rounded-xl px-4 py-4 text-center'
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)'}}
                    >
                        <div className='text-2xl font-bold' style={{ color, fontFamily: 'Syne, sans-serif' }}>
                            {value}
                        </div>
                        <div className='text-xs mt-1' style={{ color: 'var(--text-muted)' }}>
                            {label}
                        </div>
                    </div>
                ))}
            </div>

            {/* FORM */}
            <div
                className='rounded-2xl p-6 animate-fadeUp animate-delay-2'
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
                <h2
                    className='text-sm font-semibold uppercase tracking-widest mb-4'
                    style={{ color: 'var(--text-muted)' }}
                >
                    {editingId ? '✏️ Editando tarea' : '➕ Nueva tarea'}
                </h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <input
                        type='text'
                        placeholder='Título de la tarea...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className='w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200'
                        style={{
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-primary)',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                    <input
                        type='text'
                        placeholder='Descripción'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200'
                        style={{
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-primary)',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />

                    <div className='flex gap-2 pt-1'>
                        <button
                            type='submit'
                            disabled={loading || !title}
                            className='flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200'
                            style={{
                                background: 'linear-gradient(135deg, var(--accent), #5b4dd4)',
                                color: 'white',
                                border: 'none',
                                cursor: loading || !title ? 'not-allowed' : 'pointer',
                                opacity: !title ? 0.5 : 1,
                                boxShadow: title ? '0 4px 16px var(--accent-glow)' : 'none',
                            }}
                            onMouseEnter={e => {
                                if(title) e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
                        </button>

                        {editingId && (
                            <button
                                type='button'
                                disabled={handleCancelEdit}
                                className='px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200'
                                style={{
                                    background: 'var(--bg-primary)',
                                    color: 'var(--text-muted)',
                                    border: '1px solid var(--border)',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--danger)')}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* FILTROS */}
            <div
                className='flex gap-2 p-1 rounded-xl animate-fadeUp animate-delay-3'
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
                {FILTERS.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className='flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200'
                        style={{
                            background: filter === key ? 'var(--accent)' : 'transparent',
                            color: filter === key ? 'white' : 'var(--text-muted)',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: filter === key ? '0 2px 12px var(--accent-glow)' : 'none',
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* LISTA DE TAREAS */}
            <div className='space-y-2 animate-fadeUp animate-delay-4'>
                {filteredTasks.length === 0 ? (
                    <div
                        className='text-center py-16 rounded-2xl'
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                    >
                        <div className='text-4xl mb-3'>
                            {filter === 'completed' ? "🎉" : "📝"}
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            {filter === 'completed'
                                ? 'Aún no has completado ninguna tarea'
                                : filter === 'pending'
                                ? 'No tienes tareas pendientes. !genial!'
                                : 'Crea tu primera tarea arriba'
                            }
                        </p>
                    </div>
                ) : (
                    filteredTasks.map((task, i) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            index={i}
                            onToggle={handleToggle}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );

}

export default TaskList;