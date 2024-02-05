import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import transactionRoute from './routes/transaction.route'
import configureContainerPlugin from '../utils/container'
import dotenv from 'dotenv'

const buildFastify = async (): Promise<FastifyInstance> => {
  const options: FastifyServerOptions = {
    logger: true,
    ajv: {},
  }

  const app: FastifyInstance = fastify(options)

  try {
    dotenv.config()
    configureContainerPlugin(app)
    await app.register(transactionRoute)
  } catch (err) {
    const errorMessage = (err as Error).message || 'Unknown error'
    app.log.error(`Error registering routes, plugins and env: ${errorMessage}`)
    process.exit(1)
  }

  app.setErrorHandler((error, request, reply) => {
    app.log.error(`Global error: ${error.message}`)
    reply.status(500).send({
      error: 'An unexpected error occurred on the server.',
    })
  })

  app.get('/health', async (request, reply) => {
    return { status: 'ok' }
  })

  const gracefulShutdown = async () => {
    try {
      app.log.info('Initiating server shutdown...')
      await app.close()
      app.log.info('Server successfully shut down.')
      process.exit(0)
    } catch (err) {
      const errorMessage = (err as Error).message || 'Unknown error'
      app.log.error(`Error during server shutdown: ${errorMessage}`)
      process.exit(1)
    }
  }

  process.on('SIGTERM', gracefulShutdown)
  process.on('SIGINT', gracefulShutdown)

  return app
}

export default buildFastify
