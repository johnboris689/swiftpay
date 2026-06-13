/* ==============================
   SWIFTPAY v3.5 BANKING ENGINE
   FINTECH SIMULATION CORE
============================== */

/* ---------- GLOBAL STATE ---------- */
let SwiftState = {
balance: 0,
transactions: []
};

/* ---------- LOAD PROFILE ---------- */
async function loadProfile(API, token){
try{
const res = await fetch(API+"/profile",{
headers:{Authorization:token}
});
const data = await res.json();

SwiftState.balance = data.balance || 0;

document.getElementById("username").innerText = data.username;
document.getElementById("accountNumber").innerText = data.accountNumber;
document.getElementById("avatar").innerText = data.username.substring(0,2).toUpperCase();

animateBalance(SwiftState.balance);

}catch(err){
console.log("Profile error",err);
}
}

/* ---------- BALANCE ANIMATION ---------- */
function animateBalance(target){
let current = 0;
let step = Math.ceil(target / 60);

let interval = setInterval(()=>{
current += step;
if(current >= target){
current = target;
clearInterval(interval);
}

document.getElementById("balance").innerText =
"₦" + current.toLocaleString();

},15);
}

/* ---------- TRANSACTION SIMULATION ---------- */
function addTransaction(type, amount){
const tx = {
type,
amount,
date:new Date()
};

SwiftState.transactions.unshift(tx);
renderTransactions();
}

/* ---------- RENDER TRANSACTIONS ---------- */
function renderTransactions(){
const box = document.getElementById("transactions");
if(!box) return;

box.innerHTML = "";

SwiftState.transactions.forEach(tx=>{
box.innerHTML += `
<div class="transaction">
<div>
<strong>${tx.type}</strong>
<p>${new Date(tx.date).toLocaleString()}</p>
</div>
<span class="${tx.type==='Credit'?'credit':'debit'}">
₦${tx.amount.toLocaleString()}
</span>
</div>
`;
});
}

/* ---------- TOAST SYSTEM ---------- */
function toast(msg,type="success"){
const t = document.createElement("div");

t.innerText = msg;
t.style.position="fixed";
t.style.bottom="90px";
t.style.left="50%";
t.style.transform="translateX(-50%)";
t.style.background=type==="success"?"#1b6fff":"#ff4d4f";
t.style.color="#fff";
t.style.padding="12px 16px";
t.style.borderRadius="12px";
t.style.zIndex="99999";
t.style.fontSize="14px";
t.style.boxShadow="0 10px 25px rgba(0,0,0,0.15)";

document.body.appendChild(t);

setTimeout(()=>{
t.remove();
},2500);
}

/* ---------- FAKE LIVE ACTIVITY ---------- */
function startLiveSimulation(){
setInterval(()=>{

const types=["Airtime","Transfer","Data","Bills"];
const type = types[Math.floor(Math.random()*types.length)];
const amount = Math.floor(Math.random()*5000)+100;

addTransaction(type,amount);

toast(type + " processed","success");

},15000);
}

/* ---------- INIT ENGINE ---------- */
function initSwiftPay(API,token){
loadProfile(API,token);
startLiveSimulation();
}

