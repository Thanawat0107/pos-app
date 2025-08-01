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
    title: "History",
    icon: (
      <MaterialIcons
        name="history"
        size={SIZES.xLarge}
        color={COLORS.red_orange}
      />
    ),
  },
  {
    title: "Notifications",
    icon: (
      <Ionicons
        name="notifications-outline"
        size={SIZES.xLarge}
        color={COLORS.red_orange}
      />
    ),
  },
  {
    title: "My Address",
    icon: (
      <Ionicons
        name="location-outline"
        size={SIZES.xLarge}
        color={COLORS.red_orange}
      />
    ),
  },
  {
    title: "Favourite",
    icon: (
      <FontAwesome
        name="heart-o"
        size={SIZES.xLarge}
        color={COLORS.red_orange}
      />
    ),
  },
  {
    title: "Track Order",
    icon: (
      <MaterialIcons
        name="track-changes"
        size={SIZES.xLarge}
        color={COLORS.red_orange}
      />
    ),
  },
  {
    title: "Credit Cards",
    icon: (
      <FontAwesome
        name="credit-card"
        size={SIZES.xLarge}
        color={COLORS.red_orange}
      />
    ),
  },
  {
    title: isLoggedIn ? "Sign out" : "Sign in",
    icon: isLoggedIn
      ? <MaterialIcons name="logout" size={SIZES.xLarge} color={COLORS.red_orange} />
      : <MaterialIcons name="login" size={SIZES.xLarge} color={COLORS.red_orange} />,
  },
];

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
            if (item.title === "Sign out") {
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
