import { HomeModel } from "./home"

test("can be created", () => {
  const instance = HomeModel.create({})

  expect(instance).toBeTruthy()
})
