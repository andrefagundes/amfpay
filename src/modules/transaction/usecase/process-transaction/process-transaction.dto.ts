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

export interface UserOutputDto {
  fullName: string
  document: string
  wallet: number
  email: string
  isMerchant: boolean
}