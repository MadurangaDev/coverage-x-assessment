import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import { type IRootState, type IAppDispatch } from "@redux";

export const useAppDispatch = () => useDispatch<IAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
