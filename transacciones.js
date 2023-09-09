cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("btnCuentas");
    deshabilitarComponente("btnTransacciones");
    deshabilitarComponente("btnMovimientos");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    deshabilitarComponente("monto");
    
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