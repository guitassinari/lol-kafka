export interface MessageBroker {
  createProducer: (topicName: string) => Producer
}

export interface Producer {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  sendMessage: (message: Message) => Promise<any>
  sendMultipleMessages: (messages: Message[]) => Promise<any>
}

export interface Message {
  key: string,
  value: any
}