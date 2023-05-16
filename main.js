//Funcion para convertir usd en otras monedas.
function conversor(tipoDeCambio, cantidadUsd) {
  const precioDolar = 470;
  tipoDeCambio = tipoDeCambio.toLowerCase();

  // Retorna a null si la cantidad no es válida.
  if (isNaN(cantidadUsd)) {
    return null; 
  }

  let tipoDeCambioValido = false;
  let factorConversion = 0;

//Validacion de cambio seleccionado
  if (tipoDeCambio === "peso argentino") {
    tipoDeCambioValido = true;
    factorConversion = 1;
  } else if (tipoDeCambio === "euro") {
    tipoDeCambioValido = true;
    factorConversion = 0.82;
  } else if (tipoDeCambio === "libra") {
    tipoDeCambioValido = true;
    factorConversion = 0.80;
  }
  // Retorna null si el tipo de cambio no es válido
  if (!tipoDeCambioValido) {
    return null; 
  }

  const cantidadArs = cantidadUsd * precioDolar * factorConversion;
  return cantidadArs;
}

let cantidadUsd = parseFloat(prompt("Ingrese cantidad usd a convertir en moneda local:"));
let tipoDeCambio = prompt("Escoja la moneda local PESO ARGENTINO, EURO O LIBRA");

const cantidadLocal = conversor(tipoDeCambio, cantidadUsd);

if (cantidadLocal === null) {
  alert("Cantidad ingresada o tipo de cambio no válido");
} else {
  alert("$" + cantidadUsd + " USD equivale a: " + cantidadLocal.toFixed(2) + " " + tipoDeCambio.toUpperCase());
}
