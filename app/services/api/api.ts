import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { API_TOKEN } from "../../utils/constant"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    console.log("config=====", config)
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = (raw) => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getRandomID(): Promise<Types.GetRandomIDResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`neo/browse?api_key=${API_TOKEN}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data

      return { kind: "ok", randomData: rawUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getAstData(ID: string): Promise<Types.GetAstDataResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`neo/${ID}?api_key=${API_TOKEN}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data

      return { kind: "ok", astData: rawUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getCountryDetail(countryName: string): Promise<Types.GetCountryDataResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `https://restcountries.eu/rest/v2/name/${countryName}`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data

      return { kind: "ok", countryData: rawUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getWeatherDetail(capitalName: string): Promise<Types.GetWeatherDataResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `http://api.weatherstack.com/current?access_key=85090227d0152d43e68df24fb4ef0ac2&query=new delhi`,
    )
    console.log("response=====", response)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data

      return { kind: "ok", weatherData: rawUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
