import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootTabs from './RootTabs';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import MenuDetails from '../components/menuItems/MenuDetails';
import RestaurantTableList from '../components/restaurant-tables/RestaurantTableList';
const Stack = createNativeStackNavigator();

const StackTabs = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RootTabs"
        component={RootTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MenuDetails"
        component={MenuDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RestaurantTableList"
        component={RestaurantTableList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export { StackTabs }