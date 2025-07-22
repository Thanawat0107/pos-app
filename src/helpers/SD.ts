import { Platform } from "react-native";
// import * as Device from "expo-device";

// const baseIpForPhysicalDevice = "10.120.3.225";

// const baseUrlEmulator = "http://10.0.2.2:5178/";
// const baseUrlPhysical = `http://${baseIpForPhysicalDevice}:5178/`;

export const isIOS = Platform.OS === "ios";

// // ✅ ใช้ expo-device เพื่อแยกมือถือจริง vs emulator ให้แม่นยำ
// export const isEmulator = !Device.isDevice;

// export const baseUrl = isEmulator ? baseUrlEmulator : baseUrlPhysical;
export const baseUrl = "http://10.0.2.2:5232"
export const baseUrlAPI = baseUrl + "/api/";