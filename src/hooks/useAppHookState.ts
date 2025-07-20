import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

// function Get Action
export const useAppDispatch = () => useDispatch<AppDispatch>();
// function Get State
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;