import "./App.css";
import Content from "./Component/Layout/Content";
import Header from "./Component/Layout/Header";

function App() {
  //console.log(db.collection("rooms"));
  return (
    <div className="App">
      <h1>Task Planner App</h1>
      <Header />
      <Content />
    </div>
  );
}

export default App;
