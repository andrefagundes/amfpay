import TransactionFacadeInterface from '../../../modules/transaction/facade/facade.interface'

class TransactionController {
  constructor(private transactionFacade: TransactionFacadeInterface) {}

  async processTransaction(transactionPayload: any): Promise<void> {
    try {
      await this.transactionFacade.process(transactionPayload)
    } catch (error) {
      throw new Error('Erro ao processar a transação.')
    }
  }
}

export { TransactionController }
