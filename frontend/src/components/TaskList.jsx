import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from "../services/taskService.js";

function TaskList({ user }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [filter, setFilter] = useState("all");

    //Cargar tareas al iniciar
    useEffect(() => {
       if(localStorage.getItem("token")) {
           loadTasks();
       }
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

        try {
            if(editingId) {
                await updateTask(editingId, {title, description});
                setEditingId(null);
            } else {
                await createTask({title, description});
            }

            setTitle("");
            setDescription("");
            loadTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setEditingId(task.id);
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            loadTasks();
        } catch (error) {
            console.error("Error al eliminar tarea: " ,error);
        }
    };

    const handleToggle = async (taskId) => {
        try {
            await toggleTask(taskId);
            loadTasks();
        } catch (error) {
            console.error(error);
        }
    };

    //Contador tareas pendientes
    const pendingCount = tasks.filter(task => !task.completed).length;

    //Filtro de tareas
    const filteredTasks = tasks
        .filter(task => {
            if(filter === "pending") return !task.completed;
            if(filter === "completed") return task.completed;
            return true;
        })
        .sort((a, b) => a.completed - b.completed);

    return (
        <div>
            <h2>Tareas de {user.name}</h2>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Título'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Descripción'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <button type='submit'>
                    {editingId ? "Actualizar" : "Crear"}
                </button>
            </form>

            {/* CONTADOR */}
            <p>{pendingCount} tareas pendientes</p>

            {/* FILTROS */}
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setFilter("all")}>
                    Todas
                </button>

                <button onClick={() => setFilter("pending")}>
                    Pendientes
                </button>

                <button onClick={() => setFilter("completed")}>
                    Completadas
                </button>
            </div>

            {/* LISTA DE TAREAS */}
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id} style={{ opacity: task.completed ? 0.6 : 1 }}>
                        <strong
                            style={{
                                textDecoration: task.completed ? "line-through" : "none",
                                color: task.completed ? "gray" : "black"
                            }}
                        >
                            {task.title}
                        </strong>
                        {" - "} {task.description}

                        <button onClick={() => handleToggle(task.id)}>
                            {task.completed ? "Desmarcar" : "Completar"}
                        </button>

                        <button onClick={() => handleEdit(task)}>Editar</button>
                        <button onClick={() => handleDelete(task.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default TaskList;