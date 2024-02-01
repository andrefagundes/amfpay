import Transaction from '../domain/transaction.entity'

export default interface TransactionGateway {
  save(input: Transaction): Promise<Transaction>
}
