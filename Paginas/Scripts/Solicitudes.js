class Solicitud {
    constructor(NumeroSolicitud, Tipo, Titulo, Descripcion, FechaCreación, FechaResolucion, UsuarioSolicitante,UsuarioAsignado,Estado, Categoria) {
        this.NumeroSolicitud = NumeroSolicitud;
        this.Tipo = Tipo;
        this.Titulo = Titulo;
        this.Descripcion = Descripcion;
        this.FechaCreación = FechaCreación;
        this.FechaResolucion = FechaResolucion;
        this.UsuarioSolicitante = UsuarioSolicitante;
        this.UsuarioAsignado = UsuarioAsignado;
        this.Estado = Estado;
        this.Categoria = Categoria;
    }
}
jQuery(function ()
{
    //Se ejecuta al cargar la página
    LlenarComboXServiciosAuth("https://localhost:44391/api/TipoSolicitudes/ListarTodos", "#cboTipoSolicitud");
    LlenarTabla();
});
function LlenarTabla()
{
    LlenarTablaXServiciosAuth("https://localhost:44391/api/Solicitudes/ListarSolicitudesConTipo", "#tblSolicitudes");
}
async function EjecutarComando(Metodo, Funcion)
{
    let URL = "https://localhost:44391//api/Solicitudes/" + Funcion;
    const solicitud = new Solicitud($("#txtSolicitud").val(), $("#txtTipo").val(), $("#txtDescripcion").val(),
    $("#txtFechaCreacion").val(), $("#txtFechaResolucion").val(), $("#txtSolicitante").val(), $("#txtAsignado").val(),
    $("#txtEstado").val(), $("#txtCategoria").val());
    await EjecutarServicioAuth(Metodo, URL, Solicitud);
    LlenarTabla();
}
async function Consultar() {
    let Codigo = $("#txtSolicitud").val();
    let URL = "https://localhost:44391//api/Solicitudes/Consultar?Codigo=" + Codigo;
    const solicitud = await ConsultarServicioAuth(URL);
    if (solicitud == null) {
        $("#dvMensaje").html("El código del Solicitud no existe en la base de datos");
        $("#txtTipo").val("");
        $("#txtDescripcion").val("");
        $("#txtFechaCreacion").val("");
        $("#txtFechaResolucion").val("");
        $("#txtSolicitante").val("");
        $("#txtAsignado").val("");
        $("#txtEstado").val("");
        $("#txtCategoria").val("");
    }
    else {
        //Escribir las respuestas
        $("#txtTipo").val(solicitud.Tipo);
        $("#txtDescripcion").val(solicitud.Descripcion);
        $("#txtFechaCreacion").val(solicitud.FechaCreación);
        $("#txtFechaResolucion").val(solicitud.FechaResolucion);
        $("#txtSolicitante").val(solicitud.UsuarioSolicitante);
        $("#txtAsignado").val(solicitud.UsuarioAsignado);
        $("#txtEstado").val(solicitud.Estado);
        $("#txtCategoria").val(solicitud.Categoria);
        $("#dvMensaje").html("");
    }
}