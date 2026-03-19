import type { ElectronBridge } from './preload'

declare global {
    declare const $ElectronBridge = ElectronBridge
}

export { }
