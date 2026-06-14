function showToast(message, type = "success"){

  const colors = {
    success: "#0ea5e9",
    error: "#ef4444",
    warning: "#f59e0b"
  };

  const icons = {
    success: "✔",
    error: "✖",
    warning: "!"
  };

  const toast = document.createElement("div");

  toast.innerHTML = `
    <div style="
      position:fixed;
      top:20px;
      right:20px;
      background:${colors[type]};
      color:white;
      padding:14px 18px;
      border-radius:12px;
      box-shadow:0 10px 25px rgba(0,0,0,0.15);
      font-family:system-ui;
      font-size:14px;
      display:flex;
      align-items:center;
      gap:10px;
      z-index:9999;
      animation:slideIn 0.4s ease;
    ">
      <b style="font-size:16px">${icons[type]}</b>
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(()=>{
    toast.style.opacity = "0";
    toast.style.transition = "0.5s";
    setTimeout(()=>toast.remove(), 500);
  }, 3000);
}

/* animation */
const style = document.createElement("style");
style.innerHTML = `
@keyframes slideIn{
  from{transform:translateX(100px); opacity:0;}
  to{transform:translateX(0); opacity:1;}
}
`;
document.head.appendChild(style);
