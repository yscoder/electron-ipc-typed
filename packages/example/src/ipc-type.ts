import type { IpcType } from 'electron-ipc-typed'

export interface TestIpcType extends IpcType<'test'> {
    handle: {
        'test:get-version': () => Promise<string>
        'test:get-config': (key: string) => Promise<any>
    }
    emit: {
        'test:state-change': [state: number, timestamp: number]
    }
}