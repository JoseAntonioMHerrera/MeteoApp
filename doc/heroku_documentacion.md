# Despliegue con Heroku

Para desplegar en este PaaS, debemos registrarnos en [Heroku](https://www.heroku.com). Heroku nos ofrece un Dashboard desde donde podemos ver las aplicaciones que hemos creado dentro de la plataforma, diferentes opciones de visualización de métricas sobre el servicio, derechos de acceso, despliegue, etc... Este último menu será el que usemos para automatizar el despliegue de nuestra aplicación. Para ello, vamos a enlazar el repositorio de github con nuestra aplicación creada en Heroku y vamos a especificar que solo se despliegue una vez han pasado los tests de integración.

![](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/img/heroku1.png)

En la imagen de arriba marcamos la opción "Wait for CI to pass before deploy". Cada vez que realicemos un push y los tests de integración pasen correctamente, se hará un deploy de nuestra aplicación en Heroku. El comando que usa Heroku para lanzar dicha aplicación es npm start por defecto para proyectos Node.js. Según la documentación en [Pm2 integración en Heroku](https://pm2.keymetrics.io/docs/integrations/heroku/), el comando a usar es p2-runtime. Este comando se usa especificamente cuando se despliega en contenedores. Para ello, vamos a añadir un Procfile propio donde sobreescriba el que viene por defecto en Heroku.

'''
web: npm run start-on-heroku
'''

El token web indica el tipo de proceso que desplegará Heroku. Este tipo es el único tipo de proceso que puede recibir peticiones externas HTTP. El script start-on-heroku ubicado en nuestro package.json es el siguiente:

'''
"start-on-heroku": "pm2-runtime start src/app.js --name meteoapp -i 2"
'''

El token web indica el tipo de proceso que desplegará Heroku. Este tipo es el único tipo de proceso que puede recibir peticiones externas HTTP. El script start-on-heroku ubicado en nuestro package.json es el siguiente:

'''
"start-on-heroku": "pm2-runtime start src/app.js --name meteoapp -i 2"
'''
La opción **-i** indica que la aplicación se ejecutará en modo cluster, indicando a continuación el número de replicas que queremos, pudiendo indicar desde 0 hasta max.

![](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/img/heroku3.png)

Arriba podemos comprobar como la aplicación ha conseguido desplegarse con éxito en Heroku. Por último, en la siguiente sección comentamos el DaaS elegido. Para hacer uso de este en nuestra aplicación, usamos las **config-vars** de Heroku donde definimos **NODE_ENV** y la url de conexión **CONN_CONN_HEROKU**.

## Database as a service: mLab

Para el uso de ciertos add-ons en Heroku, como el de añadir una base de datos MongoDB, requiere de una tarjeta de credito. Para solventar este problema, al menos de manera eventual, se ha hecho uso del servicio gratuito [mLab](https://mlab.com/). Este servicio ofrece 500Mb gratuitos y un cluster de tres replicas con mongoDB.

## Bibliografía

https://pm2.keymetrics.io/docs/integrations/heroku/
https://devcenter.heroku.com/articles/procfile