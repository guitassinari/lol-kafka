import * as dotenv from 'dotenv'
dotenv.config()

const STRING_LIST_SPLITTER = ','

function summoners(): string[] {
  const summonerNamesString = getEnv('SUMMONERS')
  if(!summonerNamesString) {
    return []
  }

  return summonerNamesString.split(STRING_LIST_SPLITTER)
}
 
function apiKey(): string | undefined {
  return getEnv('RIOT_API_KEY')
}

function kafkaClientId(): string | undefined {
  return getEnv('KAFKA_CLIENT_ID')
}

function getEnv(envName: string): string | undefined {
  return process.env[envName]
}

function kafkaBrokers(): string[] {
  const brokers = getEnv("KAFKA_BROKERS")
  if(!brokers) {
    return []
  }

  return brokers.split(STRING_LIST_SPLITTER)
}

function consumerGroupIds() : string | undefined {
  const consumerGroupId = getEnv('KAFKA_CLIENT_ID')
  return consumerGroupId
}

function topicName() : string | undefined {
  return getEnv('MATCHES_TOPIC_NAME')
}

export default {
  apiKey,
  summoners,
  kafkaBrokers,
  kafkaClientId,
  consumerGroupIds,
  topicName
}