# Ansible

Ansible es la herramienta de provisionamiento que usaremos para configurar, desplegar, y provisionar nuestra maquina virtual. Esta herramienta permite además la configuración por lotes, no solo de nodos unitarios, facilitando así la administración de granjas de servidores. La ubicación de la carpeta de Ansible se ha ubicado dentro de la carpeta de Vagrant para localizar en un solo directorio todo lo relacionado con el despliegue, configuración y mantenimiento de la vm de nuestro microservicio. Pinche en el siguiente enlace para consultar la documentación de Vagrant: [Vagrant](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/vagrant_documentacion.md)

# Estructura de directorios
Se ha seguido la guía de ansible de buenas practicas, donde se definen los siguientes directorios en la raiz de la carpeta ansible:

- **playbook.yml**: Este fichero es donde recae la funcionalidad de Ansible. Desde aqui Ansible sabe que es lo que debe ejecutar.
- **inventory.yml**: Este fichero se encarga de definir los nodos que pueden ser accedidos por Ansible.
- **roles**: Dentro de este directorio podemos definir subcarpetas con un nombre arbitrario que engloben ciertas tareas que queramos ejecutar sobre nuestros lotes de máquinas, permitiendo así una mayor claridad en en **playbook.yml**. También se pueden asociar ciertas carpetas con unos lotes en concreto, permitiendo así una mayor separación entre distintas configuraciones.
- **hosts_vars**: En este directorio podemos definir variables para nuestros hosts en vez de hacerlo en el inventory.yml. En nuestro caso el archivo permanecerá vacio.

# playbook.yml

```
- hosts: meteoapp
  become: true
  roles:
    - dependencies
    - clone
    - upgrade
    - app
```

- **hosts**: Aqui definimos los hosts objetivo que vamos a provisionar.
- **become**: Con esta opción decimos que adquiera permisos de root para llevar a cabo las acciones necesarias.
- **roles**: Aqui especificamos las carpetas que continenen las acciones necesarias a ejecutar en el main.yml. Estos se ejecutan en el orden en el que se definen aqui, por lo tanto tienen que aparecer en un orden que no rompa dependencias unas con otras.

# inventory.yml

```
meteoapp ansible_ssh_host=192.168.50.40 ansible_ssh_port=22
```
En el inventory definimos el nombre del host, la ip del host a donde Ansible se contectará a través de ssh y el puerto. Esta ip, **192.168.50.40**, es la misma que definimos en el Vagrantfile para la red privada de la vm que levantamos. Para mas información, consulta el Vagrantfile [aquí](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/vagrant/Vagrantfile)

# Roles

## app

```
- name: Instalar dependencies de package.json
  npm:
    path: "/home/vagrant/meteoapp" 

- name: Lanzar aplicacion
  command: npm start
  args:
    chdir: "/home/vagrant/meteoapp"

```

En este rol hemos aislado las dos acciones referentes al microservicio como tal, las cuales son instalar las dependencias necesarias y la de lanzar la aplicación.

## clone

```
- name: Crear directorio para alojar la app
  file:
    path: "/home/vagrant/meteoapp"
    state: directory

- name: Clonar repositorio
  git:
    repo: https://github.com/JoseAntonioMHerrera/MeteoApp.git
    dest: "/home/vagrant/meteoapp"

- name: Instalar pm2
  npm:
    name: pm2
    path: /home/vagrant/meteoapp
```

En este rol definimos tres tareas. La primera es crear el directorio donde alojaremos nuestro microservicio, bajo la carpeta */home/vagrant/meteoapp*. La segunda es clonar nuestro repositorio en la carpeta. El tercero es instalar **pm2**, el gestor de tareas con el que vamos a lanzar nuestra aplicación (script en package.json).

## dependencies

```
- name: Instalar npm
  apt:
    name: npm
    state: present

- name: Instalar git
  apt:
    name: git
    state: present
```

En el rol dependencies vamos a instalar las dependencias generales que necesitamos para poder clonar y trabajar con nuestro microservicio, esto es instalar **git** y **npm**. La etiqueta **state** con el valor present simplemente indica que el paquete se instale sin comprobar que tenga la versión latest.

## upgrade

```
- name: Actualizar todos los paquetes
  apt:
    name: "*"
    state: latest

- name: Instalar nuevas versiones de paquetes
  apt:
    upgrade: dist
```

Por último, este rol se encargará de upgradear los paquetes del sistema a sus últimas versiones, tanto la versión de la distribución actual si hubiera una superior y la de los paquetes.