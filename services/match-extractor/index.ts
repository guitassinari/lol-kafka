const Env = require('./environment')
const Twisted = require('twisted')

const { LolApi, Constants, Dto } = Twisted

const api = new LolApi({
  key: Env.apiKey()
})

async function fetchSummonersFromApi(summonersNames: string[]) {
  const summonerRequests = summonersNames.map(summoner => api.Summoner.getByName(summoner, Constants.Regions.BRAZIL))

  return await Promise.all(summonerRequests)
}
const summonersToFetchData = Env.summoners()

fetchSummonersFromApi(summonersToFetchData).then(
  (response : any) => console.log('Success', response)
).catch(
  error => console.error('Error', error)
)