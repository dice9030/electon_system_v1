import {User, UserEmp} from './model/DownUser'
import vue from 'vue'
import home from './view/home/h_login.vue'
import settings from 'electron-settings'

window.addEventListener('load', () => {
  buttonEvent('btn-next', User)
  //buttonEvent('btn-verify', UserEmp)
})

function buttonEvent (id, func) {
  const open = document.getElementById(id)
  open.addEventListener('click', func)
}
