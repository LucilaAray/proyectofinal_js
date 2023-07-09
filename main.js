// Funcion para traer la data de las divisas de un json
async function getData() {
  try {
    const response = await fetch("json/main.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}


// Función que define el valor de monedas
async function conversor(tipoDeCambio, cantidadUsd) {
  const data = await getData();
  const tipoDeCambioValido = data.conversor.tipoDeCambioValido;

  if (isNaN(cantidadUsd)) {
    return null;
  }

  const tipoDeCambioEncontrado = tipoDeCambioValido.find(
    (tipo) => tipo.moneda.toLowerCase() === tipoDeCambio.toLowerCase()
  );

  if (!tipoDeCambioEncontrado) {
    return null;
  }

  return convertirCantidad(cantidadUsd, tipoDeCambioEncontrado);
}

// Función para convertir la cantidad de USD a moneda local
function convertirCantidad(cantidadUsd, tipoDeCambioEncontrado) {
  const conversion = tipoDeCambioEncontrado.valor;
  const cantidadLocal = cantidadUsd * 470 * conversion;
  return cantidadLocal;
}

// Función para mostrar el resultado en el HTML
function mostrarResultado(cantidadUsd, cantidadLocal, tipoDeCambio) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.textContent = `$${cantidadUsd} USD equivale a: ${cantidadLocal.toFixed(
    2
  )} ${tipoDeCambio.toUpperCase()}`;
}

// Función para guardar las selecciones del usuario en el almacenamiento local
function guardarSeleccion(tipoDeCambio, cantidadUsd) {
  const seleccion = { tipoDeCambio, cantidadUsd };
  const seleccionJSON = JSON.stringify(seleccion);
  localStorage.setItem("seleccionUsuario", seleccionJSON);
}

// Función para obtener las selecciones almacenadas del usuario
function obtenerSeleccion() {
  const seleccionJSON = localStorage.getItem("seleccionUsuario");
  if (seleccionJSON) {
    const seleccion = JSON.parse(seleccionJSON);
    return seleccion;
  }
  return null;
}

async function solicitarDatos() {
  const cantidadUsdInput = document.getElementById("cantidad-usd");
  const tipoDeCambioInput = document.getElementById("tipo-cambio");
  const botonConvertir = document.getElementById("boton-convertir");

  // Obtener selecciones almacenadas (si existen) y establecer los valores en los elementos del formulario
  const seleccionGuardada = obtenerSeleccion();
  if (seleccionGuardada) {
    cantidadUsdInput.value = seleccionGuardada.cantidadUsd;
    tipoDeCambioInput.value = seleccionGuardada.tipoDeCambio;
  }

  botonConvertir.addEventListener("click", async function () {
    const cantidadUsd = parseFloat(cantidadUsdInput.value);
    const tipoDeCambio = tipoDeCambioInput.value.toLowerCase();
    const cantidadLocal = await conversor(tipoDeCambio, cantidadUsd);

    if (cantidadLocal === null) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La cantidad ingresada o el tipo de cambio no son válidos",
      });
    } else {
      mostrarResultado(cantidadUsd, cantidadLocal, tipoDeCambio);
      guardarSeleccion(tipoDeCambio, cantidadUsd); // Guardar las selecciones del usuario en el almacenamiento local

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "La conversión se realizó correctamente",
      });
    }
  });
}

solicitarDatos();
