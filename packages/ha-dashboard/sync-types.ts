import { typeSync } from '@hakit/core/sync'
import { config } from 'dotenv'
config()
;(async function () {
    await typeSync({
        token: process.env.VITE_HA_TOKEN!,
        url: process.env.VITE_HA_URL!,
    })
})()
