import { useIpcClient } from 'electron-ipc-typed/renderer'
import type { TestIpcType } from '../ipc-type'



const client = useIpcClient<TestIpcType>()

const version = await client.invoke('test:get-version')
console.log('Version:', version)

const config = await client.invoke('test:get-config', 'theme')
console.log('Config:', config)

client.on('test:state-change', (_, state, timestamp) => {
    console.log('State changed:', state, timestamp)
})
