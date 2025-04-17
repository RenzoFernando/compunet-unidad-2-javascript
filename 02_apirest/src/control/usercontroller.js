const dbConnection = require("../connection/database");
const User = require("../model/user");

const UserController = {
  // Listar todos los usuarios
  list: (req, res) => {
    const db = dbConnection.readDB();
    res.status(200).json(db.users);
  },

  // Obtener 1 usuario por ID
  get: (req, res) => {
    try {
      const db = dbConnection.readDB();
      const id = parseInt(req.params.id);
      const userGet = db.users.find((u) => u.id === id);
      if (!userGet) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(userGet);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crear nuevo usuario
  create: (req, res) => {
    try {
      const db = dbConnection.readDB();
      const { name, email } = req.body;
      const newUser = new User(name, email);
      newUser.id = db.users.length
        ? db.users[db.users.length - 1].id + 1
        : 1;
      db.users.push(newUser);
      dbConnection.writeDB(db);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Actualizar usuario existente
  update: (req, res) => {
    try {
      const db = dbConnection.readDB();
      const id = parseInt(req.params.id);
      const index = db.users.findIndex((u) => u.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "User not found" });
      }
      const { name, email } = req.body;
      db.users[index] = { id, name, email };
      dbConnection.writeDB(db);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Eliminar usuario
  delete: (req, res) => {
    try {
      const db = dbConnection.readDB();
      const id = parseInt(req.params.id);
      const index = db.users.findIndex((u) => u.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "User not found" });
      }
      db.users.splice(index, 1);
      dbConnection.writeDB(db);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = UserController;
