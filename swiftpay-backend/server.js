const express = require("express");
const path = require("path");

const app = express();

const pages = path.join(__dirname, "pages");

app.use(express.static(pages));

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

app.get("/api/test",(req,res)=>{
  res.json({
    status:"SwiftPay OK",
    pages
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log("SwiftPay running on", PORT);
  console.log("Pages directory:", pages);
});
