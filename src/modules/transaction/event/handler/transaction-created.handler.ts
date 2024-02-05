import EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import TransactionCreatedEvent from '../transaction-created.event'

export default class TransactionCreatedHandler
  implements EventHandlerInterface<TransactionCreatedEvent>
{
  async handle(event: TransactionCreatedEvent): Promise<void> {
    let retryCount = 0
    const maxRetries = 3
    const retryDelay = 5000

    while (retryCount < maxRetries) {
      try {
        const response = await fetch(
          process.env.TRANSACTION_CREATED_EVENT_STATUS,
        )

        const data = await response.json()

        if (data.success) {
          console.log(`Transaction notification sent: ${event}`)
          return
        } else {
          retryCount += 1
          const errorMessage =
            'Sending the transaction notification did not return success. Trying again...'
          console.error(`${errorMessage} (${retryCount}/${maxRetries})`)
          await new Promise((resolve) => setTimeout(resolve, retryDelay))
        }
      } catch (err) {
        retryCount += 1

        if (retryCount < maxRetries) {
          const errorMessage =
            (err as Error).message ||
            'Unknown error sending transaction notification'
          console.error(
            `Error sending transaction notification: ${errorMessage}. Retrying in ${
              retryDelay / 1000
            } seconds... (${retryCount}/${maxRetries})`,
          )

          await new Promise((resolve) => setTimeout(resolve, retryDelay))
        } else {
          const errorMessage =
            (err as Error).message ||
            'Unknown error sending transaction notification'
          console.error(
            `Error sending transaction notification: ${errorMessage}. Maximum retries reached.`,
          )
          throw new Error(errorMessage)
        }
      }
    }
  }
}
