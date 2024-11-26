class Usuario {
    constructor(id, Documento_Empleado, userName, Clave) {
        this.id = id;
        this.Documento_Empleado = Documento_Empleado;
        this.userName = userName;
        this.Clave = Clave;
    }
}
jQuery(function () {
    //Se ejecuta al cargar la página
    LlenarComboXServicios("https://localhost:44391/api/Perfiles/LlenarCombo", "#cboPerfil");
    LlenarTabla();
});
function Editar(Documento, Empleado, Cargo, Usuario, idPerfil, Activo, idUsuarioPerfil) {
    $("#txtDocumento").val(Documento);
    $("#txtNombre").val(Empleado);
    $("#txtCargo").val(Cargo);
    $("#txtUsuario").val(Usuario);
    $("#cboPerfil").val(idPerfil);
    $("#txtidUsuarioPerfil").val(idUsuarioPerfil);
    $("#txtActivo").val(Activo == "True" ? "SI" : "NO");
}
function LlenarTabla() {
    LlenarTablaXServicios("https://localhost:44391/api/Usuarios/ListarUsuarios", "#tblUsuarios");
}
async function EjecutarComando(Metodo, Funcion) {
    let idPerfil = $("#cboPerfil").val();
    let Clave = $("#txtClave").val();
    let RepitaClave = $("#txtConfirmaClave").val();
    if (Clave != RepitaClave) {
        $("#dvMensaje").html("Las claves no son iguales");
        return;
    }
    let URL = "https://localhost:44391/api/Usuarios/" + Funcion + "?Perfil=" + idPerfil;
    const usuario = new Usuario(0, $("#txtDocumento").val(), $("#txtUsuario").val(), Clave);
    await EjecutarServicio(Metodo, URL, usuario);
    LlenarTabla();
}
async function Activar(Activo) {
    let idUsuarioPerfil = $("#txtidUsuarioPerfil").val();
    let URL = "https://localhost:44391/api/Usuarios/Activar?idUsuarioPerfil=" + idUsuarioPerfil + "&Activo=" + Activo;
    const usuario = new Usuario(0, $("#txtDocumento").val(), $("#txtUsuario").val(), "");
    await EjecutarServicio("PUT", URL, usuario);
    LlenarTabla();
}
async function BuscarEmpleado() {
    let Documento = $("#txtDocumento").val();
    let URL = "https://localhost:44391/api/Empleados/ConsultarXDocumento?Documento=" + Documento;
    const empleado = await ConsultarServicio(URL);
    if (empleado == null) {
        $("#dvMensaje").html("El documento del empleado no existe en la base de datos, o no tiene información completa");
        $("#txtNombre").val("");
        $("#txtCargo").val("");
    }
    else {
        $("#dvMensaje").html("");
        $("#txtNombre").val(empleado[0].Empleado);
        $("#txtCargo").val(empleado[0].Cargo);
    }
}
