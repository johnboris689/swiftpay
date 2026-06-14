async function refreshDashboard(){
  const token = localStorage.getItem("token");

  if(!token){
    window.location="login.html";
    return;
  }

  try{
    const res = await fetch("/api/profile",{
      headers:{Authorization:token}
    });

    if(!res.ok){
      localStorage.removeItem("token");
      window.location="login.html";
      return;
    }

    const data = await res.json();

    document.getElementById("balance").innerText =
      "₦" + Number(data.balance).toLocaleString();

    document.getElementById("account").innerText =
      "Account: " + data.accountNumber;

  }catch(e){
    console.log(e);
  }
}

/* LIVE TRANSACTIONS */
async function loadTx(){
  const token = localStorage.getItem("token");

  const res = await fetch("/api/transactions",{
    headers:{Authorization:token}
  });

  if(!res.ok) return;

  const data = await res.json();

  const box = document.getElementById("txns");
  if(!box) return;

  box.innerHTML = data.slice(0,10).map(t=>`
    <div style="padding:10px;border-bottom:1px solid #eee">
      <b>${t.type}</b>
      <div style="font-size:12px;color:gray">
        ${new Date(t.date).toLocaleString()}
      </div>
    </div>
  `).join("");
}

/* AUTO LOOP */
setInterval(()=>{
  refreshDashboard();
  loadTx();
},3000);

/* INITIAL LOAD */
refreshDashboard();
loadTx();
