function ThemeSwitch({ isDark, onToggle}) {
    return (
        <button
            onClick={onToggle}
            title={isDark ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '999px',
                padding: '5px 10px 5px 6px',
                cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
            {/* Track */}
            <div
                style={{
                    position: 'relative',
                    width: '32px',
                    height: '18px',
                    borderRadius: '999px',
                    background: isDark ? 'var(--accent)' : 'rgba(0,0,0,0.15)',
                    transition: 'background 0.25s',
                    flexShrink: 0,
                }}
            >
                {/* Knob */}
                <div
                    style={{
                        position: 'absolute',
                        top: '3px',
                        left: isDark ? '17px' : '3px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: 'white',
                        transition: 'left 0.25s cubic-bezier(.4,0,.2,1)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                    }}
                />
            </div>

            <span style={{ fontSize: '14px', lineHeight: 1 }}>
                {isDark ? '🌙' : '☀️'}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap'}}>
                {isDark ? 'Noche' : 'Día'}
            </span>
        </button>
    );
}

export default ThemeSwitch;