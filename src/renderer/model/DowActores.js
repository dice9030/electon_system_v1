import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import settings from 'electron-settings'

Vue.use(VueAxios, axios)

function list_actores(){
    const body_actor = '<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">'+
                        '<h1 class="h2">Actores sociales</h1>'+
                        '<div class="btn-toolbar mb-2 mb-md-0">'+
                        '<div class="btn-group mr-2">'+
                            '<button id="btn-insert-actores" class="btn btn-sm btn-outline-secondary">Agregar Paciente</button>'+
                            '<button class="btn btn-sm btn-outline-secondary">Export Excel</button>'+
                        '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div id="frm_actor" class="body_actor" style="display: none;" >'+
                        `<form>
                            <div class="row" >
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Región/Geresa/DIRIS</label>
                                        <input type="hidden" id="h_codigo" name="h_codigo" value="0">
                                        <input type="text" class="form-control form-control-sm" id="txt_region" aria-describedby="regionlHelp" placeholder="">
                                        <small id="regionlHelp" class="form-text text-muted">Seleccione una región, geresa o diris</small>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">IPRES</label>
                                        <input type="text" class="form-control form-control-sm" id="txt_ipres" aria-describedby="ipresHelp" placeholder="">
                                        <small id="ipresHelp" class="form-text text-muted">Seleccione IPRES</small>
                                    </div>
                                </div>                                
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Apellido paterno</label>
                                        <input type="text" class="form-control form-control-sm" id="txt_apellido_paterno" aria-describedby="dniHelp" placeholder="">
                                        
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Apellido materno</label>
                                        <input type="text" class="form-control form-control-sm" id="txt_apellido_materno" aria-describedby="dniHelp" placeholder="">
                                        
                                    </div>
                                </div>                                
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Nombres del actor</label>
                                        <input type="text" class="form-control form-control-sm" id="txt_nombre" aria-describedby="dniHelp" placeholder="">
                                        
                                    </div>    
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">DNI actor social</label>
                                        <input type="text" class="form-control form-control-sm" id="txt_dni" aria-describedby="dniHelp" placeholder="">
                                        <small id="dnilHelp" class="form-text text-muted">Ingrese DNI</small>
                                    </div>    
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Tipo de actor</label>
                                        <select class="custom-select custom-select-sm" id="select_tipo_actor">                                            
                                        </select>
                                        <small id="dnilHelp" class="form-text text-muted">Seleccione tipo de actor social</small>
                                    </div>                                
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <button type="button" id="btn-insert-actore-json" class="btn btn-primary btn-sm">Guardar</button>
                                    <button type="button" id="btn-delete-actor" class="btn btn-danger btn-sm" style="display: none;" >Eliminar</button>
                                    <button type="button" id="btn-cancelar-actor" class="btn btn-danger btn-sm">Cancelar</button>
                                </div>
                            </div>                                                                            
                        </form> `+
                    '</div>'+
                    '<div id="list_actor" class="body_actor" ><div class="container" id="table_actor" >'+                        
                    '</div></div>'            
    
        
    document.getElementById('main').innerHTML = body_actor
    document.getElementById('table_actor').innerHTML = list_actores_table()
    onclickEditar()
}
function list_actores_table(){
    const detalle_actores = '<table class="table table-striped table-sm">'+
                                '<thead>'+
                                    '<tr>'+
                                    '<th class="text-center" scope="col"># DNI</th>'+
                                    '<th class="text-center" scope="col">ACTOR</th>'+
                                    '<th class="text-center" scope="col">REGIÓN</th>'+
                                    '<th class="text-center" scope="col">IPRES</th>'+
                                    '<th class="text-center" scope="col">TIPO</th>'+
                                    '<th class="text-center" scope="col">ACCIÓN</th>'+
                                    '</tr>'+
                                '</thead>'+
                                '<tbody>:datasetactores:</tbody>'+
                                '</table>'
    var body_actores = ''
    const data = settings.get('actores') 
    Object.keys(data.actores).forEach(function(key){        
        const value = data.actores[key] 
        const tipo = tipo_actores(value.tipo)
        const data_actor = "data-jsonactor = '"+ JSON.stringify(value) +"'"
        body_actores += '<tr>' +                  
                                '<td class="text-center">'+value.dni+'</td>'+
                                '<td class="text-center">'+value.nombre +' ' +value.apellido_paterno+' ' +value.apellido_materno +'</td>'+
                                '<td class="text-center">'+value.region+'</td>'+
                                '<td class="text-center" >'+value.ipres+'</td>'+
                                '<td class="text-center">'+tipo+'</td>'+
                                '<td class="text-center">'+
                                     '<button type="button" '+ data_actor +' id="btn-editar-actor-'+value.codigo+'"  class="btn-editar-actor btn-editar-actor btn btn-primary btn-sm" type="button" >Editar</button>'+
                                '</td>'+
                            '</tr>'        
    })
    const list_actores_view = detalle_actores.replace(':datasetactores:', body_actores)
    return list_actores_view
}

function list_view_actores(){
    document.querySelectorAll("body_actor").display = "none"
    document.getElementById("frm_actor").style.display = "none"
    document.getElementById("list_actor").style.display = "block"
    document.getElementById("h_codigo").value = 0
    document.getElementById("txt_region").value = ""
    document.getElementById("txt_ipres").value = ""
    document.getElementById("txt_apellido_paterno").value = ""
    document.getElementById("txt_apellido_materno").value = ""
    document.getElementById("txt_nombre").value = ""
    document.getElementById("txt_dni").value = ""
    document.getElementById("select_tipo_actor").value = ""  
    onclickEditar()
}

