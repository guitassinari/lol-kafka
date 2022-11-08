import { Constants, LolApi } from 'twisted'
import { CreateMatchUseCase } from '../../../../core/ports/input/create-match-use-case.interface.js'

function newApi(apiKey: string): LolApi {
  return new LolApi({
    key: apiKey
  })
}

function getSummonerByName(api: LolApi, summonerName: string)  {
  console.log(`Getting info for summoner ${summonerName}`)
  return api.Summoner.getByName(summonerName, Constants.Regions.BRAZIL).then(data => data.response)
}

async function getMatchesIdsBySummonerName(api: LolApi, summonerName: string): Promise<string[]> {
  const summoner = await getSummonerByName(api, summonerName)
  
  console.log(`Getting match IDs for summoner ${summonerName}`)
  return api.MatchV5.list(summoner.puuid, Constants.RegionGroups.AMERICAS).then(data => data.response)
}

async function getSummonerMatchesByName(api: LolApi, summonerName: string) {
  const matchIds: string[] = await getMatchesIdsBySummonerName(api, summonerName)  

  console.log(`Waiting one second before fetching matches for summoner ${summonerName}`)
  await new Promise(r => setTimeout(r, 1000))
  return Promise.all(matchIds.map(matchId => getMatchDetails(api, matchId)))
}

function getMatchDetails(api: LolApi, matchId: string) {
  return api.MatchV5.get(matchId, Constants.RegionGroups.AMERICAS).then(data => data.response)
}

interface LolApiAdapterEnvironment {
  apiKey: string,
  summonerNames: string[]
}

export default class LolApiAdapter {
  #app: CreateMatchUseCase
  #api: LolApi
  #summoners: string[]

  constructor(app: CreateMatchUseCase, environment: LolApiAdapterEnvironment) {
    this.#app = app
    this.#api = newApi(environment.apiKey)
    this.#summoners = environment.summonerNames
  }

  async run() {
    this.#summoners.forEach(async (summoner) => {
      console.log(`Fetching matches for summoner ${summoner}`)
      const matches = await getSummonerMatchesByName(this.#api, summoner)

      console.log(`${matches.length} matches found for summoner ${summoner}`)
      matches.forEach(match => {
        console.log(`Sending match ${match.info.gameId} to app`)
        this.#app.createMatch({
          matchId: match.info.gameId.toString(),
          summonerId: summoner
        })
      })
    })
    
  }
}