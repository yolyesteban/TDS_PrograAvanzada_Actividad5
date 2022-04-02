const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')

const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yoly',
    password: 'galileo',
    database: 'api_actividad5'
})

var ventana
function createWindow() {
    ventana = new BrowserWindow({
        width: 650,
        height: 650,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    ventana.loadFile('renderer.html')
}

app.whenReady().then(createWindow)


ipcMain.on('cargarPrincipal', (e, a) => {
    ventana.loadFile('otro.html')
})

ipcMain.on('nuevoRegistro', (event, args) => {
    connection.query(
        'INSERT INTO searches(filter, high, width, path_img) VALUES (?,?,?,?) ',
        args,
    )

    ventana.webContents.send('insertOk', 'Busqueda guardada con exito');
})

ipcMain.on('consultar', (event, args) => {    
    connection.promise().execute('SELECT * FROM searches')
    .then(([results, fields]) => {
        // ventana.loadFile('data.html')
        ventana.webContents.send('inicioCorrecto', results);        
    })

})

