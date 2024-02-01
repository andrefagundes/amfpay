export interface ProcessTransactionInputDto {
  value: number
  senderId: string
  receiverId: string
}

export interface ProcessTransactionOutputDto {
  transactionId: string
  value: number
  senderId: string
  receiverId: string
  createdAt: Date
}
