function pulsar(e) {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      console.log('prevented');
      return false;
    }
  }

  function añadirpoblacion(){
    cont= `<form action="/poblacion/add" method="post"><div id="contenido">
	<div class="row"> 
		<div class="col-md-6">
			<label style=" font-family: Times-New-Roman;font-size: 22px; margin-left: 80px;">Nueva población: </label>
				<input type="text" name="nombre" placeholder="Nombre de la población" class="confondo" style="width: 300px; border-bottom:solid 2px; border-top: #FFFFFF; border-right:#FFFFFF ; border-left:#FFFFFF" requered>
		</div>
		<div class="col-md-6">
			<input type="file" name="archivo">
			</div></div> <br>
			<label style="margin-left:5%">Ingrese los correos de la poblacion a encuestar separado por comas y sin espacios </label>
			<br>
	<div class="row"> 
		<div id="contenido5"><textarea onkeydown="pulsar(event)" style="margin-left: 70px;  " name="correos" rows="6" cols="150"></textarea></div>
	</div><br>
    <button class="btn btn-danger" style="text-align: right; margin-left: 80%; background-color:#e20319;" id="agregar" type="submit" >Agregar población</button>
</div></form>`;
    document.getElementById("añadiryeditar").innerHTML=cont;  
  }
function editarpoblacion(correos,nombre, id){
    cont= `<form action="/poblacion/edit" method="post">
    <div id="contenido">
	<div class="row"> 
		<div class="col-md-6">
			<label style=" font-family: Times-New-Roman;font-size: 22px; margin-left: 80px;">Población `+nombre+`</label>
            
            <input  type="hidden" name="nombre" value="`+nombre+`">
            <input  type="hidden" name="id" value="`+id+`">
            </div>
		<div class="col-md-6">
			<input type="file" name="">
			</div></div> <br>
			<label style="margin-left:5%">Ingrese los correos de la poblacion a encuestar separado por comas y sin espacios </label>
			<br>
	<div class="row"> 
		<div id="contenido5"><textarea onkeydown="pulsar(event)" style="margin-left: 70px; " name="correos" rows="4" cols="150"> `+correos+`</textarea></div>
	</div><br>
    <button class="btn btn-danger" style="text-align: right; margin-left: 80%; background-color:#e20319;" id="agregar" type="submit" >Guardar cambios</button>
    </div></form>`;
    document.getElementById("añadiryeditar").innerHTML=cont;  
}
function sobreescribirmodal(json){
    console.log("entra")
    console.log(i)
    let cont= `
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="model-header">
				<button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" style="margin-left: 10px">&times;</button>
				<h3 class="modal-title" style="text-align: center">Encuestados de '<%=poblaciones[${parseInt(i)}].nombre%>'</h3>
			</div>
				<div class="modal-footer" >
					<ul>
						<%for(let o=0;i<poblaciones.length;++o){%>
							<% if(encuestados[o].poblacion==poblaciones[${parseInt(i)}].id_poblacion) %> 
                            <%console.log(encuestados[o].correo)%>
							<li><% =  encuestados[o].correo %></li>
						<% } %> 
					</ul>
				</div>
		</div>
	</div>`
console.log(cont)
document.getElementById("encuestados").innerHTML = ""
let x=document.getElementById("encuestados")
console.log(x)
x.innerHTML=cont;
}