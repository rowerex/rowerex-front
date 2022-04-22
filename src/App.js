import {Routes, Route} from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Layout/Navigation/Navigation";
import TasksView from "./views/TasksView";
import BikesView from "./views/BikesView";
import PartsView from "./views/PartsView";
import BikeView from "./views/BikeView";
import Login from "./components/Login/Login";
import useToken from "./services/useToken";
import {useContext, useEffect} from "react";
import UserContext from "./store/UserContext";
import useHttp from "./hooks/useHttp";

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

  if (!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<TasksView/>}/>
        <Route exact path="/bikes" element={<BikesView/>}/>
        <Route exact path="/parts" element={<PartsView/>}/>
        <Route exact path="/bikes/:bikeId" element={<BikeView/>}/>
      </Routes>
      <Navigation/>
    </div>
  );
}

export default App;
