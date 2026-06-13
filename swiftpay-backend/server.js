const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
origin: "*"
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;

/* =====================
   SWIFTPAY V5 API CORE
===================== */

app.get("/", (req,res)=>{
res.json({
status:"SwiftPay v5 LIVE",
time: new Date()
});
});

app.post("/login",(req,res)=>{
const {email,password} = req.body;

if(!email || !password){
return res.status(400).json({message:"Missing fields"});
}

/* demo token */
res.json({
token:"swiftpay_v5_token_" + Date.now()
});
});

app.get("/profile",(req,res)=>{
res.json({
username:"Swift User",
balance:250000,
accountNumber:"SP" + Math.floor(Math.random()*999999)
});
});

app.get("/transactions",(req,res)=>{
res.json([
{
type:"Credit",
amount:5000,
date:new Date()
},
{
type:"Debit",
amount:2000,
date:new Date()
}
]);
});

app.listen(PORT,()=>{
console.log("SwiftPay v5 running on port",PORT);
});
