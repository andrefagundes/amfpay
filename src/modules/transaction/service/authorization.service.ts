import { AuthorizationServiceInterface } from './authorization.interface'

export class AuthorizationService implements AuthorizationServiceInterface {
  async checkAuthorization(): Promise<boolean> {
    try {
      const response = await fetch(process.env.AUTH_SERVICE_URL)
      const data = await response.json()

      if (!data.approve) {
        return false
      }

      return data.approve
    } catch (err) {
      const errorMessage =
        (err as Error).message || 'Unknown error in Service Authorizer'
      console.error(
        `Error when consulting the authorizing service: ${errorMessage}`,
      )
      throw new Error(errorMessage)
    }
  }
}
