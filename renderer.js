
var form = document.getElementById('formulario')
form.addEventListener('submit', event => {
  event.preventDefault()

  let alto = document.getElementById('alto').value
  let ancho = document.getElementById('ancho').value
  let filtro = document.getElementById('filtro').value

  let imagen_respuesta = document.getElementById('respuesta')
  let label_notificacion = document.getElementById('notify')

  let path_busqueda = ''

  let btnSave = document.getElementById('save')

  if (alto == '' && ancho == '' && filtro == '') {
    path_busqueda = `https://cataas.com/cat?json=true`
  } else if (alto != '' && ancho == '' && filtro == '') {
    path_busqueda = `https://cataas.com/cat?height=${alto}&json=true`
  } else if (alto == '' && ancho != '' && filtro == '') {
    path_busqueda = `https://cataas.com/cat?width=${ancho}&json=true`
  } else if (alto == '' && ancho == '' && filtro != '') {
    path_busqueda = `https://cataas.com/cat?filter=${filtro}&json=true`
  } else if (alto != '' && ancho != '' && filtro == '') {
    path_busqueda = `https://cataas.com/cat?height=${alto}&width=${ancho}&json=true`
  } else if (alto != '' && ancho == '' && filtro != '') {
    path_busqueda = `https://cataas.com/cat?height=${alto}&filter=${filtro}&json=true`
  } else if (alto == '' && ancho != '' && filtro != '') {
    path_busqueda = `https://cataas.com/cat?width=${ancho}&filter=${filtro}&json=true`
  } else {
    path_busqueda = `https://cataas.com/cat?height=${alto}&width=${ancho}&filter=${filtro}&json=true`
  }

  fetch(path_busqueda)
    .then(response => response.json())
    .then(gato => {

      if(gato.url != '' && gato.url != undefined){
        imagen_respuesta.setAttribute('src', `https://cataas.com/${gato.url}`)
        setTimeout(function () {
          document.getElementById('respuesta').scrollIntoView()
          btnSave.disabled = false;
          label_notificacion.innerText = 'Ya puede guardar la información'
        }, 600)
      }
      
    })
})


let btnSave = document.getElementById('save')

btnSave.addEventListener('click', function(){

  let alto = document.getElementById('alto').value
  let ancho = document.getElementById('ancho').value
  let filtro = document.getElementById('filtro').value
  let path = document.getElementById('respuesta').src

  let label_notificacion = document.getElementById('notify')

  window.comunicacion.nuevoRegistro([filtro, alto, ancho, path]);

  window.comunicacion.insertOk(function (event, args) {
    label_notificacion.innerText = args
  })

})

let btnData = document.getElementById('data')

btnData.addEventListener('click', function(){

  window.location.href = "data.html";  

})