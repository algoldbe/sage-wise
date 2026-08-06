/* bcg-chart.js
   Matriz de portafolio de sectores de negocio (BCG), dibujada en canvas.
   La usan los dos laboratorios: la Matriz BCG y el de Segmentación.

   Ejes, tal como los definió el ejercicio original:
     - X: posición competitiva relativa, escala logarítmica de 0.06X a 8X.
          El corte en 1X significa "vendo lo mismo que mi competidor más grande".
     - Y: crecimiento anual del sector, en por ciento.
     - Área del círculo: tamaño del sector (ventas).
*/
(function (global) {
  'use strict';

  // Los ocho tramos del eje X. Cada uno ocupa 2 unidades de las 16 del eje,
  // y por dentro se interpola lineal: así se reproduce igual que el original.
  var TRAMOS = [
    { lo: 0,    hi: 0.06 },
    { lo: 0.06, hi: 0.12 },
    { lo: 0.12, hi: 0.25 },
    { lo: 0.25, hi: 0.5  },
    { lo: 0.5,  hi: 1    },
    { lo: 1,    hi: 2    },
    { lo: 2,    hi: 4    },
    { lo: 4,    hi: 8    }
  ];
  var X_MAX = 16;                                    // unidades del eje X
  var ETIQUETAS_X = ['0.06X', '0.12X', '0.25X', '0.5X', '1X', '2X', '4X', '8X'];

  // Razón (0.06 … 8) -> unidades del eje (0 … 16)
  function razonAUnidades(r) {
    if (!isFinite(r) || r <= 0) return 0;
    if (r >= 8) return X_MAX;
    for (var i = 0; i < TRAMOS.length; i++) {
      var t = TRAMOS[i];
      if (r <= t.hi) return i * 2 + 2 * (r - t.lo) / (t.hi - t.lo);
    }
    return X_MAX;
  }

  // Unidades del eje -> razón, para leer de vuelta la línea divisoria
  function unidadesARazon(u) {
    u = Math.max(0, Math.min(X_MAX, u));
    var i = Math.min(TRAMOS.length - 1, Math.floor(u / 2));
    var t = TRAMOS[i];
    return t.lo + (u - i * 2) / 2 * (t.hi - t.lo);
  }

  var CUADRANTES = [
    { pos: 'ai', simbolo: '?',  nombre: 'Interrogación', color: '#8e44ad' },
    { pos: 'ad', simbolo: '★',  nombre: 'Estrella',      color: '#e67e22' },
    { pos: 'bd', simbolo: '$',  nombre: 'Vaca lechera',  color: '#16a085' },
    { pos: 'bi', simbolo: '↓',  nombre: 'Perro',         color: '#7f8c8d' }
  ];

  function BcgChart(canvas, opciones) {
    opciones = opciones || {};
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.etiquetaX = opciones.etiquetaX || 'Posición competitiva relativa (escala logarítmica)';
    this.etiquetaY = opciones.etiquetaY || 'Crecimiento anual del sector  %';
    this.yMin = opciones.yMin != null ? opciones.yMin : -4;
    this.yMax = opciones.yMax != null ? opciones.yMax : 12;
    this.mostrarCuadrantes = opciones.mostrarCuadrantes !== false;
    this.divisoresMoviles = opciones.divisoresMoviles !== false;
    this.alMoverDivisor = opciones.alMoverDivisor || function () {};

    this.burbujas = [];            // {razon, y, tamano, etiqueta, color}
    this.divisorX = 1;             // en razón (1X)
    this.divisorY = 0;             // en % de crecimiento
    this.mostrarDivisorY = true;

    this._arrastrando = null;      // 'x' | 'y' | null
    this._hover = null;

    this._margen = { arriba: 18, derecha: 18, abajo: 58, izquierda: 66 };

    this._instalarEventos();
    this._observarTamano();
  }

  BcgChart.razonAUnidades = razonAUnidades;
  BcgChart.unidadesARazon = unidadesARazon;

  BcgChart.prototype.setBurbujas = function (lista) {
    this.burbujas = (lista || []).filter(function (b) {
      return b && isFinite(b.razon) && isFinite(b.y) && b.tamano > 0;
    });
    this.dibujar();
  };

  BcgChart.prototype.setDivisores = function (x, y) {
    if (x != null && isFinite(x)) this.divisorX = Math.max(0.06, Math.min(8, x));
    if (y != null && isFinite(y)) this.divisorY = y;
    this.dibujar();
  };

  BcgChart.prototype.setRangoY = function (min, max) {
    this.yMin = min;
    this.yMax = max;
    this.dibujar();
  };

  /* --- geometría --------------------------------------------------------- */

  BcgChart.prototype._area = function () {
    var m = this._margen;
    return {
      x: m.izquierda,
      y: m.arriba,
      w: Math.max(10, this._ancho - m.izquierda - m.derecha),
      h: Math.max(10, this._alto - m.arriba - m.abajo)
    };
  };

  BcgChart.prototype._px = function (unidades) {
    var a = this._area();
    return a.x + (unidades / X_MAX) * a.w;
  };

  BcgChart.prototype._py = function (valor) {
    var a = this._area();
    var t = (valor - this.yMin) / (this.yMax - this.yMin);
    return a.y + a.h - t * a.h;
  };

  // Radio en píxeles: el ÁREA es la que representa el tamaño del sector,
  // así que el radio va con la raíz cuadrada.
  BcgChart.prototype._radio = function (tamano) {
    var a = this._area();
    var max = 1;
    for (var i = 0; i < this.burbujas.length; i++) {
      if (this.burbujas[i].tamano > max) max = this.burbujas[i].tamano;
    }
    var rMax = Math.max(13, Math.min(a.w, a.h) * 0.16);
    return Math.max(5, rMax * Math.sqrt(Math.max(0, tamano) / max));
  };

  /* --- dibujo ------------------------------------------------------------ */

  BcgChart.prototype.dibujar = function () {
    if (!this._ancho || !this._alto) return;
    var ctx = this.ctx;
    var a = this._area();

    ctx.setTransform(this._dpr, 0, 0, this._dpr, 0, 0);
    ctx.clearRect(0, 0, this._ancho, this._alto);

    // fondo del área de graficado
    ctx.fillStyle = '#fdfdfb';
    ctx.fillRect(a.x, a.y, a.w, a.h);

    this._dibujarRejilla();
    if (this.mostrarCuadrantes) this._dibujarCuadrantes();
    this._dibujarDivisores();
    this._dibujarBurbujas();
    this._dibujarEjes();
    if (this._hover != null) this._dibujarGlobo();
  };

  BcgChart.prototype._dibujarRejilla = function () {
    var ctx = this.ctx, a = this._area(), i;

    ctx.strokeStyle = '#e8e8e2';
    ctx.lineWidth = 1;

    for (i = 1; i <= 8; i++) {                      // verticales: los ocho tramos
      var x = Math.round(this._px(i * 2)) + 0.5;
      ctx.beginPath();
      ctx.moveTo(x, a.y);
      ctx.lineTo(x, a.y + a.h);
      ctx.stroke();
    }

    var paso = this._pasoY();
    for (i = Math.ceil(this.yMin / paso) * paso; i <= this.yMax; i += paso) {
      var y = Math.round(this._py(i)) + 0.5;
      ctx.beginPath();
      ctx.moveTo(a.x, y);
      ctx.lineTo(a.x + a.w, y);
      ctx.stroke();
    }
  };

  BcgChart.prototype._pasoY = function () {
    var rango = this.yMax - this.yMin;
    if (rango <= 10) return 1;
    if (rango <= 24) return 2;
    if (rango <= 60) return 5;
    return 10;
  };

  BcgChart.prototype._dibujarCuadrantes = function () {
    var ctx = this.ctx, a = this._area();
    var cx = this._px(razonAUnidades(this.divisorX));
    var cy = this.mostrarDivisorY ? this._py(this.divisorY) : a.y + a.h / 2;
    var chico = Math.min(a.w, a.h) < 260;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (var i = 0; i < CUADRANTES.length; i++) {
      var q = CUADRANTES[i];
      var izq = q.pos[1] === 'i';
      var arr = q.pos[0] === 'a';
      var x0 = izq ? a.x : cx, x1 = izq ? cx : a.x + a.w;
      var y0 = arr ? a.y : cy, y1 = arr ? cy : a.y + a.h;
      if (x1 - x0 < 44 || y1 - y0 < 40) continue;    // no cabe, mejor no estorbar

      var mx = (x0 + x1) / 2, my = (y0 + y1) / 2;

      ctx.globalAlpha = 0.13;
      ctx.fillStyle = q.color;
      ctx.font = '600 ' + Math.round(Math.min(46, (y1 - y0) * 0.42)) + 'px Georgia, serif';
      ctx.fillText(q.simbolo, mx, my - (chico ? 0 : 9));

      if (!chico) {
        ctx.globalAlpha = 0.42;
        ctx.font = '600 11px system-ui, -apple-system, "Segoe UI", sans-serif';
        ctx.fillText(q.nombre.toUpperCase(), mx, my + 20);
      }
    }
    ctx.restore();
  };

  BcgChart.prototype._dibujarDivisores = function () {
    var ctx = this.ctx, a = this._area();

    ctx.save();
    ctx.strokeStyle = '#1e8449';
    ctx.lineWidth = 3;

    var x = Math.round(this._px(razonAUnidades(this.divisorX))) + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, a.y);
    ctx.lineTo(x, a.y + a.h);
    ctx.stroke();

    if (this.mostrarDivisorY) {
      var y = Math.round(this._py(this.divisorY)) + 0.5;
      ctx.beginPath();
      ctx.moveTo(a.x, y);
      ctx.lineTo(a.x + a.w, y);
      ctx.stroke();

      // rótulo del crecimiento promedio, pegado a la línea
      var txt = this.divisorY.toFixed(2) + ' %';
      ctx.font = '600 11px system-ui, -apple-system, "Segoe UI", sans-serif';
      var w = ctx.measureText(txt).width + 10;
      ctx.fillStyle = '#1e8449';
      ctx.fillRect(a.x + a.w - w - 4, y - 17, w, 15);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(txt, a.x + a.w - w / 2 - 4, y - 9);
    }

    // Agarraderas por dentro del marco, para no encimarse con las etiquetas
    // de los ejes.
    if (this.divisoresMoviles) {
      ctx.fillStyle = '#1e8449';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, a.y + 11, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      if (this.mostrarDivisorY) {
        ctx.beginPath();
        ctx.arc(a.x + 11, this._py(this.divisorY), 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
    ctx.restore();
  };

  BcgChart.prototype._dibujarBurbujas = function () {
    var ctx = this.ctx, a = this._area(), i;

    ctx.save();
    ctx.beginPath();
    ctx.rect(a.x, a.y, a.w, a.h);
    ctx.clip();

    // las grandes al fondo, para que las chicas no queden tapadas
    var orden = this.burbujas.map(function (b, idx) { return idx; })
      .sort(function (p, q) { return this.burbujas[q].tamano - this.burbujas[p].tamano; }.bind(this));

    for (var k = 0; k < orden.length; k++) {
      i = orden[k];
      var b = this.burbujas[i];
      var x = this._px(razonAUnidades(b.razon));
      var y = this._py(b.y);
      var r = this._radio(b.tamano);
      var resaltada = this._hover === i;

      ctx.globalAlpha = resaltada ? 0.78 : 0.58;
      ctx.fillStyle = b.color || '#1a73e8';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.strokeStyle = b.color || '#1a73e8';
      ctx.lineWidth = resaltada ? 3 : 1.5;
      ctx.stroke();

      if (b.etiqueta && r >= 13) {
        ctx.fillStyle = '#fff';
        ctx.font = '700 ' + Math.min(15, Math.max(9, Math.round(r * 0.55))) + 'px system-ui, -apple-system, "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = 'rgba(0,0,0,0.35)';
        ctx.lineWidth = 2.5;
        ctx.strokeText(b.etiqueta, x, y);
        ctx.fillText(b.etiqueta, x, y);
      }
    }
    ctx.restore();
  };

  BcgChart.prototype._dibujarEjes = function () {
    var ctx = this.ctx, a = this._area(), i;

    ctx.save();
    ctx.strokeStyle = '#5f6368';
    ctx.lineWidth = 1;
    ctx.strokeRect(a.x + 0.5, a.y + 0.5, a.w, a.h);

    ctx.fillStyle = '#5f6368';
    ctx.font = '11px system-ui, -apple-system, "Segoe UI", sans-serif';

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    // En pantalla chica va una sí y una no, pero el 1X y el extremo nunca se saltan.
    var saltar = a.w < 380 ? 2 : 1;
    for (i = 0; i < ETIQUETAS_X.length; i++) {
      if (saltar === 2 && i % 2 === 1 &&
          ETIQUETAS_X[i] !== '1X' && i !== ETIQUETAS_X.length - 1) continue;
      ctx.fillText(ETIQUETAS_X[i], this._px((i + 1) * 2), a.y + a.h + 7);
    }

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    var paso = this._pasoY();
    for (i = Math.ceil(this.yMin / paso) * paso; i <= this.yMax; i += paso) {
      ctx.fillText(String(i), a.x - 7, this._py(i));
    }

    ctx.fillStyle = '#3c4043';
    ctx.font = '600 11.5px system-ui, -apple-system, "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(this.etiquetaX, a.x + a.w / 2, this._alto - 6);

    ctx.save();
    ctx.translate(13, a.y + a.h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textBaseline = 'top';
    ctx.fillText(this.etiquetaY, 0, 0);
    ctx.restore();

    ctx.restore();
  };

  BcgChart.prototype._dibujarGlobo = function () {
    var b = this.burbujas[this._hover];
    if (!b) return;
    var ctx = this.ctx, a = this._area();
    var lineas = [
      b.etiqueta || 'Sector',
      'Tamaño: ' + Math.round(b.tamano),
      'Crecimiento: ' + b.y.toFixed(2) + ' %',
      'Posición: ' + b.razon.toFixed(2) + 'X'
    ];

    ctx.save();
    ctx.font = '11.5px system-ui, -apple-system, "Segoe UI", sans-serif';
    var w = 0;
    for (var i = 0; i < lineas.length; i++) w = Math.max(w, ctx.measureText(lineas[i]).width);
    w += 18;
    var h = lineas.length * 15 + 12;

    var x = this._px(razonAUnidades(b.razon)) + this._radio(b.tamano) + 10;
    var y = this._py(b.y) - h / 2;
    if (x + w > a.x + a.w) x = this._px(razonAUnidades(b.razon)) - this._radio(b.tamano) - 10 - w;
    y = Math.max(a.y + 2, Math.min(a.y + a.h - h - 2, y));

    ctx.fillStyle = 'rgba(32,33,36,0.94)';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, 6); else ctx.rect(x, y, w, h);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    for (i = 0; i < lineas.length; i++) {
      ctx.fillStyle = i === 0 ? '#fff' : 'rgba(255,255,255,0.82)';
      ctx.font = (i === 0 ? '600 12px ' : '11.5px ') + 'system-ui, -apple-system, "Segoe UI", sans-serif';
      ctx.fillText(lineas[i], x + 9, y + 7 + i * 15);
    }
    ctx.restore();
  };

  /* --- interacción ------------------------------------------------------- */

  BcgChart.prototype._puntero = function (ev) {
    var r = this.canvas.getBoundingClientRect();
    var t = ev.touches && ev.touches[0] ? ev.touches[0] : ev;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  };

  BcgChart.prototype._instalarEventos = function () {
    var self = this;

    function empezar(ev) {
      if (!self.divisoresMoviles) return;
      var p = self._puntero(ev);
      var a = self._area();
      var dx = Math.abs(p.x - self._px(razonAUnidades(self.divisorX)));
      var dy = Math.abs(p.y - self._py(self.divisorY));
      if (dx <= 10 && p.y >= a.y - 4 && p.y <= a.y + a.h + 18) self._arrastrando = 'x';
      else if (self.mostrarDivisorY && dy <= 10 && p.x >= a.x - 18 && p.x <= a.x + a.w) self._arrastrando = 'y';
      if (self._arrastrando) { ev.preventDefault(); self.canvas.style.cursor = 'grabbing'; }
    }

    function mover(ev) {
      var p = self._puntero(ev);
      var a = self._area();

      if (self._arrastrando === 'x') {
        ev.preventDefault();
        var u = ((p.x - a.x) / a.w) * X_MAX;
        self.divisorX = unidadesARazon(u);
        self.alMoverDivisor('x', self.divisorX);
        self.dibujar();
        return;
      }
      if (self._arrastrando === 'y') {
        ev.preventDefault();
        var v = self.yMin + (1 - (p.y - a.y) / a.h) * (self.yMax - self.yMin);
        self.divisorY = Math.max(self.yMin, Math.min(self.yMax, v));
        self.alMoverDivisor('y', self.divisorY);
        self.dibujar();
        return;
      }

      // ¿está el ratón encima de alguna burbuja?
      var antes = self._hover;
      self._hover = null;
      for (var i = self.burbujas.length - 1; i >= 0; i--) {
        var b = self.burbujas[i];
        var d = Math.hypot(p.x - self._px(razonAUnidades(b.razon)), p.y - self._py(b.y));
        if (d <= self._radio(b.tamano)) { self._hover = i; break; }
      }

      var sobreDivisor = self.divisoresMoviles && (
        Math.abs(p.x - self._px(razonAUnidades(self.divisorX))) <= 10 ||
        (self.mostrarDivisorY && Math.abs(p.y - self._py(self.divisorY)) <= 10));
      self.canvas.style.cursor = sobreDivisor ? 'grab' : (self._hover != null ? 'pointer' : 'default');

      if (antes !== self._hover) self.dibujar();
    }

    function terminar() {
      if (self._arrastrando) { self._arrastrando = null; self.canvas.style.cursor = 'grab'; }
    }

    this.canvas.addEventListener('mousedown', empezar);
    this.canvas.addEventListener('touchstart', empezar, { passive: false });
    window.addEventListener('mousemove', mover);
    this.canvas.addEventListener('touchmove', mover, { passive: false });
    window.addEventListener('mouseup', terminar);
    window.addEventListener('touchend', terminar);
    this.canvas.addEventListener('mouseleave', function () {
      if (!self._arrastrando && self._hover != null) { self._hover = null; self.dibujar(); }
    });
  };

  BcgChart.prototype._observarTamano = function () {
    var self = this;
    function medir() {
      var caja = self.canvas.parentNode.getBoundingClientRect();
      var ancho = Math.max(240, Math.round(caja.width));
      var alto = Math.max(220, Math.round(caja.height || ancho * 0.75));
      var dpr = window.devicePixelRatio || 1;
      if (ancho === self._ancho && alto === self._alto && dpr === self._dpr) return;
      self._ancho = ancho; self._alto = alto; self._dpr = dpr;
      self.canvas.width = Math.round(ancho * dpr);
      self.canvas.height = Math.round(alto * dpr);
      self.canvas.style.width = ancho + 'px';
      self.canvas.style.height = alto + 'px';
      self._margen.izquierda = ancho < 380 ? 48 : 66;
      self.dibujar();
    }
    medir();
    if (window.ResizeObserver) new ResizeObserver(medir).observe(this.canvas.parentNode);
    window.addEventListener('resize', medir);
    this.remedir = medir;
  };

  /* --- exportar ---------------------------------------------------------- */

  BcgChart.prototype.descargarPNG = function (nombre) {
    var tmp = document.createElement('canvas');
    tmp.width = this.canvas.width;
    tmp.height = this.canvas.height;
    var c = tmp.getContext('2d');
    c.fillStyle = '#fff';
    c.fillRect(0, 0, tmp.width, tmp.height);
    c.drawImage(this.canvas, 0, 0);
    var a = document.createElement('a');
    a.download = (nombre || 'matriz-bcg') + '.png';
    a.href = tmp.toDataURL('image/png');
    a.click();
  };

  global.BcgChart = BcgChart;
})(window);