function onclickEditar(){
    const open = document.querySelectorAll('button.btn-editar-actor')
    Object.keys(open).forEach(function(key){ 
        let dt = document.getElementById(open[key].id)
        dt.addEventListener('click',function(){
            frm_edit_actores(dt.dataset.jsonactor)
        })
    })
}

function frm_actores(){    
    var select_tipo = '<option>Seleccione tipo</option>' 
    const tipo_actor = settings.get('tipo_actor')
    Object.keys(tipo_actor).forEach(function(key){  
        const dt = tipo_actor[key]            
        select_tipo += '<option value="'+ tipo_actor[key].codigo +'">'+ tipo_actor[key].descripcion +'</option>' 
    })
    document.getElementById("select_tipo_actor").innerHTML = select_tipo
    document.querySelectorAll("body_actor").display = "none"
    document.getElementById("frm_actor").style.display = "block"
    document.getElementById("list_actor").style.display = "none"   
    document.getElementById("btn-delete-actor").style.display="none" 
}

function frm_edit_actores(dataset){
    frm_actores()
    let dt = JSON.parse(dataset)    
    document.getElementById("h_codigo").value = dt.codigo
    document.getElementById("txt_region").value = dt.region
    document.getElementById("txt_ipres").value = dt.ipres
    document.getElementById("txt_apellido_paterno").value = dt.apellido_paterno
    document.getElementById("txt_apellido_materno").value = dt.apellido_materno
    document.getElementById("txt_nombre").value = dt.nombre
    document.getElementById("txt_dni").value = dt.dni 
    document.getElementById("select_tipo_actor").value = dt.tipo
    document.getElementById("btn-delete-actor").style.display="inline"
}

function delete_json_actore(){
    var i
    var index = 0
    const h_codigo = document.getElementById("h_codigo").value
    const data_actores = settings.get('actores')
    Object.keys(data_actores.actores).forEach(function(key){  
        let codigo = data_actores.actores[key].codigo
        if (codigo == h_codigo){
            data_actores.actores[index].dni = txt_dni
            i =  index
        }
        index++
    })
    data_actores.actores.splice(i, 1)
    settings.set('actores',data_actores)
    document.getElementById('table_actor').innerHTML = list_actores_table()
    list_view_actores()     
}

function insert_json_actores(){
    const h_codigo = document.getElementById("h_codigo").value
    const txt_region = document.getElementById("txt_region").value
    const txt_ipres = document.getElementById("txt_ipres").value
    const txt_apellido_paterno = document.getElementById("txt_apellido_paterno").value
    const txt_apellido_materno = document.getElementById("txt_apellido_materno").value
    const txt_nombre = document.getElementById("txt_nombre").value
    const txt_dni = document.getElementById("txt_dni").value
    const select_tipo_actor = document.getElementById("select_tipo_actor").value
    const data_actores = settings.get('actores')
    if(h_codigo == 0){
        const ultimo_registro = data_actores.actores[data_actores.actores.length - 1]
        const nuevo_codigo = parseInt(ultimo_registro.codigo) + 1    
        data_actores.actores.push( {
                "codigo": nuevo_codigo,
                "dni":txt_dni,
                "nombre":txt_nombre,
                "apellido_paterno":txt_apellido_paterno,
                "apellido_materno":txt_apellido_materno,
                "region":txt_region,
                "ipres":txt_ipres,
                "tipo":select_tipo_actor
            })       
    }else{        
        var index = 0        
        Object.keys(data_actores.actores).forEach(function(key){  
            let codigo = data_actores.actores[key].codigo
            if (codigo == h_codigo){
                data_actores.actores[index].dni = txt_dni
                data_actores.actores[index].nombre = txt_nombre
                data_actores.actores[index].apellido_paterno = txt_apellido_paterno
                data_actores.actores[index].apellido_materno = txt_apellido_materno
                data_actores.actores[index].region = txt_region
                data_actores.actores[index].ipres = txt_ipres
                data_actores.actores[index].tipo = select_tipo_actor               
            }
            index++
        })   
            
    }
    settings.set('actores',data_actores)
    document.getElementById('table_actor').innerHTML = list_actores_table()
//    buttonQueryClass('button.btn-editar-actor',frm_edit_actores) 
//'button.btn-editar-actor',frm_edit_actores 
  
    list_view_actores()      
}

function tipo_actores(id_tipo){    
    var tipo_desc = ""
    Vue.axios({
        method: 'post',
        url: './data/db_config_clinica.json'    
      }).then(function (response) {    
        settings.set('tipo_actor', response.data.tipo_actor)        
    })
    const tipo_actor = settings.get('tipo_actor')
    Object.keys(tipo_actor).forEach(function(key){  
        const dt = tipo_actor[key]            
        if(id_tipo == dt.codigo ){
            tipo_desc = dt.descripcion                
        }
    })
    return tipo_desc    
}

module.exports = {
                    list_actores:list_actores,
                    frm_actores:frm_actores,
                    frm_edit_actores:frm_edit_actores,
                    list_view_actores:list_view_actores,
                    insert_json_actores:insert_json_actores,
                    delete_json_actore:delete_json_actore
                }