import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../styles/styles";
import { constants } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/useApp";
import { fetchData } from "../helpers/helpers";
import { iconSize } from "../helpers/helpers";
import MedIcon from "react-native-vector-icons/MaterialIcons";


const Calend = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { filteredChartData } = useAppSelector((state) => state.water);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height * 0.3;

  const handleDayPress = (day: any) => {
    fetchData(dispatch, day);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.basicText}>
          Click on a day of the week to see your progress
        </Text>
      </View>
      <View>
        <Calendar
          theme={{
            calendarBackground: constants.colors.darkBlue,
            textSectionTitleColor: constants.colors.white,
            dayTextColor: constants.colors.white,
            monthTextColor: constants.colors.white,
          }}
          onDayPress={handleDayPress}
        />
      </View>
      {filteredChartData.length > 0 && (
        <View style={styles.centerContainer}>
          <Text style={styles.textWhite}>Water Stats</Text>
          <LineChart
            data={{
              labels: filteredChartData.map((entry) => entry.date),
              datasets: [
                {
                  data: filteredChartData.map((entry) => entry.value),
                },
              ],
            }}
            width={screenWidth}
            height={screenHeight}
            chartConfig={{
              backgroundColor: constants.colors.darkBlue,
              backgroundGradientFrom: constants.colors.darkBlue,
              backgroundGradientTo: constants.colors.darkBlue,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: constants.colors.orange,
              },
            }}
            bezier
          />
        </View>
      )}
      <View style={styles.navbar}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home" as never)}
          >
            <Icon
              name="home"
              size={iconSize.navIcon}
              color={constants.colors.grey}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Icon
            name="podium-sharp"
            size={iconSize.navIcon}
            color={constants.colors.white}
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Medical" as never)}
          >
            <MedIcon
              name="medical-services"
              size={iconSize.navIcon}
              color={constants.colors.grey}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Calend;
