import BaseEntity from '../../@shared/domain/entity/base.entity'
import Id from '../../@shared/domain/value-object/id.value-object'
import User from '../../user/domain/user.entity'

type TransactionProps = {
  id?: Id
  value: number
  senderId: string
  receiverId: string
  createdAt?: Date
}

export default class Transaction extends BaseEntity {
  private _value: number
  private _senderId: string
  private _receiverId: string

  constructor(props: TransactionProps) {
    super(props.id)
    this._value = props.value
    this._senderId = props.senderId
    this._receiverId = props.receiverId
    this.validate()
  }

  validate(): void {
    if (this._value <= 0) {
      throw new Error('Value must be greater than 0')
    }
  }

  get value(): number {
    return this._value
  }

  get senderId(): string {
    return this._senderId
  }

  get receiverId(): string {
    return this._receiverId
  }
}
