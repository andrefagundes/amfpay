export class IoCContainer<T> {
  private instances: Map<string, T> = new Map()

  register(key: string, value: T): void {
    this.instances.set(key, value)
  }

  resolve<V>(key: string): V | undefined {
    const instance = this.instances.get(key)
    return isType<V>(instance) ? instance : undefined
  }
}

function isType<T>(obj: any): obj is T {
  return typeof obj === 'object' && obj !== null
}
