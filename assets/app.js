/* =====================================================================
   AceleraMoz · app.js
   1. CONFIGURAÇÃO  (é aqui que edita textos, números, projectos, preços)
   2. FUNÇÕES AUXILIARES
   3. MÓDULOS       (cada um trata de uma parte do site)
   4. ARRANQUE
   ===================================================================== */


/* =====================================================================
   1. CONFIGURAÇÃO
   ===================================================================== */

/* Número de WhatsApp: só dígitos, com indicativo do país (Moçambique = 258) */
const WA = "258800000000";

/* Mensagens pré-preenchidas do WhatsApp */
const MSG = {
  geral:    "Olá! Quero saber mais sobre a AceleraMoz.",
  proposta: "Olá! Quero pedir uma proposta.",
  pacote:   (k) => `Olá! Tenho interesse no pacote ${k}.`,
};

/* Slides do hero (imagens em assets/)
   i  = imagem
   pm = posição da imagem no mobile      pd = posição no tablet/desktop
   t  = etiqueta pequena   h = título   p = frase de apoio */
const SLIDES = [
  { i: "assets/s1.webp", pm: "50% 50%", pd: "50% 50%",
    t: "Automatização",
    h: "Não podemos comprar tempo. Mas podemos poupá-lo.",
    p: "Automatize o seu negócio." },

  { i: "assets/s2.webp", pm: "50% 50%", pd: "50% 55%",
    t: "WhatsApp",
    h: "Ganhe mais tempo para o que importa.",
    p: "O WhatsApp responde por si, 24 horas por dia." },

  { i: "assets/s3.webp", pm: "50% 30%", pd: "50% 35%",
    t: "Site e atendimento",
    h: "O seu negócio aberto, mesmo quando você dorme.",
    p: "Site profissional e atendimento automático." },

  { i: "assets/s4.webp", pm: "50% 35%", pd: "50% 40%",
    t: "Agentes de IA",
    h: "Menos tarefas repetitivas, mais clientes.",
    p: "Agentes de IA que trabalham todos os dias." },

  { i: "assets/s5.webp", pm: "50% 25%", pd: "60% 30%",
    t: "Inhambane",
    h: "Presença digital completa para Inhambane.",
    p: "Do Tofo à Barra, o seu negócio visto por todos." },
];

/* Tempo de cada slide (milissegundos). Se mudar aqui, mude também
   "transition: right 10s linear" na barra de progresso (.dots .a i) no style.css */
const SLIDE_MS = 10000;

/* Projectos do portfólio
   c = categoria (tem de ser igual a um filtro: Sites, Agentes de IA, Automação, E-commerce)
   u = ligação do botão "Ver projecto" */
const PROJECTS = [
  { n: "Moz Roots Tours",         c: "Sites",         u: "#",
    r: "Site de tours e actividades em Tofo Beach" },

  { n: "Tofo Calling",            c: "Sites",         u: "#",
    r: "Site trilingue PT · EN · FR para tours" },

  { n: "Assistente para taxistas", c: "Agentes de IA", u: "#",
    r: "Atendimento por WhatsApp e agenda automática" },
];

/* Pacotes de preços
   price = valor mostrado em "a partir de ___ MZN"
   rec   = 1 para destacar como recomendado */
const PACKS = [
  { k: "K1", d: "Presença essencial", price: "—",
    f: ["Site de uma página", "Botão de WhatsApp", "Optimizado para telemóvel"] },

  { k: "K2", d: "O mais escolhido", price: "—", rec: 1,
    f: ["Site completo com várias páginas", "Português, inglês e francês",
        "Formulário de contacto", "Presença no Google"] },

  { k: "K3", d: "Tudo automático", price: "—",
    f: ["Tudo do K2", "Agente de IA no WhatsApp", "Suporte contínuo"] },
];


/* =====================================================================
   2. FUNÇÕES AUXILIARES
   ===================================================================== */

const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* Cria a ligação wa.me com a mensagem já escrita */
const waLink = (texto) => `https://wa.me/${WA}?text=${encodeURIComponent(texto)}`;

/* Põe a mesma mensagem em todos os botões .wl dentro de um elemento */
const setWhatsApp = (raiz, texto) =>
  raiz.querySelectorAll(".wl").forEach((a) => (a.href = waLink(texto)));


