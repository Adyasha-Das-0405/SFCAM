export default function SidebarLink({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                background: active ? "var(--teal-faint)" : "transparent",
                border: "none",
                borderRadius: "var(--radius-sm)",
                color: active ? "var(--teal)" : "var(--muted)",
                fontWeight: active ? 500 : 400,
                fontSize: 14,
                cursor: "pointer",
                transition: "all .2s",
                textAlign: "left",
                borderLeft: active ? "2px solid var(--teal)" : "2px solid transparent",
            }}
        >
            <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{icon}</span>
            {label}
        </button>
    );
}