export const btn = (variant = "primary") => ({
    padding: "10px 22px",
    borderRadius: "var(--radius-sm)",
    border: "none",
    fontWeight: 500,
    fontSize: 14,
    cursor: "pointer",
    transition: "all .2s",
    ...(variant === "primary"
        ? { background: "var(--teal)", color: "var(--navy)" }
        : variant === "ghost"
            ? { background: "transparent", color: "var(--muted)", border: "1px solid var(--border)" }
            : variant === "danger"
                ? { background: "rgba(232,64,64,.15)", color: "var(--red)", border: "1px solid rgba(232,64,64,.3)" }
                : variant === "amber"
                    ? { background: "rgba(245,166,35,.15)", color: "var(--amber)", border: "1px solid rgba(245,166,35,.3)" }
                    : {}),
});

export const card = (extra = {}) => ({
    background: "var(--navy2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "1.5rem",
    ...extra,
});

export const inputStyle = () => ({
    width: "100%",
    padding: "10px 14px",
    borderRadius: "var(--radius-sm)",
    background: "var(--navy3)",
    border: "1px solid var(--border)",
    color: "var(--white)",
    fontSize: 14,
    outline: "none",
    transition: "border-color .2s",
});

export const badge = (level) => {
    const map = {
        High: { bg: "rgba(52,201,123,.15)", color: "var(--green)" },
        Medium: { bg: "rgba(245,166,35,.15)", color: "var(--amber)" },
        Low: { bg: "rgba(232,64,64,.15)", color: "var(--red)" },
    };

    const s = map[level] || map.Medium;

    return {
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 500,
        background: s.bg,
        color: s.color,
    };
};

export const subjectTag = (colorVar = "--teal") => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    background: `rgba(var(${colorVar}-rgb, 0, 196, 160), 0.12)`, // Fallback to teal if rgb var missing
    color: `var(${colorVar})`,
    border: `1px solid rgba(var(${colorVar}-rgb, 0, 196, 160), 0.3)`,
    whiteSpace: "nowrap"
});

export const subjectHeader = () => ({
    fontSize: "18px",
    fontWeight: "700",
    color: "var(--white)",
    borderLeft: "4px solid var(--teal)",
    paddingLeft: "12px",
    marginBottom: "1rem",
    fontFamily: "var(--font-display)"
});

export const subjectLabel = () => ({
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--teal)",
    background: "rgba(0, 196, 160, 0.1)", // Subtle teal background
    border: "1px solid rgba(0, 196, 160, 0.2)", // Subtle border
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
});