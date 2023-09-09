cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

mostrarOpcionCuentas = function()
{
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones"); 
}

mostrarOpcionTransacciones = function()
{
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");   
}

mostrarOpcionMovimientos = function()
{
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    mostrarComponente("tablaMovimientos");
}

//INTEGRANTE 1

mostrarCuentas=function(){
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */

    let cmpTabla = document.getElementById("tablaCuentas");
    let contenidoTabla = "<table><tr>" +
        "<th> CEDULA </th>" +
        "<th> NOMBRE </th>" +
        "<th> SALDO </th>" +
        "</tr>";
    let elementoCuenta;

    for (let i = 0; i < cuentas.length; i++) {
        elementoCuenta = cuentas[i];
        contenidoTabla +=
            "<tr><td>" + elementoCuenta.cedula + "</td>"
            + "<td>" + elementoCuenta.nombre + " " + elementoCuenta.apellido + "</td>"
            + "<td>" + elementoCuenta.saldo + "</td>"
            + "</tr> ";
    }
    contenidoTabla += "</table>";
    cmpTabla.innerHTML = contenidoTabla;
}

agregarCuenta=function(cuenta){
    //Si ya existe mostrar un alert CUENTA EXISTENTE
    //Si se agrega, mostrar un alert CUENTA AGREGADA
    let cuentaExistente = buscarCuenta(cuenta.numeroCuenta);
    if (cuentaExistente === null) {
        cuentas.push(cuenta);
        alert("Cuenta agregada correctamente");
    } else {
        alert("Ya existe una cuenta con este número de cuenta: " + cuenta.numeroCuenta);
    }
}

agregar= function() {

    //Toma los valores de las cajas de texto, sin validaciones
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    //Invoca a agregarCuenta
    //Invoca a mostrarCuentas

    let numeroCuenta = recuperarTexto("txtCampo1");
    let cedula = recuperarTexto("txtCampo2");
    let nombre = recuperarTexto("txtCampo3");
    let apellido = recuperarTexto("txtCampo4");
    let saldoTexto = recuperarTexto("txtCampo5");

    let saldo = parseFloat(saldoTexto); // Convertir el saldo a un número

    if (!isNaN(saldo)) {
        let nuevaCuenta = {
            numeroCuenta: numeroCuenta,
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            saldo: saldo // Asignar el saldo convertido
        }
        agregarCuenta(nuevaCuenta);
        mostrarCuentas();
    }
}
/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/

cargar=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    deshabilitarComponente("monto");
    habilitarComponente("btnCuentas");
    habilitarComponente("btnTransacciones");
    habilitarComponente("btnMovimientos");
    
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta)
{
    let elementoCuenta;
    let cuentaEncontrada = null;
    for(i=0;i<cuentas.length;i++)
    {
        elementoCuenta = cuentas[i];
        if (elementoCuenta.numeroCuenta==numeroCuenta)
        {
            cuentaEncontrada=elementoCuenta;
            break;
        }
    }
    return cuentaEncontrada;
}

ejecutarBusqueda=function(){
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    let valorBusqueda=recuperarTexto("txtCuenta");
    let busqueda = buscarCuenta(valorBusqueda);
    if(busqueda == null)
    {
        alert("CUENTA INEXISTENTE")
    }
    else
    {
        mostrarTexto("lblCuenta",busqueda.numeroCuenta);
        mostrarTexto("lblCedula",busqueda.cedula);
        mostrarTexto("lblNombre",busqueda.nombre);
        mostrarTexto("lblApellido",busqueda.apellido);
        mostrarTexto("lblSaldo",busqueda.saldo);
       
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");
        habilitarComponente("monto");

    } 

}

depositar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada = buscarCuenta(numeroCuenta);
    cuentaAfectada.saldo += monto;
    return cuentaAfectada.saldo;
}

ejecutarDeposito=function(){
    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
    let valorCuenta=recuperarTexto("txtCuenta");
    let valorMonto=recuperarFloat("monto");
    let deposito = depositar(valorCuenta,valorMonto);
    mostrarTexto("lblSaldo",deposito);

}


retirar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    if (cuentaAfectada !=null && cuentaAfectada.saldo >= monto )
    {
        cuentaAfectada.saldo = cuentaAfectada.saldo - monto;
        alert("TRANSACCION EXITOSA");
    }
    else
    {
        alert("SALDO INSUFICIENTE");
    }

    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
    return cuentaAfectada.saldo;
}

ejecutarRetiro = function()
{
    let valorCuenta=recuperarTexto("txtCuenta");
    let valorMonto=recuperarFloat("monto");
    let retiro = retirar(valorCuenta,valorMonto);

    mostrarTexto("lblSaldo",retiro);
}

let movimientosCuenta=[];

ejecutarFiltro=function(){

  let valorRe=  recuperarTexto("txtBuscar");
  filtrarMovimientos(valorRe);
}

filtrarMovimientos=function(numeroCuenta){
 
    let movimiento;
    for (let e = 0; e < movimientos.length; e++) {

         movimiento = movimientos[e];

        if (movimiento.numeroCuenta === numeroCuenta) {

            movimientosCuenta.push(movimiento);
            mostrarMovimientos(movimientosCuenta);
        }
    }
}

mostrarMovimientos=function(misMovimientos){
  
    let cmpTablaMovi = document.getElementById("tablaMovimientos");
    
    let contenidoTablaMov = "<table> <tr> " +
        "<th>NUMERO DE CUENTA </th>" +
        "<th>MONTO </th>" +
        "<th>TIPO </th>" +
        "</tr>"

    for (let e = 0; e < movimientosCuenta.length; e++) {

        misMovimientos = movimientosCuenta[e];
        contenidoTablaMov +=
            "<tr> <td> " + misMovimientos.numeroCuenta + " </td>" +
            "<td> " + misMovimientos.monto + " </td>" +
            "<td> " + misMovimientos.tipo + " </td>" +      
            "  </tr>"
            
    }
    if(misMovimientos.tipo === "D"){
        
        misMovimientos.monto= misMovimientos.monto *-1;
     
     }
    
    contenidoTablaMov += "</table>"
    cmpTablaMovi.innerHTML = contenidoTablaMov;
}



//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte


//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos


