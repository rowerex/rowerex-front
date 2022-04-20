import partsReducer from "./partsReducer";
import PartsContext from "./PartsContext";
import {useReducer} from "react";

const initialState = { parts: {invalidated: true,  success: false, loading: false, error: false, partsList: []}}

const PartsProvider = ({ children }) => {
    const [state, partsDispatcher] = useReducer(partsReducer, initialState)
    console.log(state);
    return <PartsContext.Provider value={{ ...state, partsDispatcher }}>
      {children}
    </PartsContext.Provider>
}

export default PartsProvider;
