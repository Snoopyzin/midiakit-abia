/* ===== Abia Campos - interatividade geral ===== */
    (function () {
      function tick() { var d = new Date(); var h = String(d.getHours()).padStart(2, '0'); var m = String(d.getMinutes()).padStart(2, '0'); var c = document.getElementById('clock'); if (c) c.textContent = h + ':' + m; }
      tick(); setInterval(tick, 15000);
      // ---- Checklist estilo Notas do iOS (marcar/desmarcar as etapas) ----
      document.querySelectorAll('.ios-item').forEach(function (b) {
        b.addEventListener('click', function () {
          b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        });
      });

      // ---- Menu cascata (mobile) ----
      var mTog = document.getElementById('menuToggle'), mNav = document.getElementById('menuNav');
      if (mTog && mNav) {
        mTog.addEventListener('click', function () {
          var open = mNav.classList.toggle('open'); mTog.classList.toggle('open', open);
          mTog.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        mNav.querySelectorAll('a').forEach(function (a) {
          a.addEventListener('click', function () {
            mNav.classList.remove('open'); mTog.classList.remove('open'); mTog.setAttribute('aria-expanded', 'false');
          });
        });
      }
      var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); } }); }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.reveal').forEach(function (el) { ro.observe(el); });

      // ---- Barra de progresso de leitura + header com sombra ao rolar ----
      var progressBar = document.getElementById('progressBar');
      var menubarEl = document.getElementById('menubar');
      function onScroll() {
        var doc = document.documentElement;
        var scrollTop = window.pageYOffset || doc.scrollTop;
        var height = (doc.scrollHeight - doc.clientHeight) || 1;
        if (progressBar) progressBar.style.width = Math.min(100, (scrollTop / height) * 100) + '%';
        if (menubarEl) menubarEl.classList.toggle('scrolled', scrollTop > 8);
      }
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

      // ---- Destaca o link do menu conforme a secao visivel ----
      var navLinks = [].slice.call(document.querySelectorAll('.menu-nav a[href^="#"]'));
      var navSections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
      if (navSections.length) {
        var navObs = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) {
              var id = '#' + e.target.id;
              navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === id); });
            }
          });
        }, { rootMargin: '-45% 0px -50% 0px' });
        navSections.forEach(function (s) { navObs.observe(s); });
      }

      // ---- Anima os numeros das metricas ao entrar na tela ----
      function animateCount(el) {
        var raw = el.textContent.trim();
        var m = raw.match(/^([^\d]*)(\d+(?:[.,]\d+)?)([^\d]*)$/);
        if (!m) return;
        var prefix = m[1], numStr = m[2], suffix = m[3];
        var decimals = numStr.indexOf(',') > -1 ? numStr.split(',')[1].length : 0;
        var target = parseFloat(numStr.replace('.', '').replace(',', '.'));
        if (isNaN(target)) return;
        var start = performance.now(), dur = 1100;
        function frame(now) {
          var t = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - t, 3);
          var val = target * eased;
          var out = decimals > 0 ? val.toFixed(decimals).replace('.', ',') : Math.round(val).toLocaleString('pt-BR');
          el.textContent = prefix + out + suffix;
          if (t < 1) requestAnimationFrame(frame);
          else el.textContent = raw;
        }
        requestAnimationFrame(frame);
      }
      var countEls = [].slice.call(document.querySelectorAll('.mtile .n, .stat .num'));
      var countObs = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      countEls.forEach(function (el) { countObs.observe(el); });
    })();

