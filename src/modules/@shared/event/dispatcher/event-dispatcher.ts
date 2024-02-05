import EventHandlerInterface from '../event-handler.interface'
import EventInterface from '../event.interface'
import eventInterface from '../event.interface'
import EventDispatcherInterface from './event-dispatcher.interface'

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

  register(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>,
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }

    this.eventHandlers[eventName].push(eventHandler)
  }

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers
  }

  notify(event: eventInterface): void {
    const eventName = event.constructor.name
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event)
      })
    }
  }

  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>,
  ): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].findIndex(
        (handler) => handler === eventHandler,
      )

      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1)
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {}
  }
}
