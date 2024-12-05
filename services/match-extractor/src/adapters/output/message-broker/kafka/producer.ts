import { CompressionTypes, Producer as KafkaProducer } from 'kafkajs';
import { Producer as CoreProducerInterface } from '../../../../core/ports/output/message-broker.interface.js'

export default class Producer implements CoreProducerInterface {
  #topicName: string
  #kafkaProducer: KafkaProducer

  constructor(topicName, kafkajsProducer) {
    this.#topicName = topicName
    this.#kafkaProducer = kafkajsProducer
  }

  connect() {
    return this.#kafkaProducer.connect()
  }

  disconnect() {
    return this.#kafkaProducer.disconnect()
  }

  sendMessage(message) {
    return this.#kafkaProducer.send({
      topic: this.#topicName,
      compression: CompressionTypes.GZIP,
      messages: [message]
    });
  }

  sendMultipleMessages(messages) {
    return this.#kafkaProducer.send({
      topic: this.#topicName,
      compression: CompressionTypes.GZIP,
      messages: messages
    });
  }
}