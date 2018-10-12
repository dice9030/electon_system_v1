import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import settings from 'electron-settings'

Vue.use(VueAxios, axios)

global.detalle_vista_paciente = []

function list_visitas(){
    const body_actor = '<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">'+
                        '<h1 class="h2">Visitas sociales</h1>'+
                        '<div class="btn-toolbar mb-2 mb-md-0">'+
                        '<div class="btn-group mr-2">'+
                            '<button id="btn-insert-visitas" class="btn btn-sm btn-outline-secondary">Agregar visita</button>'+
                            '<button class="btn btn-sm btn-outline-secondary">Export Excel</button>'+
                        '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div id="frm_actor" class="body_actor" style="display: none;" >'+
                        `<form>
                            <fieldset class="bloque-campos" >
                            <legend class="h6 ">Actores sociales</legend>
                            <div class="row form-row" >                                
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">DNI actor social</label>
                                            <input type="text" class="form-control form-control-sm" id="txt_dni" aria-describedby="dniHelp" >
                                        </div>    
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Región/Geresa/DIRIS</label>
                                            <input type="hidden" id="h_codigo" name="h_codigo" value="0">
                                            <input type="text" class="form-control form-control-sm" id="txt_region" aria-describedby="regionlHelp" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">IPRES</label>
                                            <input type="text" class="form-control form-control-sm" id="txt_ipres" aria-describedby="ipresHelp" placeholder="">                                            
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                            <div class="form-group">
                                                <label >Fecha de visita</label>
                                                <input type="date" class="form-control form-control-sm" id="txt_paciente_fecha" >
                                            </div>    
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Nombres del actor</label>
                                            <input type="text" class="form-control form-control-sm" id="txt_nombre" aria-describedby="dniHelp" placeholder="">                                            
                                        </div>    
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Apellido paterno</label>
                                            <input type="text" class="form-control form-control-sm" id="txt_apellido_paterno" aria-describedby="dniHelp" placeholder="">                                            
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Apellido materno</label>
                                            <input type="text" class="form-control form-control-sm" id="txt_apellido_materno" aria-describedby="dniHelp" placeholder="">                                            
                                        </div>
                                    </div>                                
                                                                    
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Tipo de actor</label>
                                            <select class="custom-select custom-select-sm" id="select_tipo_actor">                                            
                                            </select>                                            
                                        </div>                                
                                    </div>                                
                            </div>
                            </fieldset>
                        </form>
                        <div>
                            <fieldset >
                                <div class="row" >    
                                    <div class="col-sm-12 pt-3 pb-2 mb-3">                                        
                                        <a href="#openModal" class="btn btn-primary btn-sm" id="btn-addpaciente">+ Agregar</a>
                                    </div>
                                <div>
                            </fieldset>
                        </div>

                        <div id="openModal" class="modalDialog">
                            <div style="padding-top: 1em;padding-bottom:2.5em;padding-right:2.5em;padding-left: 2.5em;">                                                                        
                                <h3 class=" pt-3 pb-2 mb-3 border-bottom">Pacientes</h3>
                                <div class="row form-row" >                                
                                    <div class="col-sm-12 row">       
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label >DNI</label>
                                                <input type="text" class="form-control form-control-sm" id="txt_paciente_dni"  placeholder="">
                                                <input type="hidden" id="h_paciente_codigo" name="h_codigo" value="0">
                                            </div>    
                                        </div>                                         
                                    </div>
                                    <div class="col-sm-12  row">       
                                        <div class="col-12  col-sm-12 col-md-4">
                                            <div class="form-group">
                                                <label >Nombres</label>
                                                <input type="text" class="form-control form-control-sm" id="txt_paciente_nombre"  >                                            
                                            </div>    
                                        </div>
                                        <div class="col-12 col-sm-12 col-md-4">
                                            <div class="form-group">
                                                <label >Apellido paterno</label>
                                                <input type="text" class="form-control form-control-sm" id="txt_paciente_apellido_paterno"  >                                            
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-12 col-md-4">
                                            <div class="form-group">
                                                <label >Apellido materno</label>
                                                <input type="text" class="form-control form-control-sm" id="txt_paciente_apellido_materno"  >                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <fieldset class="bloque-campos" >
                                            <legend class="h6">Motivo de visita</legend>
                                                <div class="row" >                                
                                                    <div class="col-sm-4">
                                                        <div class="form-check">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="radio" name="rad_paciente_motivo" id="rad_paciente_motivo1" value="1">
                                                                Visita Domiciliaria
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="form-check">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="radio" name="rad_paciente_motivo" id="rad_paciente_motivo2" value="2">
                                                                Referencia Comunal
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="form-check">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="radio" name="rad_paciente_motivo" id="rad_paciente_motivo3" value="3">
                                                                Otro(*)
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>                                                                            
                                        </div>                                
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>Observación</label>
                                            <textarea class="form-control" id="txt_paciente_observacion" rows="3"></textarea>
                                        </div>
                                    </div>
                                     <div class="col-12 col-sm-12 col-md-12">
                                            <div class="form-group">
                                                <label >Residencia habitual del niño</label>
                                                <input type="text" class="form-control form-control-sm" id="txt_residencia_habitual">                                            
                                            </div>
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-12">
                                        <button type="button" class="btn btn-primary btn-sm" id="btn-add_vista_paciente">Agregar paciente</button>
                                        <button type="button" class="btn btn-primary btn-sm" id="btn-edit_vista_paciente" style="display:none">Editar paciente</button>
                                        <a href="#close" title="Close"  class="btn btn-danger btn-sm" id="btn-cerrar-paciente">Cerrar</a>                                        
                                    </div>                         
                                </div>                                                                                                                                                                      
                            </div>                        
                        </div>
                        
                        <fieldset class="bloque-campos pt-3 pb-2 mb-3">
                            <legend class="h6 ">Pacientes</legend>
                            <div class="row form-row" >                                
                                <div class="col-sm-12" id="detalle_control_visita">
                                </div> 
                            </div> 
                        </fieldset>                           
                        <div class="row">
                            <div class="col-sm-12 pt-3 pb-2 mb-3">
                                <button type="button" id="btn-insert-visita-json" class="btn btn-primary btn-sm">Guardar</button>
                                <button type="button" id="btn-delete-vista" class="btn btn-danger btn-sm" style="display: none;" >Eliminar</button>
                                <button type="button" id="btn-cancelar-vista" class="btn btn-danger btn-sm">Cancelar</button>
                            </div>
                        </div> `+
                    '</div>'+
                    '<div id="list_actor" class="body_actor" ><div class="container" id="table_visitas" >'+                        
                    '</div></div>'            
    
        
    document.getElementById('main').innerHTML = body_actor
    document.getElementById('table_visitas').innerHTML = list_visitas_table()
    document.getElementById('detalle_control_visita').innerHTML = list_vistas_control_table()
    onclickEditar()
}

