const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= FRONTEND SERVE ================= */
app.use(express.static(path.join(__dirname, "../pages")));
app.use("/assets", express.static(path.join(__dirname, "../assets")));

/* ================= ROUTES ================= */
app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,"../pages/login.html"));
});

app.get("/login",(req,res)=>{
  res.sendFile(path.join(__dirname,"../pages/login.html"));
});

app.get("/register",(req,res)=>{
  res.sendFile(path.join(__dirname,"../pages/register.html"));
});

app.get("/dashboard",(req,res)=>{
  res.sendFile(path.join(__dirname,"../pages/dashboard.html"));
});

/* ================= API STATUS ================= */
app.get("/api/status",(req,res)=>{
  res.json({
    status:"SwiftPay FULL APP LIVE",
    time:new Date().toISOString()
  });
});

/* ================= START ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log("SwiftPay FULL FRONTEND MODE ACTIVE");
});
