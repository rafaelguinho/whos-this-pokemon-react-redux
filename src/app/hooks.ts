import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootsState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootsState> = useSelector;
