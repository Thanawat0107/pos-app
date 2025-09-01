import { Platform } from "react-native";

export const isIOS = Platform.OS === "ios";
// export const baseUrl = "http://192.168.1.140:7000";
export const baseUrl = "http://10.120.0.21:7000";
export const baseUrlAPI = baseUrl + "/api/";