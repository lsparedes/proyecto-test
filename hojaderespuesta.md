# RESULTADOS CORRECTOS — TEST PAN

## Estructura de evaluación
Cada ítem contiene:

- Respuesta correcta
- Distractor semántico cercano
- Distractor semántico lejano
- Distractor no relacionado
- Target

---

| Ítem | Respuesta correcta | Distractor semántico cercano | Distractor semántico lejano | Distractor no relacionado | Target |
|------|--------------------|------------------------------|-----------------------------|---------------------------|--------|
| Ej.  | plátano [PAN01]    | manzana                      | helado                      | sobre                     | mono   |
| 1    | boca               | ojo                          | nariz                       | caracol                   | silbato [PAN02] |
| 2    | guante             | calcetín [PAN03]            | gorro                       | araña                     | mano |
| 3    | vela               | bombilla [PAN04]            | estrella                    | radio                     | cerillas [PAN05] |
| 4    | cama               | hamaca                       | silla                       | tijeras                   | almohada |
| 5    | pirámide           | iglú                         | cabaña [PAN06]             | tren                      | egipcio |
| 6    | brazo              | pierna                       | barbilla [PAN07]           | canguro                   | reloj |
| 7    | iglesia            | fábrica                      | ciudad                      | bota                      | monja |
| 8    | hoguera            | antorcha                     | cohete                      | escoba                    | tienda [PAN08] |
| 9    | vaso               | jarra [PAN09]               | sartén [PAN10]             | colgador [PAN11]         | botella |
| 10   | regadera           | cubo [PAN12]                | rastrillo                   | alicate                   | flor |

---

## Puntajes máximos por categoría

- Distractor semántico cercano: /10
- Distractor semántico lejano: /10
- Distractor no relacionado: /10
- Target: /10

---

## Equivalencias de palabras aceptadas

- [PAN01] banana
- [PAN02] pito
- [PAN03] media
- [PAN04] bombillo, ampolleta
- [PAN05] cerillo, fósforos
- [PAN06] choza
- [PAN07] mentón
- [PAN08] fogata
- [PAN09] carpa
- [PAN10] jarro, jarrón
- [PAN11] paila
- [PAN12] gancho
- [PAN13] balde

## Assets de imágenes

Las imágenes del test están en:

`public/tests/modulo2/semantic/part2`

Formato de nombres:

- Opciones: `t[numero]_[letra].png`
  - Ejemplo: `t1_a.png`, `t1_b.png`, `t2_a.png`
- Target central: `t[numero]_center.png`
  - Ejemplo: `t1_center.png`

---

## Clave de respuestas por opción

| Ítem | Correcta | Distractor semántico cercano | Distractor semántico lejano | Distractor no relacionado |
|------|----------|------------------------------|-----------------------------|---------------------------|
| Ejemplo | B | C | A | opción sobrante |
| 1 | D | B | A | opción sobrante |
| 2 | B | D | A | opción sobrante |
| 3 | C | A | B | opción sobrante |
| 4 | A | B | D | opción sobrante |
| 5 | B | D | C | opción sobrante |
| 6 | C | B | D | opción sobrante |
| 7 | A | D | C | opción sobrante |
| 8 | D | C | B | opción sobrante |
| 9 | A | C | D | opción sobrante |
| 10 | D | B | C | opción sobrante |

---

## Regla para distractor no relacionado

El distractor no relacionado corresponde a la opción que no está asignada como:

- respuesta correcta
- distractor semántico cercano
- distractor semántico lejano

Por lo tanto, Codex debe calcular automáticamente la opción sobrante entre A, B, C y D.

---

## Exportación de resultados

Al finalizar el test, se debe generar:

1. Un archivo Excel con los resultados.
2. Un archivo ZIP que incluya el archivo Excel y los archivos asociados al test.

El Excel debe registrar, por cada ítem:

- número de ítem
- opción seleccionada por el usuario
- categoría de la opción seleccionada:
  - respuesta correcta
  - distractor semántico cercano
  - distractor semántico lejano
  - distractor no relacionado
- target mostrado
- imagen seleccionada
- puntaje correspondiente

También debe incluir los totales finales:

- total de respuestas correctas `/10`
- total de distractores semánticos cercanos `/10`
- total de distractores semánticos lejanos `/10`
- total de distractores no relacionados `/10`
- total de target `/10`, si aplica en la lógica actual del test