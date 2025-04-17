const express = require("express");
const cors = require("cors");
const path = require("path");
const user = require("./control/usercontroller");

const app = express();
app.use(express.json());
app.use(cors());

// Servir estáticos de /public
app.use(express.static(path.join(__dirname, "..", "public")));

const port = 5000;

// Endpoints de usuarios
app.get("/users", user.list);
app.get("/users/:id", user.get);
app.post("/users", user.create);
app.put("/users/:id", user.update);
app.delete("/users/:id", user.delete);

// Ruta catch‐all para 404
app.get("*", (req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "..", "public", "notfound.html"));
});

// Levantar el servidor
app.listen(port, () =>
  console.log(`Servidor corriendo en http://localhost:${port}`)
);
