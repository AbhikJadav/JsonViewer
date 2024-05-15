import logo from "./logo.svg";
import "./App.css";
import Main from "./Component/Main";
import NewJsonViewer from "./Component/NewJson";
import JsonViewerWithCard from "./Component/JsonViewerWithCard";

function App() {
  return (
    <div className="App">
      {/* <Main /> */}
      <JsonViewerWithCard />
      {/* <NewJsonViewer /> */}
    </div>
  );
}

export default App;
