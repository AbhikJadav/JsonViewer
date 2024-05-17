import logo from "./logo.svg";
import "./App.css";
import Main from "./Component/Main";
import JsonViewerWithCard from "./Component/JsonViewerWithCard";
import DynamicJsonViewer from "./Component/DynamicJsonViewer";
import SingleDynamicJson from "./Component/SingleDynamicJson";

function App() {
  return (
    <div className="App">
      {/* <Main /> */}
      <JsonViewerWithCard />
      {/* <DynamicJsonViewer /> */}
      {/* <SingleDynamicJson /> */}
    </div>
  );
}

export default App;
