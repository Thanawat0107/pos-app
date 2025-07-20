import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import { isIOS } from "../helpers/SD";
import { COLORS } from "../helpers/themes";
import ShoppingCartScreen from "../screen/ShoppingCartScreen";
import MenuScreen from "../screen/MenuScreen";

const Tab = createBottomTabNavigator();

const RootTabs = () => {
  const screenOptions = ({
    route,
  }: {
    route: RouteProp<ParamListBase, string>;
  }): BottomTabNavigationOptions => ({
    tabBarShowLabel: true,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarActiveTintColor: COLORS.red_orange,
    tabBarInactiveTintColor: COLORS.gray,
    tabBarStyle: {
      position: "absolute",
      bottom: isIOS ? 25 : 0,
      height: 75,
      flexDirection: "row",
      justifyContent: "space-between",
      ...(isIOS ? {
            //ios
            alignItems: "center",
          }
        : {
            //os
          }),
      ...(isIOS
        ? {
            //ios
            marginHorizontal: 15,
          }
        : {
            //os
          }),
      ...(isIOS
        ? {
            //ios
            borderRadius: 30,
          }
        : {
            //os
          }),
      ...(isIOS
        ? {
            shadowColor: "black",
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 10,
            shadowOpacity: 0.1,
          }
        : {
            elevation: 0,
          }),
    },
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="home" size={size} color={color} />
          ),
          tabBarLabel: "หน้าแรก",
          tabBarLabelStyle: { fontSize: 12, fontFamily: "bold" },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="grid" size={size} color={color} />
          ),
          tabBarLabel: "เมนู",
          tabBarLabelStyle: { fontSize: 12, fontFamily: "bold" },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={ShoppingCartScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="shopping-cart" size={size} color={color} />
          ),
          tabBarLabel: "ตะกร้า",
          tabBarLabelStyle: { fontSize: 12, fontFamily: "bold" },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          // tabBarBadge: 3,
          // tabBarBadgeStyle: { backgroundColor: "#dc3545", color: "#fff" },
          tabBarLabel: "โปรไฟล์",
          tabBarLabelStyle: { fontSize: 12, fontFamily: "bold" },
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTabs;
