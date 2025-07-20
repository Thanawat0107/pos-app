import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const COLORS = {
  while: "#fff",
  grayBy: "#e5e5e5",

  primary: "#2A4D50",
  secondary: "#DDF0FF",
  tertiary: "#FF7754",

  gray: "#83829A",
  gray2: "#C1C0C8",

  green: "#2ecc71",
  yellew: "#f1c40f",
  blue: "#3498db",
  
  offwhite: "#F3F4F8",
  white: "#FFFFFF",
  black: "#262626",
  red: "#e81e4d",
  red2: "#FF4C4C",
  red3: "#e74c3c",
  red_orange: "#E02200",
  light_red: "#FFEDE5",
  lightWhite: "#FAFAFC",

  // neutral
  neutral: (opacity: any) => `rgba(10, 10, 10, ${opacity})`,
};

const SIZES = {
  xSmall: 10,
  small: 14,
  medium: 16,
  large: 20,
  xLarge: 24,
  xsLarge: 40,
  xxLarge: 44,
  xxxLarge: 50,
  height,
  width,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, SIZES ,SHADOWS };
