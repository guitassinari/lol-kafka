const Env = require('./environment')
const Api = require('./riot-api')

const summonersToFetchData = Env.summoners()

const api = Api.newApi({ key: Env.apiKey() })

summonersToFetchData.forEach(async summonerName => {
  const matches = await Api.getSummonerMatchesByName(api, summonerName)
  
  console.log(`Matches for summoner ${summonerName}`, matches)
})
