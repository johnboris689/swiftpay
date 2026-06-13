#!/data/data/com.termux/files/usr/bin/bash

API="http://localhost:3000"

echo "Upgrading SwiftPay Frontend V3..."

# ---------------- LOGIN ----------------
cat > pages/login.html << 'EOL'
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SwiftPay Login</title>
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>

<div class="auth-container">
<h1>SWIFTPAY</h1>
<h2>Login</h2>

<form>
<input type="email" placeholder="Email Address">
<input type="password" placeholder="Password">

<button type="button" onclick="loginUser()">Login</button>
</form>

<p>Don't have an account? <a href="register.html">Register</a></p>
</div>

<script>
const API="$API";

async function loginUser(){
const i=document.querySelectorAll("input");

const res=await fetch(API+"/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
email:i[0].value,
password:i[1].value
})
});

const data=await res.json();

if(res.ok){
localStorage.setItem("token",data.token);
window.location.href="dashboard.html";
}else{
alert(data.message);
}
}
</script>

</body>
</html>
EOL


# ---------------- REGISTER ----------------
cat > pages/register.html << 'EOL'
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SwiftPay Register</title>
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>

<div class="auth-container">
<h1>SWIFTPAY</h1>
<h2>Create Account</h2>

<form>
<input type="text" placeholder="Full Name">
<input type="email" placeholder="Email">
<input type="tel" placeholder="Phone">
<input type="password" placeholder="Password">

<button type="button" onclick="registerUser()">Create Account</button>
</form>

<p>Already have account? <a href="login.html">Login</a></p>
</div>

<script>
const API="$API";

async function registerUser(){
const i=document.querySelectorAll("input");

const res=await fetch(API+"/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:i[0].value,
email:i[1].value,
phone:i[2].value,
password:i[3].value
})
});

const data=await res.json();

if(res.ok){
alert("Account created");
window.location.href="login.html";
}else{
alert(data.message);
}
}
</script>

</body>
</html>
EOL


# ---------------- DASHBOARD ----------------
cat > pages/dashboard.html << 'EOL'
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SwiftPay Dashboard</title>
<link rel="stylesheet" href="../assets/css/style.css">
</head>

<body>

<div class="mobile-app">

<div class="header">
<div>
<p class="welcome">Welcome 👋</p>
<h2 id="username">Loading...</h2>
</div>

<div class="avatar" id="avatar">SP</div>
</div>

<div class="balance-card">
<p>Available Balance</p>

<div class="balance-row">
<h1 id="balance">₦0</h1>
<button id="toggleBalance">👁</button>
</div>

<div class="account-info">
<span id="accountNumber">Loading...</span>
<span>SwiftPay</span>
</div>
</div>

<div class="section">
<h3>Transactions</h3>
<div id="transactions"></div>
</div>

<button onclick="logout()">Logout</button>

</div>

<script>
const API="$API";
const token=localStorage.getItem("token");

if(!token){
location.href="login.html";
}

async function load(){
const p=await fetch(API+"/profile",{headers:{Authorization:token}});
const d=await p.json();

username.innerText=d.username;
balance.innerText="₦"+d.balance;
accountNumber.innerText="Acct: "+d.accountNumber;
avatar.innerText=d.username.slice(0,2).toUpperCase();

const t=await fetch(API+"/transactions",{headers:{Authorization:token}});
const tx=await t.json();

transactions.innerHTML=tx.map(x=>`
<div class="transaction">
<strong>${x.type}</strong>
<span>₦${x.amount}</span>
</div>
`).join("");
}

function logout(){
localStorage.removeItem("token");
location.href="login.html";
}

load();
</script>

</body>
</html>
EOL


echo "DONE: SwiftPay Frontend V3 upgraded successfully."
