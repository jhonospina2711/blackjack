const miModulo=(()=>{"use strict";let e=[];const t=["C","D","H","S"],n=["A","J","Q","K"];let o=[];const a=document.querySelector("#btnPedir"),l=document.querySelector("#btnDetener"),r=(document.querySelector("#btnNuevo"),document.querySelectorAll(".divCartas")),s=document.querySelectorAll("small"),c=()=>{e=[];for(let n=2;n<=10;n++)for(let o of t)e.push(n+o);for(let o of t)for(let t of n)e.push(t+o);return _.shuffle(e)};var d=()=>{if(0===e.length)throw"No hay cartas en el deck";const t=_.sample(e);let n=e.indexOf(t);return e.splice(n,1),t};const i=(e,t)=>(o[t]=o[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),s[t].innerText=o[t],o[t]),u=(e,t)=>{const n=document.createElement("img");n.src=`assets/cartas/${e}.png`,n.classList.add("carta"),r[t].append(n)},m=e=>{let t=0;do{const e=d();t=i(e,o.length-1),u(e,o.length-1)}while(t<e&&e<=21);(()=>{const[e,t]=o;setTimeout(()=>{t===e?alert("Empate!!!"):e>21?alert("Ha ganado la computadora"):t>e&&t<=21?alert("Ha ganado la computadora"):alert("Has Ganado!!")},100)})()};return a.addEventListener("click",()=>{const e=d(),t=i(e,0);u(e,0),t>21?(console.warn("Lo siento mucho perdiste"),a.disabled=!0,l.disabled=!0,m(t)):21===t&&(console.warn("21, genial"),a.disabled=!0,l.disabled=!0,m(t))}),l.addEventListener("click",()=>{const e=o[0];a.disabled=!0,l.disabled=!0,m(e)}),{nuevoJuego:(t=2)=>{e=c(),o=[];for(let e=0;e<t;e++)o.push(0);s.forEach(e=>e.innerText=0),r.forEach(e=>e.innerHTML=""),a.disabled=!1,l.disabled=!1}}})();