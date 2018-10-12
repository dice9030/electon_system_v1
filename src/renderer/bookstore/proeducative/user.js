
/* Datos de la pc
import os from 'os'

window.addEventListener('load',() =>{
	console.log(os.cpus())
})

*/
import path from 'path'
import electron from 'electron'
// import { url } from 'inspector';

let ipc = electron.ipcRenderer
window.addEventListener('load', () => {
  console.log()
})

ipc.on('pong', (event, arg) => {
  console.log(`pong recibido - ${arg}`)
})

ipc.send('ping', new Date())
