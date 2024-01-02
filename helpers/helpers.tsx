import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setWaterConsumedForToday,
  setFilteredChartData,
} from "../redux/waterSlice";
import { Dispatch } from "redux";
import { constants } from "../constants";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

// Ensure that waterState is correctly display on mount

export const initializeWaterConsumedState = async (dispatch: Dispatch) => {
  try {
    const currentDate = new Date().toLocaleDateString("en-CA");

    // Retrieve stored data from AsyncStorage or initialize an empty object
    const waterConsumedDataString =
      (await AsyncStorage.getItem("waterConsumed")) || "{}";
    const waterConsumedData = JSON.parse(waterConsumedDataString);

    dispatch(
      setWaterConsumedForToday({
        amount: waterConsumedData[currentDate] || 0,
        day: currentDate,
      })
    );
  } catch (error) {
    console.error("Error initializing waterConsumed state:", error);
  }
};

// Increasing the water stored for today's date and stores it in async storage/redux state
export const handlePress = async (dispatch: Dispatch, value: number) => {
  try {
    const currentDate = new Date().toLocaleDateString("en-CA");

    // Retrieve stored data from AsyncStorage or initialize an empty object
    const waterConsumedDataString =
      (await AsyncStorage.getItem("waterConsumed")) || "{}";
    let waterConsumedData = JSON.parse(waterConsumedDataString);

    // Update or set the value for the specified date
    waterConsumedData[currentDate] =
      (waterConsumedData[currentDate] || 0) + value;

    // Save updated data to AsyncStorage
    await AsyncStorage.setItem(
      "waterConsumed",
      JSON.stringify(waterConsumedData)
    );

    dispatch(
      setWaterConsumedForToday({
        amount: waterConsumedData[currentDate] || 0,
        day: currentDate,
      })
    );
  } catch (error) {
    console.error("Error adding water consumed:", error);
  }
};

// Resets the water consumed for the current date back to zero
export const resetWaterConsumedForDay = async (dispatch: Dispatch) => {
  try {
    const currentDate = new Date().toLocaleDateString("en-CA");

    // Retrieve stored data from AsyncStorage or initialize an empty object
    const waterConsumedDataString =
      (await AsyncStorage.getItem("waterConsumed")) || "{}";
    let waterConsumedData = JSON.parse(waterConsumedDataString);

    // Set the value for the specified date to 0
    waterConsumedData[currentDate] = 0;

    // Save updated data to AsyncStorage
    await AsyncStorage.setItem(
      "waterConsumed",
      JSON.stringify(waterConsumedData)
    );

    dispatch(
      setWaterConsumedForToday({
        amount: 0,
        day: currentDate,
      })
    );
  } catch (error) {
    console.error("Error resetting water consumed:", error);
  }
};

// Fetch data to be used in the Calendar/Graph
// Also filters for the 5 most recent days baed on the users choice of day
export const fetchData = async (dispatch: Dispatch, day: any) => {
  try {
    const storedData = await AsyncStorage.getItem("waterConsumed");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      // Transform data into the format needed for the LineChart
      const chartDataArray = Object.entries(parsedData).map(
        ([date, value]) => ({
          date,
          value: Number(value), // Ensure the value is of type number
        })
      );

      const selectedDate = day.dateString;
      const selectedDateObject = new Date(selectedDate);

      // Calculate the start date by subtracting 4 days from the selected date
      const startDate = new Date(selectedDateObject);
      startDate.setDate(selectedDateObject.getDate() - 4);

      // Create an array of dates for the selected date and the 4 days before it
      const dateRange = Array.from({ length: 5 }, (_, index) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + index);
        return currentDate.toISOString().split("T")[0];
      });

      // Filter the chart data for the selected date and the 4 days before it
      const filteredData = dateRange.map((date) => {
        const item = chartDataArray.find((item) => item.date === date);
        return item ? item : { date, value: 0 }; // If no data for the date, assign value 0
      });

      dispatch(setFilteredChartData(filteredData));
    }
  } catch (error) {
    console.error("Error fetching data from AsyncStorage:", error);
  }
};

// Responsive icon sizes
const iconSizes = {
  smallScreen: {
    icon: constants.smallScreen.icon,
    ellipsis: constants.smallScreen.ellipsis,
    navIcon: constants.smallScreen.navIcon,
    circleWidth: constants.smallScreen.circleWidth,
    circleHeight: constants.smallScreen.circleHeight,
  },
  mediumScreen: {
    icon: constants.mediumScreen.icon,
    ellipsis: constants.mediumScreen.ellipsis,
    navIcon: constants.mediumScreen.navIcon,
    circleWidth: constants.mediumScreen.circleWidth,
    circleHeight: constants.mediumScreen.circleHeight,
  },
  largeScreen: {
    icon: constants.largeScreen.icon,
    ellipsis: constants.largeScreen.ellipsis,
    navIcon: constants.largeScreen.navIcon,
    circleWidth: constants.largeScreen.circleWidth,
    circleHeight: constants.largeScreen.circleHeight,
  },
};

export const iconSize =
  iconSizes[
    screenWidth <= 480
      ? "smallScreen"
      : screenWidth <= 768
      ? "mediumScreen"
      : "largeScreen"
  ];

// Creates the Circle SVG that fills the circle as more water is consumed
export const calculatePath = (percentage: number) => {
  const radius = 50;
  let angle = (percentage / 100) * 360;

  if (percentage >= 100) {
    angle = constants.angle;
  }

  const x1 = radius;
  const y1 = 0;
  const x2 = radius + radius * Math.sin((angle * Math.PI) / 180);
  const y2 = radius - radius * Math.cos((angle * Math.PI) / 180);

  const largeArcFlag = angle > 180 ? 1 : 0;

  return `
      M ${radius} ${radius}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      Z
    `;
};
