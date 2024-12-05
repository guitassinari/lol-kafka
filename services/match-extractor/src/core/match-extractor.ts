import { MessageBroker } from './ports/output/message-broker.interface.js'
import { CreateMatchUseCase, MatchObject } from './ports/input/create-match-use-case.interface.js'
import Environment from './environment.interface.js'
import CreateMatch from './domain/services/create-match.js';

export default class MatchExtractor implements CreateMatchUseCase {
  #messageBroker: MessageBroker;
  #environment: Environment

  constructor(environment: Environment) {
    this.#environment = environment
  }

  setMessageBroker(broker: MessageBroker) {
    this.#messageBroker = broker
  }

  createMatch(match: MatchObject) {
    const service = new CreateMatch(match, this.#messageBroker, this.#environment)
    console.log(`Running create match service for match ${match.matchId}`)
    return service.run().then(() => true).catch(() => false)
  }
}