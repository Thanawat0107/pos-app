import { useCallback } from 'react';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { RootStackParamList } from '../navigators/navigation';

type RouteConfig = {
  name: keyof RootStackParamList;
  params?: Partial<RootStackParamList[keyof RootStackParamList]>;
};

const routeMap: Record<string, RouteConfig> = {
  'Sign in': { name: 'Login' },
  'Sign out': { name: 'Login' },
};

export const useTitleNavigation = () => {
  const navigation = useAppNavigation();

  return useCallback((title: string) => {
    const route = routeMap[title];
    if (route) {
      navigation.navigate(route.name as any, route.params); // `as any` ป้องกัน TS error เบื้องต้น
    } else {
      console.warn(`No route found for title "${title}"`);
    }
  }, [navigation]);
};
