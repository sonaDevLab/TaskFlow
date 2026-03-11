import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from "../services/taskService.js";

function TaskList({ user }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

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

    return (
        <div>
            <h2>Tareas de {user.name}</h2>

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

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong
                            style={{
                                textDecoration: task.completed ? "line-through" : "none"
                            }}
                        >
                            {task.title}
                        </strong>
                        - {task.description}

                        <button onClick={() => handleToggle(task)}>
                            {task.completed ? "Desmarcar" : "Completar"}
                        </button>

                        <button onClick={() => handleEdit(task.id)}>Editar</button>
                        <button onClick={() => handleDelete(task.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default TaskList;