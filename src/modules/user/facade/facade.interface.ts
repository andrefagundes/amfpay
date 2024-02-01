import Id from '../../@shared/domain/value-object/id.value-object'

export interface UserFacadeInputDto {
  userId: string
}

export interface UserFacadeOutputDto {
  id?: Id
  password?: string
  fullName: string
  document: string
  wallet: number
  email: string
}

export default interface UserFacadeInterface {
  find(input: UserFacadeInputDto): Promise<UserFacadeOutputDto>
}
