import KafkaJS from 'kafkajs'

import Env from './src/environment.js'
import Api from './src/riot-api.js'
import Broker from './src/message-broker.js'

const summonersToFetchData = Env.summoners()

const api = Api.newApi(Env.apiKey())

summonersToFetchData.forEach(async summonerName => {
  const matches = await Api.getSummonerMatchesByName(api, summonerName)
  
  console.log(`Matches for summoner ${summonerName}`, matches)
})

const producer = Broker.producer()

const run = async () => {
  await producer.connect()
  setInterval(() => {
    summonersToFetchData.forEach(async summonerName => {
      const matches = await Api.getSummonerMatchesByName(api, summonerName)
      
      console.log(`Matches for summoner ${summonerName}`, matches)

      matches.forEach(match => {
        console.log(match)
        
        producer.send({
          topic: 'match',
          compression: KafkaJS.CompressionTypes.GZIP,
          messages: [{ key: null, value: JSON.stringify({ content: 'yay' }) }]
        }).then(console.log)
        .catch(console.error)
      })
    })
  }, 5000)
}

run().catch(console.error)
