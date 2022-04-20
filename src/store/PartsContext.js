import {createContext} from "react";

const PartsContext = createContext({ parts: { invalidated: true, success: false, loading: false, error: false, partsList: []}})

export default PartsContext;
