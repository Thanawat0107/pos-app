import { NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
  Home: undefined;
  Menu: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  RootTabs: NavigatorScreenParams<RootTabParamList>;
  MenuDetails: { menuId: number };
  ShoppingCart: undefined;
  NewRivals: undefined;
  MenuCategory: undefined;
  MenuItemUpsert: { menuId?: string };
  Register: undefined;
  Login: undefined;
  RestaurantTableList: undefined;
  OrderTagList: undefined;
  OrderList: undefined;
  OrderDetail: { orderDetailId: number };
  OrderForm: undefined;
};
