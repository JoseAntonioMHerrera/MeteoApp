## Moongose - Modelos

Se han definido modelos con **mongoose** para su uso en MongoDB:

```
mongoose.Schema({
    ciudad: String,
    anios: [anio_model.anio_schema_mongo]
});

```
Definimos una ciudad como la composición de un nombre y un array de años.

```
new mongoose.Schema({
    num_anio: Number,
    meses: [mes_model.mes_schema_mongo]
});

```
Definimos un año como la composición de un número de año y un array de meses.

```
new mongoose.Schema({
    num_mes: Number,
    dias: [dia_model.dia_schema_mongo]
});

```
Definimos un mes como la composición de un número de mes y un array de días.

```
new mongoose.Schema({
    num_dia: Number,
    temperaturas: {
        hora_08: Number,
        hora_14: Number,
        hora_21: Number
    }
});

```
Definimos un día como la composición de un número de día y el objeto temperaturas, que contiene las temperaturas del día a las 8:00, a las 14:00 y a las 21:00.

## Joi - Esquemas JSON

Con la ayuda de la librería de validación de JSON, **joi**, validaremos el payload que llegue al servidor para asegurar que la estructura que se va a añadir o editar es la correcta. Para ello definimos los esquemas de

- **Ciudad**: Una ciudad se compone de un nombre y un array de años.
- **Año**: Um año se compone de un nombre de ciudad, un número de año y un array de meses.  
- **Mes**: Un mes se compone de un nombre de ciudad, un número de año, número de mes y un array de días.
- **Día**: Un día se compone de un nombre de ciudad, un año, un número de mes, un número de dìa y tres temperaturas correspondiendo con las horas 8:00, 14:00 y 21:00.

La estructura de los objetos JSON que podemos conseguir mediante peticiones GET son los siguientes:

- **Ciudad**: Una ciudad se compondrá de un nombre y un array de años.
- **Año**: Un año se compondrá de un número de año y un array de meses.
- **Mes**: Un mes se compondrá de un número de mes y un array de días.
- **Día**: Un día se compondrá de un número de día y las temperaturas de ese día.