function limpiar_variables(){
    const limpiar = global.detalle_vista_paciente.length
    if(limpiar > 0){
        console.log("array con variables")
        global.detalle_vista_paciente = []
        console.log(global.detalle_vista_paciente)
    }
}
function list_visitas_table(){
    limpiar_variables()
    const detalle_visitas = '<table class="table table-striped table-sm">'+
                                '<thead>'+
                                    '<tr>'+
                                    '<th class="text-center" scope="col">#DNI</th>'+
                                    '<th class="text-center" scope="col">PACIENTE</th>'+
                                    '<th class="text-center" scope="col">NRO VISITAS</th>'+
                                    '<th class="text-center" scope="col">NRO PERIODOS</th>'+
                                    '<th class="text-center" scope="col">ACCIÓN</th>'+
                                    '</tr>'+
                                '</thead>'+
                                '<tbody>:datasetvisitas:</tbody>'+
                                '</table>'
    var body_visitas = ''
    const data = settings.get('visitas') 
    Object.keys(data.visitas).forEach(function(key){        
        const value = data.visitas[key] 
        const visita =  value.visitas
        
        const nro_vista = visita 
        const data_vista = "data-jsonactor = '"+ JSON.stringify(value) +"'"
        body_visitas += '<tr>' +                  
                                '<td class="text-center">'+value.dni_actor_social+'</td>'+
                                '<td class="text-center">'+value.posta +'</td>'+
                                '<td class="text-center">'+ value.fecha_visita +'</td>'+
                                '<td class="text-center" >'+value.ipres+'</td>'+                                
                                '<td class="text-center">'+
                                     '<button type="button" '+ data_vista +' id="btn-editar-actor-'+value.codigo+'"  class="btn-editar-actor btn-editar-actor btn btn-primary btn-sm" type="button" >Editar</button>'+
                                '</td>'+
                            '</tr>'        
    })
    const list_visitas_view = detalle_visitas.replace(':datasetvisitas:', body_visitas)
    return list_visitas_view
}

