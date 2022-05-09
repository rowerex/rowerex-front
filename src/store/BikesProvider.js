import bikesReducer from "./bikesReducer";
import BikesContext from "./BikesContext";
import {useReducer} from "react";

const initialState = { bikes: {invalidated: true,  success: false, loading: false, error: false, bikesList: []}}

const BikesProvider = ({ children }) => {
    const [state, bikesDispatcher] = useReducer(bikesReducer, initialState)
    return <BikesContext.Provider value={{ ...state, bikesDispatcher }}>
      {children}
    </BikesContext.Provider>
}

export default BikesProvider;
