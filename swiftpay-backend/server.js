const express = require("express");
const app = express();
app.use(express.json());

let wallets = {}; 
let transactions = {};

// INIT WALLET
function getWallet(user){
  if(!wallets[user]){
    wallets[user] = { balance: 200000 };
    transactions[user] = [];
  }
  return wallets[user];
}

// GET WALLET
app.get("/api/wallet", (req,res)=>{
  const user = "default";
  res.json(getWallet(user));
});

// TRANSACTIONS
app.get("/api/transactions", (req,res)=>{
  const user = "default";
  res.json(transactions[user] || []);
});

// DEBIT WALLET (AIRTIME/DATA/BPC)
app.post("/api/transaction", (req,res)=>{
  const { type, amount } = req.body;
  const user = "default";

  const wallet = getWallet(user);

  if(wallet.balance < amount){
    return res.json({ message: "Insufficient Balance" });
  }

  wallet.balance -= amount;

  transactions[user].unshift({
    type,
    amount,
    date: new Date()
  });

  return res.json({ message: "Success", balance: wallet.balance });
});

app.listen(5000, ()=>console.log("SwiftPay Wallet Engine Running"));
require('./wallet-api');

const airtime = require('./airtime-api');
const data = require('./data-api');
const bpc = require('./bpc-api');

app.use('/api', airtime);
app.use('/api', data);
app.use('/api', bpc);


const notif = require('./notification-api');
const admin = require('./admin-api');

app.use('/api', notif);
app.use('/api', admin);


const ws = require('./ws-server');
global.broadcast = ws.broadcast;

