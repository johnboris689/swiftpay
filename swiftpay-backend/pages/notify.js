function notify(msg){
 const box=document.createElement("div");
 box.innerText=msg;
 box.style.position="fixed";
 box.style.top="20px";
 box.style.left="50%";
 box.style.transform="translateX(-50%)";
 box.style.background="#0ea5e9";
 box.style.color="white";
 box.style.padding="12px 20px";
 box.style.borderRadius="15px";
 box.style.boxShadow="0 10px 25px rgba(0,0,0,.15)";
 box.style.zIndex="9999";
 document.body.appendChild(box);
 setTimeout(()=>box.remove(),3000);
}