/* ===== seletor de idioma (PT/EN/ES) ===== */
  (function () {
    var DICT = {
      en: {
        "Sobre": "About", "Métricas": "Metrics", "Nichos": "Niches", "Portfólio": "Portfolio",
        "Processo": "Process", "Marcas": "Brands", "Contato": "Contact",
        "Mídia Kit 2026": "Media Kit 2026",
        "Criadora de Conteúdo · Moda & Beleza": "Content Creator · Fashion & Beauty",
        "público feminino": "female audience", "25-34 anos": "25-34 years old", "público no Brasil": "audience in Brazil",
        "Sua marca recomendada por uma voz que a audiência realmente ouve e responde.": "Your brand recommended by a voice the audience truly listens to and responds to.",
        "Sobre a Abia": "About Abia", "Pode me chamar de Abia.": "You can call me Abia.",
        "Tenho 18 anos e sou de Goiânia (GO). Sou criadora de conteúdo e adoro tudo que envolve moda, beleza e maquiagem — sempre em busca de um look novo pra mostrar ou uma dica pra compartilhar.": "I'm 18 and I'm from Goiânia (GO), Brazil. I'm a content creator and I love everything about fashion, beauty and makeup — always looking for a new look to show or a tip to share.",
        "Meu dia a dia também entra no conteúdo: rotina, momentos reais e um pouco de lifestyle pra quem me acompanha se identificar. Gosto de criar de um jeito autêntico, sem perder a leveza.": "My everyday life is part of the content too: routine, real moments and a bit of lifestyle so the people who follow me can relate. I like creating in an authentic way, without losing the lightness.",
        "Faço porque amo criar, me arrumar e compartilhar um pouco do meu dia a dia com quem me acompanha.": "I do it because I love creating, getting ready and sharing a bit of my everyday life with the people who follow me.",
        "Instagram Insights — Agosto 2026": "Instagram Insights — August 2026",
        "Público feminino": "Female audience", "Maior parte da audiência no Instagram": "Most of the Instagram audience",
        "25 a 34 anos": "25 to 34 years old", "Faixa etária mais presente no público": "The most common age range in the audience",
        "18 a 24 anos": "18 to 24 years old", "Segunda maior faixa etária": "Second largest age range",
        "Público no Brasil": "Audience in Brazil", "Restante entre EUA, Índia, Reino Unido e outros países": "The rest split between the US, India, the UK and other countries",
        "Em breve": "Coming soon", "Alcance & engajamento": "Reach & engagement",
        "Métricas de desempenho serão atualizadas em breve": "Performance metrics will be updated soon",
        "Anos": "Years old", "Criadora de conteúdo em Goiânia (GO)": "Content creator in Goiânia (GO)",
        "Gênero · seguidores": "Gender · followers", "Mulheres": "Women", "Homens": "Men",
        "Faixa etária": "Age range", "Outras": "Other", "Principais países": "Top countries",
        "Brasil": "Brazil", "Estados Unidos": "United States", "Índia": "India", "Reino Unido": "United Kingdom",
        "Público majoritariamente brasileiro:": "Audience mostly from Brazil:",
        "· Dados do Instagram Insights, agosto/2026. Nada estimado, nada inflado.": "· Data from Instagram Insights, August 2026. Nothing estimated, nothing inflated.",
        "Não é sobre quantos me seguem. É sobre quantos param, confiam e vão atrás.": "It's not about how many follow me. It's about how many stop, trust and go after it.",
        "o que você vai encontrar": "what you'll find here",
        "Moda": "Fashion", "Looks, referências e produções de styling": "Looks, references and styling shoots",
        "Maquiagem": "Makeup", "Tutoriais, testes e inspirações de make": "Tutorials, product tests and makeup inspiration",
        "Beleza": "Beauty", "Skincare, cuidados e rotina de beleza": "Skincare, self-care and beauty routine",
        "Lifestyle": "Lifestyle", "Dia a dia, rotina e momentos reais": "Everyday life, routine and real moments",
        "Reviews & Testes": "Reviews & Testing", "Opiniões sinceras sobre o que testa": "Honest opinions on everything she tries",
        "UGC": "UGC", "Conteúdo autêntico pra sua marca": "Authentic content for your brand",
        "Um retrato do meu estilo": "A portrait of my style",
        "produção do dia": "look of the day", "clique favorito": "favorite shot", "à vontade": "at ease",
        "todo estilo": "full style", "meu jeito": "my way", "confiança em cada detalhe": "confidence in every detail",
        "cores que combinam comigo": "colors that suit me", "dia especial": "special day",
        "Últimos Reels": "Latest Reels", "Últimos TikToks": "Latest TikToks",
        "o que sua marca recebe": "what your brand gets",
        "Stories com engajamento": "Engaging Stories",
        "Sua marca entra numa conversa que já está acontecendo.": "Your brand joins a conversation that's already happening.",
        "Reels autênticos": "Authentic Reels",
        "Um dos formatos que mais engajam. Feitos pra prender atenção até o fim.": "One of the formats that gets the most engagement. Made to hold attention to the end.",
        "Feed com texto que conecta": "Feed posts with copy that connects",
        "Carrosséis e fotos com escrita que convence. Eu também escrevo, não só gravo.": "Carousels and photos with copy that convinces. I write too, not only film.",
        "Review honesto": "Honest review",
        "Produto em uso na minha rotina, com opinião real no meu estilo.": "The product in use in my routine, with a real opinion in my own style.",
        "UGC pra sua marca usar": "UGC for your brand to use",
        "Conteúdo sob medida, pronto pros seus canais e mídia paga. Direitos conforme contrato.": "Custom content, ready for your channels and paid media. Usage rights per contract.",
        "como eu trabalho": "how I work", "Do briefing à entrega": "From briefing to delivery",
        "Não vendo seguidores. Vendo confiança.": "I don't sell followers. I sell trust.",
        "Alinhamento": "Alignment",
        "A gente define o objetivo e os limites da campanha. Quanto mais detalhe, mais o conteúdo sai com a cara da sua marca.": "We define the goal and the limits of the campaign together. The more detail you share, the closer the content matches your brand.",
        "Criação": "Creation",
        "Prazo ideal de 7 dias pra gravar e editar com calma, e sempre que dá eu testo o produto antes. O prazo pode ser ajustado conforme o contrato, é só a gente conversar.": "Ideal turnaround of 7 days to shoot and edit without rushing, and whenever possible I test the product beforehand. The timeline can be adjusted per the contract, just let's talk about it.",
        "Entrega": "Delivery",
        "Material cru ou já editado com legendas, como você preferir. Se quiser, mando o print dos Insights depois.": "Raw footage or already edited with captions, whichever you prefer. If you'd like, I'll send the Insights screenshot afterwards.",
        "marcas que já confiaram": "brands that already trusted me",
        "De marcas queridas de Goiânia como a Boutique Cosmake e a Oh Boy! (Goiânia Shopping) a novas parcerias que topam colaborar. Só entro em projetos que fazem sentido pra mim e pra comunidade que estou construindo.": "From beloved Goiânia brands like Boutique Cosmake and Oh Boy! (Goiânia Shopping) to new partnerships willing to collaborate. I only take on projects that make sense for me and for the community I'm building.",
        "sua": "your", "marca": "brand", "aqui": "here", "vamos conversar": "let's talk",
        "↔ Arraste para o lado ou use as setas para ver todas as marcas": "↔ Swipe sideways or use the arrows to see every brand",
        "↔ Arraste para o lado para ver todas as marcas": "↔ Swipe sideways to see every brand",
        "Vamos conversar sobre a sua próxima campanha.": "Let's talk about your next campaign.",
        "Me manda sua ideia e a gente pensa junto no melhor jeito de mostrar a sua marca — não precisa chegar com tudo pronto, só com vontade de criar algo bom.": "Send me your idea and we'll figure out together the best way to show off your brand — you don't need to arrive with everything ready, just with the will to create something good.",
        "Respondo em breve.": "I'll reply soon.",
        "Abia Campos · Mídia Kit 2026": "Abia Campos · Media Kit 2026"
      },
      es: {
        "Portfólio": "Portafolio", "Processo": "Proceso", "Contato": "Contacto",
        "Mídia Kit 2026": "Media Kit 2026",
        "Criadora de Conteúdo · Moda & Beleza": "Creadora de Contenido · Moda y Belleza",
        "público feminino": "público femenino", "25-34 anos": "25-34 años", "público no Brasil": "público en Brasil",
        "Sua marca recomendada por uma voz que a audiência realmente ouve e responde.": "Tu marca recomendada por una voz que la audiencia realmente escucha y responde.",
        "Sobre a Abia": "Sobre Abia", "Pode me chamar de Abia.": "Puedes llamarme Abia.",
        "Tenho 18 anos e sou de Goiânia (GO). Sou criadora de conteúdo e adoro tudo que envolve moda, beleza e maquiagem — sempre em busca de um look novo pra mostrar ou uma dica pra compartilhar.": "Tengo 18 años y soy de Goiânia (GO), Brasil. Soy creadora de contenido y me encanta todo lo que tiene que ver con moda, belleza y maquillaje — siempre buscando un look nuevo para mostrar o un consejo para compartir.",
        "Meu dia a dia também entra no conteúdo: rotina, momentos reais e um pouco de lifestyle pra quem me acompanha se identificar. Gosto de criar de um jeito autêntico, sem perder a leveza.": "Mi día a día también entra en el contenido: rutina, momentos reales y un poco de lifestyle para que quien me acompaña se identifique. Me gusta crear de forma auténtica, sin perder la ligereza.",
        "Faço porque amo criar, me arrumar e compartilhar um pouco do meu dia a dia com quem me acompanha.": "Lo hago porque amo crear, arreglarme y compartir un poco de mi día a día con quien me acompaña.",
        "Instagram Insights — Agosto 2026": "Instagram Insights — Agosto 2026",
        "Público feminino": "Público femenino", "Maior parte da audiência no Instagram": "Mayor parte de la audiencia en Instagram",
        "25 a 34 anos": "25 a 34 años", "Faixa etária mais presente no público": "Rango de edad más presente en el público",
        "18 a 24 anos": "18 a 24 años", "Segunda maior faixa etária": "Segundo rango de edad más grande",
        "Público no Brasil": "Público en Brasil", "Restante entre EUA, Índia, Reino Unido e outros países": "El resto entre EE. UU., India, Reino Unido y otros países",
        "Em breve": "Próximamente", "Alcance & engajamento": "Alcance y engagement",
        "Métricas de desempenho serão atualizadas em breve": "Las métricas de desempeño se actualizarán pronto",
        "Anos": "Años", "Criadora de conteúdo em Goiânia (GO)": "Creadora de contenido en Goiânia (GO)",
        "Gênero · seguidores": "Género · seguidores", "Mulheres": "Mujeres", "Homens": "Hombres",
        "Faixa etária": "Rango de edad", "Outras": "Otras", "Principais países": "Principales países",
        "Brasil": "Brasil", "Estados Unidos": "Estados Unidos", "Índia": "India", "Reino Unido": "Reino Unido",
        "Público majoritariamente brasileiro:": "Público mayoritariamente brasileño:",
        "· Dados do Instagram Insights, agosto/2026. Nada estimado, nada inflado.": "· Datos de Instagram Insights, agosto/2026. Nada estimado, nada inflado.",
        "Não é sobre quantos me seguem. É sobre quantos param, confiam e vão atrás.": "No se trata de cuántos me siguen. Se trata de cuántos se detienen, confían y van tras ello.",
        "o que você vai encontrar": "lo que vas a encontrar",
        "Moda": "Moda", "Looks, referências e produções de styling": "Looks, referencias y producciones de styling",
        "Maquiagem": "Maquillaje", "Tutoriais, testes e inspirações de make": "Tutoriales, pruebas e inspiraciones de maquillaje",
        "Beleza": "Belleza", "Skincare, cuidados e rotina de beleza": "Skincare, cuidados y rutina de belleza",
        "Lifestyle": "Lifestyle", "Dia a dia, rotina e momentos reais": "Día a día, rutina y momentos reales",
        "Reviews & Testes": "Reseñas y pruebas", "Opiniões sinceras sobre o que testa": "Opiniones sinceras sobre lo que prueba",
        "UGC": "UGC", "Conteúdo autêntico pra sua marca": "Contenido auténtico para tu marca",
        "Um retrato do meu estilo": "Un retrato de mi estilo",
        "produção do dia": "producción del día", "clique favorito": "clic favorito", "à vontade": "a gusto",
        "todo estilo": "todo estilo", "meu jeito": "a mi manera", "confiança em cada detalhe": "confianza en cada detalle",
        "cores que combinam comigo": "colores que combinan conmigo", "dia especial": "día especial",
        "Últimos Reels": "Últimos Reels", "Últimos TikToks": "Últimos TikToks",
        "o que sua marca recebe": "lo que tu marca recibe",
        "Stories com engajamento": "Stories con engagement",
        "Sua marca entra numa conversa que já está acontecendo.": "Tu marca entra en una conversación que ya está sucediendo.",
        "Reels autênticos": "Reels auténticos",
        "Um dos formatos que mais engajam. Feitos pra prender atenção até o fim.": "Uno de los formatos que más genera engagement. Hechos para mantener la atención hasta el final.",
        "Feed com texto que conecta": "Feed con textos que conectan",
        "Carrosséis e fotos com escrita que convence. Eu também escrevo, não só gravo.": "Carruseles y fotos con textos que convencen. Yo también escribo, no solo grabo.",
        "Review honesto": "Reseña honesta",
        "Produto em uso na minha rotina, com opinião real no meu estilo.": "El producto en uso dentro de mi rutina, con una opinión real y en mi estilo.",
        "UGC pra sua marca usar": "UGC para que tu marca use",
        "Conteúdo sob medida, pronto pros seus canais e mídia paga. Direitos conforme contrato.": "Contenido a medida, listo para tus canales y medios pagados. Derechos según contrato.",
        "como eu trabalho": "cómo trabajo", "Do briefing à entrega": "Del briefing a la entrega",
        "Não vendo seguidores. Vendo confiança.": "No vendo seguidores. Vendo confianza.",
        "Alinhamento": "Alineación",
        "A gente define o objetivo e os limites da campanha. Quanto mais detalhe, mais o conteúdo sai com a cara da sua marca.": "Definimos juntas el objetivo y los límites de la campaña. Cuanto más detalle me des, más se parecerá el contenido a tu marca.",
        "Criação": "Creación",
        "Prazo ideal de 7 dias pra gravar e editar com calma, e sempre que dá eu testo o produto antes. O prazo pode ser ajustado conforme o contrato, é só a gente conversar.": "Plazo ideal de 7 días para grabar y editar con calma, y siempre que puedo pruebo el producto antes. El plazo se puede ajustar según el contrato, solo hay que conversarlo.",
        "Entrega": "Entrega",
        "Material cru ou já editado com legendas, como você preferir. Se quiser, mando o print dos Insights depois.": "Material en bruto o ya editado con subtítulos, como prefieras. Si quieres, envío la captura de Insights después.",
        "marcas que já confiaram": "marcas que ya confiaron",
        "De marcas queridas de Goiânia como a Boutique Cosmake e a Oh Boy! (Goiânia Shopping) a novas parcerias que topam colaborar. Só entro em projetos que fazem sentido pra mim e pra comunidade que estou construindo.": "De marcas queridas de Goiânia como Boutique Cosmake y Oh Boy! (Goiânia Shopping) a nuevas colaboraciones dispuestas a trabajar juntas. Solo entro en proyectos que tienen sentido para mí y para la comunidad que estoy construyendo.",
        "sua": "tu", "marca": "marca", "aqui": "aquí", "vamos conversar": "hablemos",
        "↔ Arraste para o lado ou use as setas para ver todas as marcas": "↔ Desliza al lado o usa las flechas para ver todas las marcas",
        "↔ Arraste para o lado para ver todas as marcas": "↔ Desliza al lado para ver todas las marcas",
        "Vamos conversar sobre a sua próxima campanha.": "Hablemos sobre tu próxima campaña.",
        "Me manda sua ideia e a gente pensa junto no melhor jeito de mostrar a sua marca — não precisa chegar com tudo pronto, só com vontade de criar algo bom.": "Mándame tu idea y pensamos juntas la mejor forma de mostrar tu marca — no necesitas llegar con todo listo, solo con ganas de crear algo bueno.",
        "Respondo em breve.": "Respondo pronto.",
        "Abia Campos · Mídia Kit 2026": "Abia Campos · Media Kit 2026"
      }
    };
    var ATTR = {
      en: { "Abrir menu": "Open menu", "Enviar e-mail para Abia": "Email Abia", "Ligar ou chamar no WhatsApp": "Call or message on WhatsApp", "Ver marcas anteriores": "Previous brands", "Ver próximas marcas": "Next brands" },
      es: { "Abrir menu": "Abrir menú", "Enviar e-mail para Abia": "Enviar correo a Abia", "Ligar ou chamar no WhatsApp": "Llamar o escribir por WhatsApp", "Ver marcas anteriores": "Marcas anteriores", "Ver próximas marcas": "Próximas marcas" }
    };
    var TITLES = { pt: "Abia Campos · Mídia Kit 2026", en: "Abia Campos · Media Kit 2026", es: "Abia Campos · Media Kit 2026" };
    var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, IFRAME: 1, TEXTAREA: 1 };
    var NOTRANSLATE = { num: 1, n: 1 };
    var orig = new Map(), busy = false, lang = 'pt';

    function collect(root) {
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          if (n.parentNode && SKIP[n.parentNode.nodeName]) return NodeFilter.FILTER_REJECT;
          if (n.parentNode && n.parentNode.classList && [].some.call(n.parentNode.classList, function (c) { return NOTRANSLATE[c]; })) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var n; while ((n = w.nextNode())) { if (!orig.has(n)) orig.set(n, n.nodeValue); }
    }
    function apply(l) {
      busy = true; lang = l;
      var d = DICT[l] || null;
      collect(document.body);
      orig.forEach(function (o, node) {
        if (!node.parentNode) { return; }
        var k = o.trim();
        if (!d || !d[k]) { if (node.nodeValue !== o) node.nodeValue = o; return; }
        var lead = o.match(/^\s*/)[0], tail = o.match(/\s*$/)[0], t = lead + d[k] + tail;
        if (node.nodeValue !== t) node.nodeValue = t;
      });
      document.documentElement.setAttribute('lang', l === 'pt' ? 'pt-BR' : (l === 'es' ? 'es' : 'en'));
      document.title = TITLES[l];
      var ad = ATTR[l] || null;
      function attrPass(sel, attr, key, dic) {
        var els = document.querySelectorAll(sel);
        for (var i = 0; i < els.length; i++) {
          var el = els[i];
          if (!el.dataset[key]) el.dataset[key] = el.getAttribute(attr) || '';
          var o = el.dataset[key], k = o.trim();
          el.setAttribute(attr, (dic && dic[k]) ? dic[k] : o);
        }
      }
      attrPass('[aria-label]', 'aria-label', 'arOrig', ad);
      var btns = document.querySelectorAll('.langsw button');
      for (var j = 0; j < btns.length; j++) btns[j].classList.toggle('on', btns[j].dataset.lang === l);
      try { localStorage.setItem('abia_lang', l); } catch (e) { }
      setTimeout(function () { busy = false; }, 0);
    }

    function build() {
      var host = document.querySelector('.menu-inner'); if (!host) return;
      var wrap = document.createElement('div'); wrap.className = 'langsw';
      wrap.setAttribute('role', 'group'); wrap.setAttribute('aria-label', 'Idioma / Language');
      ['pt', 'en', 'es'].forEach(function (l) {
        var b = document.createElement('button'); b.type = 'button'; b.dataset.lang = l;
        b.textContent = l.toUpperCase(); b.title = { pt: 'Português', en: 'English', es: 'Español' }[l];
        b.addEventListener('click', function () { apply(l); });
        wrap.appendChild(b);
      });
      var clock = host.querySelector('.menu-clock');
      if (clock) host.insertBefore(wrap, clock); else host.appendChild(wrap);

      var saved = null; try { saved = localStorage.getItem('abia_lang'); } catch (e) { }
      if (!saved) {
        var nav = (navigator.language || 'pt').toLowerCase();
        saved = nav.indexOf('es') === 0 ? 'es' : (nav.indexOf('pt') === 0 ? 'pt' : 'en');
      }
      apply(saved);

      var mo = new MutationObserver(function () { if (busy || lang === 'pt') return; apply(lang); });
      mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();
  })();

