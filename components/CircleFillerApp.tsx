import React from "react";
import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { styles } from "../styles/styles";
import { constants } from "../constants";
import Info from "react-native-vector-icons/FontAwesome5";
import { useAppSelector } from "../redux/useApp";
import { iconSize } from "../helpers/helpers";
import { calculatePath } from "../helpers/helpers";

const CircleFillerApp = () => {
  const { target, waterConsumedForToday } = useAppSelector(
    (state) => state.water
  );

  return (
    <View style={styles.circleContainer}>
      <Text style={styles.todayStyles}>Today</Text>
      <View style={styles.todayTargetContainer}>
        <Info
          name="info-circle"
          size={iconSize.icon}
          color={constants.colors.lightBlue}
        />
        <Text style={styles.targetStyles}>Water target: {target} ml</Text>
      </View>
      <Svg
        width={iconSize.circleWidth}
        height={iconSize.circleHeight}
        viewBox={`0 0 ${2 * 50} ${2 * 50}`}
      >
        <Path
          d={calculatePath((waterConsumedForToday / target) * 100)}
          fill={constants.colors.lightBlue}
          stroke={constants.colors.lightBlue}
        />
      </Svg>
      <Text style={styles.basicText}>
        {(waterConsumedForToday / target) * 100}%
      </Text>
    </View>
  );
};

export default CircleFillerApp;
