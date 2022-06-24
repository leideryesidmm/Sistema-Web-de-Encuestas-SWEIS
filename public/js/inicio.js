function verificar(x,y){
    if(x.correo==y.correo&&x.clave==y.clave){
        return true
    }else{return flase}
}
function eliminar(x){
    document.getElementById("elimencuesta").innerHTML = ""
    document.getElementById("elimencuesta").innerHTML +=
    `<div class="modal-dialog">
    <div class="modal-content">
        <div class="model-header">
            <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" style="margin-left: 10px">&times;</button>
            <h6 class="modal-title" style="text-align: center">¿Seguro quiere eliminar esta encuesta?</h6>
            </div>
            <div class="modal-footer" style="text-align: center">
                <a href="/encuestas/elim/`+x+`"><button type="button" style="background-color:#e20319; font-size:16px;" class="btn text-white">Eliminar Encuesta</button></a>
                <button type="button" style="background-color:#a19f9f" class="btn text-white" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>`
}
function editarFechaCierre(x){
    document.getElementById("editarfecha").innerHTML = ""
    document.getElementById("editarfecha").innerHTML +=
    `<div class="modal-dialog">
    <div class="modal-content">
        <div class="model-header">
            <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" style="margin-left: 10px">&times;</button>
            <h3 class="modal-title" style="text-align: center">Editar Fecha</h3>
            </div>
            <div class="modal-footer" >
                <label>Fecha de Finalización</label>
                <form action="/encuestas/edit/`+x+`" method="post">
                <input style="margin-right: 150px;text-align: center;border-color:#e20319;" type="date" name="fecha_cierre"><br>
                <br><button type="submit" style="background-color:#e20319; font-size:16px;" class="btn btn-danger">Editar encuesta</button>
                </form>
                
            </div>
        </div>
    </div>`
}