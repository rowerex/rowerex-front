import "./App.scss";
import Navigation from "./components/Layout/Navigation/Navigation";
import MyTasks from "./components/MyTasks/MyTasks";

function App() {
  return (
    <div className="App">
      <MyTasks />
      <Navigation />
    </div>
  );
}

export default App;
