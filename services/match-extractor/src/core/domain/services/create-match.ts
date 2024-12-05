import Environment from '../../environment.interface.js';
import { MessageBroker } from '../../ports/output/message-broker.interface.js';
import { DomainService } from './service.interface.js';

export default class CreateMatch implements DomainService {
  #match: Object
  #messageBroker: MessageBroker
  #environment: Environment

  constructor(match: Object, messageBroker: MessageBroker, environment: Environment) {
    this.#match = match
    this.#messageBroker = messageBroker
    this.#environment = environment
  }

  async run() {
    const producer = this.#messageBroker.createProducer(this.#environment.matchTopicName)
    await producer.connect()
    await producer.sendMessage({
      key: null,
      value: JSON.stringify(this.#match)
    }).then(console.log)
    .catch(console.error)
  }
}