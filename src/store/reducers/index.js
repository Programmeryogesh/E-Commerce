import ProductReducer from "./productReducer";
import { combineReducers } from 'redux'
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";


const rootReducer = combineReducers({
    cart:ProductReducer,
    user: userReducer,
    search: searchReducer,
});
export default rootReducer;