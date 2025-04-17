const apiUrl = "http://localhost:5000/users";

async function listUsers() {
  const res = await fetch(apiUrl);
  const users = await res.json();
  const container = document.getElementById("users-list");
  container.innerHTML = "";
  users.forEach((u) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>ID: ${u.id}</p>
      <p>Nombre: ${u.name}</p>
      <p>Email: ${u.email}</p>
      <button onclick="editUser(${u.id})">Editar</button>
      <button onclick="deleteUser(${u.id})">Eliminar</button>
      <hr>
    `;
    container.appendChild(div);
  });
}

document.getElementById("user-form").onsubmit = async (e) => {
  e.preventDefault();
  const id = document.getElementById("user-id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const payload = { name, email };

  if (id) {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } else {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  resetForm();
  listUsers();
};

async function deleteUser(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  listUsers();
}

async function editUser(id) {
  const res = await fetch(`${apiUrl}/${id}`);
  const u = await res.json();
  document.getElementById("user-id").value = u.id;
  document.getElementById("name").value = u.name;
  document.getElementById("email").value = u.email;
}

function resetForm() {
  document.getElementById("user-id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

window.onload = listUsers;
