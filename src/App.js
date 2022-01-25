import { Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Layout/Navigation/Navigation";
import TasksView from "./views/TasksView";
import BikesView from "./views/BikesView";
import PartsView from "./views/PartsView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TasksView />} />
        <Route path="/bikes" element={<BikesView />} />
        <Route path="/parts" element={<PartsView />} />
      </Routes>
      <Navigation />
    </div>
  );
}

export default App;