function list_vistas_control_table(){

    const detalle_visitas_control = '<table class="table table-striped table-sm">'+
                                        '<thead>'+
                                            '<tr>'+
                                            '<th class="text-center" scope="col">#DNI</th>'+
                                            '<th class="text-center" scope="col">PACIENTE</th>'+
                                            '<th class="text-center" scope="col">MOTIVO</th>'+
                                            '<th class="text-center" scope="col">OBSERVACIÓN</th>'+
                                            '<th class="text-center" scope="col">ACCIÓN</th>'+
                                            '</tr>'+
                                        '</thead>'+
                                        '<tbody>:datasetvisitas:</tbody>'+
                                        '</table>'
        
        var body_visitas = ''                                   
        const data = global.detalle_vista_paciente
        
        Object.keys(data).forEach(function(key){        
            const value = data[key] 
            const motivo = data[key].motivo_vista

            var visita_domiciliaria = motivo.visita_domiciliaria
            var referencia_comunal = motivo.referencia_comunal
            //var otro = motivo.otro
            var motivo_desc = ""
            if(visita_domiciliaria == 1){
                motivo_desc = "visita domiciliaria"
            }else if(referencia_comunal == 2){
                motivo_desc ="referencia comunal"
            }else{
                motivo_desc ="otro (*)"
            }
            
            const data_d_v = "data-jsonpasiente = '"+ JSON.stringify(value) +"'"
                body_visitas += '<tr>' +                  
                    '<td class="text-center">'+value.dni+'</td>'+
                    '<td class="text-center">'+value.paciente_nombre +' ' +value.apellido_paterno+' ' +value.apellido_materno +'</td>'+
                    '<td class="text-center" >'+motivo_desc+'</td>'+                                
                    '<td class="text-center" >'+value.observacion+'</td>'+                                
                    '<td class="text-center">'+
                        '<a href="#openModal" '+ data_d_v +' id="btn-edit_vista_paciente_'+value.dni+'" class="edit_vista_paciente btn-editar-paciente btn btn-primary btn-sm">Editar</a>'+
                    '</td>'+
                '</tr>'  
            
        })     
        
        const list_visitas_view = detalle_visitas_control.replace(':datasetvisitas:', body_visitas)
        return list_visitas_view        
}

function add_vistas_control_table(){

    const txt_paciente_dni = document.getElementById("txt_paciente_dni").value
    const txt_paciente_nombre = document.getElementById("txt_paciente_nombre").value
    const txt_paciente_apellido_paterno = document.getElementById("txt_paciente_apellido_paterno").value
    const txt_paciente_apellido_materno = document.getElementById("txt_paciente_apellido_materno").value

    var motivo_visita = 0
    const rad_paciente_motivo = document.getElementsByName('rad_paciente_motivo')
    Object.keys(rad_paciente_motivo).forEach(function(key){
        console.log(rad_paciente_motivo[key])
        const radio = rad_paciente_motivo[key]
        if(radio.checked)
        {
            motivo_visita = radio.value
        }
    })

    const txt_paciente_observacion = document.getElementById("txt_paciente_observacion").value
    const txt_residencia_habitual = document.getElementById("txt_residencia_habitual").value
    
    var visita_domiciliaria = 0
    var referencia_comunal = 0
    var otro = 0
    if(motivo_visita == 1){
        visita_domiciliaria = 1
    }else if(motivo_visita == 2){
        referencia_comunal = 1
    }else{
        otro = 1
    }
    
    global.detalle_vista_paciente.push( {
        "dni":txt_paciente_dni,
        "paciente_nombre":txt_paciente_nombre,
        "apellido_paterno":txt_paciente_apellido_paterno,
        "apellido_materno":txt_paciente_apellido_materno,
        "motivo_vista":
                        {
                            "visita_domiciliaria":visita_domiciliaria,
                            "referencia_comunal":referencia_comunal,
                            "otro":otro
                        },
        "observacion":txt_paciente_observacion,
        "residencia_habitual":txt_residencia_habitual
    })  
    console.log(global.detalle_vista_paciente)    
    document.getElementById('detalle_control_visita').innerHTML = list_vistas_control_table()
    document.getElementById('btn-cerrar-paciente').click()
    onclickEditar_paciente()

} 

function onclickEditar_paciente(){
    const open = document.querySelectorAll('a.edit_vista_paciente')
    Object.keys(open).forEach(function(key){ 
        let dt = document.getElementById(open[key].id)
        dt.addEventListener('click',function(){
            frm_edit_paciente(dt.dataset.jsonpasiente)
        })
    })
}

