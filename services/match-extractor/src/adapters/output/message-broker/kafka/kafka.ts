import { Kafka } from 'kafkajs';
import { MessageBroker } from '../../../../core/ports/output/message-broker.interface.js';
import Producer from './producer.js'

export default class KafkaMessageBroker implements MessageBroker {
  #kafka: Kafka
  #producer: Producer

  constructor(brokersList, cliendId) {
    this.#kafka = new Kafka({
      clientId: cliendId,
      brokers: brokersList
    })
  }

  createProducer(topicName) {
    if(!this.#producer) {
      const kafkaJsProducer = this.#kafka.producer();
      this.#producer = new Producer(topicName, kafkaJsProducer);
    }

    return this.#producer
  }
}