/* ===== carrossel de logos de marcas ===== */
    /* carrossel de logos: comeca parado no inicio, a pessoa roda manualmente (setas, arraste ou teclado) */
    (function () {
      var box = document.getElementById('logoMarquee'), track = document.getElementById('logoTrack');
      if (!box || !track) return;

      /* clona a fita uma vez para o loop nao ter emenda nos dois sentidos */
      var originals = Array.prototype.slice.call(track.children);
      originals.forEach(function (n) { var c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); track.appendChild(c); });

      var half = 0, stepPx = 0;
      function measure() {
        half = track.scrollWidth / 2;
        var first = track.children[0];
        stepPx = first ? (first.getBoundingClientRect().width + 24) : 130;
      }
      measure();
      window.addEventListener('resize', measure);
      if (window.ResizeObserver) { new ResizeObserver(measure).observe(track); }
      box.scrollLeft = 0;

      /* mantem o scroll dentro da primeira metade, criando o loop infinito nos dois lados */
      var fixing = false, tm = null;
      function suspend() { fixing = true; clearTimeout(tm); tm = setTimeout(function () { fixing = false; }, 800); }
      box.addEventListener('scroll', function () {
        if (half <= 0 || fixing) return;
        if (box.scrollLeft >= half) { fixing = true; box.scrollLeft -= half; fixing = false; }
        else if (box.scrollLeft < 0) { fixing = true; box.scrollLeft += half; fixing = false; }
      }, { passive: true });

      /* avanca/volta um card por clique, atravessando a emenda sem salto visivel */
      function nudge(dir) {
        if (half <= 0) return;
        var target = box.scrollLeft + dir * stepPx;
        if (target < 0) { suspend(); box.scrollLeft += half; target += half; }
        else if (target > half) { suspend(); box.scrollLeft -= half; target -= half; }
        box.scrollTo({ left: target, behavior: 'smooth' });
      }
      var prev = document.getElementById('logoPrev'), next = document.getElementById('logoNext');
      if (prev) prev.addEventListener('click', function () { nudge(-1); });
      if (next) next.addEventListener('click', function () { nudge(1); });

      /* arrastar com o mouse no desktop (no celular o toque ja rola nativamente) */
      box.addEventListener('dragstart', function (e) { e.preventDefault(); });
      var down = false, startX = 0, startLeft = 0, moved = false;
      box.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse') return;
        down = true; moved = false; startX = e.clientX; startLeft = box.scrollLeft;
        box.classList.add('grabbing');
      });
      window.addEventListener('pointermove', function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 3) moved = true;
        box.scrollLeft = startLeft - dx;
        if (moved) e.preventDefault();
      }, { passive: false });
      window.addEventListener('pointerup', function () {
        if (!down) return;
        down = false; box.classList.remove('grabbing');
      });

      box.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
      });
    })();