function list_view_visitas(){
    limpiar_variables()

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

function frm_addpaciente(){
    document.getElementById("btn-add_vista_paciente").style.display="initial"
    document.getElementById("btn-edit_vista_paciente").style.display="none"
}

function frm_edit_paciente(dataset){
    let dt = JSON.parse(dataset)    
    console.log("data: ",dt)

    document.getElementById("btn-add_vista_paciente").style.display="none"
    document.getElementById("btn-edit_vista_paciente").style.display="initial"
    
    document.getElementById("txt_paciente_dni").value = dt.dni
    document.getElementById("txt_paciente_nombre").value = dt.paciente_nombre
    document.getElementById("txt_paciente_apellido_paterno").value = dt.apellido_paterno
    document.getElementById("txt_paciente_apellido_materno").value = dt.apellido_materno

    document.getElementById("rad_paciente_motivo1").checked = dt.motivo_vista.visita_domiciliaria
    document.getElementById("rad_paciente_motivo2").checked = dt.motivo_vista.referencia_comunal
    document.getElementById("rad_paciente_motivo3").checked = dt.motivo_vista.otro

    document.getElementById("txt_paciente_observacion").value = dt.observacion
    document.getElementById("txt_residencia_habitual").value = dt.residencia_habitual    
    
}


function onclickEditar(){
    const open = document.querySelectorAll('button.btn-editar-actor')
    Object.keys(open).forEach(function(key){ 
        let dt = document.getElementById(open[key].id)
        dt.addEventListener('click',function(){
            frm_edit_visitas(dt.dataset.jsonactor)
        })
    })
}

function frm_visitas(){    
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
    document.getElementById("btn-delete-vista").style.display="none"
}

function frm_edit_visitas(dataset){
    frm_visitas()
    let dt = JSON.parse(dataset)    
    document.getElementById("h_codigo").value = dt.codigo
    document.getElementById("txt_region").value = dt.region
    document.getElementById("txt_ipres").value = dt.ipres
    document.getElementById("txt_apellido_paterno").value = dt.apellido_paterno
    document.getElementById("txt_apellido_materno").value = dt.apellido_materno
    document.getElementById("txt_nombre").value = dt.nombre
    document.getElementById("txt_dni").value = dt.dni 
    document.getElementById("select_tipo_actor").value = dt.tipo
    document.getElementById("btn-delete-vista").style.display="inline"
}

function delete_json_visita(){
    var i
    var index = 0
    const h_codigo = document.getElementById("h_codigo").value
    const data_visitas = settings.get('visitas')
    Object.keys(data_visitas.visitas).forEach(function(key){  
        let codigo = data_visitas.visitas[key].codigo
        if (codigo == h_codigo){
            data_visitas.visitas[index].dni = txt_dni
            i =  index
        }
        index++
    })
    data_visitas.visitas.splice(i, 1)
    settings.set('visitas',data_visitas)
    document.getElementById('table_visitas').innerHTML = list_visitas_table()
    list_view_visitas()     
}

function insert_json_visitas(){
    const h_codigo = document.getElementById("h_codigo").value
    const txt_region = document.getElementById("txt_region").value
    const txt_ipres = document.getElementById("txt_ipres").value
    const txt_apellido_paterno = document.getElementById("txt_apellido_paterno").value
    const txt_apellido_materno = document.getElementById("txt_apellido_materno").value
    const txt_nombre = document.getElementById("txt_nombre").value
    const txt_dni = document.getElementById("txt_dni").value
    const select_tipo_actor = document.getElementById("select_tipo_actor").value
    const data_visitas = settings.get('visitas')

    if(h_codigo == 0){
        const ultimo_registro = data_visitas.visitas[data_visitas.visitas.length - 1]
        const nuevo_codigo = parseInt(ultimo_registro.codigo) + 1    
        data_visitas.visitas.push( {
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
        Object.keys(data_visitas.visitas).forEach(function(key){  
            let codigo = data_visitas.visitas[key].codigo
            if (codigo == h_codigo){
                data_visitas.visitas[index].dni = txt_dni
                data_visitas.visitas[index].nombre = txt_nombre
                data_visitas.visitas[index].apellido_paterno = txt_apellido_paterno
                data_visitas.visitas[index].apellido_materno = txt_apellido_materno
                data_visitas.visitas[index].region = txt_region
                data_visitas.visitas[index].ipres = txt_ipres
                data_visitas.visitas[index].tipo = select_tipo_actor               
            }
            index++
        })               
    }
    settings.set('visitas',data_visitas)
    document.getElementById('table_actor').innerHTML = list_visitas_table()
    list_view_visitas()      
}

module.exports = {
                    list_visitas:list_visitas,
                    frm_visitas:frm_visitas,
                    frm_edit_visitas:frm_edit_visitas,
                    list_view_visitas:list_view_visitas,
                    insert_json_visitas:insert_json_visitas,
                    delete_json_visita:delete_json_visita,
                    frm_addpaciente:frm_addpaciente,
                    add_vistas_control_table:add_vistas_control_table
                }