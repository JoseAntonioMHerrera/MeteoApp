# Despliegue con Heroku

Para desplegar en este PaaS, debemos registrarnos en [Heroku](https://www.heroku.com). Heroku nos ofrece un Dashboard desde donde podemos ver las aplicaciones que hemos creado dentro de la plataforma, diferentes opciones de visualización de métricas sobre el servicio, derechos de acceso, despliegue, etc... También esta la opción **heroku-cli**, que es el que usaremos para crear y configurar nuestra aplicación desde la terminal. Una vez hacemos login con **heroku login** procederemos a crear la app:

```
heroku create meteoapp20360 --region=eu
```

Este comando nos devuelve dos URLs. La primera es la URL de nuestro servicio lanzado en Heroku. La segunda es un repositorio git que Heroku crea automaticamente y al que podremos desplegar manualmente usando git.

```
heroku config:set meteoapp20360 <variable>=<value>
```

Con el comando heroku config:set vamos a definir dos variables de entorno, una donde llamada NODE_ENV que guardará el entorno donde se esta ejecutando y otra será la conexión con la base de datos.

En el dashboard de nuestra aplicación, podemos seleccionar el método de deployment. Vamos a seleccionar la opción desde GitHub y seleccionaremos también la opción de que no se lance hasta que los tests de integración hayan finalizado. Para ello tendremos que enlazar nuestra cuenta de github con Heroku

![](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/img/heroku1.png)

Por último, podríamos definir un Procfile donde se incluiría un comando a nuestra elección para ejecutar la aplicación. Por defecto, Heroku tiene por defecto el siguiente Procfile:

```
web: npm start
```

Donde web es el tipo de proceso definido por Heroku que puede recibir peticiones HTTP externas al servidor. El comando **npm start** será el que este definido en el archivo package.json. Con esto, una vez realicemos un push a nuestro repositorio y los tests pasen correctamente, nuestro código se desplegará y será accesible desde la siguiente url:

```
https://meteoapp20360.herokuapp.com/

```

# Despliegue en Azure usando Travis-CI 

Para el despliegue en Azure se ha hecho uso del students pack que ofrece 100 dolares gratuítos. Haciendo uso de **azure-cli**, vamos a crear y a configurar una app, y haciendo uso de Travis-CI y su fichero de configuración **.travis.yml** vamos a hacer que se despliegue automáticamente nuestra aplicación a la nube una vez pasen los tests de integración. Lo primero que vamos a hacer será crear un grupo de recursos, un concepto usado en Azure para encapsular aplicaciones y sus recursos permitiendo la posibilidad de compartirlos entre varias:

```
az group create --location westeurope --name meteoappRGroup
```
Una vez creamos el grupo, vamos a crear un plan de servicio para nuestra aplicación. Existen distintos planes que ofrecen beneficios acorde al precio. En nuestro caso usaremos el plan gratuito.

```
az appservice plan create --name meteoapp20360 --resource-group meteoappRGroup --sku FREE
```
Ahora si, procedemos a crear nuestra aplicación y le asignaremos el plan de servicio y el grupo de recursos creados anteriormente.

```
az webapp create --name $appname --resource-group meteoappRGroup --plan $appname
```
Para integrar despliegue continuo desde Travis-CI, primero vamos a configurar el despliegue de nuestra aplicación para que permita el uso de un repositorio git en local. En el siguiente comando seleccionamos el método de deployment para la aplicación. 

```
az webapp deployment source config-local-git --name meteoapp20360 --resource-group meteoappRGroup
```
Ahora podríamos si quisieramos añadir azure como remote a nuestro repositorio git y hacer el despliegue de forma manual haciendo git push a la url que nos proporciona el comando anterior. Sin embargo, queremos que cuando Travis-CI pase los tests de forma exitosa, se encargue de desplegar esos cambios a la nube. Para ello primero tenemos que crear unas credenciales para hacer el deploy desde git.

```
az webapp deployment user set --user-name <usuario> --password <contraseña>
```
Estas credenciales serán las que use Travis-CI para hacer el despliegue. Para ello, añadimos a .travis.yml la keyword deploy con los siguientes campos.

```
deploy:
  provider: azure_web_apps
  verbose: true
  username: $AZURE_WA_USERNAME
  password: $AZURE_WA_PASSWORD
  site: $AZURE_WA_SITE 
```

La keyword provider indica a que servicio en la nube estamos desplegando. Verbose permite a Travis-CI mostrar paso a paso los pasos de despliegue que realiza Travis-CI y errores en caso de ocurrir. Las tres siguientes son, por orden, el usuario, la contraseña y el sitio a donde se debe desplegar. Este último es el nombre de nuestra aplicación. Estas variables las definimos como variables de entorno en Travis-CI para evitar exponerlas en texto plano.

Para evitar posibles errores, con la keyword **engines** en package.json podemos especificar para que versión de node y npm estamos desplegando. Azure dispone de una serie de versiones (no estan todas). Con la sintaxis ">{nº de versión}" explicitamos que se coja una versión superior a la indicada.

```
"engines":{
    "node":">v10.0.0",
    "npm": "6.9.0"
}
```

Por último, al igual que con el despliegue en Heroku, definiremos variables de entorno en Azure que contendrán url de conexión a la base de entorno, NODE_ENV y cualquiera que podamos necesitar para nuestro servicio.

```
az functionapp config appsettings set --name meteoapp20360 --resource-group meteoappRGroup --settings <clave>=<valor>
```

Se puede acceder a la aplicación desde la siguiente url:

```
https://meteoapp20360.azurewebsites.net
```

# Database as a service: mLab

Para el uso de ciertos add-ons en Heroku, como el de añadir una base de datos MongoDB, requiere de una tarjeta de credito. Para solventar este problema, al menos de manera eventual, se ha hecho uso del servicio gratuito [mLab](https://mlab.com/). Este servicio ofrece 500Mb gratuitos y un cluster de tres replicas con mongoDB.


# Bibliografía

* https://pm2.keymetrics.io/docs/integrations/heroku/
* https://devcenter.heroku.com/articles/procfile
* https://docs.microsoft.com/en-us/azure/app-service/scripts/cli-deploy-github?toc=%2fcli%2fazure%2ftoc.json
* https://blogs.msdn.microsoft.com/azureossds/2015/10/22/using-gulp-in-node-js-azure-webapps/
* https://docs.microsoft.com/en-us/azure/app-service/deploy-local-git
* https://docs.travis-ci.com/user/deployment/azure-web-apps/
* https://github.com/Azure-Samples/web-apps-node-iot-hub-data-visualization/issues/20
* https://blog.lifeishao.com/2017/03/24/custom-nodejs-deployment-on-azure-web-app/
