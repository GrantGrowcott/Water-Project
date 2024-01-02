import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WaterConsumedPayload {
  amount: number;
  day: string;
}

type ArrayData = { date: string; value: number };

export interface WaterState {
  waterConsumed: { [key: string]: number };
  filteredChartData: Array<ArrayData>;
  waterConsumedForToday: number;
  target: number;
  cup: number;
  bottle: number;
  modalVisible: boolean;
}

const initialState: WaterState = {
  waterConsumed: {},
  filteredChartData: [],
  waterConsumedForToday: 0,
  target: 2000,
  cup: 250,
  bottle: 1000,
  modalVisible: false
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    setWaterConsumedForToday: (
      state,
      action: PayloadAction<WaterConsumedPayload>
    ) => {
      const { amount, day } = action.payload;
      state.waterConsumedForToday = amount;
      state.waterConsumed[day] = amount;
    },
    setFilteredChartData: (state, action: PayloadAction<ArrayData[]>) => {
      state.filteredChartData = action.payload;
    },
    setTarget: (state, action: PayloadAction<number>) => {
      state.target = action.payload;
      AsyncStorage.setItem("target", state.target.toString());
    },
    setCup: (state, action: PayloadAction<number>) => {
      state.cup = action.payload;
    },
    setBottle: (state, action: PayloadAction<number>) => {
      state.bottle = action.payload;
    },
    setModalVisible: (state, action: PayloadAction<boolean>) => {
      state.modalVisible = action.payload;
    },
     
  },
});

export const {
  setTarget,
  setCup,
  setBottle,
  setWaterConsumedForToday,
  setFilteredChartData,
  setModalVisible
} = waterSlice.actions;

export default waterSlice.reducer;
