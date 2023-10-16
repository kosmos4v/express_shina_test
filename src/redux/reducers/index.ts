import { combineReducers  } from "redux";
import CategoriesReducer from "./CategoriesSlice";

export type TRootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
    CategoriesReducer,

});

export default rootReducer;
