document.addEventListener('DOMContentLoaded', function (event) {

  window.comunicacion.consultar()

  window.comunicacion.inicioCorrecto(function (event, args) {
    console.log(args)

    var html = ''

    args.forEach(function (row) {
      html += '<tr>'
      html += '<td>'
      html += row.id_searches
      html += '</td>'
      html += '<td>'
      html += row.high
      html += '</td>'
      html += '<td>'
      html += row.width
      html += '</td>'
      html += '<td>'
      html += "<img high='100' width='100' src='" + row.path_img + "' />"
      html += '</td>'
      html += '</tr>'
    })

    document.querySelector('#table > tbody').innerHTML = html
  })
})


let btnBack = document.getElementById('back')

btnBack.addEventListener('click', function(){

  window.location.href = "renderer.html"; 

})