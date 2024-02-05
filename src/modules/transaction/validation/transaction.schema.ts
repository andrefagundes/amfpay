export const transactionSchema = {
  body: {
    type: 'object',
    properties: {
      value: { type: 'number', minimum: 0.1 },
      senderId: {
        type: 'string',
        pattern:'[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
      },
      receiverId: {
        type: 'string',
        pattern:'[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
      },
    },
    required: ['value', 'senderId', 'receiverId'],
    additionalProperties: false,
  },
}
