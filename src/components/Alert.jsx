export default function Alert({ type = "info", children }) {
    const colors = {
        info: { bg: "rgba(0,196,160,.1)", border: "rgba(0,196,160,.3)", color: "var(--teal)" },
        warning: { bg: "rgba(245,166,35,.1)", border: "rgba(245,166,35,.3)", color: "var(--amber)" },
        error: { bg: "rgba(232,64,64,.1)", border: "rgba(232,64,64,.3)", color: "var(--red)" },
        success: { bg: "rgba(52,201,123,.1)", border: "rgba(52,201,123,.3)", color: "var(--green)" },
    };

    const c = colors[type];

    return (
        <div
            style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: c.bg,
                border: `1px solid ${c.border}`,
                color: c.color,
                fontSize: 13,
            }}
        >
            {children}
        </div>
    );
}