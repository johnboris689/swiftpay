const express = require("express");
const path = require("path");
const app = express();

/* IMPORTANT: FORCE CORRECT ABSOLUTE PATH */
const root = path.resolve(__dirname, "..");

const pages = path.join(root, "pages");
const assets = path.join(root, "assets");

app.use(express.static(pages));
app.use("/assets", express.static(assets));

app.get("/", (req,res)=>{
  res.sendFile(path.join(pages,"login.html"));
});

app.get("/login",(req,res)=>{
  res.sendFile(path.join(pages,"login.html"));
});

app.get("/register",(req,res)=>{
  res.sendFile(path.join(pages,"register.html"));
});

app.get("/dashboard",(req,res)=>{
  res.sendFile(path.join(pages,"dashboard.html"));
});

/* TEST ROUTE */
app.get("/api/test",(req,res)=>{
  res.json({status:"SwiftPay OK"});
});

/* FORCE RENDER PORT */
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log("SwiftPay FIXED RUNNING ON", PORT);
});
