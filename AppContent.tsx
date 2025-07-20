import { useEffect } from "react";
import { useAppDispatch } from "./src/hooks/useAppHookState";
import { loadAuth } from "./src/hooks/loadAuth";
import { StackTabs } from "./src/navigators/StackTabs";
import { useAuth } from "./src/hooks/useAuth";

const AppContent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAuth());
  }, [dispatch]);

  useAuth();

  return <StackTabs />;
};

export default AppContent;
