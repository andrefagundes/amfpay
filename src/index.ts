import buildFastify from './infrastructure/api/server'

const startServer = async () => {
  try {
    const fastify = await buildFastify()

    const PORT = 3000
    const address = await fastify.listen(PORT, '0.0.0.0')
    console.log(`Server is now listening on ${address}`)
  } catch (err) {
    const errorMessage = (err as Error).message || 'Unknown error'
    console.error(`Error starting server: ${errorMessage}`)
    process.exit(1)
  }
}

startServer()
