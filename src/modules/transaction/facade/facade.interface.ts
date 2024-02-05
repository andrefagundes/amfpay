export interface TransactionFacadeInputDto {
  value: number
  senderId: string
  receiverId: string
}

export interface TransactionFacadeOutputDto {
  transactionId: string
  value: number
  senderId: string
  receiverId: string
  createdAt: Date
}

export default interface TransactionFacadeInterface {
  process(input: TransactionFacadeInputDto): Promise<TransactionFacadeOutputDto>
}
