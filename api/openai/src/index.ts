import {
    createConfig,
    createServer,
    defaultEndpointsFactory,
    Routing,
} from 'express-zod-api'
import { z } from 'zod'

type Server = ReturnType<typeof createServer>
const config = createConfig({
    cors: true,
    http: {
        listen: 8090, // port, UNIX socket or options
    },
})
const helloWorldEndpoint = defaultEndpointsFactory.build({
    // @ts-ignore: todo: busted for some reason
    handler: ({ input: { message, name, prompt }, logger, options }) => {
        logger.debug('Options:', options) // middlewares provide options
        return {
            greetings: `${prompt}Hello, ${name || 'World'}. Happy coding!`,
        }
    },
    // method: "get" (default) or array ["get", "post", ...]
    input: z.object({
        message: z.string(),
        name: z.string().optional(),
        prompt: z
            .string()
            .default(
                'Can you make this alert more user friendly for alexa to read (g is gallons) and less redundant?',
            ),
    }),
    output: z.object({
        greetings: z.string(),
    }),
})

const routing: Routing = {
    v1: {
        hello: helloWorldEndpoint,
    },
}

const initAPI = async (): Server => {
    return await createServer(config, routing)
}

await initAPI()
