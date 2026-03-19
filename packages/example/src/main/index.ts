import { app, BrowserWindow } from 'electron'
import path from 'path'
import './ipc'

const dirname = import.meta.dirname

app.whenReady().then(() => {
    const win = new BrowserWindow({
        webPreferences: {
            preload: path.join(dirname, 'preload.mjs'),
        },
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(path.join(process.env.VITE_DEV_SERVER_URL, 'index.html'))
    } else {
        win.loadFile(path.join(dirname, `../dist/index.html`))
    }

    win.webContents.openDevTools()
})

app.on('window-all-closed', () => {
    app.quit()
})