# Despliegue en Azure: Dockers

En el presente documento vamos a exponer una serie de pasos para conseguir levantar una imagen de docker sirviendo nuestro actual proyecto. Remítase a la documentación del [Dockerfile](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/docker_documentacion.md) para ver la estructura del Dockerfile usado.

## Pasos para la creación de la infraestructura

El primer paso será crear un grupo de recursos en Azure al cual pertenecerá nuestra aplicación dockerizada. Este grupo de recursos puede albergar una o varias aplicaciones.

```
az group create --name meteoapp_rg --location "West Europe"
```

Dentro de este grupo de recursos vamos a elegir un plan de servicio. Dependiendo del que elijamos, obtenemos mas o menos beneficios en cuestión de número de apps posibles adscritas al plan, CPU, RAM, etc... En nuestro caso elejiremos el plan gratuito. La opción **--is-linux** indica que el servicio web estara hospedado en un *worker* linux.

```
az appservice plan create --name meteoapp_serviceplan --resource-group meteoapp_rg --sku S1 --is-linux
```

El siguiente paso será crear un *registry* en donde podamos alojar las imagenes docker que vayamos construyendo para que esten disponibles para su uso y exposición al usuario.

```
az acr create --resource-group meteoapp_rg --name meteoappregistry --sku Basic
```

En este documento se va a hacer especial hincapie en la integración continua con un repositorio de github. Sin embargo podemos subir imagenes a nuestro registry desde linea de comandos. Para ello debemos habilitar el login con admin y conseguir las credenciales.

```
az acr update -n meteoappregistry --admin-enabled true
az acr credential show --name meteoappregistry --resource-group meteoapp_rg
```

Ahora, podríamos pushear nuestras imagenes de la siguiente forma

```
spacid@spacid-GL552JX:~/Desktop/IV/MeteoApp$ sudo docker push <slug registry>/<nombre docker>
```

El nombre de nuestra imagen debe tener ese formato: el enlace a nuestro registry y un nombre identificativo.

![](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/img/prueba_push_manual.png)



## Integración continua y Docker

Para incluir la integración continua vamos a irnos a la interfaz web de azure, mas concretamente al centro de despliegue de nuestro plan de servicio, y seleccionamos la opción de github.

![](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/img/azure_ci_1.png)

A continuación seleccionamos el repositorio que queremos desplegar de forma continua en nuestra nube de azure.

![](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/img/azure_ci_2.png)

El siguiente paso será mostrarnos el Dockerfile que haya detectado en nuestro repositorio. Aqui podremos editarlo a conveniencia.

![](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/img/azure_ci_3.png)

Con esto ya tendríamos configurado el depliegue continuo.

![](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/img/azure_ci_4.png)


## Bibliografía

https://docs.microsoft.com/en-us/azure/app-service/containers/app-service-linux-cli
https://docs.microsoft.com/en-us/azure/devops/pipelines/apps/cd/deploy-docker-webapp?view=azure-devops&tabs=java