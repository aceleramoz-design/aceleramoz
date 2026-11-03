
/* ===== CONFIG: edite aqui ===== */
const WA="258800000000"; /* número WhatsApp */
const SLIDES=[
{i:"assets/s1.webp",pm:"50% 50%",pd:"50% 50%",t:"Automatização",h:"Não podemos comprar tempo. Mas podemos poupá-lo.",p:"Automatize o seu negócio."},
{i:"assets/s2.webp",pm:"50% 50%",pd:"50% 55%",t:"WhatsApp",h:"Ganhe mais tempo para o que importa.",p:"O WhatsApp responde por si, 24 horas por dia."},
{i:"assets/s3.webp",pm:"50% 30%",pd:"50% 35%",t:"Site e atendimento",h:"O seu negócio aberto, mesmo quando você dorme.",p:"Site profissional e atendimento automático."},
{i:"assets/s4.webp",pm:"50% 35%",pd:"50% 40%",t:"Agentes de IA",h:"Menos tarefas repetitivas, mais clientes.",p:"Agentes de IA que trabalham todos os dias."},
{i:"assets/s5.webp",pm:"50% 25%",pd:"60% 30%",t:"Inhambane",h:"Presença digital completa para Inhambane.",p:"Do Tofo à Barra, o seu negócio visto por todos."}];
const PROJECTS=[{n:"Moz Roots Tours",c:"Sites",r:"Site de tours e actividades em Tofo Beach",u:"#"},{n:"Tofo Calling",c:"Sites",r:"Site trilingue PT · EN · FR para tours",u:"#"},{n:"Assistente para taxistas",c:"Agentes de IA",r:"Atendimento por WhatsApp e agenda automática",u:"#"}];
const PACKS=[{k:"K1",d:"Presença essencial",price:"—",f:["Site de uma página","Botão de WhatsApp","Optimizado para telemóvel"]},{k:"K2",d:"O mais escolhido",price:"—",rec:1,f:["Site completo com várias páginas","Português, inglês e francês","Formulário de contacto","Presença no Google"]},{k:"K3",d:"Tudo automático",price:"—",f:["Tudo do K2","Agente de IA no WhatsApp","Suporte contínuo"]}];
/* ===== fim CONFIG ===== */
const $=s=>document.querySelector(s),link=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
document.querySelectorAll(".wl").forEach(a=>a.href=link("Olá! Quero saber mais sobre a AceleraMoz."));
function rp(f){const l=PROJECTS.filter(p=>!f||f==="Todos"||p.c===f);$("#pf").innerHTML=l.length?l.map(p=>`<article class="pc rv in"><div class="mk"><div class="br"><i></i><u></u><s></s><s style="width:60%"></s></div><div class="ph"></div></div><div class="pb"><small>${p.c}</small><h3>${p.n}</h3><p>${p.r}</p><a href="${p.u}">Ver projecto</a></div></article>`).join(""):'<p class="lead">Em breve, novos projectos nesta categoria.</p>'}
if($("#pf")){rp();document.querySelectorAll(".fl").forEach(b=>b.onclick=()=>{document.querySelectorAll(".fl").forEach(x=>x.classList.toggle("a",x===b));rp(b.dataset.f)})}
if($("#pr"))$("#pr").innerHTML=PACKS.map(k=>`<article class="pk rv${k.rec?" rec":""}">${k.rec?'<span class="rb">Recomendado</span>':""}<h3>${k.k} · ${k.d}</h3><div class="pp">a partir de ${k.price} MZN</div><ul>${k.f.map(x=>`<li>${x}</li>`).join("")}</ul><a class="btn" target="_blank" rel="noopener" href="${link("Olá! Tenho interesse no pacote "+k.k+".")}">Pedir ${k.k} no WhatsApp</a></article>`).join("");
if($("#hero")){const sw=$("#slides"),dt=$("#dots");let cur=0,tm,paused=false;
sw.innerHTML=SLIDES.map((s,n)=>`<div class="sl${n?"":" a"}" style="--pm:${s.pm};--pd:${s.pd}" aria-label="${n+1} de ${SLIDES.length}"><img src="${s.i}" alt="${s.t}" ${n?'loading="lazy"':'fetchpriority="high"'}><div class="sc"><span class="tag">${s.t}</span><h1>${s.h}</h1><p>${s.p}</p><div class="bt"><a class="btn wl" target="_blank" rel="noopener" href="#">Pedir proposta</a><a class="btn o" href="portfolio.html">Ver portfólio</a></div></div></div>`).join("");
sw.querySelectorAll(".wl").forEach(a=>a.href=link("Olá! Quero pedir uma proposta."));
dt.innerHTML=SLIDES.map((_,n)=>`<button aria-label="Slide ${n+1}"><i></i></button>`).join("");
const sl=[...sw.children],db=[...dt.children];db[0].classList.add("a");
function go(n){cur=(n+sl.length)%sl.length;sl.forEach((e,i)=>{e.classList.remove("a");if(i===cur){void e.offsetWidth;e.classList.add("a")}});db.forEach((e,i)=>{e.classList.remove("a");if(i===cur){void e.offsetWidth;e.classList.add("a")}});clearTimeout(tm);if(!paused)tm=setTimeout(()=>go(cur+1),10000)}
go(0);db.forEach((b,i)=>b.onclick=()=>go(i));$("#pv").onclick=()=>go(cur-1);$("#nx").onclick=()=>go(cur+1);
const h=$("#hero");h.onmouseenter=()=>{paused=true;clearTimeout(tm)};h.onmouseleave=()=>{paused=false;go(cur)};
let x0=null;h.addEventListener("touchstart",e=>{x0=e.touches[0].clientX;paused=true;clearTimeout(tm)},{passive:true});
h.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-x0;paused=false;go(Math.abs(d)>40?cur+(d<0?1:-1):cur)});
h.tabIndex=0;h.onkeydown=e=>{if(e.key==="ArrowRight")go(cur+1);if(e.key==="ArrowLeft")go(cur-1)};}
const mp=$("#mp"),tg=o=>{mp.classList.toggle("o",o);mp.setAttribute("aria-hidden",!o);$("#bm").setAttribute("aria-expanded",o)};
$("#bm").onclick=()=>tg(1);$("#bx").onclick=()=>tg(0);mp.querySelectorAll("a.l").forEach(a=>a.onclick=()=>tg(0));
addEventListener("scroll",()=>{$("#hd").classList.toggle("s",scrollY>10);const st=$("#st");if(st){const r=st.getBoundingClientRect();st.style.setProperty("--p",Math.max(0,Math.min(100,(innerHeight*.75-r.top)/r.height*100))+"%")}},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".rv").forEach(e=>io.observe(e));
if($("#f"))$("#f").onsubmit=e=>{e.preventDefault();const f=e.target,er=f.querySelectorAll(".er");let ok=1;
er[0].textContent=f.n.value.trim().length<2?(ok=0,"Escreva o seu nome."):"";
er[1].textContent=/^(\+?\d[\d\s]{7,}|[^\s@]+@[^\s@]+\.[^\s@]+)$/.test(f.c.value.trim())?"":(ok=0,"Indique um telefone ou email válido.");
if(ok){f.querySelector("button").style.display="none";$("#ok").style.display="block"}};
