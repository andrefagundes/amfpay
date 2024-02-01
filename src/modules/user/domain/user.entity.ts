import BaseEntity from '../../@shared/domain/entity/base.entity'
import Id from '../../@shared/domain/value-object/id.value-object'
import Transaction from '../../transaction/domain/transaction.entity'

type UserProps = {
  id?: Id
  fullName: string
  document: string
  email: string
  password?: string
  wallet?: number
  isMerchant?: boolean
  sentTransactions?: Transaction[]
  receivedTransactions?: Transaction[]
  createdAt?: Date
  updatedAt?: Date
}

export default class User extends BaseEntity {
  private _fullName: string
  private _document: string
  private _email: string
  private _password: string
  private _wallet: number | undefined
  private _isMerchant: boolean | undefined

  constructor(props: UserProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._fullName = props.fullName
    this._document = props.document
    this._email = props.email
    this._password = props.password
    this._wallet = props.wallet || 0
    this._isMerchant = props.isMerchant || false
    this.validate()
  }

  validate(transactionAmount?: number): void {
    if (this._wallet !== undefined && this._wallet < 0) {
      throw new Error('Wallet balance cannot be negative')
    }

    if (
      transactionAmount !== undefined &&
      this._wallet !== undefined &&
      this._wallet < transactionAmount
    ) {
      throw new Error('Insufficient funds for the transaction')
    }
  }

  get fullName(): string {
    return this._fullName
  }

  get document(): string {
    return this._document
  }

  get email(): string {
    return this._email
  }

  get password(): string {
    return this._password
  }

  get wallet(): number | undefined {
    return this._wallet
  }

  get isMerchant(): boolean | undefined {
    return this._isMerchant
  }
}
