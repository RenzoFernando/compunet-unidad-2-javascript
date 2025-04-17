// Declaración de una variable global
let variable;

// Función que muestra varios ejemplos de comparación y operaciones en la consola
function showMessage() {
    console.log('1' == 1);       // true: compara valores, no tipos
    console.log('1' === 1);      // false: compara valores y tipos
    console.log('5' + 1);        // "51": concatenación
    console.log(variable);       // undefined

    console.log(null > 0);       // false
    console.log(null === 0);     // false
    console.log(null >= 0);      // true

    console.log("" != " ");      // true
    console.log("" !== "");      // false
}

// Función para actualizar el contador de elementos
function updateCounter() {
    const list = document.getElementById("listElements");
    const total = list.querySelectorAll("li").length;
    document.getElementById("counter").textContent = `Total: ${total} elemento${total !== 1 ? 's' : ''}`;
}

// Función que agrega texto ingresado a la lista, evitando duplicados
function addTextToList() {
    const list = document.getElementById("listElements");
    const text = document.getElementById("inputText");
    const value = text.value.trim();

    if (value !== "") {
        const items = list.querySelectorAll("li");
        const exists = Array.from(items).some(item => item.textContent === value);

        if (exists) {
            alert("Ese valor ya existe en la lista.");
            return;
        }

        const item = document.createElement("li");
        item.textContent = value;
        list.appendChild(item);
        text.value = "";
        updateCounter();
    }
}

// Función para borrar toda la lista
function clearList() {
    const list = document.getElementById("listElements");
    list.innerHTML = "";
    updateCounter();
}

// Evento que se ejecuta al cargar la página
window.onload = () => {
    const listElements = document.getElementById("listElements");
    const elements = document.querySelectorAll("#formElement li");

    // Cambiar el texto de los elementos iniciales
    elements.forEach((element, index) => {
        console.log(`elemento ${index}:`, element);
        element.textContent = `Nuevo elemento desde onload ${index}`;
    });

    // Cambiar color del párrafo al hacer clic
    const msgText = document.getElementById("msgText");
    msgText.addEventListener("click", () => {
        msgText.style.color = "#00dfff";
    });

    // Limpiar textarea si se escribe una "x"
    const input = document.getElementById("inputText");
    input.addEventListener("input", () => {
        if (input.value.includes("x")) {
            input.value = "";
        }
    });

    // Mostrar el conteo correcto al cargar
    updateCounter();
};
