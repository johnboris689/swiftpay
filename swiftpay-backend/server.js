const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANT: correct path inside backend folder
const pages = path.join(__dirname, "pages");

app.use(express.static(pages));

/* ROUTES */
app.get("/", (req,res)=> {
  res.sendFile(path.join(pages,"login.html"));
});

app.get("/login",(req,res)=> {
  res.sendFile(path.join(pages,"login.html"));
});

app.get("/register",(req,res)=> {
  res.sendFile(path.join(pages,"register.html"));
});

app.get("/dashboard",(req,res)=> {
  res.sendFile(path.join(pages,"dashboard.html"));
});

/* TEST ROUTE (MUST WORK) */
app.get("/api/test",(req,res)=> {
  res.json({
    status:"SwiftPay API WORKING",
    time:new Date().toISOString()
  });
});

/* SIMPLE AUTH MOCK (TO FIX REGISTER IMMEDIATELY) */
app.post("/api/register",(req,res)=> {
  const {name,email,password} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({message:"All fields required"});
  }

  return res.json({
    message:"Registration successful",
    user:{name,email}
  });
});

app.post("/api/login",(req,res)=> {
  const {email,password} = req.body;

  if(!email || !password){
    return res.status(400).json({message:"All fields required"});
  }

  return res.json({
    message:"Login successful",
    token:"swiftpay-demo-token"
  });
});

/* CRITICAL FOR RENDER */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SwiftPay LIVE on port", PORT);
});
