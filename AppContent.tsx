import { useEffect, useRef } from "react";
import { useAppDispatch } from "./src/hooks/useAppHookState";
import { loadAuth } from "./src/hooks/loadAuth";
import { StackTabs } from "./src/navigators/StackTabs";
import { useAuth } from "./src/hooks/useAuth";
import * as ExpoLinking from "expo-linking";       // ใช้ parse()
import { Linking as RNLinking } from "react-native"; // ใช้ getInitialURL(), addEventListener()
import { useLazyStartOrderQuery } from "./src/services/shoppingCartApi";
import { ShoppingCart } from "./src/@types/dto/ShoppingCart";
import { storage } from "./src/helpers/storageHelper";
import { useAppNavigation } from "./src/hooks/useAppNavigation";
import * as SplashScreen from "expo-splash-screen";
import { CART_TOKEN_KEY, clearCartToken, TAG_TOKEN_KEY } from "./src/helpers/cartTokenStorage";
import { StartCart } from "./src/@types/dto/StartCart";

// กัน splash screen หายก่อนโหลดเสร็จ
SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const [triggerStartOrder] = useLazyStartOrderQuery();

  const processingRef = useRef(false);
  const lastTagRef = useRef<string | null>(null);

  const handleTag = async (tag: string) => {
    const clean = tag.trim();
    if (!clean) return;
    if (processingRef.current || clean === lastTagRef.current) return;

    processingRef.current = true;
    lastTagRef.current = clean;
    try {
      const cart: StartCart = await triggerStartOrder(clean).unwrap();
       if (cart?.cartToken) {
      // ✅ ล้าง token เก่าออกก่อน (กันกรณีลูกค้าสแกนโต๊ะใหม่)
      await clearCartToken();

      // ✅ เซฟ token + tag ใหม่
      await storage.set(CART_TOKEN_KEY, cart.cartToken);
      await storage.set(TAG_TOKEN_KEY, clean);

      console.log("Cart token saved:", cart.cartToken);
      navigation.navigate("RootTabs", { screen: "Home" });
    } else {
      console.warn("No cartToken received");
      lastTagRef.current = null;
    }
    } catch (e) {
      console.error("Failed to start order", e);
      lastTagRef.current = null;
    } finally {
      processingRef.current = false;
    }
  };

  // Cold start (เปิดแอปจาก QR ครั้งแรก)
  useEffect(() => {
    (async () => {
      const url = await RNLinking.getInitialURL(); // ✅ ของ react-native
      console.log("Cold start URL:", url);
      if (!url) return;

      const { queryParams } = ExpoLinking.parse(url); // ✅ parse ของ expo-linking
      const tag = Array.isArray(queryParams?.tag)
        ? queryParams.tag[0]
        : queryParams?.tag;

      if (typeof tag === "string") await handleTag(tag);
    })();
  }, []);

  // Warm start (แอปเปิดอยู่ แล้วสแกน QR ใหม่)
  useEffect(() => {
    const sub = RNLinking.addEventListener("url", ({ url }) => {
      console.log("Warm start URL:", url);

      const { queryParams } = ExpoLinking.parse(url); // ✅ parse ของ expo-linking
      const tag = Array.isArray(queryParams?.tag)
        ? queryParams.tag[0]
        : queryParams?.tag;

      if (typeof tag === "string") handleTag(tag);
    });

    return () => sub.remove();
  }, []);

  useEffect(() => {
    dispatch(loadAuth());
  }, [dispatch]);

  useAuth();

  return <StackTabs />;
};

export default AppContent;
