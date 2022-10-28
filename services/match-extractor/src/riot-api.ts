import Twisted from 'twisted'
const { LolApi, Constants } = Twisted

function newApi(apiKey: string) {
  return new LolApi({
    key: apiKey
  })
}

function getSummonerByName(api, summonerName: string) {
  console.log(`Getting info for summoner ${summonerName}`)
  return api.Summoner.getByName(summonerName, Constants.Regions.BRAZIL).then(data => data.response)
}

async function getMatchesIdsBySummonerName(api, summonerName: string): Promise<string[]> {
  const summoner = await getSummonerByName(api, summonerName)
  
  console.log(`Getting match IDs for summoner ${summonerName}`)
  return api.MatchV5.list(summoner.puuid, Constants.RegionGroups.AMERICAS).then(data => data.response)
}

async function getSummonerMatchesByName(api, summonerName: string) {
  const matchIds: string[] = await getMatchesIdsBySummonerName(api, summonerName)  

  console.log(`Waiting one second before fetching matches for summoner ${summonerName}`)
  await new Promise(r => setTimeout(r, 1000))
  return Promise.all(matchIds.map(matchId => getMatchDetails(api, matchId)))
}

function getMatchDetails(api, matchId: string) {
  return api.MatchV5.get(matchId, Constants.RegionGroups.AMERICAS).then(data => data.response)
}

export default {
  getSummonerMatchesByName,
  newApi
}