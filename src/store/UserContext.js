import {createContext} from "react";

const UserContext = createContext({ user: { invalidated: true, success: false, loading: false, error: false, user: undefined}})

export default UserContext;
