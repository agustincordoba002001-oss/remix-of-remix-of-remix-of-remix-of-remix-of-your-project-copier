# Historial de conversaciones del proyecto

Registro de todo lo que se pidió y lo que se hizo, del 7 al 8 de septiembre de
2026. Se conserva para que un clon del repositorio tenga la misma memoria que
un remix.

---

**Usuario:** ¿Viste el último video de prueba que se llama Volumen uno? Habíamos
hecho una animación, ¿podés terminarla? Y las letras.

**Cronos:** Sí: estilo "Volumen 1" (pizarra blanca, siluetas a color, mano con
lápiz, títulos en rojo/azul/dorado). El último archivo armado es
`alunizaje_luna_volumen2.mp4`, sobre el Apolo 1, con narración de Daniela y
citas con la otra voz.

---

**Usuario:** Pasame los diez segundos del último, "Aterrizaje Luna" volumen dos.

**Cronos:** Entregados los primeros 10 segundos
(`alunizaje_luna_volumen2_primeros_10s.mp4`).

---

**Usuario:** Todo igual como estaba; solo arreglá las letras. Que se escriban y
queden quietas, sin movimiento. Hacé una prueba de diez segundos.

**Cronos:** El movimiento venía del parámetro `slide`. Se puso en 0, se detectaron
los 18 comienzos de pantalla analizando la tinta por fotograma y se generó
`build_volumen2_static.py`. Prueba entregada:
`prueba_letras_quietas_10s.mp4`. Las letras se escriben y quedan quietas.

---

**Usuario:** Perfecto, me encantó la creatividad del guion. Seguí y terminá el
guion completo del video de 20 minutos, con el mismo estilo.

**Cronos:** Documental completo de 13:49
(`alunizaje_luna_volumen1_completo.mp4`), 96 escenas narradas con Piper
(Daniela + davefx), scripts `audio_volumen2_continuacion.py`,
`sintetizar_continuacion.py` y `build_continuacion.py`. Unión sin saltos.

---

**Usuario:** La parte nueva no es entretenida, se repiten imágenes y tienen poco
color. Mejorá el guion, el audio, la pronunciación del inglés de Daniela, la
interpretación y la música. El dibujo no se toca.

**Cronos:** Guion nuevo (escenas 10 a 105) en `guion_v3.py`, con las palabras en
inglés escritas fonéticamente (Jiúston, Baz Áldrin, Máicol Cólins, Stiv Béils,
Mágaret Jámilton). Quedaron pendientes 58 dibujos nuevos, la narración
masterizada, la música y el render.

---

**Usuario:** Terminá lo que quedó pendiente.

**Cronos:** 60 ilustraciones nuevas, únicas, en el estilo Volumen 1 con más color
(ocre, rojo apagado, verde azulado, dorado); narración de 16 minutos más pausada
(length_scale 1.12); música que cambia por tramo; `build_v3.py` mapeando cada
escena a su dibujo.

---

**Usuario:** Seguí.

**Cronos:** Video completo terminado: **18 minutos y 17 segundos**
(`alunizaje_luna_volumen1_completo_v3.mp4`), con relato nuevo, voz más pausada,
inglés bien pronunciado, audio masterizado, música dinámica, 60 dibujos sin
repetir y la primera parte intacta.

---

**Usuario:** El problema es la voz. Pasame cinco voces de mujer, muy buenas,
casi humanas, que hablen bien español e inglés.

**Cronos:** Cinco muestras (OpenAI): coral, sage, shimmer, nova, ballad.

---

**Usuario:** Pasame otras, más humanas, más jóvenes, argentina o colombiana.

**Cronos:** Cinco muestras de Google: aoede (argentina), leda (colombiana), kore,
callirrhoe, zephyr. Y se ofreció ElevenLabs.

---

**Usuario:** Sumá ElevenLabs, más humanas. / Conectá ElevenLabs y hacé una prueba
de un minuto con esta voz: Melanie (bN1bDXgDIGX5lw0rtY2B), después Gaby
(n4GNpJP6Y2Nd09pDtetA).

**Cronos:** Melanie es una voz argentina cálida y profesional; Gaby es
latinoamericana joven y dulce. Ambas se agregaron a la cuenta, pero el plan
gratuito de ElevenLabs bloquea las voces de biblioteca por API (402/403).

---

**Usuario:** Clonar esa voz entonces.

**Cronos:** No se puede: las voces de biblioteca no se clonan, y el clonado
requiere plan pago. Opciones: (A) voces gratuitas por API, (B) plan pago,
(C) clonar una grabación propia autorizada.

---

**Usuario:** Opción A, la gratis.

**Cronos:** Seis muestras premade: Jessica, Sarah, Alice, Lily, Matilda, Bella.
Después una segunda tanda más expresiva: Laura y las versiones v2.

---

**Usuario:** Hacé una prueba de un minuto con Matilda, del último video.

**Cronos:** `prueba_voz_matilda_1min.mp4` (60 s) con la misma música y dibujos.

---

**Usuario:** Tiene que tener el mismo diálogo y la misma velocidad de edición del
original; las imágenes tienen que concordar.

**Cronos:** `prueba_voz_matilda_1min_v2.mp4`: mismo guion palabra por palabra y
cada frase entrando en el segundo exacto del original.

---

**Usuario:** No te apurés, hacelo tranquilo como el original. Una prueba de dos
minutos.

**Cronos:** `prueba_voz_matilda_2min.mp4` (1:53, hasta el incendio del Apolo 1):
la voz va a su velocidad natural y el video se estira para acompañarla.

---

**Usuario:** Mirá el Space de Piper TTS Spanish; permite generar gratis e
ilimitado. Hacé la voz argentina.

**Cronos:** Primero solo aparecían las voces mexicanas Cortana y Gevy; el modelo
argentino Elena daba 401 por estar en un repositorio privado.

---

**Usuario:** ¿Por qué Elena está bloqueada si a mí la página me deja generar?

**Cronos:** Tenías razón: el Space aloja el modelo y expone `GET /models` y
`POST /convert`. Usando `models/es_ARG-Elena.onnx` se generó la muestra
`elena_argentina.mp3`, gratis e ilimitada.

---

**Usuario:** Quiero que todos los cambios, el historial, los archivos y todo lo
aprendido queden para siempre en el proyecto, visibles en la app, para que
clonarlo sea lo mismo que remixarlo.

**Cronos:** Se creó el archivo permanente del proyecto: sección `/archivo` en la
app con los videos terminados y de prueba, todas las muestras de voz, los 134
dibujos, los guiones, el método de producción y este historial.
