import Cron from 'node-cron'
import Env from './environment.js'
import KafkaAdapter from './adapters/output/message-broker/kafka/kafka.js'
import MatchExtractor, { Environment } from './core/index.js'
import LolApiAdapter from './adapters/input/create-match-use-case/lol-api/lol-api.js'

const appEnvironment: Environment = {
  matchTopicName: Env.topicName()
}
const app = new MatchExtractor(appEnvironment)

const clientIdKafka = Env.kafkaClientId()
const brokersUrls = Env.kafkaBrokers()
const broker = new KafkaAdapter(brokersUrls, clientIdKafka)
app.setMessageBroker(broker)

const everyHour = '0 * * * *'
console.log(`Beginning cron to run LolApiAdapter every: ${everyHour}`)
Cron.schedule(everyHour, () => {
  (new LolApiAdapter(app, {
    apiKey: Env.apiKey(),
    summonerNames: Env.summoners()
  })).run()
})