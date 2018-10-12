import {ipcRenderer, remote, app} from 'electron'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt from 'jsonwebtoken'
import base64 from 'base-64'
import utf8 from 'utf8'

Vue.use(VueAxios, axios)

// const api = 'https://api.proeducative.org/matricula/programasMatricula'
function User () {
  const txt_user = document.getElementById('txt-user')
  const txt_pwd = document.getElementById('txt-pwd')
  

  console.log("HOLA",txt_user,txt_pwd)
  const data = "1"
  ipcRenderer.send('on-desktop', data)
  
}

function UserEmp () {
  const user = document.getElementById('txt-user')
  const api = 'http://app.apiserver.org:89/site/UrlDataEmpresa'
  const selectemp = document.getElementById('select-emp')
  const txtpwd = document.getElementById('txt-pwd')
  const empresa = getEncriptar(selectemp.value)
  const token = jwt.sign({
    iat: Math.floor(Date.now() / 1000) + (60 * 60),
    usr: user.value,
    pwd: txtpwd.value,
    emp: empresa,
    type: 'off'
  }, '|T4k:uBmmh+g')

  const params = new URLSearchParams()
  params.append('key_private', token)
  Vue.axios({
    method: 'post',
    url: api,
    data: params
  }).then(function (response) {
    console.log(response.data)
    let data = response.data
    ipcRenderer.send('on-desktop', data)
  })
}

function getEncriptar (empresa) {
  var text = `LbTnRSD3vvdOQ4u1${empresa}LbTnRSD3vvdOQ4u1`// 'foo © bar 𝌆 baz';
  var bytes = utf8.encode(text)
  var encoded = base64.encode(bytes)
  return encoded
}

module.exports = { User: User, UserEmp: UserEmp}
