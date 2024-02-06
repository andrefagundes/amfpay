class TransactionError extends Error {
  private success: boolean
  private code: string

  constructor(message: string, code: string) {
    super(message)
    this.code = code
    this.success = false
  }

  toResponse() {
    return {
      success: this.success,
      error: {
        code: this.code,
        message: this.message,
      },
    }
  }
}

export default TransactionError
