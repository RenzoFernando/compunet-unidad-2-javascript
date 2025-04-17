# Taller API REST con Node.js

Este documento registra los pasos realizados durante el desarrollo del proyecto `02_apirest` como parte del curso de Computación en Internet. A continuación, se muestran las evidencias con capturas tomadas durante el proceso.

---

## 1. Pruebas básicas del API REST

### GET
Se realizó una prueba básica del endpoint raíz utilizando Postman:

<img src="./doc/GET.png" width="600"/>

### POST
Prueba de creación de un recurso en el endpoint raíz:

<img src="./doc/POST.png" width="600"/>

### PUT
Simulación de una actualización sin contenido:

<img src="./doc/PUT.png" width="600"/>

### DELETE
Prueba de borrado sin contenido:

<img src="./doc/DELETE.png" width="600"/>

---

## 2. Modularización: `control/user.js`

Implementación de funciones de controlador para usuarios, con consola mostrando el `req.body`:

<img src="./doc/VSC POST.png" width="600"/>

---

## 3. CRUD de usuarios conectados a JSON local

Se implementó una base de datos local usando `database.json` y se realizaron pruebas en Postman para cada método:

### GET - Obtener todos los usuarios
<img src="./doc/GET BD USERS.png" width="600"/>

### GET - Obtener un usuario por ID
<img src="./doc/GET BD USERS 1.png" width="600"/>

### GET - Obtener el mismo usuario nuevamente (verificación)
<img src="./doc/GET BD USERS 1 AGAIN.png" width="600"/>

### POST - Crear usuario desde Postman
<img src="./doc/POST BD USERS.png" width="600"/>

### PUT - Editar usuario
<img src="./doc/PUT BD USERS 1.png" width="600"/>

### DELETE - Eliminar usuario
<img src="./doc/DELETE USERS 1.png" width="600"/>

---

## 4. Backend del proyecto - Código final

Visual Studio Code con el controlador final implementado (métodos, excepciones, manejo de errores, uso de `fs`, etc.):

<img src="./doc/VSC BD USERS.png" width="600"/>

---

## 5. Interfaz cliente web

Aplicación final cargando correctamente desde el archivo `client/index.html`:

<img src="./doc/GESTION DE USUARIOS.png" width="600"/>

---

## Conclusión

Se completó exitosamente la implementación de un API REST en Node.js utilizando módulos, controladores, persistencia en archivos JSON, manejo de errores y una interfaz web sencilla. Todas las pruebas de los métodos GET, POST, PUT y DELETE fueron ejecutadas desde Postman y el navegador, con registros en consola y respuestas HTTP apropiadas.

