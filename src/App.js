import "./App.scss";
import Navigation from "./components/Layout/Navigation/Navigation";
import TaskView from "./views/TasksView";

function App() {
  return (
    <div className="App">
      <TaskView />
      <Navigation />
    </div>
  );
}

export default App;
