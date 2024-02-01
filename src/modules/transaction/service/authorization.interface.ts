export interface AuthorizationServiceInterface {
  checkAuthorization(): Promise<boolean>
}
