export interface CheckBalanceInputDto {
  value: number
  senderId: string
}

export interface CheckBalanceOutputDto {
  isBalance: boolean
}
