export class IoCContainer<T> {
  private instances: Map<string, T> = new Map()

  register(key: string, value: T): void {
    this.instances.set(key, value)
  }

  resolve(key: string): T {
    return this.instances.get(key)
  }
}
