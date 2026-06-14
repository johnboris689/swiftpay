function showNotification(message, type="success"){

  const colors = {
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b"
  };

  const icon = {
    success: "✔",
    error: "✖",
    warning: "⚠"
  };

  const box = document.createElement("div");
  box.style.position = "fixed";
  box.style.top = "20px";
  box.style.right = "20px";
  box.style.zIndex = "9999";
  box.style.padding = "14px 18px";
  box.style.borderRadius = "12px";
  box.style.color = "white";
  box.style.fontWeight = "bold";
  box.style.fontFamily = "system-ui";
  box.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
  box.style.background = colors[type] || colors.success;
  box.style.display = "flex";
  box.style.alignItems = "center";
  box.style.gap = "10px";
  box.style.animation = "fadeIn 0.3s ease";

  box.innerHTML = `<span>${icon[type] || "✔"}</span> ${message}`;

  document.body.appendChild(box);

  setTimeout(()=>{
    box.style.opacity = "0";
    box.style.transition = "0.5s";
    setTimeout(()=>box.remove(),500);
  },3000);
}
