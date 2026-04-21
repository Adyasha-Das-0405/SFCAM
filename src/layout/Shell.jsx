import SidebarLink from "../components/SidebarLink.jsx";

export default function Shell({ user, onLogout, children, navItems, active, setActive }) {
    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <div
                style={{
                    width: 220,
                    background: "var(--navy2)",
                    borderRight: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: 0,
                }}
            >
                <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: "var(--teal)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 16,
                            }}
                        >
                            ⦿
                        </div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white)" }}>SFCAM·CO</div>
                            <div style={{ fontSize: 10, color: "var(--muted)" }}>OUTR Bhubaneswar</div>
                        </div>
                    </div>
                </div>

                <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                            {user.name.charAt(0)}
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <div
                                style={{
                                    fontSize: 13,
                                    fontWeight: 500,
                                    color: "var(--white)",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {user.name}
                            </div>
                            <div style={{ fontSize: 11, color: "var(--teal)", textTransform: "capitalize" }}>
                                {user.role}
                            </div>
                        </div>
                    </div>
                </div>

                <nav
                    style={{
                        flex: 1,
                        padding: "0.75rem 0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        overflow: "auto",
                    }}
                >
                    {navItems.map((item) => (
                        <SidebarLink
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={active === item.id}
                            onClick={() => setActive(item.id)}
                        />
                    ))}
                </nav>

                <div style={{ padding: "0.75rem 0.5rem", borderTop: "1px solid var(--border)" }}>
                    <SidebarLink icon="→" label="Sign out" active={false} onClick={onLogout} />
                </div>
            </div>

            <div style={{ flex: 1, overflow: "auto", background: "var(--navy)" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>{children}</div>
            </div>
        </div>
    );
}