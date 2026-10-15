(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav');
  function onScroll(){ nav.classList.toggle('solid', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  function closeMenu(){ menu.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
  burger.addEventListener('click', function(){
    var o = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', o ? 'true' : 'false');
    if (o) nav.classList.add('solid');
  });
  menu.addEventListener('click', function(e){ if (e.target.tagName === 'A') closeMenu(); });

  // reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.15, rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add('in'); }); }

  // petals
  if (!reduce){
    var box = document.querySelector('.petals');
    for (var i = 0; i < 14; i++){
      var p = document.createElement('i'); p.className = 'petal';
      p.style.left = (Math.random()*100) + '%';
      p.style.setProperty('--dx', (Math.random()*160 - 80) + 'px');
      p.style.animationDuration = (11 + Math.random()*10) + 's';
      p.style.animationDelay = (-Math.random()*20) + 's';
      p.style.transform = 'scale(' + (.6 + Math.random()*.9) + ')';
      box.appendChild(p);
    }
  }

  // carousel
  var track = document.getElementById('track');
  function step(dir){ track.scrollBy({left: dir * Math.min(420, track.clientWidth*.8), behavior: reduce ? 'auto' : 'smooth'}); }
  document.getElementById('prev').addEventListener('click', function(){ step(-1); });
  document.getElementById('next').addEventListener('click', function(){ step(1); });

  // form -> mailto
  var form = document.getElementById('form'), note = document.getElementById('note');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var f = form.elements, ok = true;
    ['nombre','telefono'].forEach(function(n){
      var bad = !f[n].value.trim(); f[n].classList.toggle('err', bad); if (bad) ok = false;
    });
    if (!ok){ note.textContent = 'Por favor, indíquenos su nombre y un teléfono para poder responderle.'; return; }
    var body = 'Nombre: ' + f.nombre.value + '\nTeléfono: ' + f.telefono.value + '\nOcasión: ' + f.ocasion.value + '\n\n' + f.mensaje.value;
    location.href = 'mailto:info@floristeriajurado.com?subject=' + encodeURIComponent('Encargo: ' + f.ocasion.value) + '&body=' + encodeURIComponent(body);
    note.textContent = 'Se ha abierto su correo con el mensaje preparado. También puede llamarnos al 953 60 10 77.';
  });
})();
