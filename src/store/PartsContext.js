import {createContext} from "react";

const PartsContext = createContext({ parts: { success: false, loading: false, error: false, partsList: []}})

export default PartsContext;
