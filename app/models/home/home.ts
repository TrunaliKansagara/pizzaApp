import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { Api } from "../../services/api"
import { findRandomObject } from "../../utils/constant"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const HomeModel = types
  .model("Home")
  .props({
    id: types.optional(types.string, ""),
    isLoading: types.optional(types.boolean, false),
    isAstData: types.optional(types.boolean, false),
    astData: types.optional(types.frozen(), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    changeID(id: string) {
      self.id = id
    },
    fetchRandomID: flow(function* fetchRandomID() {
      try {
        self.isLoading = true
        const response = yield api.getRandomID()
        if (response.kind === "ok") {
          const data = response.randomData.near_earth_objects
          let randomObject = findRandomObject(data)
          console.log("rendsdd==", randomObject.id)
          self.id = randomObject.id

          self.isLoading = false
          return true
        } else {
          self.isLoading = false
          Alert.alert("id notfound")
          return false
        }
      } catch (error) {}
    }),
    fetchAstData: flow(function* fetchAstData() {
      try {
        self.isAstData = true
        const response = yield api.getAstData(self.id)
        if (response.kind === "ok") {
          self.astData = response.astData
          self.isAstData = false
          return true
        } else {
          self.isAstData = false
          Alert.alert("Data not Found")
          return false
        }
      } catch (error) {}
      self.isAstData = false
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type HomeType = Instance<typeof HomeModel>
export interface Home extends HomeType {}
type HomeSnapshotType = SnapshotOut<typeof HomeModel>
export interface HomeSnapshot extends HomeSnapshotType {}
export const createHomeDefaultModel = () => types.optional(HomeModel, {})
