import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../styles/styles";
import CircleFillerApp from "./CircleFillerApp";
import Bottle from "react-native-vector-icons/MaterialCommunityIcons";
import MedIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { constants } from "../constants";
import { useAppDispatch, useAppSelector } from "../redux/useApp";
import { handlePress, resetWaterConsumedForDay } from "../helpers/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { iconSize } from "../helpers/helpers";
import { initializeWaterConsumedState } from "../helpers/helpers";

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    cup: cupValue,
    bottle: bottleValue,
    waterConsumedForToday,
    target,
  } = useAppSelector((state) => state.water);
  const navigation = useNavigation();

  useEffect(() => {
    initializeWaterConsumedState(dispatch);
  }, []);

  useEffect(() => {
    // Function to calculate water consumption ratio and send alert
    const checkWaterConsumption = async () => {
      const ratio = waterConsumedForToday / target;

      // Check if the alert has been shown today
      const lastAlertDate = await AsyncStorage.getItem("lastAlertDate");
      const currentDate = new Date().toLocaleDateString();

      if (!lastAlertDate || lastAlertDate !== currentDate) {
        if (ratio >= 0.5) {
          Alert.alert(
            "Alert",
            "You've consumed more than 50% of your daily target!"
          );

          // Save the current date to AsyncStorage
          await AsyncStorage.setItem("lastAlertDate", currentDate);
        }
      }
    };

    // Call the function regardless of the time
    checkWaterConsumption();
  }, [waterConsumedForToday, target]);

  return (
    <View style={styles.container}>
      <CircleFillerApp />
      <View style={styles.containerSpace}>
        <Text style={[styles.title, styles.textCenter]}>
          + Add a portion of water
        </Text>
        <Text style={[styles.basicText, styles.textCenter]}>
          Water Consumed for Today: {waterConsumedForToday} ml
        </Text>
        <View style={styles.containerBottom}>
          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePress(dispatch, cupValue)}
            >
              <Bottle
                name="beer"
                color={constants.colors.white}
                size={iconSize.icon}
              />
              <Text style={styles.basicText}>CUP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePress(dispatch, bottleValue)}
            >
              <Bottle
                name="bottle-soda-classic"
                color={constants.colors.white}
                size={iconSize.icon}
              />
              <Text style={styles.basicText}>BOTTLE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => resetWaterConsumedForDay(dispatch)}
            >
              <Text style={styles.basicText}>RESET</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.navbar}>
        <View style={styles.row}>
          <Icon
            name="home"
            size={iconSize.navIcon}
            color={constants.colors.white}
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Calend" as never)}
          >
            <Icon
              name="podium"
              size={iconSize.navIcon}
              color={constants.colors.grey}
            />
          </TouchableOpacity>
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

export default Home;
