import { SD_Roles } from "../@types/Enum";
import { RegisterResponse } from "../@types/responsts/RegisterResponse";
import { storage } from "../helpers/storageHelper";
import { useAppDispatch } from "../hooks/useAppHookState";
import { setCredentials, logout } from "../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";

interface DecodedToken extends RegisterResponse {
  exp: number;
  role: SD_Roles;
}

export const loadAuth = () => async () => {
  const dispatch = useAppDispatch();
  try {
    const token = await storage.get("token");
    if (!token) return;

    const decoded = jwtDecode<DecodedToken>(token);

   if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
     await storage.remove("token");
     dispatch(logout());

     Alert.alert("Session หมดอายุ", "กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
     return;
   }

    dispatch(
      setCredentials({
        userId: decoded.userId,
        userName: decoded.userName,
        email: decoded.email,
        phoneNumber: decoded.phoneNumber,
        role: decoded.role,
        token,
      })
    );
  } catch (error) {
    await storage.remove("token");
    dispatch(logout());
  }
};
