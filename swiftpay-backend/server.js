const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

const SECRET = "swiftpay_secret_key";

const pages = path.join(__dirname, "pages");
app.use(express.static(pages));

/* =========================
   SIMPLE DATABASE (TEMP)
========================= */
let users = [];

/* =========================
   REGISTER
========================= */
app.post("/api/register", async (req,res)=>{
  const {name,email,password} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({message:"All fields required"});
  }

  const exists = users.find(u=>u.email === email);
  if(exists){
    return res.status(400).json({message:"User already exists"});
  }

  const hashed = await bcrypt.hash(password,10);

  const user = {
    id: Date.now(),
    name,
    email,
    password: hashed,
    balance: 200000
  };

  users.push(user);

  res.json({message:"Registered successfully"});
});

/* =========================
   LOGIN
========================= */
app.post("/api/login", async (req,res)=>{
  const {email,password} = req.body;

  const user = users.find(u=>u.email === email);
  if(!user){
    return res.status(400).json({message:"Invalid credentials"});
  }

  const ok = await bcrypt.compare(password, user.password);
  if(!ok){
    return res.status(400).json({message:"Invalid credentials"});
  }

  const token = jwt.sign(
    {id:user.id,email:user.email},
    SECRET,
    {expiresIn:"7d"}
  );

  res.json({
    message:"Login successful",
    token,
    user:{
      name:user.name,
      email:user.email,
      balance:user.balance
    }
  });
});

/* =========================
   AUTH MIDDLEWARE
========================= */
function auth(req,res,next){
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json({message:"No token"});
  }

  try{
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  }catch(e){
    return res.status(401).json({message:"Invalid token"});
  }
}

/* =========================
   WALLET (PROTECTED)
========================= */
app.get("/api/wallet", auth, (req,res)=>{
  const user = users.find(u=>u.id === req.user.id);
  res.json({balance:user.balance});
});

app.post("/api/transaction", auth, (req,res)=>{
  const {type,amount} = req.body;

  const user = users.find(u=>u.id === req.user.id);

  if(type === "debit"){
    if(user.balance < amount){
      return res.status(400).json({message:"Insufficient balance"});
    }
    user.balance -= amount;
  }

  if(type === "credit"){
    user.balance += amount;
  }

  res.json({
    message:"Success",
    balance:user.balance
  });
});

/* =========================
   PAGES (NO AUTO REDIRECTS)
========================= */
app.get("/", (req,res)=>res.sendFile(path.join(pages,"login.html")));
app.get("/login", (req,res)=>res.sendFile(path.join(pages,"login.html")));
app.get("/register", (req,res)=>res.sendFile(path.join(pages,"register.html")));
app.get("/dashboard", (req,res)=>res.sendFile(path.join(pages,"dashboard.html")));

/* ========================= */
const PORT = process.env.PORT || 10000;
app.listen(PORT,()=>console.log("SwiftPay AUTH SYSTEM RUNNING",PORT));
