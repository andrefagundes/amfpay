import Transaction from '../domain/transaction.entity'

export default interface TransactionGateway {
  transferFunds(input: Transaction): Promise<Transaction>
  save(input: Transaction): Promise<Transaction>
}
