import useToken from "../services/useToken";
import TokenContext from "./TokenContext";

const TokenProvider = ({ children }) => {
    const {token, setToken} = useToken();
    return <TokenContext.Provider value={{token, setToken }}>
      {children}
    </TokenContext.Provider>
}

export default TokenProvider;
