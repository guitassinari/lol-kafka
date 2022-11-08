export interface CreateMatchUseCase {
  createMatch: (match: MatchObject) => Promise<boolean>
}

export interface MatchObject {
  matchId: string
  summonerId: string
}