/* =====================================================================
   3. MÓDULOS
   ===================================================================== */

/* ---- 3.1 Portfólio (grelha + filtros) -------------------------------- */

function cartaoProjecto(p) {
  return `
    <article class="pc rv in">
      <div class="mk">
        <div class="br"><i></i><u></u><s></s><s style="width:60%"></s></div>
        <div class="ph"></div>
      </div>
      <div class="pb">
        <small>${p.c}</small>
        <h3>${p.n}</h3>
        <p>${p.r}</p>
        <a href="${p.u}">Ver projecto</a>
      </div>
    </article>`;
}

function mostrarProjectos(filtro) {
  const lista = PROJECTS.filter(
    (p) => !filtro || filtro === "Todos" || p.c === filtro
  );
  $("#pf").innerHTML = lista.length
    ? lista.map(cartaoProjecto).join("")
    : '<p class="lead">Em breve, novos projectos nesta categoria.</p>';
}

function iniciarPortfolio() {
  if (!$("#pf")) return;
  mostrarProjectos();

  $$(".fl").forEach((botao) => {
    botao.onclick = () => {
      $$(".fl").forEach((b) => b.classList.toggle("a", b === botao));
      mostrarProjectos(botao.dataset.f);
    };
  });
}


/* ---- 3.2 Preços ------------------------------------------------------ */

function cartaoPacote(k) {
  const etiqueta = k.rec ? '<span class="rb">Recomendado</span>' : "";
  const itens = k.f.map((x) => `<li>${x}</li>`).join("");

  return `
    <article class="pk rv${k.rec ? " rec" : ""}">
      ${etiqueta}
      <h3>${k.k} · ${k.d}</h3>
      <div class="pp">a partir de ${k.price} MZN</div>
      <ul>${itens}</ul>
      <a class="btn" target="_blank" rel="noopener" href="${waLink(MSG.pacote(k.k))}">
        Pedir ${k.k} no WhatsApp
      </a>
    </article>`;
}

function iniciarPrecos() {
  if (!$("#pr")) return;
  $("#pr").innerHTML = PACKS.map(cartaoPacote).join("");
}


/* ---- 3.3 Hero com slideshow ------------------------------------------ */

function htmlSlide(s, n) {
  return `
    <div class="sl${n ? "" : " a"}" style="--pm:${s.pm};--pd:${s.pd}"
         aria-label="${n + 1} de ${SLIDES.length}">
      <img src="${s.i}" alt="${s.t}" ${n ? 'loading="lazy"' : 'fetchpriority="high"'}>
      <div class="sc">
        <span class="tag">${s.t}</span>
        <h1>${s.h}</h1>
        <p>${s.p}</p>
        <div class="bt">
          <a class="btn wl" target="_blank" rel="noopener" href="#">Pedir proposta</a>
          <a class="btn o" href="portfolio.html">Ver portfólio</a>
        </div>
      </div>
    </div>`;
}

