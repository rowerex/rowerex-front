import {Routes, Route, Link} from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Layout/Navigation/Navigation";
import TasksView from "./views/TasksView";
import BikesView from "./views/BikesView";
import PartsView from "./views/PartsView";
import BikeView from "./views/BikeView";
import Login from "./components/Login/Login";
import useToken from "./services/useToken";

function App() {
  const {token, setToken} = useToken();

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
