import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useFormik } from "formik";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./Login.Style";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Checkbox } from "react-native-paper";
import { COLORS } from "../../helpers/themes";
import { useLoginMutation } from "../../services/authApi";
import { storage } from "../../helpers/storageHelper";
import { loginValidate } from "../../helpers/validationSchema";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../hooks/useAppHookState";
import ReusableDialog from "../ReusableDialog";
import { RegisterResponse } from "../../@types/Responsts/RegisterResponse";
import { SD_Roles } from "../../@types/Enum";
import { setCredentials } from "../../store/slices/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigation = useAppNavigation();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: loginValidate,
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        const decoded = jwtDecode(result.token) as RegisterResponse & {
          role: SD_Roles;
        };

        if (rememberMe) {
          await storage.set("token", result.token);
        } else {
          await storage.remove("token");
        }

        dispatch(
          setCredentials({
            userId: decoded.userId,
            userName: decoded.userName,
            email: decoded.email,
            phoneNumber: decoded.phoneNumber,
            role: decoded.role,
            token: result.token,
          })
        );

        setShowSuccessDialog(true);
      } catch (err: any) {
        console.log("Login Failed:", err);
        setApiError(err?.data?.message || "เข้าสู่ระบบไม่สำเร็จ");
        setShowErrorDialog(true);
      }
    },
  });

  const toggleCheckbox = () => setRememberMe(!rememberMe);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/logo-noodle.jpg")}
        style={styles.logo}
      />
      <Text style={styles.title}>Get back to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="กรอกชื่อผู้ใช้ของคุณ"
        placeholderTextColor="#aaa"
        keyboardType="default"
        autoCapitalize="none"
        value={formik.values.userName}
        onChangeText={formik.handleChange("userName")}
        onBlur={formik.handleBlur("userName")}
      />
      {formik.touched.userName && formik.errors.userName && (
        <Text style={styles.errorText}>{formik.errors.userName}</Text>
      )}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="กรอกรหัสผ่านของคุณ"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialIcons
            name={showPassword ? "visibility-off" : "visibility"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <View style={styles.rememberForgotContainer}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={rememberMe ? "checked" : "unchecked"}
            onPress={toggleCheckbox}
            color={COLORS.gray2}
          />
          <Text style={styles.checkboxLabel}>จดจำฉัน</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotText}>ลืมรหัสผ่าน?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          console.log("Pressed login button");
          formik.handleSubmit();
          console.log("Formik errors:", formik.errors);
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
        )}
      </TouchableOpacity>

      {apiError !== "" && (
        <Text style={styles.errorTextCenter}>{apiError}</Text>
      )}

      <Text style={styles.orText}>หรือเข้าสู่ระบบด้วย</Text>

      <View style={styles.socialButtons}>
        <FontAwesome name="facebook" size={32} color="#3b5998" />
        <FontAwesome name="google" size={32} color="#DB4437" />
      </View>

      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.push("Register")}>
          <Text style={styles.signupText}>สมัครสมาชิก</Text>
        </TouchableOpacity>
      </View>

      <ReusableDialog
        visible={showErrorDialog}
        title="เกิดข้อผิดพลาด"
        message={apiError}
        status="error"
        rightButtonText="ตกลง"
        showCancelButton={false}
        onConfirm={() => setShowErrorDialog(false)}
      />

      <ReusableDialog
        visible={showSuccessDialog}
        title="สำเร็จ"
        message="เข้าสู่ระบบเรียบร้อยแล้ว"
        status="success"
        rightButtonText="ไปหน้าหลัก"
        showCancelButton={false}
        onConfirm={() => {
          setShowSuccessDialog(false);
          navigation.replace("RootTabs");
        }}
      />
    </View>
  );
};

export default Login;
