import {Routes, Route, Navigate} from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Layout/Navigation/Navigation";import BikesView from "./views/BikesView";
import PartsView from "./views/PartsView";
import BikeView from "./views/BikeView";
import useToken from "./services/useToken";
import {useContext, useEffect} from "react";
import UserContext from "./store/UserContext";
import useHttp from "./hooks/useHttp";
import ConnectedView from "./views/ConnectedView";
import PartView from "./views/PartView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";

function App() {
    const {token, setToken} = useToken();
    const {user, userDispatcher} = useContext(UserContext);
    const {isLoading, error, sendRequest} = useHttp();

    useEffect(() => {
        const updateUser = user => {
            userDispatcher({type: "FETCH_USER_SUCCESS", user: user})
        }
        if (user.invalidated && token) {
            sendRequest({
                    path: '/user',
                    headers: {'X-AUTH-TOKEN': token},
                },
                updateUser
            )
        }
    }, [user, token])

    return (
        <div className="App">
            <Routes>
                <Route exact path="/login" element={token ? <Navigate to={"/"} replace={true}/> : <LoginView setToken={setToken}/>}/>
                <Route exact path="/register" element={token ? <Navigate to={"/"} replace={true}/> : <RegisterView />}/>

                {/*<Route exact path="/" element={!token ? <Navigate to={"/login"} replace={true}/> : <TasksView/>}/>*/}
                <Route exact path="/" element={!token ? <Navigate to={"/login"} replace={true}/> : <BikesView/>}/>
                <Route exact path="/parts" element={!token ? <Navigate to={"/login"} replace={true}/> : <PartsView/>}/>
                <Route exact path="/bikes/:bikeId"
                       element={!token ? <Navigate to={"/login"} replace={true}/> : <BikeView/>}/>
                <Route exact path="/parts/:partId"
                       element={!token ? <Navigate to={"/login"} replace={true}/> : <PartView/>}/>
                <Route exact path="/connected"
                       element={!token ? <Navigate to={"/login"} replace={true}/> : <ConnectedView/>}/>
            </Routes>
            {token && <Navigation/>
            }
        </div>
    );
}

export default App;
