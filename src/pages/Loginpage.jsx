import { useState } from "react";
import { USERS } from "../data/mockData";
import Alert from "../components/Alert";
import { btn, inputStyle } from "../utils/uiHelpers";

export default function LoginPage({ onLogin }) {
    const [role, setRole] = useState("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const roles = [
        { id: "student", label: "Student", icon: "🎓", hint: "student@outr.ac.in / student123" },
        { id: "faculty", label: "Faculty", icon: "👨‍🏫", hint: "faculty@outr.ac.in / faculty123" },
        { id: "admin", label: "Administrator", icon: "⚙️", hint: "admin@outr.ac.in / admin123" },
    ];

    const handleLogin = async () => {
        setError("");
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));

        const user = USERS.find((u) => u.email === email && u.password === password && u.role === role);

        if (user) onLogin(user);
        else setError("Invalid credentials. Please check email, password and role.");
        setLoading(false);
    };

    const fillDemo = () => {
        const r = roles.find((r) => r.id === role);
        const [em, pw] = r.hint.split(" / ");
        setEmail(em);
        setPassword(pw);
    };

    return (
        <div style={{ 
            minHeight: "100vh", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            position: "relative", 
            overflow: "hidden",
            padding: "1rem" 
        }}>
            {/* Background Decorative Elements - Centered */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{
                    position: "absolute",
                    width: 800,
                    height: 800,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0,196,160,.08) 0%, transparent 70%)",
                }} />
            </div>

            {/* Login Card */}
            <div style={{
                width: "min(440px, 100%)",
                zIndex: 1,
                background: "rgba(22,34,54,.95)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "2.5rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)"
            }}>
                {/* Brand Header */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "2rem" }}>
                    <div style={{ width: 50, height: 50, borderRadius: 12, background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>
                        ⦿
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", letterSpacing: 2, textTransform: "uppercase" }}>
                        OUTR · Bhubaneswar
                    </div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, marginTop: 8, marginBottom: 4 }}>Welcome back</h2>
                    <p style={{ color: "var(--muted)", fontSize: 14 }}>Sign in to your portal</p>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                        Select Role
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                        {roles.map((r) => (
                            <button
                                key={r.id}
                                onClick={() => {
                                    setRole(r.id);
                                    setError("");
                                    setEmail("");
                                    setPassword("");
                                }}
                                style={{
                                    padding: "12px 6px",
                                    borderRadius: "var(--radius-sm)",
                                    border: "1px solid",
                                    borderColor: role === r.id ? "var(--teal)" : "transparent",
                                    cursor: "pointer",
                                    textAlign: "center",
                                    fontSize: 11,
                                    fontWeight: 600,
                                    background: role === r.id ? "rgba(0,196,160,0.15)" : "var(--navy3)",
                                    color: role === r.id ? "var(--teal)" : "var(--muted)",
                                    transition: "all 0.2s"
                                }}
                            >
                                <div style={{ fontSize: 20, marginBottom: 4 }}>{r.icon}</div>
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Email Address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@outr.ac.in" type="email" style={inputStyle()} />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        type="password"
                        style={inputStyle()}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                </div>

                {error && (
                    <div style={{ marginBottom: "1rem" }}>
                        <Alert type="error">{error}</Alert>
                    </div>
                )}

                <button onClick={handleLogin} disabled={loading} style={{ ...btn("primary"), width: "100%", padding: "14px", fontSize: 15, fontWeight: 600, opacity: loading ? 0.7 : 1 }}>
                    {loading ? "Verifying..." : "Sign in →"}
                </button>

                <button onClick={fillDemo} style={{ ...btn("ghost"), width: "100%", marginTop: 12, fontSize: 13, border: "1px dashed var(--border)" }}>
                    Use Demo Account
                </button>

                <div style={{ textAlign: "center", fontSize: 11, color: "var(--muted)", marginTop: "2.5rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
                    OUTR · Product Development I · 2025–2026
                </div>
            </div>
        </div>
    );
}