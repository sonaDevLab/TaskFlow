import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService.js";

function TaskList({ user }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

    //Cargar tareas al iniciar
    useEffect(() => {
       loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await getTasks(user.id);
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(editingId) {
                await updateTask(user.id, editingId, {title, description});
                setEditingId(null);
            } else {
                await createTask(user.id, {title, description});
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
            await deleteTask(user.id, taskId);
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
                        <strong>{task.title}</strong> - {task.description}
                        <button onClick={() => handleEdit(task)}>Editar</button>
                        <button onClick={() => handleDelete(task.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default TaskList;