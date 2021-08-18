import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api, GetCountryDataResult, GetWeatherDataResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const CountryModel = types
  .model("Country")
  .props({
    countryName: types.maybe(types.string),
    isLoading: types.maybe(types.boolean),
    countryData: types.optional(types.frozen(), null),
    weatherData: types.optional(types.frozen(), null),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    onChangeCountryName(countryName: string) {
      self.countryName = countryName
    },

    fetchCountryDetail: flow(function* fetchCountryDetail() {
      try {
        self.isLoading = true
        const response: GetCountryDataResult = yield api.getCountryDetail(self.countryName)
        console.log("response====", response)

        if (response.kind === "ok") {
          const data = response.countryData
          for (let index = 0; index < data.length; index++) {
            const element = data[index]
            if (element.name === self.countryName) {
              self.countryData = element
            } else {
              self.countryData = data[0]
            }
          }
          self.isLoading = false
          return true
        } else {
          self.countryData = null
          self.isLoading = false
          Alert.alert("data not found")
          return false
        }
      } catch (error) {}
    }),
    fetchWeakerData: flow(function* fetchWeakerData(capitalName) {
      try {
        self.isLoading = true
        const response = yield api.getWeatherDetail(capitalName)
        console.log("weatherData====", response)

        if ((response.kind = "ok")) {
          const data = response.weatherData
          self.weatherData = data
          self.isLoading = false
        } else {
          self.isLoading = false
          Alert.alert("Data not found")
        }
      } catch (error) {
        self.isLoading = false
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type CountryType = Instance<typeof CountryModel>
export interface Country extends CountryType {}
type CountrySnapshotType = SnapshotOut<typeof CountryModel>
export interface CountrySnapshot extends CountrySnapshotType {}
export const createCountryDefaultModel = () => types.optional(CountryModel, {})
