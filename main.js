// Función que define el valor de monedas
function conversor(tipoDeCambio, cantidadUsd) {
  const tipoDeCambioValido = [
    { moneda: "peso argentino", valor: 1 },
    { moneda: "euro", valor: 0.82 },
    { moneda: "libra", valor: 0.80 }
  ];
  // Retorna a null si la cantidad no es válida.
  if (isNaN(cantidadUsd)) {
    return null;
  }
  // Método que recorre el array tipoDeCambioValido
  const tipoDeCambioEncontrado = tipoDeCambioValido.find(tipo => tipo.moneda.toLowerCase() === tipoDeCambio.toLowerCase());

  // Retorna null si el tipo de cambio no es válido
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
// Función para solicitar datos al usuario, cantidad de USD a convertir y tipo de moneda local
function solicitarEntrada(mensaje) {
  let entrada = prompt(mensaje).trim();
  if (!entrada) {
    alert("No se ingresó ningún valor");
    return solicitarEntrada(mensaje);
  }
  return entrada;
}

function solicitarDatos() {
  const cantidadUsd = parseFloat(solicitarEntrada("Ingrese cantidad USD a convertir a moneda local:"));
  const tipoDeCambio = solicitarEntrada("Escoja la moneda local: PESO ARGENTINO, EURO o LIBRA");
  // Obtener la cantidad equivalente a la moneda local
  const cantidadLocal = conversor(tipoDeCambio, cantidadUsd);
  if (cantidadLocal === null) {
    alert("La cantidad ingresada o el tipo de cambio no son válidos");
  } else {
    alert("$" + cantidadUsd + " USD equivale a: " + cantidadLocal.toFixed(2) + " " + tipoDeCambio.toUpperCase());
  }
}

solicitarDatos();
