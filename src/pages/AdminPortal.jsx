import { useState } from "react";
import Shell from "../layout/Shell";
import StatCard from "../components/StatCard";
import Alert from "../components/Alert";
import ProgressBar from "../components/ProgressBar";

import { USERS, COURSES } from "../data/mockData";
import { TLF_QUESTIONS } from "../data/questions";
import { SAMPLE_ANALYTICS } from "../data/analytics";
import { btn, badge, card, inputStyle } from "../utils/uiHelpers";

export default function AdminPortal({ user, onLogout }) {
    const [active, setActive] = useState("dashboard");

    const [coMapping, setCoMapping] = useState({
        0: "CO1",
        1: "CO1",
        2: "CO2",
        3: "CO2",
        4: "CO3",
        5: "CO3",
        6: "CO4",
        7: "CO4",
        8: "CO5",
        9: "CO5",
        10: "CO1",
        11: "CO3",
    });

    const [formOpen, setFormOpen] = useState({ tlf: true, coa: true, cga: false });

    const navItems = [
        { id: "dashboard", icon: "◉", label: "Dashboard" },
        { id: "forms", icon: "📋", label: "Form Config" },
        { id: "mapping", icon: "🔗", label: "CO Mapping" },
        { id: "monitor", icon: "📡", label: "Monitor" },
        { id: "users", icon: "👥", label: "Users" },
        { id: "reports", icon: "📄", label: "Reports" },
    ];

    const data = SAMPLE_ANALYTICS;

    const Dashboard = () => (
        <div className="fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginBottom: "0.25rem" }}>Admin Dashboard</h2>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: "2rem" }}>Institution-wide overview · OUTR Bhubaneswar</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: "2rem" }}>
                <StatCard label="Total Students" value="148" color="var(--teal)" />
                <StatCard label="Active Forms" value="2" color="var(--amber)" />
                <StatCard label="Responses Today" value="23" color="var(--green)" />
                <StatCard label="Low CO Alerts" value="1" color="var(--red)" />
            </div>

            <Alert type="error">🚨 CO4 attainment has dropped to 46% in CS601 — below threshold. Faculty notified.</Alert>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: "1.5rem" }}>
                <div style={card()}>
                    <div style={{ fontWeight: 500, marginBottom: "1rem" }}>Completion rates by course</div>

                    {COURSES.map((c) => (
                        <div key={c.id} style={{ marginBottom: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                                <span>{c.id}</span>
                                <span style={{ fontWeight: 500 }}>{data.completion[c.id]}%</span>
                            </div>

                            <ProgressBar value={data.completion[c.id]} max={100} color={data.completion[c.id] > 80 ? "var(--green)" : "var(--amber)"} />
                        </div>
                    ))}
                </div>

                <div style={card()}>
                    <div style={{ fontWeight: 500, marginBottom: "1rem" }}>CO attainment heatmap</div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {data.coa.coData.map((co) => (
                            <div
                                key={co.co}
                                style={{
                                    padding: "0.75rem",
                                    borderRadius: "var(--radius-sm)",
                                    background:
                                        co.level === "High"
                                            ? "rgba(52,201,123,.1)"
                                            : co.level === "Low"
                                                ? "rgba(232,64,64,.1)"
                                                : "rgba(245,166,35,.1)",
                                    border: `1px solid ${co.level === "High"
                                            ? "rgba(52,201,123,.3)"
                                            : co.level === "Low"
                                                ? "rgba(232,64,64,.3)"
                                                : "rgba(245,166,35,.3)"
                                        }`,
                                }}
                            >
                                <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)", color: co.level === "High" ? "var(--green)" : co.level === "Low" ? "var(--red)" : "var(--amber)" }}>
                                    {co.pct}%
                                </div>
                                <div style={{ fontSize: 13, fontWeight: 500 }}>{co.co}</div>
                                <span style={badge(co.level)}>{co.level}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const FormConfig = () => (
        <div className="fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: "1.5rem" }}>Form Configuration</h2>

            {[
                { key: "tlf", name: "Teaching-Learning Feedback", qs: 12, scale: "1–5" },
                { key: "coa", name: "CO Attainment Satisfaction", qs: 5, scale: "1–3" },
                { key: "cga", name: "Curricular Gap Analysis", qs: 12, scale: "1–5" },
            ].map((f) => (
                <div key={f.key} style={{ ...card(), marginBottom: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 15 }}>{f.name}</div>
                            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>
                                {f.qs} questions · Scale {f.scale}
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 13, color: formOpen[f.key] ? "var(--green)" : "var(--muted)" }}>
                                {formOpen[f.key] ? "● Open" : "○ Closed"}
                            </span>

                            <button onClick={() => setFormOpen((p) => ({ ...p, [f.key]: !p[f.key] }))} style={{ ...btn(formOpen[f.key] ? "danger" : "primary"), padding: "6px 14px", fontSize: 13 }}>
                                {formOpen[f.key] ? "Close Form" : "Open Form"}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div>
                            <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 4 }}>Open Date</label>
                            <input type="date" defaultValue="2025-06-01" style={{ ...inputStyle(), fontSize: 13 }} />
                        </div>

                        <div>
                            <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 4 }}>Close Date</label>
                            <input type="date" defaultValue="2025-06-30" style={{ ...inputStyle(), fontSize: 13 }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const COMapping = () => (
        <div className="fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: "0.5rem" }}>CO Mapping</h2>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: "1.5rem" }}>
                Map each TLF question to a Course Outcome. This drives CO attainment calculation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {TLF_QUESTIONS.map((q, i) => (
                    <div key={i} style={{ ...card({ padding: "0.9rem" }), display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ color: "var(--muted)", fontSize: 13, minWidth: 20 }}>Q{i + 1}</span>
                        <div style={{ flex: 1, fontSize: 13 }}>{q}</div>

                        <select
                            value={coMapping[i] || "CO1"}
                            onChange={(e) => setCoMapping((p) => ({ ...p, [i]: e.target.value }))}
                            style={{ ...inputStyle(), width: 90, padding: "6px 10px", fontSize: 13 }}
                        >
                            {["CO1", "CO2", "CO3", "CO4", "CO5"].map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            <button style={{ ...btn("primary"), marginTop: "1rem", padding: "11px 24px" }}>Save Mapping</button>
        </div>
    );

    const Monitor = () => (
        <div className="fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: "1.5rem" }}>Live Monitoring</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {COURSES.map((c) => (
                    <div key={c.id} style={card()}>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>{c.name}</div>
                        <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: "1rem" }}>{c.id}</div>

                        {["TLF", "COA", "CGA"].map((type, j) => {
                            const pct = [data.completion[c.id], data.completion[c.id] - 10, data.completion[c.id] - 5][j];

                            return (
                                <div key={type} style={{ marginBottom: 10 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                                        <span style={{ color: "var(--muted)" }}>{type}</span>
                                        <span style={{ fontWeight: 500 }}>{pct}% ({Math.round(pct * 0.42)}/42)</span>
                                    </div>

                                    <ProgressBar value={pct} max={100} color={pct > 80 ? "var(--green)" : pct > 60 ? "var(--amber)" : "var(--red)"} />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div style={{ ...card(), marginTop: "1rem" }}>
                <div style={{ fontWeight: 500, marginBottom: "1rem" }}>Alert log</div>

                {[
                    { time: "Today 09:14", msg: "CO4 in CS601 fell below 50% threshold", type: "error" },
                    { time: "Today 08:30", msg: "CS603 TLF completion reached 95%", type: "success" },
                    { time: "Yesterday", msg: "CGA form closed — 42 responses collected", type: "info" },
                ].map((a, i) => (
                    <div key={i} style={{ marginBottom: 8 }}>
                        <Alert type={a.type}>
                            <span style={{ opacity: 0.7, marginRight: 8 }}>{a.time}</span>
                            {a.msg}
                        </Alert>
                    </div>
                ))}
            </div>
        </div>
    );

    const UsersView = () => (
        <div className="fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: "1.5rem" }}>User Management</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {USERS.map((u) => (
                    <div key={u.id} style={{ ...card(), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    background: "var(--teal-faint)",
                                    border: "1px solid rgba(0,196,160,.3)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 14,
                                    color: "var(--teal)",
                                    fontWeight: 600,
                                }}
                            >
                                {u.name.charAt(0)}
                            </div>

                            <div>
                                <div style={{ fontWeight: 500 }}>{u.name}</div>
                                <div style={{ color: "var(--muted)", fontSize: 13 }}>{u.email}</div>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span
                                style={{
                                    padding: "3px 10px",
                                    borderRadius: 99,
                                    fontSize: 12,
                                    fontWeight: 500,
                                    background: u.role === "admin" ? "rgba(232,64,64,.1)" : u.role === "faculty" ? "rgba(245,166,35,.1)" : "var(--teal-faint)",
                                    color: u.role === "admin" ? "var(--red)" : u.role === "faculty" ? "var(--amber)" : "var(--teal)",
                                }}
                            >
                                {u.role}
                            </span>

                            <button style={{ ...btn("ghost"), padding: "5px 12px", fontSize: 12 }}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>

            <button style={{ ...btn("primary"), marginTop: "1rem" }}>+ Add User</button>
        </div>
    );

    const AdminReports = () => (
        <div className="fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: "1.5rem" }}>Generate Reports</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.5rem" }}>
                {[
                    { name: "Institution Summary", desc: "All courses — consolidated CO attainment", type: "PDF" },
                    { name: "TLF Report — All", desc: "Teaching feedback across all courses", type: "Excel" },
                    { name: "CO Mapping Report", desc: "Question-to-CO mapping reference", type: "PDF" },
                    { name: "Gap Analysis", desc: "Curricular gaps ranked by severity", type: "Excel" },
                ].map((r, i) => (
                    <div key={i} style={card()}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                            <div style={{ fontWeight: 500, fontSize: 15 }}>{r.name}</div>
                            <span style={{ padding: "2px 8px", borderRadius: 4, background: "var(--teal-faint)", color: "var(--teal)", fontSize: 11, fontWeight: 600 }}>
                                {r.type}
                            </span>
                        </div>

                        <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: "0.75rem" }}>{r.desc}</div>

                        <button style={{ ...btn("primary"), width: "100%", padding: "8px" }}>↓ Generate & Download</button>
                    </div>
                ))}
            </div>

            <div style={card()}>
                <div style={{ fontWeight: 500, marginBottom: "1rem" }}>Sample CO attainment output</div>

                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                {["CO", "Avg Score (1–3)", "Attainment %", "Level", "Action"].map((h) => (
                                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "var(--muted)", fontWeight: 500 }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.coa.coData.map((co) => (
                                <tr key={co.co} style={{ borderBottom: "1px solid var(--border)" }}>
                                    <td style={{ padding: "10px 12px", fontWeight: 600 }}>{co.co}</td>
                                    <td style={{ padding: "10px 12px", color: "var(--muted)" }}>{co.avg}</td>

                                    <td style={{ padding: "10px 12px", fontWeight: 600, color: co.level === "High" ? "var(--green)" : co.level === "Low" ? "var(--red)" : "var(--amber)" }}>
                                        {co.pct}%
                                    </td>

                                    <td style={{ padding: "10px 12px" }}>
                                        <span style={badge(co.level)}>{co.level}</span>
                                    </td>

                                    <td style={{ padding: "10px 12px", color: "var(--muted)", fontSize: 12 }}>
                                        {co.level === "Low" ? "Immediate intervention needed" : co.level === "Medium" ? "Monitor closely" : "Maintain"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const viewMap = {
        dashboard: <Dashboard />,
        forms: <FormConfig />,
        mapping: <COMapping />,
        monitor: <Monitor />,
        users: <UsersView />,
        reports: <AdminReports />,
    };

    return (
        <Shell user={user} onLogout={onLogout} navItems={navItems} active={active} setActive={setActive}>
            {viewMap[active]}
        </Shell>
    );
}