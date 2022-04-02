const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
'comunicacion',
    {
        inicioCorrecto: (callback) => ipcRenderer.on('inicioCorrecto', callback)
        ,
        nuevoRegistro: (datos) => ipcRenderer.send('nuevoRegistro',datos)
        ,
        consultar: (datos) => ipcRenderer.send('consultar',datos)
        ,
        insertOk: (callback) => ipcRenderer.on('insertOk', callback)
    }
)