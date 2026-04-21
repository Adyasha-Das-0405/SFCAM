import { useState } from "react";

import GlobalStyle from "./styles/GlobalStyle";

import LoginPage from "./pages/Loginpage";
import StudentPortal from "./pages/StudentPortal";
import FacultyPortal from "./pages/FacultyPortal";
import AdminPortal from "./pages/AdminPortal";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => setUser(null);

  return (
    <>
      <GlobalStyle />

      {!user && <LoginPage onLogin={handleLogin} />}

      {user?.role === "student" && <StudentPortal user={user} onLogout={handleLogout} />}
      {user?.role === "faculty" && <FacultyPortal user={user} onLogout={handleLogout} />}
      {user?.role === "admin" && <AdminPortal user={user} onLogout={handleLogout} />}
    </>
  );
}