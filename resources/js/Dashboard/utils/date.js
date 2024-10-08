function agregarCero(numero) {
    return (numero < 10 ? '0' : '') + numero;
}

function convertDateSimple(cadena) {
    if (!Boolean(cadena)) return "";
    let fecha = new Date(cadena);
    let año = fecha.getUTCFullYear();
    let mes = agregarCero(fecha.getUTCMonth() + 1);
    let dia = agregarCero(fecha.getUTCDate());
    let horas = agregarCero(fecha.getUTCHours());
    let minutos = agregarCero(fecha.getUTCMinutes());
    let fechaFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}`;
    return fechaFormateada;
}

function convertTimeSimple(cadena) {
    const [hours, minutes] = cadena.split(':');
    return `${hours}:${minutes}`;
}

function getDateTimeCurrent() {
    const ahora = new Date();

    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    const hora = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getUTCSeconds()).padStart(2, '0');
    return `${año}-${mes}-${dia}T${hora}:${minutos}:${segundos}.000000Z`;
}

export { convertDateSimple, convertTimeSimple, getDateTimeCurrent };