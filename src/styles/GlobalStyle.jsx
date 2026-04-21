export default function GlobalStyle() {
    return (
        <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      :root{
        --navy:#0f1b2d; --navy2:#162236; --navy3:#1e304a;
        --teal:#00c4a0; --teal2:#00a888; --teal-faint:rgba(0,196,160,.08);
        --amber:#f5a623; --red:#e84040; --green:#34c97b;
        --white:#ffffff; --off:#f0f4f8; --muted:#8fa3b8; --border:#263a52;
        --radius:12px; --radius-sm:8px; --radius-lg:20px;
        --shadow:0 4px 24px rgba(0,0,0,.35);
        --font-display:'DM Serif Display',serif;
        --font-body:'DM Sans',sans-serif;
      }
      html,body,#root{height:100%;font-family:var(--font-body);background:var(--navy);color:var(--white)}
      button{font-family:var(--font-body);cursor:pointer}
      input,select,textarea{font-family:var(--font-body)}
      ::-webkit-scrollbar{width:6px}
      ::-webkit-scrollbar-track{background:var(--navy2)}
      ::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
      .fade-in{animation:fadeIn .4s ease}
      @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      .slide-in{animation:slideIn .35s ease}
      @keyframes slideIn{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
      .pulse{animation:pulse 2s ease-in-out infinite}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
    `}</style>
    );
}