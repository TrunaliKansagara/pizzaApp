import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image } from "react-native"
import { Screen, Text, Header, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { SvgUri } from "react-native-svg"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const ROWS: ViewStyle = {
  flexWrap: "wrap",
  flexDirection: "row",
}
export const CountryDetailScreen = observer(function CountryDetailScreen() {
  // Pull in one of our MST stores
  const { countStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const renderRows = (title, value) => {
    return (
      <View style={ROWS}>
        <Text text={title} preset={"bold"} />
        <Text text={value} preset={"default"} />
      </View>
    )
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon={"back"} />
      <View>
        {renderRows("Capital : ", countStore.countryData.capital)}
        {renderRows("Population : ", countStore.countryData.population)}
        {renderRows(
          "lailng : ",
          countStore.countryData.latlng[0] + " , " + countStore.countryData.latlng[1],
        )}
        <SvgUri uri={countStore.countryData.flag} height={50} width={50} />
        <Button
          text={"Weather Detail"}
          style={{ margin: 10, paddingVertical: 15 }}
          onPress={async () => {
            await countStore.fetchWeatherDetail(countStore.countryData.capital)
          }}
          isLoading={countStore.isLoading}
        />
        {countStore.weatherData && (
          <>
            {renderRows("weather", countStore.weatherData.current.temperature)}
            <Image
              source={{ uri: countStore.weatherData.current.weather_icons[0] }}
              style={{ height: 50, width: 50 }}
            />
          </>
        )}
      </View>
    </Screen>
  )
})