function iniciarHero() {
  const hero = $("#hero");
  if (!hero) return;

  const caixaSlides = $("#slides");
  const caixaBarras = $("#dots");

  /* Constrói slides e barras de progresso */
  caixaSlides.innerHTML = SLIDES.map(htmlSlide).join("");
  setWhatsApp(caixaSlides, MSG.proposta);
  caixaBarras.innerHTML = SLIDES.map(
    (_, n) => `<button aria-label="Slide ${n + 1}"><i></i></button>`
  ).join("");

  const slides = [...caixaSlides.children];
  const barras = [...caixaBarras.children];
  let actual = 0;
  let temporizador;
  let pausado = false;

  /* Remove e volta a pôr a classe "a" para reiniciar as animações CSS */
  const activar = (elemento) => {
    elemento.classList.remove("a");
    void elemento.offsetWidth; /* força o navegador a reiniciar a animação */
  };

  /* Vai para o slide n (dá a volta no início e no fim) */
  function ir(n) {
    actual = (n + slides.length) % slides.length;

    slides.forEach((e, i) => {
      activar(e);
      if (i === actual) e.classList.add("a");
    });
    barras.forEach((e, i) => {
      activar(e);
      if (i === actual) e.classList.add("a");
    });

    clearTimeout(temporizador);
    if (!pausado) temporizador = setTimeout(() => ir(actual + 1), SLIDE_MS);
  }

  const pausar = () => { pausado = true;  clearTimeout(temporizador); };
  const retomar = () => { pausado = false; ir(actual); };

  /* Barras, setas */
  barras.forEach((b, i) => (b.onclick = () => ir(i)));
  $("#pv").onclick = () => ir(actual - 1);
  $("#nx").onclick = () => ir(actual + 1);

  /* Rato: pausa ao passar por cima */
  hero.onmouseenter = pausar;
  hero.onmouseleave = retomar;

  /* Toque: deslizar para os lados (swipe) */
  let inicioX = null;
  hero.addEventListener("touchstart", (e) => {
    inicioX = e.touches[0].clientX;
    pausar();
  }, { passive: true });

  hero.addEventListener("touchend", (e) => {
    const distancia = e.changedTouches[0].clientX - inicioX;
    pausado = false;
    ir(Math.abs(distancia) > 40 ? actual + (distancia < 0 ? 1 : -1) : actual);
  });

  /* Teclado: setas esquerda e direita */
  hero.tabIndex = 0;
  hero.onkeydown = (e) => {
    if (e.key === "ArrowRight") ir(actual + 1);
    if (e.key === "ArrowLeft")  ir(actual - 1);
  };

  ir(0);
}


/* ---- 3.4 Menu mobile ------------------------------------------------- */

function iniciarMenu() {
  const painel = $("#mp");

  const abrir = (aberto) => {
    painel.classList.toggle("o", aberto);
    painel.setAttribute("aria-hidden", !aberto);
    $("#bm").setAttribute("aria-expanded", aberto);
  };

  $("#bm").onclick = () => abrir(true);
  $("#bx").onclick = () => abrir(false);
  painel.querySelectorAll("a.l").forEach((a) => (a.onclick = () => abrir(false)));
}


/* ---- 3.5 Ao rolar: sombra do cabeçalho + linha "Como funciona" ------- */

function iniciarScroll() {
  addEventListener("scroll", () => {
    $("#hd").classList.toggle("s", scrollY > 10);

    const passos = $("#st");
    if (passos) {
      const topo = passos.getBoundingClientRect();
      const progresso = ((innerHeight * 0.75 - topo.top) / topo.height) * 100;
      passos.style.setProperty("--p", Math.max(0, Math.min(100, progresso)) + "%");
    }
  }, { passive: true });
}


/* ---- 3.6 Animação de entrada (fade + subida) ------------------------- */

function iniciarRevelar() {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        observador.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  $$(".rv").forEach((e) => observador.observe(e));
}


/* ---- 3.7 Formulário de contacto -------------------------------------- */

function iniciarFormulario() {
  const form = $("#f");
  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();
    const erros = form.querySelectorAll(".er");
    let valido = true;

    /* Nome: pelo menos 2 letras */
    if (form.n.value.trim().length < 2) {
      erros[0].textContent = "Escreva o seu nome.";
      valido = false;
    } else {
      erros[0].textContent = "";
    }

    /* Contacto: telefone (8+ dígitos) ou email */
    const contacto = form.c.value.trim();
    const telefoneOuEmail = /^(\+?\d[\d\s]{7,}|[^\s@]+@[^\s@]+\.[^\s@]+)$/;
    if (!telefoneOuEmail.test(contacto)) {
      erros[1].textContent = "Indique um telefone ou email válido.";
      valido = false;
    } else {
      erros[1].textContent = "";
    }

    /* Sucesso */
    if (valido) {
      form.querySelector("button").style.display = "none";
      $("#ok").style.display = "block";
    }
  };
}


/* =====================================================================
   4. ARRANQUE
   A ordem importa: primeiro os botões de WhatsApp, depois o resto.
   ===================================================================== */

setWhatsApp(document, MSG.geral);   /* todos os botões .wl da página */
iniciarPortfolio();
iniciarPrecos();
iniciarHero();                      /* depois do passo acima: os botões do hero ficam com a mensagem de proposta */
iniciarMenu();
iniciarScroll();
iniciarRevelar();                   /* por último: observa os elementos criados acima */
iniciarFormulario();