import {ipcMain, remote} from 'electron'
import settings from 'electron-settings'
import fs from 'fs'

function setIpcMain (win) {
  global.data
  ipcMain.on('on-desktop', (event, data) => {
    console.log('ingreso al main', data)
    global.data = data
    settings.set('empresa', data)
    global.win.loadURL(`file://${__dirname}/renderer/desktop.html`)
    event.sender.send('my-desktop', data)
  })
  

  /*
    if(global.data){
        console.log(global.data)
        dataemp = global.data

        ipcMain.on('my-desktop_1', (event,dataemp) => {
            console.log(data)
          //  event.sender.send('my-desktop_2', dataemp)
        })
    }else{
        console.log(false)
    }
    */
}

function save_data(){
  var filepath = "./src/renderer/data/db_actores_clinica.json"
  var json_data =  settings.get('actores')
  var content = JSON.stringify(json_data)
  fs.writeFile(filepath, content, function (err) {
      if(err){
              console.log("Ha ocurrido un error actualizando el archivo"+ err.message)
              console.log(err);
              return;
      }                        
      console.log("El archivo ha sido guardado satisfactoriamente")
  })  
  console.log("datos guardados...")
}

module.exports = {setIpcMain:setIpcMain,save_data:save_data}
