# ESPECIFICACIÓN FUNCIONAL OFICIAL — PARTE 29: COMPRENSIÓN ORAL DE PÁRRAFOS

Usar este archivo como regla oficial para extracción de datos, puntuación, exportación Excel y descarga ZIP.

No modificar interfaz visual, audios, textos ni navegación existente del test.

---

## Nombre del test

Parte 29 — Comprensión oral de párrafos

---

## Estructura del test

El test contiene 2 historias orales.

Cada historia tiene 4 preguntas de respuesta:

- Sí
- No

Solo se puntúan 2 respuestas correctas por historia.

Puntaje máximo total:

`/4`

---

## Historia 1

### Texto de referencia

Sandra y Pablo habían estado en el tren por más de 3 horas. Estaban cansados y aburridos. El tren ya llegaba 45 minutos tarde, el restaurante había cerrado así que no había comida, y la mujer de enfrente estaba roncando.

### Preguntas y respuestas correctas

| Historia | Pregunta | Respuesta correcta | Puntúa |
|----------|----------|--------------------|--------|
| 1 | ¿Viajaban Sandra y Pablo en coche? | No | Sí |
| 1 | ¿Llegaban tarde? | Sí | Sí |
| 1 | ¿Viajaban en tren? | Sí | No |
| 1 | ¿Llegaban temprano? | No | No |

Puntaje máximo historia 1:

`/2`

---

## Historia 2

### Texto de referencia

La explosión en el centro de Santiago, causó conmoción. Inicialmente se sospechó de un ataque terrorista pero resultó no ser una bomba. Se debió a una explosión de gas que se desencadenó cuando alguien tiró un cigarro encendido. La explosión se pudo oír a 5 kilómetros y los daños materiales fueron cuantiosos.

### Preguntas y respuestas correctas

| Historia | Pregunta | Respuesta correcta | Puntúa |
|----------|----------|--------------------|--------|
| 2 | ¿Fue la explosión en Córdoba? | No | Sí |
| 2 | ¿Fue causada por una bomba? | No | Sí |
| 2 | ¿Fue en Santiago? | Sí | No |
| 2 | ¿Causó el escape de gas la explosión? | Sí | No |

Puntaje máximo historia 2:

`/2`

---

## Equivalencias aceptadas

- [PAN01] coche = carro, auto

---

## Regla oficial de puntuación

Cada historia tiene 4 preguntas, pero solo 2 preguntas puntúan.

Asignar:

- 1 punto por cada respuesta correcta marcada como `Puntúa = Sí`
- 0 puntos por respuesta incorrecta
- Las preguntas marcadas como `Puntúa = No` deben registrarse en el Excel, pero no suman al puntaje final

Puntajes esperados:

- Historia 1: máximo /2
- Historia 2: máximo /2
- Total general: máximo /4

---

## Datos que deben registrarse por pregunta

Codex debe registrar internamente:

- storyNumber
- questionNumber
- questionText
- selectedAnswer
- correctAnswer
- isCorrect
- countsForScore
- assignedScore

---

## Mano utilizada

Registrar la mano utilizada por el usuario.

IMPORTANTE:

- `selectHand`, `handSelection` o la variable equivalente debe agregarse solo una vez en el Excel.
- No repetir la mano en cada fila si el patrón del proyecto permite dejarla como dato general al final.

---

## Archivo Excel obligatorio

Al finalizar el test debe generarse un archivo `.xlsx` con hoja:

`RESULTADOS_COMP_ORAL_PARRAFOS`

Cada fila debe contener:

- historia
- número de pregunta
- pregunta
- respuesta seleccionada
- respuesta correcta
- correcto/incorrecto
- puntúa
- puntaje obtenido

Al final del Excel agregar:

- puntaje historia 1 sobre 2
- puntaje historia 2 sobre 2
- total correcto sobre 4
- mano utilizada

---

## Archivo ZIP final

Al finalizar el test debe generarse y descargarse automáticamente un archivo `.zip` que incluya:

- el archivo Excel de resultados
- cualquier otro archivo de salida que el test ya genere actualmente

---

## Restricciones

Codex NO debe:

- reconstruir el test
- cambiar textos
- cambiar audios
- modificar la navegación
- alterar el diseño visual

Codex SOLO debe implementar o ajustar:

- registro de respuestas Sí/No
- comparación con esta hoja oficial
- cálculo de puntajes
- generación del Excel
- descarga del ZIP final