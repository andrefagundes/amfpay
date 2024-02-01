export interface UserFacadeInputDto {
  value: number
  senderId: string
}

export interface UserFacadeOutputDto {
  isBalance: boolean
}

export default interface UserFacadeInterface {
  process(input: UserFacadeInputDto): Promise<UserFacadeOutputDto>
}
