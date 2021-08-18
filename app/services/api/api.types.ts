import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
export type GetRandomIDResult = { kind: "ok"; randomData: any } | GeneralApiProblem
export type GetAstDataResult = { kind: "ok"; astData: any } | GeneralApiProblem
export type GetCountryDataResult = { kind: "ok"; countryData: any } | GeneralApiProblem
export type GetWeatherDataResult = { kind: "ok"; weatherData: any } | GeneralApiProblem
