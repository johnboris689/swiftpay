/* ============================
   SWIFTPAY v4 BANK OS UI
   APP SHELL CORE ENGINE
============================ */

/* ---------- PAGE TRANSITION ---------- */
function pageTransition(){
document.body.style.opacity="0.2";
setTimeout(()=>{
document.body.style.transition="0.25s";
document.body.style.opacity="1";
},100);
}

/* ---------- ACTIVE TAB SYSTEM ---------- */
function setActiveTab(){
const path = window.location.pathname;

document.querySelectorAll(".nav-item").forEach(item=>{
item.classList.remove("active");
});

if(path.includes("dashboard")) set("home");
if(path.includes("wallet")) set("wallet");
if(path.includes("history")) set("history");
if(path.includes("profile")) set("profile");

function set(id){
const el = document.getElementById(id);
if(el) el.classList.add("active");
}
}

/* ---------- INIT ---------- */
window.onload = function(){
pageTransition();
setActiveTab();
};
