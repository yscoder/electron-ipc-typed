import { WebContents } from 'electron'
import { createIpc } from 'electron-ipc-typed'
import type { TestIpcType } from '../ipc-type'

const ipc = createIpc<TestIpcType>()

ipc.handle('test:get-version', async (e) => {
    emitStateChange(e.sender)
    return process.versions.electron
})

ipc.handle('test:get-config', async (_, key: string) => {
    return { theme: 'dark', lang: 'zh-CN' }[key]
})

let state = 0
function emitStateChange(webContents: WebContents) {
    ipc.emit(webContents, 'test:state-change', state++, Date.now())
    if (state > 100) return
    setTimeout(() => {
        emitStateChange(webContents)
    }, 1000)
}