require('dotenv').config()

const STRING_LIST_SPLITTER = ','

function summoners(): string[] {
  const summonerNamesString: string = getEnv('SUMMONERS')
  return summonerNamesString.split(STRING_LIST_SPLITTER)
}
 
function apiKey(): string {
  return getEnv('RIOT_API_KEY')
}

function kafkaClientId(): string {
  return getEnv('KAFKA_CLIENT_ID')
}

function getEnv(envName: string): string {
  return process.env[envName]
}

function kafkaBrokers(): string[] {
  const brokers = getEnv("KAFKA_BROKERS")
  return brokers.split(STRING_LIST_SPLITTER)
}

function consumerGroupIds() : string {
  const consumerGroupId = getEnv('KAFKA_CLIENT_ID')
  return consumerGroupId
}

function topicName() : string {
  return getEnv('MATCHES_TOPIC_NAME')
}

module.exports = {
  apiKey,
  summoners,
  kafkaBrokers,
  kafkaClientId,
  consumerGroupIds,
  topicName
}