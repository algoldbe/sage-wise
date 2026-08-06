/* segmentacion.js — Laboratorio de Segmentación de Negocios.
   Reconstrucción del laboratorio original en JavaFX (Cereales, 2010).

   La idea del ejercicio: un mismo mercado de cereales de 760 unidades se puede
   partir de tres maneras distintas, y el retrato del portafolio cambia según
   cómo se parta. Los datos son exactamente los del programa original. */
(function () {
  'use strict';

  /* --- catálogo de marcas ------------------------------------------------ */
  /* Cada caja del anaquel es una marca. El color dice de qué empresa es, y la
     letra griega la identifica. Los tres últimos campos son a qué segmento
     pertenece según cada criterio. */

  var EMPRESAS = [
    { nombre: 'Alfa',  color: '#b8271b' },
    { nombre: 'Beta',  color: '#2f9e44' },
    { nombre: 'Gama',  color: '#d4a017' },
    { nombre: 'Delta', color: '#1f6fd0' }
  ];

  var MARCAS = [
    { letra: '✱', emp: 0, mp: 'Trigo', pf: 'Adolescentes', pr: 'Variedad' },
    { letra: 'ψ', emp: 0, mp: 'Arroz', pf: 'Niños',        pr: 'Variedad' },
    { letra: 'ω', emp: 0, mp: 'Maíz',  pf: 'Adultos',      pr: 'Variedad' },
    { letra: 'τ', emp: 0, mp: 'Arroz', pf: 'Adolescentes', pr: 'Economía' },
    { letra: 'ρ', emp: 0, mp: 'Avena', pf: 'Deportistas',  pr: 'Economía' },
    { letra: 'π', emp: 0, mp: 'Arroz', pf: 'Niños',        pr: 'Variedad' },
    { letra: 'ε', emp: 0, mp: 'Maíz',  pf: 'Adolescentes', pr: 'Economía' },
    { letra: 'α', emp: 0, mp: 'Trigo', pf: 'Adultos',      pr: 'Novedad'  },
    { letra: 'σ', emp: 1, mp: 'Avena', pf: 'Deportistas',  pr: 'Variedad' },
    { letra: 'δ', emp: 1, mp: 'Maíz',  pf: 'Adolescentes', pr: 'Variedad' },
    { letra: 'γ', emp: 1, mp: 'Avena', pf: 'Adolescentes', pr: 'Economía' },
    { letra: 'η', emp: 1, mp: 'Maíz',  pf: 'Adolescentes', pr: 'Novedad'  },
    { letra: 'φ', emp: 1, mp: 'Maíz',  pf: 'Niños',        pr: 'Variedad' },
    { letra: 'χ', emp: 2, mp: 'Arroz', pf: 'Niños',        pr: 'Novedad'  },
    { letra: 'λ', emp: 2, mp: 'Avena', pf: 'Niños',        pr: 'Novedad'  },
    { letra: 'ζ', emp: 2, mp: 'Avena', pf: 'Niños',        pr: 'Novedad'  },
    { letra: 'ϖ', emp: 2, mp: 'Trigo', pf: 'Niños',        pr: 'Novedad'  },
    { letra: 'φ', emp: 3, mp: 'Avena', pf: 'Niños',        pr: 'Novedad'  },
    { letra: 'β', emp: 3, mp: 'Maíz',  pf: 'Adolescentes', pr: 'Novedad'  },
    { letra: 'μ', emp: 3, mp: 'Trigo', pf: 'Adultos',      pr: 'Novedad'  }
  ];

  // Cómo están acomodadas las cajas en el anaquel (5 columnas × 4 entrepaños),
  // igual que en el programa original.
  var ORDEN_ANAQUEL = [
    0, 4,  8, 12, 13,
    1, 5,  9, 16, 17,
    2, 6, 10, 14, 18,
    3, 7, 11, 15, 19
  ];

  /* --- los tres ejercicios ---------------------------------------------- */

  var EJERCICIOS = [
    {
      id: 'mp',
      titulo: 'Materia prima',
      pie: 'De qué grano está hecho el cereal',
      campo: 'mp',
      filas: ['Arroz', 'Avena', 'Maíz', 'Trigo'],
      cajas: [40, 40, 70, 50, 15, 20, 165, 45, 20, 70,
              25, 30, 60, 15, 4, 6, 30, 30, 10, 15],
      historicas: [78, 87, 358, 143]
    },
    {
      id: 'pf',
      titulo: 'Perfil del consumidor',
      pie: 'A quién va dirigido el cereal',
      campo: 'pf',
      filas: ['Deportistas', 'Niños', 'Adolescentes', 'Adultos'],
      cajas: [15, 90, 30, 100, 15, 60, 100, 35, 20, 60,
              20, 40, 65, 15, 4, 6, 30, 25, 15, 15],
      historicas: [45, 259, 269, 91]
    },
    {
      id: 'pr',
      titulo: 'Preferencias del consumidor',
      pie: 'Qué busca quien lo compra',
      campo: 'pr',
      filas: ['Economía', 'Variedad', 'Novedad'],
      cajas: [55, 60, 50, 20, 80, 120, 40, 20, 40, 35,
              75, 25, 30, 20, 10, 15, 10, 16, 24, 15],
      historicas: [177, 336, 143]
    }
  ];

  var COLOR_SEGMENTO = ['#1a73e8', '#8bb43c', '#7d3c98', '#b03a2e'];

  /* --- estado ------------------------------------------------------------ */

  var ej = EJERCICIOS[0];
  var vistas = {};              // qué cajas ya destapó el alumno
  var ventasOK = false;
  var posicionesOK = false;
  var empresaActiva = 0;
  var chart;

  var $ = function (id) { return document.getElementById(id); };

  /* --- cálculos ---------------------------------------------------------- */

  // Ventas correctas de una empresa en un segmento: la suma de sus marcas
  // que caen en ese segmento según el criterio elegido.
  function ventasEsperadas(fila, empresa) {
    var seg = ej.filas[fila], total = 0;
    for (var i = 0; i < MARCAS.length; i++) {
      if (MARCAS[i].emp === empresa && MARCAS[i][ej.campo] === seg) total += ej.cajas[i];
    }
    return total;
  }

  function totalSegmento(fila) {
    var t = 0;
    for (var e = 0; e < 4; e++) t += ventasEsperadas(fila, e);
    return t;
  }

  // Crecimiento anual compuesto de los últimos cinco años, en por ciento.
  function crecimiento(fila) {
    var hoy = totalSegmento(fila);
    var antes = ej.historicas[fila];
    if (!antes) return 0;
    return (Math.pow(hoy / antes, 1 / 5) - 1) * 100;
  }

  // Promedio de la industria, ponderado por el tamaño de cada segmento.
  function crecimientoIndustria() {
    var suma = 0, peso = 0;
    for (var f = 0; f < ej.filas.length; f++) {
      var t = totalSegmento(f);
      suma += t * crecimiento(f);
      peso += t;
    }
    return peso ? suma / peso : 0;
  }

  // Posición competitiva relativa: mis ventas entre las del competidor más
  // grande del segmento. Si yo soy el más grande, entre las del segundo.
  function posicionEsperada(fila, empresa) {
    var v = [];
    for (var e = 0; e < 4; e++) v.push(ventasEsperadas(fila, e));
    var mias = v[empresa];
    var orden = v.slice().sort(function (a, b) { return a - b; });
    var lider = orden[3], segundo = orden[2];
    var contra = (mias === lider) ? segundo : lider;
    return contra > 0 ? mias / contra : 0;
  }

  /* --- anaquel ----------------------------------------------------------- */

  function construirAnaquel() {
    var caja = $('anaquel');
    caja.innerHTML = '';

    ORDEN_ANAQUEL.forEach(function (i) {
      var m = MARCAS[i];
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'caja';
      b.dataset.empresa = m.emp;
      b.dataset.marca = i;
      b.title = 'Marca ' + m.letra + ' · Empresa ' + EMPRESAS[m.emp].nombre;
      b.setAttribute('aria-label', 'Marca ' + m.letra + ' de la empresa ' +
        EMPRESAS[m.emp].nombre + '. Ver unidades en exhibición.');
      b.innerHTML =
        '<span class="caja-cuerpo">' +
          '<span class="caja-letra">' + m.letra + '</span>' +
          '<span class="caja-pie"></span>' +
        '</span>' +
        '<span class="caja-conteo"></span>';
      b.addEventListener('click', function () { destapar(i); });
      caja.appendChild(b);
    });

    pintarAnaquel();
  }

  function pintarAnaquel() {
    var botones = $('anaquel').querySelectorAll('.caja');
    Array.prototype.forEach.call(botones, function (b) {
      var i = Number(b.dataset.marca);
      var visto = !!vistas[i];
      b.classList.toggle('vista', visto);
      b.querySelector('.caja-conteo').textContent = visto ? ej.cajas[i] : '';
    });
  }

  function destapar(i) {
    vistas[i] = true;
    pintarAnaquel();
  }

  /* --- tabla 1: ventas --------------------------------------------------- */

  function construirTablaVentas() {
    var t = $('tabla-ventas');
    var cab = '<tr><th style="text-align:left">Segmento</th>';
    EMPRESAS.forEach(function (e, i) {
      cab += '<th class="emp-' + i + '">' + e.nombre + '<span class="franja ' +
        e.nombre.toLowerCase() + '"></span></th>';
    });
    cab += '<th>Ventas<br>actuales</th><th>Ventas hace<br>5 años</th>' +
           '<th>Crecimiento<br>anual %</th></tr>';
    t.querySelector('thead').innerHTML = cab;

    var cuerpo = '';
    ej.filas.forEach(function (seg, f) {
      cuerpo += '<tr><th>' + seg + '</th>';
      for (var e = 0; e < 4; e++) {
        cuerpo += '<td><input type="number" step="1" min="0" data-f="' + f +
                  '" data-e="' + e + '" class="v-celda" aria-label="Ventas de ' +
                  EMPRESAS[e].nombre + ' en ' + seg + '"></td>';
      }
      cuerpo += '<td class="calc" id="v-total-' + f + '">—</td>';
      cuerpo += '<td>' + ej.historicas[f] + '</td>';
      cuerpo += '<td class="calc" id="v-crec-' + f + '">—</td>';
      cuerpo += '</tr>';
    });

    cuerpo += '<tr class="total"><th>Total</th>';
    for (var e = 0; e < 4; e++) cuerpo += '<td id="v-temp-' + e + '">—</td>';
    cuerpo += '<td id="v-tgen">—</td><td>' +
      ej.historicas.reduce(function (a, b) { return a + b; }, 0) +
      '</td><td id="v-tcrec">—</td></tr>';

    t.querySelector('tbody').innerHTML = cuerpo;
    $('rotulo-1').textContent = ej.titulo;
  }

  function leerCelda(inp) {
    var v = inp.value.trim();
    return v === '' ? 0 : Number(v);
  }

  function comprobarVentas() {
    var celdas = $('tabla-ventas').querySelectorAll('.v-celda');
    var errores = 0, llenas = 0;

    Array.prototype.forEach.call(celdas, function (inp) {
      var f = Number(inp.dataset.f), e = Number(inp.dataset.e);
      var puesto = leerCelda(inp);
      var bien = puesto === ventasEsperadas(f, e);
      if (inp.value.trim() !== '') llenas++;
      inp.classList.toggle('bien', bien);
      inp.classList.toggle('error', !bien);
      if (!bien) errores++;
    });

    if (llenas === 0) {
      Array.prototype.forEach.call(celdas, function (i) { i.classList.remove('bien', 'error'); });
      avisar('aviso-1', 'info', 'Primero destape las cajas del anaquel y llene la tabla. ' +
        'La Tabla de marcas le dice a qué segmento pertenece cada una.');
      return;
    }

    if (errores > 0) {
      ventasOK = false;
      bloquear('panel-posicion', true);
      bloquear('panel-grafica', true);
      avisar('aviso-1', 'mal', errores === 1
        ? 'Hay 1 casilla que no cuadra, marcada en rojo. Revísela y vuelva a comprobar.'
        : 'Hay ' + errores + ' casillas que no cuadran, marcadas en rojo. Revíselas y vuelva a comprobar.');
      limpiarCalculados();
      return;
    }

    ventasOK = true;
    llenarCalculados();
    construirTablaPosicion();
    bloquear('panel-posicion', false);
    avisar('aviso-1', 'ok', 'Tabla correcta. Ya están calculados los totales y el crecimiento ' +
      'anual de cada segmento. Siga con el paso 3.');
  }

  function llenarCalculados() {
    var granTotal = 0;
    ej.filas.forEach(function (seg, f) {
      var t = totalSegmento(f);
      granTotal += t;
      $('v-total-' + f).textContent = t;
      $('v-crec-' + f).textContent = crecimiento(f).toFixed(2);
    });
    for (var e = 0; e < 4; e++) {
      var te = 0;
      for (var f = 0; f < ej.filas.length; f++) te += ventasEsperadas(f, e);
      $('v-temp-' + e).textContent = te;
    }
    $('v-tgen').textContent = granTotal;
    $('v-tcrec').textContent = crecimientoIndustria().toFixed(2);
  }

  function limpiarCalculados() {
    ej.filas.forEach(function (seg, f) {
      $('v-total-' + f).textContent = '—';
      $('v-crec-' + f).textContent = '—';
    });
    for (var e = 0; e < 4; e++) $('v-temp-' + e).textContent = '—';
    $('v-tgen').textContent = '—';
    $('v-tcrec').textContent = '—';
  }

  /* --- tabla 2: posición competitiva relativa ---------------------------- */

  function construirTablaPosicion() {
    var t = $('tabla-posicion');
    var cab = '<tr><th style="text-align:left">Segmento</th>';
    EMPRESAS.forEach(function (e, i) {
      cab += '<th class="emp-' + i + '">' + e.nombre + '<span class="franja ' +
        e.nombre.toLowerCase() + '"></span></th>';
    });
    cab += '</tr>';
    t.querySelector('thead').innerHTML = cab;

    var cuerpo = '';
    ej.filas.forEach(function (seg, f) {
      cuerpo += '<tr><th>' + seg + '</th>';
      for (var e = 0; e < 4; e++) {
        cuerpo += '<td><input type="number" step="0.01" min="0" data-f="' + f +
                  '" data-e="' + e + '" class="p-celda" aria-label="Posición de ' +
                  EMPRESAS[e].nombre + ' en ' + seg + '"></td>';
      }
      cuerpo += '</tr>';
    });
    t.querySelector('tbody').innerHTML = cuerpo;
  }

  function comprobarPosiciones() {
    var celdas = $('tabla-posicion').querySelectorAll('.p-celda');
    var errores = 0, llenas = 0;

    Array.prototype.forEach.call(celdas, function (inp) {
      var f = Number(inp.dataset.f), e = Number(inp.dataset.e);
      var puesto = leerCelda(inp);
      // se acepta cualquier redondeo razonable a dos decimales
      var bien = Math.abs(puesto - posicionEsperada(f, e)) < 0.01;
      if (inp.value.trim() !== '') llenas++;
      inp.classList.toggle('bien', bien);
      inp.classList.toggle('error', !bien);
      if (!bien) errores++;
    });

    if (llenas === 0) {
      Array.prototype.forEach.call(celdas, function (i) { i.classList.remove('bien', 'error'); });
      avisar('aviso-2', 'info', 'Llene la tabla. En cada renglón compare las ventas de cada ' +
        'empresa contra las del competidor más grande de ese segmento.');
      return;
    }

    if (errores > 0) {
      posicionesOK = false;
      bloquear('panel-grafica', true);
      avisar('aviso-2', 'mal', errores === 1
        ? 'Hay 1 casilla que no cuadra, marcada en rojo.'
        : 'Hay ' + errores + ' casillas que no cuadran, marcadas en rojo.');
      return;
    }

    posicionesOK = true;
    bloquear('panel-grafica', false);
    avisar('aviso-2', 'ok', 'Correcto. Ya puede graficar el portafolio de cada empresa ' +
      'en el paso 4.');
    graficar(empresaActiva);
  }

  /* --- gráfica ----------------------------------------------------------- */

  function construirSelector() {
    var s = $('selector-empresa');
    s.innerHTML = '';
    EMPRESAS.forEach(function (e, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pastilla' + (i === empresaActiva ? ' activo' : '');
      b.dataset.empresa = i;
      b.textContent = 'Empresa ' + e.nombre;
      b.addEventListener('click', function () { graficar(i); });
      s.appendChild(b);
    });
  }

  function graficar(empresa) {
    empresaActiva = empresa;
    Array.prototype.forEach.call($('selector-empresa').querySelectorAll('.pastilla'), function (b) {
      b.classList.toggle('activo', Number(b.dataset.empresa) === empresa);
    });

    var burbujas = [];
    var minY = -4, maxY = 12;

    ej.filas.forEach(function (seg, f) {
      var ventas = ventasEsperadas(f, empresa);
      if (ventas <= 0) return;                  // sin producto en ese segmento
      var c = crecimiento(f);
      minY = Math.min(minY, Math.floor(c) - 2);
      maxY = Math.max(maxY, Math.ceil(c) + 2);
      burbujas.push({
        razon: posicionEsperada(f, empresa),
        y: c,
        tamano: ventas,
        etiqueta: seg.slice(0, 3),
        color: COLOR_SEGMENTO[f % COLOR_SEGMENTO.length]
      });
    });

    chart.yMin = minY;
    chart.yMax = maxY;
    chart.setDivisores(1, crecimientoIndustria());
    chart.setBurbujas(burbujas);

    var l = $('leyenda');
    l.innerHTML = '';
    ej.filas.forEach(function (seg, f) {
      var ventas = ventasEsperadas(f, empresa);
      var e = document.createElement('span');
      e.innerHTML = '<i style="background:' + COLOR_SEGMENTO[f % COLOR_SEGMENTO.length] +
        (ventas > 0 ? '' : ';opacity:0.28') + '"></i>';
      e.appendChild(document.createTextNode(
        seg + (ventas > 0 ? ' · ' + ventas + ' unidades' : ' · no participa')));
      l.appendChild(e);
    });
  }

  /* --- utilería de interfaz ---------------------------------------------- */

  function bloquear(id, si) {
    $(id).classList.toggle('bloqueado', si);
  }

  function avisar(id, tipo, texto) {
    var a = $(id);
    a.className = 'aviso visible ' + tipo;
    a.textContent = texto;
  }

  function ocultarAviso(id) {
    $(id).className = 'aviso';
  }

  /* --- criterios --------------------------------------------------------- */

  function construirCriterios() {
    var c = $('criterios');
    c.innerHTML = '';
    EJERCICIOS.forEach(function (x, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'criterio' + (x === ej ? ' activo' : '');
      b.innerHTML = '<b></b><span></span>';
      b.querySelector('b').textContent = x.titulo;
      b.querySelector('span').textContent = x.pie;
      b.addEventListener('click', function () { elegirCriterio(i); });
      c.appendChild(b);
    });
  }

  function elegirCriterio(i) {
    ej = EJERCICIOS[i];
    vistas = {};
    ventasOK = false;
    posicionesOK = false;
    empresaActiva = 0;

    construirCriterios();
    pintarAnaquel();
    construirTablaVentas();
    construirTablaPosicion();
    limpiarCalculados();
    ocultarAviso('aviso-1');
    ocultarAviso('aviso-2');
    bloquear('panel-posicion', true);
    bloquear('panel-grafica', true);
    chart.setBurbujas([]);
    $('leyenda').innerHTML = '';
  }

  /* --- diálogos ---------------------------------------------------------- */

  function abrirVelo(titulo, html) {
    $('velo-titulo').textContent = titulo;
    $('velo-cuerpo').innerHTML = html;
    $('velo').classList.add('visible');
  }

  function htmlCatalogo() {
    var etiquetas = {
      mp: 'Materia prima', pf: 'Perfil', pr: 'Preferencia'
    };
    var html = '<p>Cada marca del anaquel pertenece a un segmento distinto según ' +
      'con qué criterio se parta el mercado. Ésta es la ficha de las veinte marcas.</p>' +
      '<div class="catalogo">';

    EMPRESAS.forEach(function (e, ie) {
      html += '<div class="catalogo-empresa"><h4 style="background:' + e.color + '">Empresa ' +
        e.nombre + '</h4><table><thead><tr><th>Marca</th><th>' + etiquetas.mp +
        '</th><th>' + etiquetas.pf + '</th><th>' + etiquetas.pr + '</th></tr></thead><tbody>';
      MARCAS.forEach(function (m) {
        if (m.emp !== ie) return;
        html += '<tr><td style="color:' + e.color + '">' + m.letra + '</td><td>' +
          m.mp + '</td><td>' + m.pf + '</td><td>' + m.pr + '</td></tr>';
      });
      html += '</tbody></table></div>';
    });

    return html + '</div>';
  }

  function htmlInstrucciones() {
    return '' +
      '<h3>De qué se trata</h3>' +
      '<p>Cuatro empresas (Alfa, Beta, Gama y Delta) venden cereal en el mismo anaquel. ' +
      'Entre las veinte marcas suman 760 unidades. Ese mercado es siempre el mismo, pero se ' +
      'puede partir de tres maneras distintas, y el retrato del portafolio de cada empresa ' +
      'cambia según cómo se parta. Ése es el punto del ejercicio.</p>' +

      '<h3>Cómo se hace</h3>' +
      '<ol class="pasos-guia">' +
      '<li><b>Elija un criterio</b> de segmentación. Los datos del anaquel cambian con cada uno.</li>' +
      '<li><b>Haga clic en cada caja</b> para ver cuántas unidades tiene en exhibición. ' +
      'Con la <b>Tabla de marcas</b> sabrá a qué segmento pertenece cada una.</li>' +
      '<li><b>Llene la tabla de ventas</b>: sume las unidades de cada empresa en cada segmento. ' +
      'Al comprobar, se calculan los totales y el crecimiento anual compuesto de los ' +
      'últimos cinco años.</li>' +
      '<li><b>Calcule la posición competitiva relativa</b>: en cada segmento, las ventas de la ' +
      'empresa entre las del competidor más grande. Si la empresa es la más grande, entre las ' +
      'del segundo lugar.</li>' +
      '<li><b>Grafique</b> el portafolio de cada empresa y compare.</li>' +
      '</ol>' +

      '<h3>Cómo se lee la matriz</h3>' +
      '<p>El <b>área</b> de cada círculo es el tamaño del sector. La línea vertical marca el ' +
      '<b>1X</b>: a su derecha la empresa vende más que su competidor más grande. La línea ' +
      'horizontal es el <b>crecimiento promedio de la industria</b>: arriba de ella están los ' +
      'segmentos que crecen más rápido que el mercado.</p>' +
      '<img src="img/matriz-explicacion.jpg" alt="Indicaciones para la aplicación de la matriz del portafolio de sectores de negocio" style="margin-top:0.8rem">';
  }

  /* --- arranque ---------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', function () {
    chart = new BcgChart($('lienzo'), { divisoresMoviles: false });

    construirCriterios();
    construirAnaquel();
    construirTablaVentas();
    construirTablaPosicion();
    construirSelector();
    bloquear('panel-posicion', true);
    bloquear('panel-grafica', true);

    $('btn-comprobar-1').addEventListener('click', comprobarVentas);
    $('btn-comprobar-2').addEventListener('click', comprobarPosiciones);

    $('btn-limpiar-1').addEventListener('click', function () {
      Array.prototype.forEach.call($('tabla-ventas').querySelectorAll('.v-celda'), function (i) {
        i.value = '';
        i.classList.remove('bien', 'error');
      });
      ventasOK = false;
      limpiarCalculados();
      ocultarAviso('aviso-1');
      bloquear('panel-posicion', true);
      bloquear('panel-grafica', true);
    });

    $('btn-limpiar-2').addEventListener('click', function () {
      Array.prototype.forEach.call($('tabla-posicion').querySelectorAll('.p-celda'), function (i) {
        i.value = '';
        i.classList.remove('bien', 'error');
      });
      posicionesOK = false;
      ocultarAviso('aviso-2');
      bloquear('panel-grafica', true);
    });

    $('btn-destapar').addEventListener('click', function () {
      for (var i = 0; i < MARCAS.length; i++) vistas[i] = true;
      pintarAnaquel();
    });

    $('btn-reiniciar').addEventListener('click', function () {
      elegirCriterio(EJERCICIOS.indexOf(ej));
    });

    $('btn-png').addEventListener('click', function () {
      chart.descargarPNG('portafolio-' + EMPRESAS[empresaActiva].nombre.toLowerCase());
    });

    $('btn-instrucciones').addEventListener('click', function () {
      abrirVelo('Instrucciones del laboratorio', htmlInstrucciones());
    });
    $('btn-catalogo').addEventListener('click', function () {
      abrirVelo('Tabla de marcas', htmlCatalogo());
    });

    var velo = $('velo');
    function cerrar() { velo.classList.remove('visible'); }
    $('velo-cerrar').addEventListener('click', cerrar);
    velo.addEventListener('click', function (e) { if (e.target === velo) cerrar(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && velo.classList.contains('visible')) cerrar();
    });
  });
})();
