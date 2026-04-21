import { useState } from "react";
import Shell from "../layout/Shell";
import StatCard from "../components/StatCard";
import Alert from "../components/Alert";
import ProgressBar from "../components/ProgressBar";
import StarRating from "../components/StarRating";

import { COURSES } from "../data/mockData";
import { TLF_QUESTIONS, COA_QUESTIONS, CGA_QUESTIONS } from "../data/questions";
import { btn, card } from "../utils/uiHelpers";

export default function StudentPortal({ user, onLogout }) {
  const [active, setActive] = useState("dashboard");
  const [submissions, setSubmissions] = useState({});
  const [activeForm, setActiveForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const navItems = [
    { id: "dashboard", icon: "◉", label: "Dashboard" },
    { id: "tlf", icon: "📋", label: "TLF Feedback" },
    { id: "coa", icon: "🎯", label: "CO Attainment" },
    { id: "cga", icon: "📊", label: "Gap Analysis" },
    { id: "history", icon: "📁", label: "My Submissions" },
  ];

  const formKey = (type, courseId) => `${type}_${courseId}`;
  const isSubmitted = (type, courseId) => !!submissions[formKey(type, courseId)];

  const startForm = (type, course) => {
    setActiveForm({ type, course });
    setFormData({});
    setActive(type);
  };

  const handleSubmit = async () => {
    const questions =
      activeForm.type === "tlf"
        ? TLF_QUESTIONS
        : activeForm.type === "coa"
        ? COA_QUESTIONS.map((q) => q.text)
        : CGA_QUESTIONS;

    if (Object.keys(formData).length < questions.length) {
      showToast("Please answer all questions before submitting.", "error");
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));

    setSubmissions((prev) => ({
      ...prev,
      [formKey(activeForm.type, activeForm.course.id)]: {
        data: formData,
        at: new Date().toLocaleString(),
      },
    }));

    showToast("Feedback submitted successfully!");
    setActiveForm(null);
    setFormData({});
    setActive("dashboard");
    setSubmitting(false);
  };

  const Dashboard = () => (
    <div className="fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>
          Good morning, {user.name.split(" ")[0]} 👋
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>
          {user.regNo} · {user.branch} · Semester {user.semester}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: "2rem" }}>
        <StatCard
          label="Pending Forms"
          value={COURSES.length * 3 - Object.keys(submissions).length}
          color="var(--amber)"
        />
        <StatCard label="Completed" value={Object.keys(submissions).length} color="var(--green)" />
        <StatCard label="Enrolled Courses" value={COURSES.length} color="var(--teal)" />
      </div>

      <h3 style={{ fontWeight: 500, marginBottom: "1rem", color: "var(--muted)", fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>
        Your Courses
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {COURSES.map((course) => (
          <div key={course.id} style={card()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{course.name}</div>
                <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>
                  {course.id} · {course.faculty}
                </div>
              </div>

              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 99,
                  background: "var(--teal-faint)",
                  color: "var(--teal)",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                Active
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { type: "tlf", label: "Teaching-Learning", icon: "📋" },
                { type: "coa", label: "CO Attainment", icon: "🎯" },
                { type: "cga", label: "Gap Analysis", icon: "📊" },
              ].map(({ type, label, icon }) => {
                const done = isSubmitted(type, course.id);

                return (
                  <button
                    key={type}
                    onClick={() => !done && startForm(type, course)}
                    style={{
                      ...card({ padding: "0.75rem" }),
                      border: `1px solid ${done ? "var(--green)" : "var(--border)"}`,
                      cursor: done ? "default" : "pointer",
                      textAlign: "left",
                      background: done ? "rgba(52,201,123,.05)" : "var(--navy3)",
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: done ? "var(--green)" : "var(--white)" }}>
                      {label}
                    </div>
                    <div style={{ fontSize: 11, color: done ? "var(--green)" : "var(--muted)", marginTop: 2 }}>
                      {done ? "✓ Submitted" : "Tap to fill →"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FeedbackForm = ({ type }) => {
    if (!activeForm || activeForm.type !== type) {
      return (
        <div className="fade-in">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 4 }}>
            {type === "tlf"
              ? "Teaching-Learning Feedback"
              : type === "coa"
              ? "CO Attainment Satisfaction"
              : "Curricular Gap Analysis"}
          </h2>

          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: "1.5rem" }}>
            Select a course to provide feedback
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {COURSES.map((c) => {
              const done = isSubmitted(type, c.id);

              return (
                <button
                  key={c.id}
                  onClick={() => !done && startForm(type, c)}
                  style={{
                    ...card(),
                    textAlign: "left",
                    cursor: done ? "default" : "pointer",
                    border: `1px solid ${done ? "var(--green)" : "var(--border)"}`,
                    background: done ? "rgba(52,201,123,.05)" : "var(--navy2)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{c.name}</div>
                      <div style={{ color: "var(--muted)", fontSize: 13 }}>{c.id}</div>
                    </div>

                    {done ? (
                      <span style={{ color: "var(--green)", fontSize: 13 }}>✓ Submitted</span>
                    ) : (
                      <span style={{ color: "var(--teal)", fontSize: 13 }}>Fill now →</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    const questions =
      type === "tlf"
        ? TLF_QUESTIONS
        : type === "coa"
        ? COA_QUESTIONS.map((q) => q.text)
        : CGA_QUESTIONS;

    const maxScore = type === "coa" ? 3 : 5;
    const answered = Object.keys(formData).length;

    return (
      <div className="fade-in">
        <div style={{ marginBottom: "1.5rem" }}>
          <button onClick={() => { setActiveForm(null); setFormData({}); }} style={{ ...btn("ghost"), fontSize: 13, padding: "6px 12px", marginBottom: 12 }}>
            ← Back
          </button>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>
            {type === "tlf" ? "Teaching-Learning Feedback" : type === "coa" ? "CO Attainment" : "Gap Analysis"}
          </h2>

          <div style={{ color: "var(--white)", fontSize: 14, marginTop: 4 }}>
            {activeForm.course.name} · {activeForm.course.id}
          </div>

          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <ProgressBar value={answered} max={questions.length} />
            <span style={{ fontSize: 13, color: "var(--muted)", whiteSpace: "nowrap" }}>
              {answered}/{questions.length}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: "2rem" }}>
          {questions.map((q, i) => {
            const coLabel = type === "coa" ? COA_QUESTIONS[i].co : null;

            return (
              <div key={i} style={card()}>
                <div style={{ display: "flex", gap: 12, marginBottom: "0.75rem" }}>
                  {coLabel && (
                    <span style={{ padding: "2px 8px", borderRadius: 4, background: "var(--teal-faint)", color: "var(--teal)", fontSize: 11, fontWeight: 600 }}>
                      {coLabel}
                    </span>
                  )}

                  <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                    <span style={{ color: "var(--muted)", marginRight: 6 }}>{i + 1}.</span>
                    {q}
                  </div>
                </div>

                <StarRating value={formData[i] || 0} onChange={(v) => setFormData((p) => ({ ...p, [i]: v }))} max={maxScore} />

                {!formData[i] && (
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>
                    {maxScore === 5
                      ? "Rate 1 (Very Poor) to 5 (Excellent)"
                      : "Rate 1 (Not Satisfactory) to 3 (Very Satisfactory)"}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={handleSubmit} disabled={submitting} style={{ ...btn("primary"), padding: "13px 28px", fontSize: 15 }}>
          {submitting ? "Submitting…" : `Submit ${type.toUpperCase()} Feedback →`}
        </button>
      </div>
    );
  };

  const History = () => (
    <div className="fade-in">
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: "1.5rem" }}>My Submissions</h2>

      {Object.keys(submissions).length === 0 ? (
        <Alert type="info">No submissions yet. Fill out your feedback forms from the dashboard.</Alert>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.entries(submissions).map(([key, val]) => {
            const [type, courseId] = key.split("_");
            const course = COURSES.find((c) => c.id === courseId);

            return (
              <div key={key} style={{ ...card(), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 500 }}>{course?.name}</div>
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>
                    {type.toUpperCase()} · {val.at}
                  </div>
                </div>
                <span style={{ color: "var(--green)", fontSize: 13 }}>✓ Submitted</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const viewMap = {
    dashboard: <Dashboard />,
    tlf: <FeedbackForm type="tlf" />,
    coa: <FeedbackForm type="coa" />,
    cga: <FeedbackForm type="cga" />,
    history: <History />,
  };

  return (
    <Shell user={user} onLogout={onLogout} navItems={navItems} active={active} setActive={setActive}>
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            padding: "12px 20px",
            borderRadius: "var(--radius-sm)",
            background: toast.type === "success" ? "var(--green)" : "var(--red)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 500,
            boxShadow: "var(--shadow)",
          }}
        >
          {toast.msg}
        </div>
      )}

      {viewMap[active]}
    </Shell>
  );
}