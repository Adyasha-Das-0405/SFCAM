import { card } from "../utils/uiHelpers";

export default function StatCard({ label, value, sub, color = "var(--teal)" }) {
    return (
        <div style={{ ...card(), textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 600, color, fontFamily: "var(--font-display)" }}>
                {value}
            </div>
            <div style={{ fontSize: 13, color: "var(--white)", fontWeight: 500, marginTop: 4 }}>
                {label}
            </div>
            {sub && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{sub}</div>}
        </div>
    );
}