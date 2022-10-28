const { Kafka } = require('kafkajs')

const env = require('./environment')

const clientIdKafka = env.kafkaClientId()
const kafkaGroupId = env.consumerGroupIds()
const kafkaBroker = env.kafkaBrokers()
const topicNameFromEnv = env.topicName()

const messageToSend = {
  matchId : '123456789',
  summonerId : '123456'
}

const kafka = new Kafka({
  clientId: clientIdKafka,
  brokers: kafkaBroker
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: kafkaGroupId })

const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic:topicNameFromEnv,
    messages: [
      { value: JSON.stringify(messageToSend) },
    ]
  })
}

run().catch(console.error)