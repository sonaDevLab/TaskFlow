import {useState} from "react";

function TaskCard({ task, index, onToggle, onEdit, onDelete }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className=''
            style={{
                background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                border: `solid 1px ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
                opacity: task.completed ? 0.7 : 1,
                animationDelay: `${index * 0.04}s`,
                animation: 'fadeUp 0.3s ease forwards'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Checkbox */}
            <button
                onClick={() => onToggle(task.id)}
                className=''
                style={{
                    background: task.completed ? 'var(--success)' : 'transparent',
                    borderColor: task.completed ? 'var(--success)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    minWidth: '20px',
                }}
                title={task.completed ? 'Marcar pendiente' : 'Completar'}
            >
                {task.completed && (
                    <svg width='10' height='8' viewBox='0 0 10 8' fill='none'>
                        <path d='M1 4L3.5 6.5L9 1' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                )}
            </button>

            {/* Content */}
            <div className=''>
                <p
                    className=''
                    style={{
                        color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                >
                    {task.title}
                </p>
                {task.description && (
                    <p
                        className=''
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {task.description}
                    </p>
                )}
            </div>

            {/* Status badge */}
            <span
                className=''
                style={{
                  background: task.completed
                      ? 'rgba(74, 222, 128, 0.12)'
                      : 'rgba(245, 158, 11, 0.12)',
                  color: task.completed
                      ? 'var(--success)'
                      : '#f59e0b',
                }}
            >
                {task.completed ? 'Completada' : 'Pendiente'}
            </span>

            {/* Actions */}
            <div
                className=''
                style={{ opacity: hovered ? 1 : 0 }}
            >
                <button
                    onClick={() => onEdit(task.id)}
                    className=''
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                    }}
                    title='Editar'
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--accent)';
                        e.currentTarget.style.color = 'var(--accent-light)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                >
                    <svg width='13' height='13' viewBox='0 0 16 16' fill='currentColor'>
                        <path d='M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z' />
                    </svg>
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className=''
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                    }}
                    title='Eliminar'
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--danger)';
                        e.currentTarget.style.color = 'var(--danger)';
                        e.currentTarget.style.background = 'rgba(248,113,113,0.08)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.background = 'transparent';
                    }}
                >
                    <svg width='12' height='13' viewBox='0 0 16 16' fill='currentColor'>
                        <path d='M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z'/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default TaskCard;