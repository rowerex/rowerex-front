import {createContext} from "react";

const BikesContext = createContext({ bikes: { invalidated: true, success: false, loading: false, error: false, bikesList: []}})

export default BikesContext;
