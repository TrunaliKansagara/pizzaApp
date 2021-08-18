import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, Keyboard, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  marginHorizontal: spacing[4],
}
const INPUT: TextStyle = {
  backgroundColor: color.palette.offWhite,
  padding: spacing[2],
  color: color.palette.black,
}
const SUBMIT: ViewStyle = {
  paddingVertical: spacing[4],
  margin: spacing[2],
}
const SUBMIT_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  textTransform: "uppercase",
}
export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { homeStore } = useStores()
  const { changeID, id, fetchRandomID, isLoading, fetchAstData, isAstData } = homeStore

  // Pull in navigation via hook
  const navigation: any = useNavigation()

  const onSubmit = async () => {
    Keyboard.dismiss()
    let status = await fetchAstData()
    if (status) {
      await navigation.navigate("detail")
      changeID("")
    } else {
      changeID("")
    }
  }

  const onRandomAstID = async () => {
    Keyboard.dismiss()
    await fetchRandomID()
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <View style={CONTAINER}>
        <TextField
          placeholder={"Enter Id"}
          inputStyle={INPUT}
          value={id}
          onChangeText={(value) => {
            changeID(value)
          }}
        />
        <Button
          disabled={id ? false : true}
          text={"submit"}
          style={[SUBMIT, { backgroundColor: id ? color.primary : color.dim }]}
          textStyle={SUBMIT_TEXT}
          onPress={onSubmit}
          isLoading={isAstData}
        />
        <Button
          text={"random ast id"}
          style={[SUBMIT, { backgroundColor: color.palette.deepPurple }]}
          textStyle={SUBMIT_TEXT}
          onPress={onRandomAstID}
          isLoading={isLoading}
        />
      </View>
    </Screen>
  )
})
