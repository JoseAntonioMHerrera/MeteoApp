# Vagrant 

Vagrant es un software de código abierto que permite la creación y el mantenimiento de entornos de desarrollo virtualizados. Se ha creado el directorio de Vagrant en conjunción con el de Ansible, para empaquetar en una sola carpeta el trabajo de configuración y provisionamiento de nuestro microservicio virtualizado en una vm. Pinche en el siguiente enlace para consultar la documentación de Ansible: [Ansible](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/ansible_documentacion.md)

# Seleccionar imagen para VM

El primer paso será elegir una maquina virtual que desplegar. Usando la página https://app.vagrantup.com/boxes/search Se ha preseleccionado los sistemas basados en debian como sistema operativo por su gran extensión entre la comunidad asegurando así su compatibilidad y documentación. Entre las imágenes de esta distribución que vamos a testear se encuentran:

- Debian 10
- Ubuntu 19
- Ubuntu 18.04

Los tests se han llevado a cabo con **http-load**, con las siguientes opciones:

- **-parallel**: indica el nivel de paralelismo deseado en el test
- **-seconds**: indica los segundos de duración del test
- **url.txt**: indica el archivo de donde leera la url destino

Los resultados, respectivamente, son los siguientes:

[](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/img/debianbuster10test.png)
[](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/img/disco64test.png)
[](https://github.com/JoseAntonioMHerrera/MeteoApp/blob/master/doc/img/ubuntubionic64test.png)

Como podemos observar, nuestra última opción tiene una media de respuesta menor, siendo esta 4.95.

# Archivo de configuración de Vagrant

Haciendo uso del comando **vagrant init** se ha creado el Vagrantfile. La estructura del mismo es la siguiente:

```
# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.ssh.insert_key = true

  config.vm.provider :virtualbox do |v|
    v.name = "meteoapp"
    v.memory = 1024
    v.cpus = 1
    v.customize ["modifyvm", :id, "--ioapic", "on"]
  end

  config.vm.hostname = "meteoapp"
  config.vm.network :private_network, ip: "192.168.50.40"

  # Ansible provisioner.
  config.vm.provision "ansible" do |ansible|
    ansible.compatibility_mode = "2.0"
    ansible.playbook = "ansible/playbook.yml"
    ansible.inventory_path = "ansible/inventory"
    ansible.become = true
  end
end
```

Los elementos fundamentales que explican la función de este vagrantfile son los siguientes:

- **config.vm.box**: selecciona la imagen que vamos a usar
- **config.ssh.insert_key**: reemplaza las claves inseguras ssh que detecte dentro de la máquina.
- **config.vm.provider**: el proveedor que va a correr la vm y que albergará las configuraciones que hagamos. En nuestro caso, cosas como **v.name**, **v.memory** o **v.cpus** que se dan nombre, memoria y número de cpus de nuestra máquina. Con **v.customize** le decimos en nuestro caso que use la entrada/salida
- **config.vm.hostname**: le asignamos el nombre de nuestro microservicio a nuestro host en la máquina virtual
- **config.vm.network**: asignamos una ip a la máquina virtual dentro de la red privada de nuestra máquina.
- **config.vm.provision**: le decimos la herramienta de provisionamiento que vamos a usar, en nuestro caso ansible. La opción mas destacable es **ansible.playbook**, donde indicamos el playbook de ansible, lo cual es una forma de configuración que nos permite el despliegue y el manejo de la configuración de las máquinas que queramos desplegar. Indicamos también el path del archivo **inventory** y garantizamos permisos necesarios a Ansible para que ejecute las tareas.

# Bibliografía

- https://www.vagrantup.com/intro/getting-started/index.html
- https://github.com/geerlingguy/ansible-vagrant-examples/tree/master/nodejs
- https://www.middlewareinventory.com/blog/vagrant-ansible-example/
- https://docs.ansible.com/ansible/latest/scenario_guides/guide_vagrant.html
- https://www.inpimation.com/ansible-vagrant-beginners-guide/