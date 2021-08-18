import React from "react"
import { observer } from "mobx-react-lite"
import { Keyboard, TextStyle, View, ViewStyle } from "react-native"
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
  marginHorizontal: spacing[4],
  justifyContent: "center",
}
const INPUT: TextStyle = {
  backgroundColor: color.palette.lighterGrey,

  padding: spacing[2],
  color: color.palette.black,
}
const SUBMIT: ViewStyle = {
  paddingVertical: spacing[4],
  margin: spacing[2],
}
const SUBMIT_TEXT: TextStyle = {
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: 14,
}

export const CountryInputScreen = observer(function CountryInputScreen() {
  // Pull in one of our MST stores
  const { countryStore } = useStores()
  const { countryName, onChangeCountryName, fetchCountryDetail } = countryStore

  // Pull in navigation via hook
  const navigation: any = useNavigation()
  const onSubmit = async () => {
    Keyboard.dismiss()
    let status = await fetchCountryDetail()
    if (status) {
      navigation.navigate("countryDetail")
      onChangeCountryName("")
    }
  }
  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <View style={CONTAINER}>
        <TextField
          placeholderTx={"countryInput.placeholder"}
          inputStyle={INPUT}
          placeholderTextColor={color.palette.black}
          value={countryName}
          onChangeText={(value) => {
            onChangeCountryName(value)
          }}
        />
        <Button
          disabled={countryName ? false : true}
          tx={"countryInput.submit"}
          style={[SUBMIT, { backgroundColor: countryName ? color.primary : color.dim }]}
          textStyle={SUBMIT_TEXT}
          onPress={onSubmit}
        />
      </View>
    </Screen>
  )
})
