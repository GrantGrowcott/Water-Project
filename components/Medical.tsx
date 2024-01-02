import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../styles/styles";
import { constants } from "../constants";
import { iconSize } from "../helpers/helpers";
import { useNavigation } from "@react-navigation/native";
import MedIcon from "react-native-vector-icons/MaterialIcons";

const Medical = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, styles.medContainer, styles.container]}>
      <View style={styles.hydrationContainer}>
        <Text style={styles.tipsTitle}>Tips For Staying Hydrated</Text>
      </View>
      <View style={styles.tipsContainer}>
        <Text style={styles.basicText}>
          1. Drink a glass of water first thing in the morning.
        </Text>
        <Text></Text>
        <Text style={styles.basicText}>2. Focus on your body's signals.</Text>
        <Text></Text>
        <Text style={styles.basicText}>
          3. Drink a glass of water before each meal.
        </Text>
        <Text></Text>
        <Text style={styles.basicText}>4. Add calorie-free flavoring.</Text>
        <Text></Text>
        <Text style={styles.basicText}>5. Check the color of your urine.</Text>
        <Text></Text>
        <Text style={styles.basicText}>
          6. Swap high sugar drinks for sparkling water or seltzer.
        </Text>
        <Text></Text>
        <Text style={styles.basicText}>
          7. Invest in a fun or fancy water bottle.
        </Text>
        <Text></Text>
        <Text style={styles.basicText}>
          8. Eat your water by following a produce-heavy diet.
        </Text>
        <Text></Text>
        <Text style={styles.basicText}>
          9. Cut back on caffeine, sports drinks and alcohol.
        </Text>
        <Text></Text>
        <Text style={styles.basicText}>
          10. Drink water when you feel hungry.
        </Text>
      </View>
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
          <MedIcon
            name="medical-services"
            size={iconSize.navIcon}
            color={constants.colors.white}
          />
        </View>
      </View>
    </View>
  );
};

export default Medical;
