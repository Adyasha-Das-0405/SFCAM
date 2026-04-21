import { useState } from "react";

export default function StarRating({ value, onChange, max = 5 }) {
    const [hover, setHover] = useState(0);

    return (
        <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
                <button
                    key={n}
                    style={{
                        background: "none",
                        border: "none",
                        fontSize: 22,
                        cursor: "pointer",
                        color: (hover || value) >= n ? "var(--amber)" : "var(--border)",
                        transition: "color .15s",
                        lineHeight: 1,
                    }}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => onChange(n)}
                >
                    {n <= (hover || value) ? "★" : "☆"}
                </button>
            ))}

            {value > 0 && (
                <span style={{ fontSize: 13, color: "var(--muted)", alignSelf: "center", marginLeft: 4 }}>
                    {value}/{max}
                </span>
            )}
        </div>
    );
}