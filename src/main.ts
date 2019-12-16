import { BrowserWindow, app } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';

let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 })

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`,
    )

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})