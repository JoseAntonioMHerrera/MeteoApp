# Herramienta de integración continua - CircleCI

CircleCI es una plataforma de integración continua que permite la automatización del testeo de un proyecto. Se ha elegido por su parecido con la plataforma TravisCI. Al igual que con este último, nos abriremos una cuenta y enlazaremos nuestro repositorio a ella, permitiendo que se lance una instancia donde se ejecutarán nuestros tests sobre nuestro proyecto. El archivo que define la configuración esta dentro de una carpeta llamada **.circleci** y se llama **config.yml**.

## Archivo de configuración

```

version: 2
jobs:
  build:
    working_directory: ~/MeteoApp
    docker:
      - image: circleci/node:12.11.1
    steps:
    - checkout
    - run: npm install
    - run: npm test

```

En el archivo de configuración le decimos que nos lance un contenedor docker con nuestra versión de node, el directorio de trabajo que es el raiz de nuestro proyecto y por último le decimos que ejecute los comandos **npm install** y **npm test**, los cuales instalan las dependencias del proyecto y ejecutan los tests respectivamente.

