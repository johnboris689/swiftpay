function notify(message, type = "success") {

  const old = document.getElementById("swiftpay-toast");
  if (old) old.remove();

  const colors = {
    success: "#38bdf8",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#60a5fa"
  };

  const icons = {
    success: "✔",
    error: "✖",
    warning: "⚠",
    info: "ℹ"
  };

  const toast = document.createElement("div");
  toast.id = "swiftpay-toast";

  toast.innerHTML = `
    <div style="
      position:fixed;
      top:20px;
      right:20px;
      z-index:99999;
      min-width:260px;
      max-width:90%;
      background:white;
      border-left:6px solid ${colors[type] || colors.success};
      box-shadow:0 15px 35px rgba(0,0,0,0.15);
      border-radius:14px;
      padding:14px 16px;
      display:flex;
      align-items:center;
      gap:12px;
      font-family:system-ui;
      animation:swiftSlide .35s ease;
    ">

      <div style="
        width:34px;
        height:34px;
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

      <div style="font-size:14px;color:#111;font-weight:500;">
        ${message}
      </div>

    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "0.4s";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes swiftSlide {
  from { transform: translateY(-20px); opacity:0; }
  to { transform: translateY(0); opacity:1; }
}
`;
document.head.appendChild(style);
