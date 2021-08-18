import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CountryDetailModel = types
  .model("CountryDetail")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type CountryDetailType = Instance<typeof CountryDetailModel>
export interface CountryDetail extends CountryDetailType {}
type CountryDetailSnapshotType = SnapshotOut<typeof CountryDetailModel>
export interface CountryDetailSnapshot extends CountryDetailSnapshotType {}
export const createCountryDetailDefaultModel = () => types.optional(CountryDetailModel, {})
