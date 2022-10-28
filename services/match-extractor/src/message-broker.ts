import { Kafka } from 'kafkajs'

import env from './environment.js'

const clientIdKafka = env.kafkaClientId()
const brokers = env.kafkaBrokers()

const kafka = new Kafka({
  clientId: clientIdKafka,
  brokers: brokers
})

export default kafka