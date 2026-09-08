# Método de producción — Cronos / Animación Luna

Todo lo aprendido haciendo el documental del alunizaje, para que cualquiera
pueda repetirlo desde un clon del repositorio sin volver a empezar.

## 1. El guion

- Base: un video de 20 minutos de referencia, reescrito para que sea más
  entretenido y mejor contado (no una lista de datos, sino una historia con
  tensión, detalles humanos y anécdotas concretas).
- Cada escena = una frase o dos, con su propia ilustración. Nada se repite.
- Cuando aparece una persona se dice su nombre y quién era.
- Las citas textuales las dice una segunda voz (`davefx`), justo en el momento
  en que se muestra el retrato del autor de la cita.
- **Palabras en inglés escritas como se pronuncian** para que el sintetizador
  no se trabe: Jiúston, Ígol, Baz Áldrin, Máicol Cólins, Stiv Béils,
  Mágaret Jámilton, Érstrong.
- Archivo del guion revisado (escenas 10 a 105): `animacion-luna/guion_v3.py`.
  Cada marca lleva: número, texto, imagen, rotación, color de rótulo y pausa.

## 2. El estilo de dibujo — "Volumen 1" (oficial, no tocar)

- Fondo blanco liso, sin textura de papel.
- Siluetas y recortes en PNG transparente: personas y objetos aislados, sin
  escenografía ni marco.
- La mano con lápiz (`animacion-luna/assets/mano-lapiz.png`) dibuja cada
  elemento ya en su color definitivo (sin fase gris + coloreado).
- Color tipo acuarela editorial, con ocre, rojo apagado, verde azulado y dorado.
- Parecido reconocible de los personajes históricos, vestuario correcto.
- Pie discreto: "ANIMACIÓN LUNA · VOLUMEN 1 · <TEMA>".
- Render de trabajo 1280x720 → exportación final 1920x1080, 30 fps.

## 3. Los rótulos (letras) — regla aprobada

Las letras **se escriben y quedan quietas**. Nada de desplazamiento después de
escribirse (`slide = 0` en el renderizador). El dinamismo viene del orden de
aparición, la jerarquía de tamaños y la alternancia de rojo, azul, dorado y
negro — nunca de mover el texto ya escrito ni de cambiarle el color.

## 4. La voz

Motor gratuito e ilimitado: **Piper**.

- `daniela` (español rioplatense) para el relato, `davefx` para las citas.
- Ritmo pausado: `length_scale` 1.12.
- Voces mexicanas gratis del mismo autor: Cortana y Gevy.
- Voz argentina **Elena**: el modelo `es_ARG-Elena.onnx` está en un repositorio
  privado de Hugging Face (descarga 401), pero el Space público la aloja y la
  deja usar gratis por HTTP:

```
POST https://hircoir-piper-tts-spanish.hf.space/convert
{"text": "...", "modelPath": "models/es_ARG-Elena.onnx"}
```

  El endpoint `GET /models` del mismo Space lista las 22 voces disponibles.

Alternativa de pago/limitada: **ElevenLabs** (`eleven_multilingual_v2`).
En plan gratuito solo funcionan las voces premade (Matilda, Sarah, Laura,
Jessica, Alice, Lily, Bella); las voces de la biblioteca (Melanie AR, Gaby)
y el clonado requieren plan pago. Ajustes que mejor sonaron:
`stability 0.45`, `similarity_boost 0.8`, `style 0.3`, `speaker_boost true`.

## 5. El audio de estudio

- Narración por bloques (la síntesis completa no entra en una sola pasada).
- Cadena de proceso: `highpass` → compresión suave →
  `loudnorm=I=-16:TP=-1.5:LRA=11` → `aresample=48000`, salida AAC 192k.
- Música de fondo generada con numpy (acordes + arpegios + bajo) que **cambia
  de paleta según el tramo** de la historia, siempre por debajo de la voz.

## 6. Sincronía voz ↔ imagen (lección importante)

Cuando se cambia de voz hay que **conservar los tiempos del original**: se
miden los tramos de habla del audio original (energía en la banda 1200–5000 Hz),
y luego, en vez de acelerar la voz nueva, se estira el video (`setpts`) para que
cada dibujo y cada rótulo entren justo con su frase. Estirar la voz más de
1.08x se nota y arruina la interpretación.

## 7. Cómo se arma el video

```
python3 animacion-luna/sintetizar_v3.py   # narración por bloques
python3 animacion-luna/audio_volumen2.py  # mezcla voz + música
python3 animacion-luna/build_v3.py        # fotogramas y render
```

Unión de partes sin recodificar:

```
ffmpeg -f concat -safe 0 -i lista.txt -c copy salida.mp4
```

Variable `LIMIT=10` en los scripts de render para sacar pruebas cortas antes
de lanzar el render largo.
