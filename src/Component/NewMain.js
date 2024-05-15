import React, { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import "./NewMain.css"; // Import custom CSS for styling
import { AfterBaseObject, BaseObject, JSONPatch } from "./Constant";

const NewMain = () => {
  // const [acceptedText, setAcceptedText] = useState(newText);

  // const handleAcceptChanges = () => {
  //   setAcceptedText(newText);
  //   // You can perform additional actions here, like saving the accepted text.
  // };

  // const handleRejectChanges = () => {
  //   // Perform actions to revert to the original text or previous version.
  //   // For example, you might fetch the original text from a server or reset state.
  //   setAcceptedText(oldText);
  // };
  const [object, setObject] = useState(BaseObject);
  const [remainingPatches, setRemainingPatches] = useState(JSONPatch);
  const handleAccept = (patch) => {
    const { op, path, value } = patch;
    if (op === "replace") {
      setObject((prevObject) => {
        const newObj = { ...prevObject };
        const pathParts = path.split("/").filter((part) => part !== "");
        let current = newObj;
        for (let i = 0; i < pathParts.length - 1; i++) {
          current = current[pathParts[i]];
        }
        current[pathParts[pathParts.length - 1]] = value;
        return newObj;
      });
    } else if (op === "add") {
      setObject((prevObject) => {
        const newObj = { ...prevObject };
        const pathParts = path.split("/").filter((part) => part !== "");
        let current = newObj;
        for (let i = 0; i < pathParts.length - 1; i++) {
          if (!current[pathParts[i]]) {
            current[pathParts[i]] = {};
          }
          current = current[pathParts[i]];
        }
        current[pathParts[pathParts.length - 1]] = value;
        return newObj;
      });
    }
    setRemainingPatches((prevPatches) =>
      prevPatches.filter((patchItem) => patchItem !== patch)
    );
  };

  const handleReject = (patch) => {
    setRemainingPatches((prevPatches) =>
      prevPatches.filter((patchItem) => patchItem !== patch)
    );
  };
  // const differ = new Differ({
  //   detectCircular: true, // default `true`
  //   maxDepth: Infinity, // default `Infinity`
  //   showModifications: true, // default `true`
  //   arrayDiffMethod: "lcs", // default `"normal"`, but `"lcs"` may be more useful
  // });
  // const diff = differ.diff(AfterBaseObject, object);
  const [value, setValue] = useState([]);
  const handleChange = (event) => {
    setValue([...value, event.target.value]);
  };
  const oldText = JSON.stringify(AfterBaseObject, null, 2);
  const newText = JSON.stringify(object, null, 2);
  return (
    <div className="diff-container">
      <h1>Text Difference</h1>
      <h2>Remaining Patches</h2>
      <textarea name="input" onChange={handleChange} />
      <ul>
        {remainingPatches.map((patch, index) => (
          <li key={index}>
            <p>Operation: {patch.op}</p>
            <p>Path: {patch.path}</p>
            <p>Value: {JSON.stringify(patch.value)}</p>
            <button onClick={() => handleAccept(patch)}>Accept</button>
            <button onClick={() => handleReject(patch)}>Reject</button>
          </li>
        ))}
      </ul>
      <div className="diff-viewer-container">
        <ReactDiffViewer
          oldValue={oldText}
          newValue={newText}
          splitView={true}
          onLineNumberClick={(lineNumber) =>
            console.log(`Clicked line ${lineNumber}`)
          }
        />
        {/* Arrows for accepting and rejecting changes */}
        {/* <div className="action-arrows">
          <div className="arrow" onClick={handleAcceptChanges}>
            &#8594;
          </div>
          <div className="arrow" onClick={handleRejectChanges}>
            &#8592;
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NewMain;
