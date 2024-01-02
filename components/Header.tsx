import React, { useState } from "react";
import { TouchableOpacity, Text, Modal, TextInput, View } from "react-native";
import { styles } from "../styles/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { constants } from "../constants";
import { useAppDispatch, useAppSelector } from "../redux/useApp";
import {
  setTarget,
  setCup,
  setBottle,
  setModalVisible,
} from "../redux/waterSlice";
import { iconSize } from "../helpers/helpers";

const Header = () => {
  const dispatch = useAppDispatch();
  const { target, cup, bottle, modalVisible } = useAppSelector(
    (state) => state.water
  );

  const [targetInput, setTargetInput] = useState("");
  const [cupInput, setCupInput] = useState("");
  const [bottleInput, setBottleInput] = useState("");

  // Converts the textInputs into numbers, then sets the state in redux
  const convertAndDispatch = () => {
    const convertedTarget =
      targetInput !== "" ? parseInt(targetInput, 10) : 2000;
    const convertedCup = cupInput !== "" ? parseInt(cupInput, 10) : 250;
    const convertedBottle =
      bottleInput !== "" ? parseInt(bottleInput, 10) : 1000;

    dispatch(setTarget(convertedTarget));
    dispatch(setCup(convertedCup));
    dispatch(setBottle(convertedBottle));

    closeModal();
  };

  const closeModal = () => {
    dispatch(setModalVisible(false));
  };
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>AquaFlow</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => dispatch(setModalVisible(true))}>
          <Icon
            name="ellipsis-vertical"
            size={iconSize.ellipsis}
            color={constants.colors.white}
          />
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.textContainerStyle}>
              <Text
                style={[
                  styles.textWhite,
                  styles.titleFont,
                  styles.bottomMargin,
                ]}
              >
                Settings
              </Text>
              <Text style={[styles.textWhite, styles.bottomMargin]}>
                Here you can customize the volumes of the water cup and bottle
                to match your own to make adding water quick and easy.{" "}
              </Text>
              <Text style={[styles.textWhite, styles.bottomMargin]}>
                Current Volumes:
              </Text>
              <View style={styles.bottomMargin}>
                <Text style={[styles.textWhite]}>Target: {target} ml</Text>
                <Text style={styles.textWhite}>Water cup: {cup} ml</Text>
                <Text style={styles.textWhite}>Water bottle: {bottle} ml</Text>
              </View>
            </View>
            <View style={styles.maxWidth}>
              <TextInput
                placeholderTextColor={constants.colors.lightGrey}
                placeholder="Target"
                keyboardType="numeric"
                style={styles.waterInput}
                onChangeText={(text) => setTargetInput(text)}
              ></TextInput>
              <TextInput
                placeholderTextColor={constants.colors.lightGrey}
                placeholder="Volume of your water cup"
                keyboardType="numeric"
                style={styles.waterInput}
                onChangeText={(text) => setCupInput(text)}
              ></TextInput>
              <TextInput
                placeholderTextColor={constants.colors.lightGrey}
                placeholder="Volume of your water bottle"
                keyboardType="numeric"
                style={styles.waterInput}
                onChangeText={(text) => setBottleInput(text)}
              ></TextInput>
            </View>
            <TouchableOpacity onPress={convertAndDispatch}>
              <Text style={[styles.textLightBlue, styles.titleFont]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;
