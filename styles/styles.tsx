import StyleSheet from "react-native-media-query";
import { Dimensions } from "react-native";
import { constants } from "../constants";

const { height } = Dimensions.get("window");

export const { ids, styles } = StyleSheet.create({
  textWhite: {
    color: constants.colors.white,
  },

  textLightBlue: {
    color: constants.colors.lightBlue,
  },

  textCenter: {
    textAlign: "center",
  },

  bottomMargin: {
    marginBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: constants.colors.darkBlue,
  },

  maxWidth: {
    width: "100%"
  },

  // Home Styles
  containerSpace: {
    flex: 1,
    justifyContent: "space-between",
  },

  containerBottom: {
    flex: 1,
    justifyContent: "center",
  },

  iconStyles: {
    fontSize: 20,
  },

  circleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  navbar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    justifyItems: "center",
    paddingHorizontal: "20%",
    paddingVertical: 10,
    backgroundColor: constants.colors.blue,
    zIndex: 0,
  },
  row: {
    flexDirection: "row",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "center",
    gap: 20,
    zIndex: 1,
  },

  // Header Styles

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: constants.colors.blue,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontFamily: "Bangers_400Regular",
    color: constants.colors.white,
    "@media(min-width : 768px)": {
      fontSize: 40,
    },
  },

  basicText: {
    color: constants.colors.white,
    fontSize: 16,
    "@media(min-width : 768px)": {
      fontSize: 25,
    },
  },

  textInput: {
    borderWidth: 1,
    textAlign: "center",
    borderColor: constants.colors.white,
    color: constants.colors.white,
    width: "35%",
    padding: 5,
    marginTop: 10,
  },

  iconContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
    paddingTop: 15,
  },

  // Modal Styles

  textContainerStyle: {
    alignSelf: "flex-start",
    color: constants.colors.white,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  modalView: {
    width: "100%",
    padding: 20,
    backgroundColor: constants.colors.grey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  titleFont: {
    fontSize: 20,
    fontWeight: "bold",
  },

  waterInput: {
    padding: 10,
    marginBottom: 30,
    backgroundColor: constants.colors.darkBlue,
    color: constants.colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderBottomColor: constants.colors.lightBlue,
  },

  button: {
    backgroundColor: constants.colors.lightBlue,
    padding: 10,
    "@media(min-width : 768px)": {
      padding: 15,
    },
    borderRadius: 30,
    flexDirection: "row",
    gap: 10,
  },

  todayTargetContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: constants.colors.lightBlue,
    padding: 5,
    "@media(min-width : 768px)": {
      padding: 10,
    },
    marginBottom: 100,
  },

  todayStyles: {
    marginBottom: 20,
    color: constants.colors.white,
    fontSize: 18,
    fontWeight: "bold",
    "@media(min-width : 500px)": {
      fontSize: 40,
    },
  },

  targetStyles: {
    marginLeft: 10,
    color: constants.colors.lightBlue,
    fontSize: 12,
    fontWeight: "bold",
    "@media(min-width : 500px)": {
      fontSize: 24,
    },
  },

  // Calendar styles

  centerContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  // Medical styles

  medContainer: {
    justifyContent: "flex-start",
  },

  hydrationContainer: {
    alignItems: "center",
    marginTop: 40,
  },

  tipsContainer: {
    marginTop: 50,
    width: "80%",
    alignSelf: "center",
  },

  tipsTitle: {
    color: constants.colors.white,
    fontSize: 20,
    "@media(min-width : 768px)": {
      fontSize: 30,
    },
    fontWeight: "bold",
  },
});
