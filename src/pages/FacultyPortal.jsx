import { useState } from "react";
import Shell from "../layout/Shell";
import StatCard from "../components/StatCard";
import Alert from "../components/Alert";
import ProgressBar from "../components/ProgressBar";

import { COURSES } from "../data/mockData";
import { TLF_QUESTIONS, CGA_QUESTIONS } from "../data/questions";
import { SAMPLE_ANALYTICS } from "../data/analytics";
import { badge, card } from "../utils/uiHelpers";

export default function FacultyPortal({ user, onLogout }) {
    const [active, setActive] = useState("dashboard");
    const [selCourse, setSelCourse] = useState(COURSES[0].id);

    const navItems = [
        { id: "dashboard", icon: "◉", label: "Dashboard" },
        { id: "tlf", icon: "📋", label: "TLF Analysis" },
        { id: "coa", icon: "🎯", label: "CO Attainment" },
        { id: "cga", icon: "📊", label: "Gap Analysis" },
        { id: "reports", icon: "📄", label: "Reports" },
    ];

    const data = SAMPLE_ANALYTICS;

    const CourseSelector = () => (
        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {COURSES.map((c) => (
                <button
                    key={c.id}
                    onClick={() => setSelCourse(c.id)}
                    style={{
                        padding: "7px 16px",
                        borderRadius: 99,
                        border: "none",
                        cursor: "pointer",
                        fontSize: 13,
                        background: selCourse === c.id ? "var(--teal)" : "var(--navy3)",
                        color: selCourse === c.id ? "var(--navy)" : "var(--muted)",
                    }}
                >
                    {c.id} – {c.name}
                </button>
            ))}
        </div>
    );

    const BarChart = ({ items, maxVal, color = "var(--teal)", formatLabel = (v) => v }) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((item, i) => (
                <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                        <span style={{ color: "var(--muted)" }}>{item.label}</span>
                        <span style={{ color: "var(--white)", fontWeight: 500 }}>{formatLabel(item.value)}</span>
                    </div>
                    <ProgressBar value={item.value} max={maxVal} color={color} />
                </div>
            ))}
        </div>
    );

    const Dashboard = () => (
        <div className="fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginBottom: "0.25rem" }}>Faculty Dashboard</h2>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: "2rem" }}>
                {user.dept} · {user.name}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: "2rem" }}>
                <StatCard label="Avg TLF Score" value="4.1/5" color="var(--teal)" />
                <StatCard label="CO Attainment" value="63%" color="var(--amber)" />
                <StatCard label="Responses" value="42" color="var(--teal)" />
                <StatCard label="Courses" value={COURSES.length} color="var(--green)" />
            </div>

            <Alert type="warning">⚠ CO4 attainment is 46% — below the 50% threshold. Immediate intervention recommended.</Alert>

            <div style={{ ...card(), marginTop: "1.5rem" }}>
                <div style={{ fontWeight: 500, marginBottom: "1rem" }}>Submission completion rates</div>

                <BarChart
                    items={COURSES.map((c) => ({ label: `${c.id} – ${c.name}`, value: data.completion[c.id] }))}
                    maxVal={100}
                    formatLabel={(v) => `${v}%`}
                />
            </div>

            <div style={{ ...card(), marginTop: "1rem" }}>
                <div style={{ fontWeight: 500, marginBottom: "1rem" }}>CO attainment overview</div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                    {data.coa.coData.map((co) => (
                        <div
                            key={co.co}
                            style={{
                                ...card({ padding: "0.75rem" }),
                                textAlign: "center",
                                border: `1px solid ${co.level === "High"
                                        ? "rgba(52,201,123,.3)"
                                        : co.level === "Low"
                                            ? "rgba(232,64,64,.3)"
                                            : "rgba(245,166,35,.3)"
                                    }`,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    fontFamily: "var(--font-display)",
                                    color: co.level === "High" ? "var(--green)" : co.level === "Low" ? "var(--red)" : "var(--amber)",
                                }}
                            >
                                {co.pct}%
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{co.co}</div>
                            <span style={badge(co.level)}>{co.level}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const TLFView = () => (
        <div className="fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: "1rem" }}>Teaching-Learning Feedback</h2>
            <CourseSelector />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: "1.5rem" }}>
                <StatCard label="Average Score" value={`${data.tlf.avgScore}/5`} color="var(--teal)" />
                <StatCard label="Highest" value={data.tlf.highest} color="var(--green)" />
                <StatCard label="Lowest" value={data.tlf.lowest} color="var(--amber)" />
            </div>

            <div style={card()}>
                <div style={{ fontWeight: 500, marginBottom: "1rem" }}>Question-wise scores (avg out of 5)</div>

                <BarChart
                    items={TLF_QUESTIONS.map((q, i) => ({
                        label: q.length > 55 ? q.slice(0, 55) + "…" : q,
                        value: data.tlf.questionAvgs[i],
                    }))}
                    maxVal={5}
                    formatLabel={(v) => v.toFixed(1)}
                />
            </div>

            <div style={{ ...card(), marginTop: "1rem" }}>
                <div style={{ fontWeight: 500, marginBottom: 8 }}>Avg feedback percentage</div>
                <div style={{ fontSize: 36, fontFamily: "var(--font-display)", color: "var(--teal)" }}>
                    {((data.tlf.avgScore / 5) * 100).toFixed(1)}%
                </div>
                <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>Formula: (Mean Score ÷ 5) × 100</div>
            </div>
        </div>
    );

    const COAView = () => (
        <div className="fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: "1rem" }}>CO Attainment Analysis</h2>
            <CourseSelector />

            <div style={card({ marginBottom: "1rem" })}>
                <div style={{ fontWeight: 500, marginBottom: "1rem" }}>CO attainment levels</div>

                {data.coa.coData.map((co) => (
                    <div key={co.co} style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ fontWeight: 600, fontSize: 14 }}>{co.co}</span>
                                <span style={{ color: "var(--muted)", fontSize: 13 }}>avg {co.avg}/3</span>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 14, fontWeight: 600 }}>{co.pct}%</span>
                                <span style={badge(co.level)}>{co.level}</span>
                            </div>
                        </div>

                        <ProgressBar
                            value={co.pct}
                            max={100}
                            color={co.level === "High" ? "var(--green)" : co.level === "Low" ? "var(--red)" : "var(--amber)"}
                            height={10}
                        />
                    </div>
                ))}
            </div>

            <div style={card()}>
                <div style={{ fontWeight: 500, marginBottom: 8 }}>Computation method</div>

                {[
                    "CO Column Total = Σ(all student scores for that CO)",
                    "CO Average = Column Total ÷ Number of students",
                    "CO Attainment % = (CO Average ÷ 3) × 100",
                    "Weighted score = TLF(0.4) + COA(0.4) + CGA(0.2)",
                ].map((f, i) => (
                    <div
                        key={i}
                        style={{
                            padding: "8px 12px",
                            borderRadius: "var(--radius-sm)",
                            background: "var(--navy3)",
                            fontSize: 13,
                            color: "var(--muted)",
                            marginBottom: 8,
                        }}
                    >
                        {f}
                    </div>
                ))}
            </div>
        </div>
    );

    const CGAView = () => (
        <div className="fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: "1rem" }}>Curricular Gap Analysis</h2>
            <CourseSelector />

            <StatCard label="Overall CGA Score" value={`${data.cga.avgScore}/5`} color="var(--teal)" />

            <div style={{ ...card(), marginTop: "1rem" }}>
                <div style={{ fontWeight: 500, marginBottom: "1rem" }}>Key parameters</div>

                <BarChart
                    items={data.cga.paramAvgs.map((p) => ({ label: p.label, value: p.avg }))}
                    maxVal={5}
                    formatLabel={(v) => v.toFixed(1)}
                />
            </div>

            <div style={{ ...card(), marginTop: "1rem" }}>
                <div style={{ fontWeight: 500, marginBottom: "1rem" }}>Question-wise scores</div>

                <BarChart
                    items={CGA_QUESTIONS.map((q, i) => ({
                        label: q.length > 55 ? q.slice(0, 55) + "…" : q,
                        value: 3.2 + Math.sin(i) * 0.5,
                    }))}
                    maxVal={5}
                    formatLabel={(v) => v.toFixed(1)}
                />
            </div>
        </div>
    );

    const Reports = () => (
        <div className="fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: "1.5rem" }}>Reports</h2>
            <CourseSelector />

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                    { name: "TLF Full Report", desc: "Teaching-Learning Feedback with per-question breakdown", type: "PDF" },
                    { name: "CO Attainment Report", desc: "CO-wise attainment levels with weighted calculation", type: "Excel" },
                    { name: "Gap Analysis Report", desc: "Curricular gap scores and recommendations", type: "PDF" },
                    { name: "Consolidated Report", desc: "All three feedback types combined summary", type: "PDF" },
                ].map((r, i) => (
                    <div key={i} style={{ ...card(), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>{r.name}</div>
                            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>{r.desc}</div>
                        </div>

                        <div style={{ display: "flex", gap: 8 }}>
                            <span style={{ padding: "3px 8px", borderRadius: 4, background: "var(--teal-faint)", color: "var(--teal)", fontSize: 11, fontWeight: 600 }}>
                                {r.type}
                            </span>

                            <button style={{ padding: "7px 14px", fontSize: 13, background: "var(--teal)", border: "none", borderRadius: 8, fontWeight: 600 }}>
                                ↓ Download
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const viewMap = {
        dashboard: <Dashboard />,
        tlf: <TLFView />,
        coa: <COAView />,
        cga: <CGAView />,
        reports: <Reports />,
    };

    return (
        <Shell user={user} onLogout={onLogout} navItems={navItems} active={active} setActive={setActive}>
            {viewMap[active]}
        </Shell>
    );
}