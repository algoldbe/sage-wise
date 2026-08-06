/* matriz-bcg.js — Graficador de sectores de negocio.
   Reconstrucción del laboratorio original en JavaFX (matrizbcg, 2010). */
(function () {
  'use strict';

  var COLORES = ['#1a73e8', '#8bb43c', '#7d3c98', '#b03a2e', '#2c3e50',
                 '#117a65', '#95a5a6', '#e08cae', '#e67e22', '#1f3a93'];
  var MAX = 10;

  var sectores = [];
  var chart;

  var $ = function (id) { return document.getElementById(id); };

  /* --- cuadrante en el que cae un sector --------------------------------- */

  function cuadrante(s) {
    var cx = chart.divisorX, cy = chart.divisorY;
    var fuerte = s.posicion >= cx;
    var crece = s.crecimiento >= cy;
    if (crece && fuerte)  return { txt: 'Estrella',      color: '#e67e22' };
    if (crece && !fuerte) return { txt: 'Interrogación', color: '#8e44ad' };
    if (!crece && fuerte) return { txt: 'Vaca lechera',  color: '#16a085' };
    return { txt: 'Perro', color: '#7f8c8d' };
  }

  /* --- crecimiento promedio ponderado de la industria -------------------- */

  function promedioPonderado() {
    var suma = 0, peso = 0;
    sectores.forEach(function (s) {
      suma += s.tamano * s.crecimiento;
      peso += s.tamano;
    });
    return peso > 0 ? suma / peso : 0;
  }

  /* --- pintar ------------------------------------------------------------ */

  function rangoY() {
    var min = -4, max = 12;
    sectores.forEach(function (s) {
      min = Math.min(min, Math.floor(s.crecimiento) - 2);
      max = Math.max(max, Math.ceil(s.crecimiento) + 2);
    });
    return [min, max];
  }

  function refrescar() {
    if ($('auto-y').checked) {
      chart.divisorY = sectores.length ? promedioPonderado() : 0;
      $('corte-y').value = chart.divisorY.toFixed(2);
    }

    var r = rangoY();
    chart.yMin = r[0];
    chart.yMax = r[1];
    chart.divisorY = Math.max(r[0], Math.min(r[1], chart.divisorY));

    chart.setBurbujas(sectores.map(function (s) {
      return {
        razon: s.posicion,
        y: s.crecimiento,
        tamano: s.tamano,
        etiqueta: s.nombre.slice(0, 3).toUpperCase(),
        color: s.color
      };
    }));

    pintarTabla();
    pintarLeyenda();
  }

  function pintarTabla() {
    var cuerpo = $('tabla-sectores').querySelector('tbody');
    cuerpo.innerHTML = '';

    sectores.forEach(function (s, i) {
      var q = cuadrante(s);
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td class="nombre"><span class="punto" style="background:' + s.color + '"></span><em></em></td>' +
        '<td>' + fmt(s.tamano) + '</td>' +
        '<td>' + s.crecimiento.toFixed(2) + '</td>' +
        '<td>' + s.posicion.toFixed(2) + 'X</td>' +
        '<td><span class="chip" style="background:' + q.color + '">' + q.txt + '</span></td>' +
        '<td><button class="quitar" title="Quitar este sector">&times;</button></td>';
      tr.querySelector('em').textContent = s.nombre;
      tr.querySelector('.quitar').setAttribute('aria-label', 'Quitar ' + s.nombre);
      tr.querySelector('.quitar').addEventListener('click', function () {
        sectores.splice(i, 1);
        refrescar();
      });
      cuerpo.appendChild(tr);
    });

    $('sin-sectores').style.display = sectores.length ? 'none' : '';
    $('tabla-sectores').style.display = sectores.length ? '' : 'none';
    $('btn-agregar').disabled = sectores.length >= MAX;
  }

  function pintarLeyenda() {
    var l = $('leyenda');
    l.innerHTML = '';
    sectores.forEach(function (s) {
      var e = document.createElement('span');
      e.innerHTML = '<i style="background:' + s.color + '"></i>';
      e.appendChild(document.createTextNode(s.nombre));
      l.appendChild(e);
    });
  }

  function fmt(n) {
    return Number.isInteger(n) ? String(n) : n.toFixed(2);
  }

  /* --- avisos ------------------------------------------------------------ */

  var relojAviso;
  function avisar(texto, tipo) {
    var a = $('aviso-forma');
    a.textContent = texto;
    a.className = 'aviso visible ' + (tipo || 'mal');
    clearTimeout(relojAviso);
    relojAviso = setTimeout(function () { a.className = 'aviso ' + (tipo || 'mal'); }, 6000);
  }

  // Mensajes de validación del navegador en español, no importa en qué idioma
  // esté configurado.
  var TEXTOS_VALIDEZ = {
    'f-nombre': 'Escriba el nombre del sector.',
    'f-tamano': 'Escriba el tamaño del sector: un número mayor que cero.',
    'f-crecimiento': 'Escriba el crecimiento anual en por ciento.',
    'f-posicion': 'Escriba la posición competitiva relativa: un número mayor que cero.'
  };

  // Un mensaje puesto con setCustomValidity deja el campo inválido hasta que se
  // borra. Hay que limpiarlos antes de cada validación, no sólo al teclear:
  // si el valor se pone desde código (reset, ejemplo) no hay evento 'input'.
  function limpiarValidez() {
    Object.keys(TEXTOS_VALIDEZ).forEach(function (id) { $(id).setCustomValidity(''); });
  }

  function mensajesEnEspanol() {
    Object.keys(TEXTOS_VALIDEZ).forEach(function (id) {
      var campo = $(id);
      campo.addEventListener('invalid', function () {
        campo.setCustomValidity(TEXTOS_VALIDEZ[id]);
      });
      campo.addEventListener('input', function () { campo.setCustomValidity(''); });
    });
    // El clic en el botón corre antes de que el formulario se valide.
    $('btn-agregar').addEventListener('click', limpiarValidez);
  }

  /* --- alta de sectores -------------------------------------------------- */

  function agregar(ev) {
    ev.preventDefault();
    if (sectores.length >= MAX) { avisar('La matriz admite hasta ' + MAX + ' sectores.'); return; }

    var nombre = $('f-nombre').value.trim();
    var tamano = parseFloat($('f-tamano').value);
    var crecimiento = parseFloat($('f-crecimiento').value);
    var posicion = parseFloat($('f-posicion').value);

    if (!nombre) { avisar('Póngale un nombre al sector.'); $('f-nombre').focus(); return; }
    if (!isFinite(tamano) || tamano <= 0) { avisar('El tamaño del sector tiene que ser un número mayor que cero.'); $('f-tamano').focus(); return; }
    if (!isFinite(crecimiento)) { avisar('Escriba el crecimiento anual en por ciento.'); $('f-crecimiento').focus(); return; }
    if (!isFinite(posicion) || posicion <= 0) { avisar('La posición competitiva relativa tiene que ser mayor que cero.'); $('f-posicion').focus(); return; }
    // Se admite más de 8X: el eje llega hasta ahí, así que la burbuja se dibuja
    // pegada al extremo derecho, pero la tabla conserva el valor real.
    if (posicion > 8) {
      avisar('Ese sector está en ' + posicion.toFixed(2) + 'X, arriba del tope del eje. ' +
             'Se dibuja pegado al extremo derecho.', 'info');
    }

    sectores.push({
      nombre: nombre,
      tamano: tamano,
      crecimiento: crecimiento,
      posicion: posicion,
      color: COLORES[sectores.length % COLORES.length]
    });

    $('forma').reset();
    $('f-nombre').focus();
    refrescar();
  }

  /* --- ejemplo ----------------------------------------------------------- */

  // El portafolio de la empresa Alfa del Laboratorio de Segmentación, para que
  // quien venga de allá reconozca los números.
  function cargarEjemplo() {
    sectores = [
      { nombre: 'Arroz', tamano: 110, crecimiento:  9.89, posicion: 7.33 },
      { nombre: 'Avena', tamano:  15, crecimiento:  2.83, posicion: 0.33 },
      { nombre: 'Maíz',  tamano: 235, crecimiento:  2.50, posicion: 1.47 },
      { nombre: 'Trigo', tamano:  85, crecimiento: -1.89, posicion: 2.83 }
    ].map(function (s, i) { s.color = COLORES[i]; return s; });
    $('auto-y').checked = false;
    chart.divisorY = 3.01;                 // crecimiento promedio de esa industria
    $('corte-y').value = '3.01';
    refrescar();
  }

  /* --- arranque ---------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', function () {
    chart = new BcgChart($('lienzo'), {
      alMoverDivisor: function (eje, valor) {
        if (eje === 'x') {
          $('corte-x').value = valor.toFixed(2);
        } else {
          $('corte-y').value = valor.toFixed(2);
          $('auto-y').checked = false;
        }
        pintarTabla();
      }
    });

    mensajesEnEspanol();
    $('forma').addEventListener('submit', agregar);

    $('btn-limpiar').addEventListener('click', function () {
      sectores = [];
      $('forma').reset();
      limpiarValidez();
      chart.divisorX = 1;
      $('corte-x').value = '1';
      $('auto-y').checked = true;
      refrescar();
    });

    $('btn-ejemplo').addEventListener('click', cargarEjemplo);

    $('btn-png').addEventListener('click', function () {
      chart.descargarPNG('matriz-bcg');
    });

    $('corte-x').addEventListener('input', function () {
      var v = parseFloat(this.value);
      if (isFinite(v) && v > 0) { chart.setDivisores(v, null); pintarTabla(); }
    });

    $('corte-y').addEventListener('input', function () {
      var v = parseFloat(this.value);
      if (isFinite(v)) { $('auto-y').checked = false; chart.setDivisores(null, v); pintarTabla(); }
    });

    $('auto-y').addEventListener('change', refrescar);

    // diálogo de instrucciones
    var velo = $('velo');
    function cerrar() { velo.classList.remove('visible'); }
    $('btn-instrucciones').addEventListener('click', function () { velo.classList.add('visible'); });
    $('velo-cerrar').addEventListener('click', cerrar);
    velo.addEventListener('click', function (e) { if (e.target === velo) cerrar(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && velo.classList.contains('visible')) cerrar();
    });

    refrescar();
  });
})();
