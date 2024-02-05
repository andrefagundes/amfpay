import buildFastify from './infrastructure/api/server'

const startServer = async () => {
  try {
    const app = await buildFastify()

    const optionsObject = {
      port: Number(process.env.PORT) || 3000,
      host: '0.0.0.0',
    }

    const address = app.listen(optionsObject)
    console.log(`Server is now listening on ${address}`)
  } catch (err) {
    const errorMessage = (err as Error).message || 'Unknown error'
    console.error(`Error starting server: ${errorMessage}`)
    process.exit(1)
  }
}

startServer()
