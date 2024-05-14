import { Differ } from "json-diff-kit";
import React, { useState } from "react";
import JsonViewer from "./JsonViewer";
import { AfterBaseObject, BaseObject, JSONPatch } from "./Constant";

const Main = () => {
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
  const differ = new Differ({
    detectCircular: true, // default `true`
    maxDepth: Infinity, // default `Infinity`
    showModifications: true, // default `true`
    arrayDiffMethod: "lcs", // default `"normal"`, but `"lcs"` may be more useful
  });
  const diff = differ.diff(AfterBaseObject, object);
  const [value, setValue] = useState([]);
  const handleChange = (event) => {
    setValue([...value, event.target.value]);
  };
  return (
    <div>
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
      <JsonViewer diff={diff} />
    </div>
  );
};

export default Main;
