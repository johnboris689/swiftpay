const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const pages = path.join(__dirname, "pages");
app.use(express.static(pages));

/* =========================
   SIMPLE IN-MEMORY WALLET DB
========================= */
let users = {};
let transactions = [];

/* =========================
   AUTH MOCK (simple)
========================= */
app.post("/api/register", (req,res)=>{
  const {name,email,password} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({message:"All fields required"});
  }

  users[email] = {
    name,
    email,
    password,
    balance: 200000
  };

  return res.json({message:"Registered", user:users[email]});
});

app.post("/api/login",(req,res)=>{
  const {email,password} = req.body;

  const user = users[email];
  if(!user || user.password !== password){
    return res.status(401).json({message:"Invalid credentials"});
  }

  return res.json({message:"Login success", user});
});

/* =========================
   WALLET ENGINE
========================= */
app.get("/api/wallet/:email",(req,res)=>{
  const user = users[req.params.email];
  if(!user) return res.status(404).json({message:"User not found"});

  res.json({
    balance:user.balance,
    name:user.name
  });
});

app.post("/api/transaction",(req,res)=>{
  const {email,type,amount} = req.body;

  const user = users[email];
  if(!user) return res.status(404).json({message:"User not found"});

  if(type === "debit"){
    if(user.balance < amount){
      return res.status(400).json({message:"Insufficient balance"});
    }
    user.balance -= amount;
  }

  if(type === "credit"){
    user.balance += amount;
  }

  const tx = {
    email,
    type,
    amount,
    date:new Date().toISOString()
  };

  transactions.push(tx);

  res.json({message:"Success", balance:user.balance});
});

app.get("/api/transactions/:email",(req,res)=>{
  const list = transactions.filter(t=>t.email === req.params.email);
  res.json(list);
});

/* =========================
   PAGES ROUTES
========================= */
app.get("/",(req,res)=>res.sendFile(path.join(pages,"login.html")));
app.get("/login",(req,res)=>res.sendFile(path.join(pages,"login.html")));
app.get("/register",(req,res)=>res.sendFile(path.join(pages,"register.html")));
app.get("/dashboard",(req,res)=>res.sendFile(path.join(pages,"dashboard.html")));

/* ========================= */
const PORT = process.env.PORT || 10000;
app.listen(PORT,()=>console.log("SwiftPay Wallet Engine running on",PORT));
