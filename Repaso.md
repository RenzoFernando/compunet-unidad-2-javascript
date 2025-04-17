
# Guía de Estudio Completa: DOM y API REST con Node.js

Este documento cubre en profundidad todos los conceptos, desde lo más básico hasta temas avanzados, que necesitas dominar para el parcial. Incluye definiciones, ejemplos de código y buenas prácticas.

Hecho por ChatGPT para Renzo Fernando

---

## Índice

1. [El DOM (Document Object Model)](#el-dom-document-object-model)  
   1. [¿Qué es el DOM?](#qué-es-el-dom)  
   2. [El árbol de nodos](#el-árbol-de-nodos)  
   3. [Cómo seleccionar elementos](#cómo-seleccionar-elementos)  
   4. [Leer y escribir contenido](#leer-y-escribir-contenido)  
   5. [innerText vs innerHTML vs textContent](#innertext-vs-innerhtml-vs-textcontent)  
   6. [Atributos, propiedades y dataset](#atributos-propiedades-y-dataset)  
   7. [Manipulación de estilos y clases](#manipulación-de-estilos-y-clases)  
   8. [Creación e inserción de nodos](#creación-e-inserción-de-nodos)  
   9. [Eliminación de nodos y limpieza](#eliminación-de-nodos-y-limpieza)  
   10. [Eventos: escucha y propagación](#eventos-escucha-y-propagación)  
   11. [Delegación de eventos](#delegación-de-eventos)  
   12. [window.onload vs DOMContentLoaded](#windowonload-vs-domcontentloaded)  
   13. [Técnicas de rendimiento](#técnicas-de-rendimiento)  
2. [API REST con Node.js y Express](#api-rest-con-nodejs-y-express)  
   1. [Node.js, V8 y el event loop](#nodejs-v8-y-el-event-loop)  
   2. [npm y package.json](#npm-y-packagejson)  
   3. [Express: instalación y configuración básica](#express-instalación-y-configuración-básica)  
   4. [Rutas y parámetros](#rutas-y-parámetros)  
   5. [Verbos HTTP y status codes](#verbos-http-y-status-codes)  
   6. [Middlewares](#middlewares)  
   7. [Modularización: routers, controladores y modelos](#modularización-routers-controladores-y-modelos)  
   8. [Persistencia con archivos JSON](#persistencia-con-archivos-json)  
   9. [Manejo de errores y excepciones](#manejo-de-errores-y-excepciones)  
   10. [CORS y seguridad básica](#cors-y-seguridad-básica)  
   11. [Servir archivos estáticos y rutas 404](#servir-archivos-estáticos-y-rutas-404)  
   12. [Consumir la API con Fetch desde el cliente](#consumir-la-api-con-fetch-desde-el-cliente)  
   13. [Validación de datos](#validación-de-datos)  
   14. [Testing y buenas prácticas avanzadas](#testing-y-buenas-prácticas-avanzadas)

---

## El DOM (Document Object Model)

### ¿Qué es el DOM?
El DOM es una **API** que representa la estructura de un documento HTML/XML en memoria como un **árbol de nodos**. Cada parte del HTML—elementos, atributos, texto—es un nodo que puede ser manipulado con JavaScript.

- **Ventaja**: Interactividad; cambiar la página sin recargar.
- **Desventaja**: operaciones costosas si no se optimizan (reflows, repaints).

### El árbol de nodos
```html
<body>
  <div id="container">
    <p>Hello</p>
  </div>
</body>
```
Se representa internamente como:

```
document
 └─ html
     └─ body
         └─ div#container
             └─ p
                 └─ "Hello"
```

### Cómo seleccionar elementos
| Método                          | Retorna                                    |
|---------------------------------|--------------------------------------------|
| `document.getElementById(id)`   | Element único                              |
| `document.getElementsByTagName(t)` | HTMLCollection (en vivo)               |
| `document.getElementsByClassName(c)` | HTMLCollection (en vivo)            |
| `document.querySelector(sel)`   | Primer elemento que coincide (Node)        |
| `document.querySelectorAll(sel)`| NodeList (estático)                        |

```js
const div = document.getElementById("container");
const items = document.querySelectorAll("ul li");
```

### Leer y escribir contenido
- **`textContent`**: todo el texto, incluidas etiquetas invisibles.
- **`innerText`**: texto “visible”, respeta estilo CSS.
- **`innerHTML`**: HTML interno como string (parsea etiquetas).

```js
const p = document.querySelector("p");
console.log(p.textContent);  // "Hello"
p.innerHTML = "<strong>Hola</strong>";
```

### innerText vs innerHTML vs textContent
- `innerHTML` **inserta** HTML (`<span>`, `<div>`, etc.).  
- `innerText` lee/establece sólo texto visible.  
- `textContent` es más rápido, no desencadena reflow al leer.

```js
p.innerText = "<b>Negrita</b>";     // muestra la etiqueta
p.textContent = "<i>Cursiva</i>";    // idem
p.innerHTML = "<i>Cursiva</i>";     // renderiza cursiva
```

### Atributos, propiedades y dataset
- **Propiedad**: API JS → `img.src`, `input.value`.  
- **Atributo**: HTML → `getAttribute("src")`, `setAttribute("data-id","123")`.  
- **dataset**: acceso a `data-*` como objeto.

```js
const img = document.querySelector("img");
img.setAttribute("alt", "Foto");
console.log(img.alt);  // "", porque alt como propiedad
img.dataset.id = "42";
console.log(img.getAttribute("data-id"));  // "42"
```

### Manipulación de estilos y clases
- **Inline styles**:
  ```js
  div.style.backgroundColor = "#eee";
  ```
- **Clases**:
  ```js
  div.classList.add("activo");
  div.classList.remove("oculto");
  div.classList.toggle("resaltado");
  ```

### Creación e inserción de nodos
1. Crear nodo:
   ```js
   const li = document.createElement("li");
   li.textContent = "Nuevo";
   ```
2. Insertar:
   ```js
   const ul = document.querySelector("ul");
   ul.appendChild(li);
   // o
   ul.insertBefore(li, ul.children[0]);
   ```

### Eliminación de nodos y limpieza
- **`node.remove()`** (método moderno).  
- **`parent.removeChild(node)`**.

```js
const item = document.querySelector("li:first-child");
item.remove();
```

### Eventos: escucha y propagación
- **`el.addEventListener(type, fn[, options])`**  
- **`event.stopPropagation()`** corta bubbling.  
- **`event.preventDefault()`** evita comportamiento por defecto (links, formularios).

```js
button.addEventListener("click", e => {
  e.preventDefault();
  console.log("Click!");
});
```

### Delegación de eventos
Ideal cuando muchos elementos similares (listas, tablas).  
```js
ul.addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    console.log("Hiciste clic en LI:", e.target.textContent);
  }
});
```

### window.onload vs DOMContentLoaded
- **DOMContentLoaded**: cuando el **DOM** está listo (sin recursos externos).  
- **window.onload**: cuando todo (imágenes, iframes) carga.

```js
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
window.onload = () => {
  console.log("Todo cargado");
};
```

### Técnicas de rendimiento
- Usar **DocumentFragment** para agregados masivos:
  ```js
  const frag = document.createDocumentFragment();
  items.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    frag.appendChild(li);
  });
  ul.appendChild(frag);
  ```
- **Debounce/Throttle** en eventos frecuentes:
  ```js
  function debounce(fn, ms) { /* ... */ }
  window.addEventListener("resize", debounce(onResize, 200));
  ```

---

## API REST con Node.js y Express

### Node.js, V8 y el event loop
- **Node.js** ejecuta JS en servidor, usa el motor V8 de Chrome.  
- **Event loop**: maneja operaciones asíncronas sin bloquear el hilo principal.  
- I/O no bloqueante: callbacks, Promises, `async/await`.

### npm y package.json
- **`npm init -y`** → crea `package.json`.  
- Definición de **scripts**, **dependencias** y **versionado**.  
- Comandos clave: `npm install`, `npm uninstall`, `npm run start`.

### Express: instalación y configuración básica
```bash
npm install express
```
```js
const express = require("express");
const app = express();
app.use(express.json());        // parsea JSON
const port = 5000;
app.listen(port, () => console.log(`Escuchando ${port}`));
```

### Rutas y parámetros
- **Rutas estáticas**: `/users`.  
- **Route params**: `/users/:id` → `req.params.id`.  
- **Query params**: `/search?term=js` → `req.query.term`.  
- **Body**: POST/PUT con `Content-Type: application/json` → `req.body`.

```js
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // ...
});
```

### Verbos HTTP y status codes
| Verbo  | Uso             | Código por defecto   |
|--------|-----------------|----------------------|
| GET    | Leer datos      | 200 OK               |
| POST   | Crear recurso   | 201 Created          |
| PUT    | Actualizar      | 200 OK / 204 No Content |
| DELETE | Eliminar        | 204 No Content       |

### Middlewares
Función con firma `(req, res, next)`.  
- **Global**:
  ```js
  app.use(express.json());
  ```
- **Por ruta**:
  ```js
  app.get("/users", authMiddleware, userController.list);
  ```

### Modularización: routers, controladores y modelos
```js
// src/routes/users.js
const router = require("express").Router();
const ctrl = require("../control/usercontroller");
router.get("/", ctrl.list);
router.get("/:id", ctrl.get);
router.post("/", ctrl.create);
module.exports = router;

// src/index.js
app.use("/users", require("./routes/users"));
```

### Persistencia con archivos JSON
```js
// src/connection/database.js
const fs = require("fs"), path = require("path");
const db = path.join(__dirname, "../../data/database.json");
module.exports = {
  read() { return JSON.parse(fs.readFileSync(db, "utf8")); },
  write(d) { fs.writeFileSync(db, JSON.stringify(d, null, 2)); }
};
```

### Manejo de errores y excepciones
- En controladores:
  ```js
  async function get(req, res) {
    try {
      // ...
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  ```
- **Middleware de error**:
  ```js
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Error interno");
  });
  ```

### CORS y seguridad básica
- Instalar y usar:
  ```bash
  npm install cors
  ```
  ```js
  const cors = require("cors");
  app.use(cors({ origin: "http://tu-frontend.com" }));
  ```

### Servir archivos estáticos y rutas 404
```js
app.use(express.static("public"));
app.get("*", (req, res) => {
  res.status(404).sendFile(__dirname + "/public/notfound.html");
});
```

### Consumir la API con Fetch desde el cliente
```js
async function listUsers() {
  try {
    const res = await fetch("http://localhost:5000/users");
    if (!res.ok) throw new Error(res.statusText);
    const users = await res.json();
    // renderizar...
  } catch (e) {
    console.error("Fetch error:", e);
  }
}
```

### Validación de datos
- **Express-validator** o **Joi**:
  ```js
  const { body, validationResult } = require("express-validator");
  app.post("/users",
    body("email").isEmail(),
    (req, res) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });
      // ...
    }
  );
  ```

### Testing y buenas prácticas avanzadas
- **Jest + supertest** para pruebas de endpoints.  
- **Helmet** para cabeceras de seguridad.  
- **Rate limiting** con `express-rate-limit`.  
- **Environment variables** con `dotenv`.  
- **Logging avanzado** con Winston o Morgan.

```js
require("dotenv").config();
const morgan = require("morgan");
app.use(morgan("tiny"));
```

