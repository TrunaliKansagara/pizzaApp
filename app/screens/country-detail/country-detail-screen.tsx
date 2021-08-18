import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Header, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { TxKeyPath } from "../../i18n"
import { SvgUri } from "react-native-svg"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  marginHorizontal: spacing[4],
  alignItems: "center",
}
const TITLE: TextStyle = {
  fontWeight: "bold",
  color: color.palette.black,
  fontSize: 16,
}
const VALUE: TextStyle = {
  fontSize: 14,
  color: color.palette.black,
}
const ROWS: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  paddingVertical: spacing[2],
  alignItems: "center",
}
const WEATHER: ViewStyle = {
  backgroundColor: color.palette.deepPurple,
  paddingVertical: spacing[4],
  width: "80%",
  marginVertical: spacing[4],
}
const WEATHER_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
}
export const CountryDetailScreen = observer(function CountryDetailScreen() {
  // Pull in one of our MST stores
  const { countryStore } = useStores()
  const { countryData, fetchWeakerData, weatherData, isLoading } = countryStore
  const { capital, population, flag } = countryData

  const onWeatherDetail = async () => {
    await fetchWeakerData(capital)
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const renderRows = (title: TxKeyPath, value: any) => {
    return (
      <View style={ROWS}>
        <Text tx={title} style={TITLE} />
        <Text text={" : "} style={TITLE} />
        <Text text={value} style={VALUE} preset={"secondary"} />
      </View>
    )
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Header headerText={"Country Detail"} leftIcon={"back"} titleStyle={TITLE} />
      <View style={CONTAINER}>
        {renderRows("countryDetail.capital", capital)}
        {renderRows("countryDetail.population", population)}

        <View style={ROWS}>
          <Text tx={"countryDetail.flag"} preset={"bold"} style={TITLE} />
          <SvgUri uri={flag} height={50} width={50} />
        </View>

        <Button
          onPress={onWeatherDetail}
          style={WEATHER}
          tx={"countryDetail.weatherDetail"}
          textStyle={WEATHER_TEXT}
          isLoading={isLoading}
        />
        {weatherData && (
          <View>{renderRows("countryDetail.weather", weatherData.current.weather)}</View>
        )}
      </View>
    </Screen>
  )
})
