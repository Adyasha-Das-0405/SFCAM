export default function ProgressBar({ value, max = 100, color = "var(--teal)", height = 8 }) {
    const pct = Math.round((value / max) * 100);

    return (
        <div style={{ background: "var(--navy3)", borderRadius: 99, height, overflow: "hidden" }}>
            <div
                style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: color,
                    borderRadius: 99,
                    transition: "width .6s ease",
                }}
            />
        </div>
    );
}