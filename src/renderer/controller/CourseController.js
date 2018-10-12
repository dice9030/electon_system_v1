import {ipcRenderer, remote, app} from 'electron'
import settings from 'electron-settings'
//import Course from './model/DownCourse'
//import os from 'os'
import https from 'https'
import fs, { link } from 'fs'
import path from 'path'
//import fsx from 'fs-extra'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import d_logo from './view/desktop/d_logo.vue'
//import {list_visitas} from './model/DowVisitas.js'
import {list_visitas,frm_visitas,list_view_visitas,insert_json_visitas,delete_json_visita,frm_addpaciente,add_vistas_control_table} from './model/DowVisitas.js'
import {list_actores,frm_actores,list_view_actores,insert_json_actores,delete_json_actore} from './model/DowActores.js'
import {buttonEvent, buttonQueryClass} from './utilitario/AccionClick'


Vue.use(VueAxios, axios)


window.addEventListener('load', () => {  
  buttonEvent('visitas',vistas)
  buttonEvent('actores',actores)
  buttonEvent('graficas',graficas)
  buttonEvent('configuracion',configuracion)
  
})

function menu_link(){
  var menu  = document.querySelectorAll("a.menu-princ")
  Object.keys(menu).forEach(function(key){ 
    console.log(menu[key].id)
    console.log(document.getElementById(menu[key].id))
      document.getElementById(menu[key].id).classList.remove("active")
  })
}


function vistas(){
  menu_link()  
  document.getElementById("visitas").classList.add("active")
  Vue.axios({
    method: 'post',
    url: './data/db_visita_clinica.json'    
  }).then(function (response) {
    console.log(response)   
    settings.set('visitas', response.data)
    list_visitas(response.data)    
    buttonEvent('btn-insert-visitas', frm_visitas)
    buttonEvent('btn-insert-visita-json', insert_json_visitas)
    buttonEvent('btn-cancelar-vista', list_view_visitas)
    buttonEvent('btn-delete-vista', delete_json_visita)           
    buttonEvent('btn-addpaciente', frm_addpaciente)
    buttonEvent('btn-add_vista_paciente', add_vistas_control_table)
             
  })
  
}

function actores(){
  menu_link()
  document.getElementById("actores").classList.add("active")
  Vue.axios({
    method: 'post',
    url: './data/db_actores_clinica.json'    
  }).then(function (response) {
    settings.set('actores', response.data)
    list_actores(response.data)    
    buttonEvent('btn-insert-actores', frm_actores)
    buttonEvent('btn-insert-actore-json', insert_json_actores)
    buttonEvent('btn-cancelar-actor', list_view_actores)
    buttonEvent('btn-delete-actor', delete_json_actore)        
  })
}

function graficas(){
  menu_link()
  document.getElementById("graficas").classList.add("active")
}

function configuracion(){
  menu_link()
  document.getElementById("configuracion").classList.add("active")
}






function download (url, dest, cb) {
  const file = fs.createWriteStream(dest, { flags: 'w',
    defaultEncoding: 'utf8',
    fd: null,
    mode: 0o666 })
  const request = https.get(url, function (response) {
    console.log(request)
    response.pipe(file)
    // response.pipe(file);
    file.on('finish', function () {
      file.close()
    })
  }).on('error', function (err) {
    fs.unlink(dest)
    if (cb) console.log(err.message)
  })
}

/*
ipcRenderer.on('my-desktop_2',(event,data) =>{
    console.log("my-desktop_2",data)
} )
*/
