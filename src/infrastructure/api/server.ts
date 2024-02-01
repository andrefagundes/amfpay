import { FastifyInstance, FastifyServerOptions } from 'fastify'
import transactionRoute from './routes/transaction.route'

const buildFastify = async (): Promise<FastifyInstance> => {
  const options: FastifyServerOptions = {
    logger: true,
    ajv: {},
  }

  const fastify: FastifyInstance = require('fastify')(options)

  try {
    await fastify.register(transactionRoute)
  } catch (err) {
    const errorMessage = (err as Error).message || 'Unknown error'
    fastify.log.error(`Error registering routes and plugins: ${errorMessage}`)
    process.exit(1)
  }

  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(`Global error: ${error.message}`)
    reply.status(500).send({
      error: 'An unexpected error occurred on the server.',
    })
  })

  fastify.get('/health', async (request, reply) => {
    return { status: 'ok' }
  })

  const gracefulShutdown = async () => {
    try {
      fastify.log.info('Initiating server shutdown...')
      await fastify.close()
      fastify.log.info('Server successfully shut down.')
      process.exit(0)
    } catch (err) {
      const errorMessage = (err as Error).message || 'Unknown error'
      fastify.log.error(`Error during server shutdown: ${errorMessage}`)
      process.exit(1)
    }
  }

  process.on('SIGTERM', gracefulShutdown)
  process.on('SIGINT', gracefulShutdown)

  return fastify
}

export default buildFastify
