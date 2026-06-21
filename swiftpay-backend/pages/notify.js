function notify(message, type = "success") {

  // Remove existing toast if any
  const old = document.getElementById("toast");
  if (old) old.remove();

  const colors = {
    success: "#38bdf8",   // sky blue (SUCCESS)
    error: "#ef4444",
    warning: "#f59e0b"
  };

  const icons = {
    success: "✔",
    error: "✖",
    warning: "⚠"
  };

  const toast = document.createElement("div");
  toast.id = "toast";

  toast.innerHTML = `
    <div style="
      display:flex;
      align-items:center;
      gap:10px;
      background:white;
      border-left:6px solid ${colors[type] || colors.success};
      padding:14px 16px;
      border-radius:14px;
      box-shadow:0 10px 25px rgba(0,0,0,0.12);
      font-family:system-ui;
      min-width:260px;
      max-width:90%;
      position:fixed;
      top:20px;
      right:20px;
      z-index:9999;
      animation:slideIn .3s ease;
    ">
      <div style="
        width:32px;
        height:32px;
        border-radius:50%;
        background:${colors[type] || colors.success};
        color:white;
        display:flex;
        align-items:center;
        justify-content:center;
        font-weight:bold;
      ">
        ${icons[type] || icons.success}
      </div>

      <div style="font-size:14px;color:#111;">
        ${message}
      </div>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Add animation dynamically
const style = document.createElement("style");
style.innerHTML = `
@keyframes slideIn {
  from { transform: translateY(-20px); opacity:0; }
  to { transform: translateY(0); opacity:1; }
}
`;
document.head.appendChild(style);
