# Herramienta de integración continua - TravisCI

TravisCI es una plataforma de integración continua que permite la automatización del testeo de un proyecto. Funciona junto a un repositorio donde se alojará el proyecto y que deberemos enlazar a la cuenta que creemos en la pagina de Travis. Así, cada vez que hagamos un push a nuestro repositorio, Travis, basandosé en nuestro archivo de configuración, **.travis.yml**, lanzará los tests que tengamos definidos. Si todos pasan, mostrará como una construcción exitosa. En caso contrario, nos mostrará los fallos que se han ocasionado en los test.

## Archivo de configuración

```
language: node_js
node_js: 
    - "stable"
    - "13"
    - "12"
    - "11"
install:
  - npm install
script:
  - npm test

```

En el archivo hemos definido que usamos **node** y listamos una serie de versiones para que ejecute los tests en las tres últimas grandes versiones que han salido para **node**. Las keywords **install** y **script** hacen, respectivamente, la instalación de las dependencias de nuestro proyecto y la ejecución de tests sobre el mismo.