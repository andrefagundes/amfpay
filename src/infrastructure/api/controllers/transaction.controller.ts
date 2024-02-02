import TransactionFacadeInterface from '../../../modules/transaction/facade/facade.interface'

export interface TransactionInputDto {
  value: number
  senderId: string
  receiverId: string
}

class TransactionController {
  constructor(private transactionFacade: TransactionFacadeInterface) {}

  async processTransaction(
    transactionPayload: TransactionInputDto,
  ): Promise<void> {
    try {
      await this.transactionFacade.process(transactionPayload)
    } catch (error) {
      throw (`Error processing the transaction: ${error}`)
    }
  }
}

export { TransactionController }
