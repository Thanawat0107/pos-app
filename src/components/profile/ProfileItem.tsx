import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { styles } from "./ProfileItem.Style";
import { COLORS, SIZES } from "../../helpers/themes";
import { useTitleNavigation } from "../../utils/navigationUtils";
import ReusableDialog from "../ReusableDialog";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppHookState";
import { logout } from "../../store/slices/authSlice";
import { useAppNavigation } from "../../hooks/useAppNavigation";

const ProfileItem = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const handleItemPress = useTitleNavigation();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setShowConfirmLogout(false);
    navigation.replace("RootTabs");
  }, [dispatch, navigation]);

  const isLoggedIn = useAppSelector((state) => !!state.auth.isAuthenticated);
  const userName = useAppSelector((state) => state.auth.userName);
  const email = useAppSelector((state) => state.auth.email);
  const menuProfile = [
    {
      title: "ออเดอร์แท็ก",
      icon: (
        <MaterialIcons
          name="history"
          size={SIZES.xLarge}
          color={COLORS.red_orange}
        />
      ),
    },
    {
      title: "ประวัติการสั่งซื้อ",
      icon: (
        <MaterialIcons
          name="history"
          size={SIZES.xLarge}
          color={COLORS.red_orange}
        />
      ),
    },
    {
      title: "การแจ้งเตือน",
      icon: (
        <Ionicons
          name="notifications-outline"
          size={SIZES.xLarge}
          color={COLORS.red_orange}
        />
      ),
    },
    {
      title: "ที่อยู่ของฉัน",
      icon: (
        <Ionicons
          name="location-outline"
          size={SIZES.xLarge}
          color={COLORS.red_orange}
        />
      ),
    },
    {
      title: "รายการโปรด",
      icon: (
        <FontAwesome
          name="heart-o"
          size={SIZES.xLarge}
          color={COLORS.red_orange}
        />
      ),
    },
    {
      title: "ติดตามคำสั่งซื้อ",
      icon: (
        <MaterialIcons
          name="track-changes"
          size={SIZES.xLarge}
          color={COLORS.red_orange}
        />
      ),
    },
    {
      title: "บัตรเครดิต",
      icon: (
        <FontAwesome
          name="credit-card"
          size={SIZES.xLarge}
          color={COLORS.red_orange}
        />
      ),
    },
    {
      title: isLoggedIn ? "ออกจากระบบ" : "เข้าสู่ระบบ",
      icon: isLoggedIn ? (
        <MaterialIcons
          name="logout"
          size={SIZES.xLarge}
          color={COLORS.red_orange}
        />
      ) : (
        <MaterialIcons
          name="login"
          size={SIZES.xLarge}
          color={COLORS.red_orange}
        />
      ),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {isLoggedIn && (
        <View style={styles.profileBox}>
          <Image
            source={require("../../../assets/images/logo-noodle.jpg")}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <MaterialIcons
              name="edit"
              size={SIZES.xLarge}
              color={COLORS.red_orange}
            />
          </TouchableOpacity>
        </View>
      )}

      {/** Menu items */}
      {menuProfile.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuProfile}
          onPress={() => {
            if (item.title === "ออกจากระบบ") {
              setShowConfirmLogout(true);
            } else {
              handleItemPress(item.title);
            }
          }}
        >
          <View style={styles.menuLeft}>
            {item.icon}
            <Text style={styles.menuText}>{item.title}</Text>
          </View>
          <Entypo
            name="chevron-right"
            size={SIZES.xLarge}
            color={COLORS.red_orange}
          />
        </TouchableOpacity>
      ))}

      <ReusableDialog
        visible={showConfirmLogout}
        title="ออกจากระบบ"
        message="คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?"
        status="warning"
        showCancelButton={true}
        rightButtonText="ออกจากระบบ"
        leftButtonText="ยกเลิก"
        leftButtonColor={COLORS.blue}
        onConfirm={handleLogout}
        onCancel={() => setShowConfirmLogout(false)}
      />
    </ScrollView>
  );
};

export default ProfileItem;
