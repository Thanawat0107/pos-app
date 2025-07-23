import { Dimensions } from "react-native";
import { SIZES } from "./themes";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const wp = (percentage: number) => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};

export const hp = (percentage: number) => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

export const getCardWidth = (numColumns = 2, spacingPercent = 2, paddingPercent = 4) => {
  const spacing = wp(spacingPercent);
  const padding = wp(paddingPercent);
  return (SIZES.width - (numColumns - 1) * spacing - padding * 2) / numColumns;
};