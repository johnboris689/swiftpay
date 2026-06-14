const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

const pages = path.join(__dirname, "pages");

app.use(express.static(pages));

app.get("/", (req,res)=>res.sendFile(path.join(pages,"login.html")));
app.get("/login",(req,res)=>res.sendFile(path.join(pages,"login.html")));
app.get("/register",(req,res)=>res.sendFile(path.join(pages,"register.html")));
app.get("/dashboard",(req,res)=>res.sendFile(path.join(pages,"dashboard.html")));

app.get("/api/test",(req,res)=>{
  res.json({
    status:"SwiftPay LIVE OK",
    time:new Date().toISOString()
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, ()=>{
  console.log("SwiftPay running on port", PORT);
});
