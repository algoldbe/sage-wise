# Programas originales (2010)

Aquí están, tal como los envió Jorge, los dos programas de los que salieron los
laboratorios de esta carpeta. Se guardan como referencia y para dejar el rastro
de dónde vienen los datos del ejercicio.

| Archivo | Programa original | Reconstrucción |
|---|---|---|
| `matrizbcg.zip` | Graficador de Sectores de Negocios | [`../matriz-bcg.html`](../matriz-bcg.html) |
| `Cereales.zip` | Segmentación de Negocios | [`../segmentacion.html`](../segmentacion.html) |

## Por qué ya no corren

Están hechos en **JavaFX Script**, un lenguaje que Oracle descontinuó en 2011.
No queda compilador para los archivos `.fx`. Además dependían de dos cosas que
también desaparecieron:

- Los *applets* de Java, que los navegadores dejaron de admitir hacia 2015.
- Java Web Start (los archivos `.jnlp`), retirado a partir de Java 11.

Por eso no basta con dar doble clic: los `.jar` no tienen dónde ejecutarse. La
lógica sí está completa y legible en el código fuente, que es de donde se
reconstruyeron los laboratorios nuevos.

## De dónde salen los datos del ejercicio

Los tres ejercicios de segmentación (materia prima, perfil del consumidor y
preferencias del consumidor) usan exactamente las mismas cifras del original.
Se tomaron de `Cereales/src/cereales/Main.fx`:

- Las unidades de cada marca, de las funciones `asignardatos`, `asignardatos2`
  y `asignardatos3`.
- Las respuestas correctas, de `sumarcereales`, `sumarcereales2` y
  `sumarcereales3`.
- La ficha de las veinte marcas, de la pizarra `imagenes/info.png`.

La reconstrucción se verificó contra esos mismos valores: los tres ejercicios
suman 760 unidades y arrojan un crecimiento promedio de la industria de 3.01 %,
3.02 % y 3.01 %.

## Una nota sobre el contenido

A `Cereales.zip` se le quitó el archivo `build/.keystore`, que era la llave de
firma digital del proyecto. Este repositorio es público y una llave privada no
debe publicarse, aunque en este caso ya no tenga uso. Todo lo demás está
íntegro: código fuente, imágenes, `.jar` compilados y archivos de proyecto.
