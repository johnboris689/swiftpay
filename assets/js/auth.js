/* ===========================
   SWIFTPAY v4.1 AUTH ENGINE
   FIXED LOGIN REDIRECT SYSTEM
=========================== */

const API = "http://127.0.0.1:3000";

/* ---------- GET TOKEN ---------- */
function getToken(){
return localStorage.getItem("token");
}

/* ---------- SAVE SESSION ---------- */
function saveSession(token){
localStorage.setItem("token",token);
}

/* ---------- CLEAR SESSION ---------- */
function clearSession(){
localStorage.removeItem("token");
}

/* ---------- VERIFY TOKEN WITH BACKEND ---------- */
async function verifyToken(){
const token = getToken();

if(!token) return false;

try{
const res = await fetch(API+"/profile",{
headers:{Authorization:token}
});

if(!res.ok){
clearSession();
return false;
}

return await res.json();

}catch(err){
clearSession();
return false;
}
}

/* ---------- PROTECT PAGE ---------- */
async function protectPage(){
const user = await verifyToken();

if(!user){
window.location.href="login.html";
return;
}

return user;
}

/* ---------- LOGIN FUNCTION ---------- */
async function login(email,password){
try{
const res = await fetch(API+"/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password})
});

const data = await res.json();

if(!res.ok || !data.token){
throw new Error(data.message || "Login failed");
}

saveSession(data.token);
window.location.href="dashboard.html";

}catch(err){
alert(err.message);
}
}

/* ---------- AUTO INIT GUARD ---------- */
async function initAuthGuard(){
const user = await protectPage();
return user;
}
