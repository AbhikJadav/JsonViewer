import React, { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import { AfterBaseObject, BaseObject, JSONPatch } from "./Constant";
import ReactJsonViewer from "./ReactJsonViewer";

const NewJson = () => {
  //   const oldText = JSON.stringify(BaseObject, null, 2);
  //   const newText = "Hello React world!";
  const [object, setObject] = useState(BaseObject);

  const oldText = JSON.stringify(AfterBaseObject, null, 2);
  const newText = JSON.stringify(object, null, 2);
  const [acceptedText, setAcceptedText] = useState(newText);
  console.log("acceptedText", acceptedText);
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

  const handleAcceptChanges = () => {
    setObject(newText);
  };

  const handleRejectChanges = () => {
    setObject(oldText);
  };

  return (
    <div>
      {remainingPatches.map((patch, index) => (
        <li key={index}>
          <p>Operation: {patch.op}</p>
          <p>Path: {patch.path}</p>
          <p>Value: {JSON.stringify(patch.value)}</p>
          <button onClick={() => handleAccept(patch)}>Accept</button>
          <button onClick={() => handleReject(patch)}>Reject</button>
        </li>
      ))}
      <ReactJsonViewer oldValue={oldText} newValue={newText} />
      <div className="action-arrows">
        <div className="arrow" onClick={handleAcceptChanges}>
          &#8594;
        </div>
        <div className="arrow" onClick={handleRejectChanges}>
          &#8592;
        </div>
      </div>
    </div>
  );
};

export default NewJson;
