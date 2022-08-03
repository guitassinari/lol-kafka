require('dotenv').config()

const SUMMONER_NAMES_DIVIDER = ','

function summoners(): string[] {
  const summonerNamesString: string = getEnv('SUMMONERS')
  return summonerNamesString.split(SUMMONER_NAMES_DIVIDER)
}
 
function apiKey(): string {
  return getEnv('RIOT_API_KEY')
}

function getEnv(envName: string): string {
  return process.env[envName]
}

module.exports = {
  apiKey,
  summoners
}