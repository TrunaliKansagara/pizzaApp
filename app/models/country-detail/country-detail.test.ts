import { CountryDetailModel } from "./country-detail"

test("can be created", () => {
  const instance = CountryDetailModel.create({})

  expect(instance).toBeTruthy()
})
