import { IpcRendererEvent } from 'electron/renderer'
import { ExtractIpcHandleValue, ExtractIpcOnValue, IpcChannelType, IpcType } from './type'

export function useIpcClient<T extends IpcType<IpcChannelType<string>>>() {
    return {
        invoke<K extends keyof T['handle']>(channel: Extract<K, IpcChannelType<string>>, ...args: Parameters<ExtractIpcHandleValue<T['handle'], K>>) {
            return $ElectronBridge.exec(channel, ...args) as ReturnType<ExtractIpcHandleValue<T['handle'], K>>
        },
        emit<K extends keyof T['on']>(channel: Extract<K, IpcChannelType<string>>, ...args: Parameters<ExtractIpcOnValue<T['on'], K>>) {
            $ElectronBridge.send(channel, ...args)
        },
        on<K extends keyof T['emit']>(channel: Extract<K, IpcChannelType<string>>, callback: (e: IpcRendererEvent, ...args: Extract<T['emit'][K], any[]>) => void) {
            return $ElectronBridge.on(channel, callback)
        },
        once<K extends keyof T['emit']>(channel: Extract<K, IpcChannelType<string>>, callback: (e: IpcRendererEvent, ...args: Extract<T['emit'][K], any[]>) => void) {
            $ElectronBridge.once(channel, callback)
        },
    }
}

export type { IpcType }
